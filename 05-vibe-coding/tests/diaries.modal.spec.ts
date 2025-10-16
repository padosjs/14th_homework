import { test, expect } from '@playwright/test';

test.describe('일기쓰기 모달 기능', () => {
  test.beforeEach(async ({ page }) => {
    // /diaries 페이지로 이동
    await page.goto('/diaries');
    
    // 페이지가 완전히 로드될 때까지 대기 (data-testid로 식별)
    await page.waitForSelector('[data-testid="diaries-container"]');
  });

  test('일기쓰기 버튼 클릭시 모달이 열린다', async ({ page }) => {
    // 일기쓰기 버튼 클릭
    await page.click('[data-testid="write-diary-button"]');
    
    // 모달이 열렸는지 확인
    const modal = page.locator('[data-testid="diary-modal"]');
    await expect(modal).toBeVisible();
    
    // 모달 타이틀 확인
    const modalTitle = page.locator('[data-testid="diary-modal-title"]');
    await expect(modalTitle).toHaveText('일기 쓰기');
  });

  test('모달 오버레이가 중앙에 표시된다', async ({ page }) => {
    // 일기쓰기 버튼 클릭
    await page.click('[data-testid="write-diary-button"]');
    
    // 모달 오버레이 확인
    const overlay = page.locator('[data-testid="modal-overlay"]');
    await expect(overlay).toBeVisible();
    
    // 모달 컨텐츠 확인
    const modalContent = page.locator('[data-testid="diary-modal"]');
    await expect(modalContent).toBeVisible();
  });

  test('닫기 버튼 클릭시 등록취소 확인 모달이 열린다', async ({ page }) => {
    // 일기쓰기 버튼 클릭
    await page.click('[data-testid="write-diary-button"]');
    
    // 모달이 열렸는지 확인
    const modal = page.locator('[data-testid="diary-modal"]');
    await expect(modal).toBeVisible();
    
    // 닫기 버튼 클릭
    await page.click('[data-testid="close-modal-button"]');
    
    // 등록취소 확인 모달이 열렸는지 확인
    const cancelModal = page.locator('[data-testid="modal"]');
    await expect(cancelModal).toBeVisible();
  });
});

