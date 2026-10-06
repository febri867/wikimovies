import { test, expect } from '@playwright/test';

const movie = (id:number, title:string) => ({ id, title, overview:'A story worth watching.', release_date:'2026-01-01', poster_path:null, backdrop_path:null, vote_average:8.2, vote_count:1200, popularity:100, genre_ids:[18], original_language:'en' });

const installTmdbMock = async (page: import('@playwright/test').Page) => {
  await page.route('**/3/**', async (route) => {
    const url = new URL(route.request().url());
    const path = url.pathname.replace(/^.*\/3/, '');
    if (path === '/movie/popular') return route.fulfill({ json:{ page:1, results:[movie(1,'Inception'),movie(2,'Interstellar')], total_pages:1, total_results:2 } });
    if (path === '/search/movie') return route.fulfill({ json:{ page:1, results:[movie(3,'Batman Begins')], total_pages:1, total_results:1 } });
    if (path === '/movie/1') return route.fulfill({ json:{ ...movie(1,'Inception'), runtime:148, status:'Released', tagline:'Your mind is the scene of the crime.', genres:[{id:18,name:'Drama'}], credits:{cast:[{id:10,name:'Actor',character:'Cobb',profile_path:null,order:0}],crew:[{id:20,name:'Director',job:'Director',department:'Directing',profile_path:null}]}, videos:{results:[{id:'v',key:'abc',name:'Official Trailer',site:'YouTube',type:'Trailer',official:true,published_at:'2026-01-01'}]}, recommendations:{page:1,results:[movie(2,'Interstellar')],total_pages:1,total_results:1}, similar:{page:1,results:[],total_pages:1,total_results:0}, 'watch/providers':{results:{}} } });
    return route.fulfill({ json:{ page:1, results:[], total_pages:1, total_results:0 } });
  });
};

test.describe('WikiMovies critical flows', () => {
  test.beforeEach(async ({ page }) => { await installTmdbMock(page); await page.goto('/'); });
  test('browse movies and open detail', async ({ page }) => { await expect(page.getByText('Inception')).toBeVisible(); await page.getByRole('link',{name:/view details for inception/i}).click(); await expect(page.getByRole('heading',{name:'Inception'})).toBeVisible(); await expect(page.getByText('Actor')).toBeVisible(); });
  test('search with autocomplete and navigate', async ({ page }) => { const input=page.getByLabel('Search movies'); await input.fill('bat'); await expect(page.getByRole('option',{name:/batman begins/i})).toBeVisible(); await page.getByRole('option',{name:/batman begins/i}).click(); await expect(page).toHaveURL(/\/movies\/3$/); });
  test('switch category and theme', async ({ page }) => { await page.getByRole('button',{name:'Top Rated'}).click(); await expect(page.getByRole('heading',{name:'top rated'})).toBeVisible(); const toggle=page.getByRole('button',{name:/switch to light theme/i}); await toggle.click(); await expect(page.locator('html')).toHaveAttribute('data-theme','light'); });
});
