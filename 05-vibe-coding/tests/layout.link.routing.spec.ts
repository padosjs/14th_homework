import { test, expect } from '@playwright/test';

test.describe('Layout Link Routing', () => {
  test('로고 클릭시 일기목록 페이지로 이동', async ({ page }) => {
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="layout-logo"]');
    
    await page.click('[data-testid="layout-logo"]');
    await page.waitForURL('/diaries');
    expect(page.url()).toContain('/diaries');
  });

  test('일기보관함 탭 클릭시 일기목록 페이지로 이동', async ({ page }) => {
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="tab-diaries"]');
    
    await page.click('[data-testid="tab-diaries"]');
    await page.waitForURL('/diaries');
    expect(page.url()).toContain('/diaries');
  });

  test('일기목록 페이지에서 일기보관함 탭이 active 상태', async ({ page }) => {
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="tab-diaries"]');
    
    const diariesTab = page.locator('[data-testid="tab-diaries"]');
    await expect(diariesTab).toHaveAttribute('data-active', 'true');
  });
});

