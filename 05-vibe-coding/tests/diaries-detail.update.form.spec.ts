import { test, expect } from '@playwright/test';

test.describe('일기상세 수정 기능', () => {
  test.beforeEach(async ({ page }) => {
    // 테스트용 일기 데이터 설정
    const testDiary = {
      id: 1,
      title: "테스트 일기",
      content: "테스트 내용입니다.",
      emotion: "HAPPY",
      createdAt: "2024-01-01"
    };

    // 로컬스토리지에 테스트 데이터 저장
    await page.evaluate((diary) => {
      localStorage.setItem('diaries', JSON.stringify([diary]));
    }, testDiary);

    // 일기상세 페이지로 이동
    await page.goto('/diaries/1');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
  });

  test('일기 수정 버튼 클릭 시 수정 모드로 전환', async ({ page }) => {
    // 수정 버튼 클릭
    await page.click('[data-testid="diary-edit-button"]');
    
    // 수정 모드 확인
    await expect(page.locator('[data-testid="diary-edit-title"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-edit-emotion"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-edit-content"]')).toBeVisible();
    
    // 취소/수정 버튼 확인
    await expect(page.locator('[data-testid="diary-edit-cancel"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-edit-submit"]')).toBeVisible();
  });

  test('수정 모드에서 회고 입력창 비활성화', async ({ page }) => {
    // 수정 버튼 클릭
    await page.click('[data-testid="diary-edit-button"]');
    
    // 회고 입력창이 비활성화되었는지 확인
    await expect(page.locator('[data-testid="retrospect-input"]')).toBeDisabled();
    await expect(page.locator('[data-testid="retrospect-submit-button"]')).toBeDisabled();
  });

  test('일기 수정 후 저장', async ({ page }) => {
    // 수정 버튼 클릭
    await page.click('[data-testid="diary-edit-button"]');
    
    // 제목 수정
    await page.fill('[data-testid="diary-edit-title"]', '수정된 제목');
    
    // 감정 변경
    await page.selectOption('[data-testid="diary-edit-emotion"]', 'SAD');
    
    // 내용 수정
    await page.fill('[data-testid="diary-edit-content"]', '수정된 내용입니다.');
    
    // 수정하기 버튼 클릭
    await page.click('[data-testid="diary-edit-submit"]');
    
    // 수정 모드에서 일반 모드로 돌아갔는지 확인
    await expect(page.locator('[data-testid="diary-detail-title"]')).toHaveText('수정된 제목');
    await expect(page.locator('[data-testid="diary-detail-content"]')).toHaveText('수정된 내용입니다.');
    await expect(page.locator('[data-testid="diary-detail-emotion-text"]')).toHaveText('슬퍼요');
  });

  test('수정 취소 시 원래 내용으로 복원', async ({ page }) => {
    // 수정 버튼 클릭
    await page.click('[data-testid="diary-edit-button"]');
    
    // 제목 수정
    await page.fill('[data-testid="diary-edit-title"]', '수정된 제목');
    
    // 내용 수정
    await page.fill('[data-testid="diary-edit-content"]', '수정된 내용입니다.');
    
    // 취소 버튼 클릭
    await page.click('[data-testid="diary-edit-cancel"]');
    
    // 원래 내용으로 복원되었는지 확인
    await expect(page.locator('[data-testid="diary-detail-title"]')).toHaveText('테스트 일기');
    await expect(page.locator('[data-testid="diary-detail-content"]')).toHaveText('테스트 내용입니다.');
  });

  test('폼 검증 - 제목이 비어있을 때', async ({ page }) => {
    // 수정 버튼 클릭
    await page.click('[data-testid="diary-edit-button"]');
    
    // 제목을 비우기
    await page.fill('[data-testid="diary-edit-title"]', '');
    
    // 수정하기 버튼이 비활성화되었는지 확인
    await expect(page.locator('[data-testid="diary-edit-submit"]')).toBeDisabled();
  });

  test('폼 검증 - 내용이 비어있을 때', async ({ page }) => {
    // 수정 버튼 클릭
    await page.click('[data-testid="diary-edit-button"]');
    
    // 내용을 비우기
    await page.fill('[data-testid="diary-edit-content"]', '');
    
    // 수정하기 버튼이 비활성화되었는지 확인
    await expect(page.locator('[data-testid="diary-edit-submit"]')).toBeDisabled();
  });
});
