import { test, expect } from '@playwright/test';

test.describe('일기쓰기 모달 기능 (액션 GUARD)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="diaries-container"]');
  });

  test('비로그인유저: 일기쓰기 클릭 시 로그인요청 모달 노출', async ({ page }) => {
    // 테스트 환경에서 액션가드 활성화를 위해 기본값 무시
    await page.evaluate(() => {
      // 비로그인 상태로 설정
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      // 테스트 시나리오: 비로그인유저 강제
      (window as any).__TEST_BYPASS__ = false;
    });

    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');

    await page.click('[data-testid="write-diary-button"]');

    const loginModal = page.locator('[data-testid="modal"]');
    await expect(loginModal).toBeVisible();
    const title = page.locator('[data-testid="modal-title"]');
    await expect(title).toHaveText('로그인이 필요합니다');
  });

  test('로그인유저: 일기쓰기 클릭 시 일기쓰기 모달 노출', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('accessToken', 'token');
      localStorage.setItem('user', JSON.stringify({ _id: '1', name: '테스터' }));
      (window as any).__TEST_BYPASS__ = true;
    });

    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');

    await page.click('[data-testid="write-diary-button"]');

    const modal = page.locator('[data-testid="diary-modal"]');
    await expect(modal).toBeVisible();
    const modalTitle = page.locator('[data-testid="diary-modal-title"]');
    await expect(modalTitle).toHaveText('일기 쓰기');
  });

  test('모달 오버레이 노출 및 닫기 플로우 확인', async ({ page }) => {
    // 로그인 상태에서 열어 확인
    await page.evaluate(() => {
      localStorage.setItem('accessToken', 'token');
      localStorage.setItem('user', JSON.stringify({ _id: '1', name: '테스터' }));
      (window as any).__TEST_BYPASS__ = true;
    });
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');

    await page.click('[data-testid="write-diary-button"]');

    const overlay = page.locator('[data-testid="modal-overlay"]');
    await expect(overlay).toBeVisible();

    const diaryModal = page.locator('[data-testid="diary-modal"]');
    await expect(diaryModal).toBeVisible();

    // 닫기 버튼 클릭 시 등록취소 확인 모달 노출
    await page.click('[data-testid="close-modal-button"]');
    const confirmModal = page.locator('[data-testid="modal"]');
    await expect(confirmModal).toBeVisible();
  });
});

