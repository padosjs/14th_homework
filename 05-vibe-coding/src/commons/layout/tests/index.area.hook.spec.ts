import { test, expect } from '@playwright/test';

test.describe('Layout Area Visibility', () => {
  test('일기목록 페이지에서 모든 레이아웃 영역이 표시됨', async ({ page }) => {
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="layout-logo"]');
    
    await expect(page.locator('[data-testid="layout-header"]')).toBeVisible();
    await expect(page.locator('[data-testid="layout-banner"]')).toBeVisible();
    await expect(page.locator('[data-testid="layout-navigation"]')).toBeVisible();
    await expect(page.locator('[data-testid="layout-footer"]')).toBeVisible();
  });

  test('일기상세 페이지에서 header와 footer만 표시됨', async ({ page }) => {
    await page.goto('/diaries/123');
    await page.waitForSelector('[data-testid="layout-logo"]');
    
    await expect(page.locator('[data-testid="layout-header"]')).toBeVisible();
    await expect(page.locator('[data-testid="layout-banner"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="layout-navigation"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="layout-footer"]')).toBeVisible();
  });

  test.skip('로그인 페이지 테스트 스킵', async () => {
    // 테스트 제외 대상
  });

  test.skip('회원가입 페이지 테스트 스킵', async () => {
    // 테스트 제외 대상
  });

  test.skip('사진보관함 페이지 테스트 스킵', async () => {
    // 테스트 제외 대상
  });
});

