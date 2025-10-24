import { test, expect } from '@playwright/test';

test.describe('일기 삭제 기능', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    const testDiaries = [
      {
        id: 1,
        title: '테스트 일기 1',
        content: '테스트 내용 1',
        emotion: 'HAPPY',
        createdAt: '2024. 07. 12'
      },
      {
        id: 2,
        title: '테스트 일기 2',
        content: '테스트 내용 2',
        emotion: 'SAD',
        createdAt: '2024. 07. 13'
      }
    ];
    
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
  });

  test('삭제 버튼 클릭 시 삭제 모달이 노출되는지 확인', async ({ page }) => {
    await page.goto('/diaries/1');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 삭제 버튼 클릭
    await page.click('[data-testid="diary-delete-button"]');
    
    // 삭제 모달이 노출되는지 확인
    await expect(page.locator('[data-testid="delete-modal"]')).toBeVisible();
    await expect(page.locator('[data-testid="delete-modal-title"]')).toHaveText('일기 삭제');
    await expect(page.locator('[data-testid="delete-modal-message"]')).toHaveText('일기를 삭제 하시겠어요?');
  });

  test('삭제 모달에서 취소 버튼 클릭 시 모달이 닫히는지 확인', async ({ page }) => {
    await page.goto('/diaries/1');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 삭제 버튼 클릭
    await page.click('[data-testid="diary-delete-button"]');
    
    // 모달 노출 확인
    await expect(page.locator('[data-testid="delete-modal"]')).toBeVisible();
    
    // 취소 버튼 클릭
    await page.click('[data-testid="delete-modal-cancel"]');
    
    // 모달이 닫히는지 확인
    await expect(page.locator('[data-testid="delete-modal"]')).not.toBeVisible();
  });

  test('삭제 모달에서 삭제 버튼 클릭 시 일기가 삭제되고 목록 페이지로 이동하는지 확인', async ({ page }) => {
    await page.goto('/diaries/1');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 삭제 버튼 클릭
    await page.click('[data-testid="diary-delete-button"]');
    
    // 모달 노출 확인
    await expect(page.locator('[data-testid="delete-modal"]')).toBeVisible();
    
    // 삭제 버튼 클릭
    await page.click('[data-testid="delete-modal-delete"]');
    
    // 목록 페이지로 이동하는지 확인
    await expect(page).toHaveURL('/diaries');
    
    // 로컬스토리지에서 해당 일기가 삭제되었는지 확인
    const remainingDiaries = await page.evaluate(() => {
      const diaries = localStorage.getItem('diaries');
      return diaries ? JSON.parse(diaries) : [];
    });
    
    expect(remainingDiaries).toHaveLength(1);
    expect(remainingDiaries[0].id).toBe(2);
  });

  test('삭제 후 목록 페이지에서 삭제된 일기가 보이지 않는지 확인', async ({ page }) => {
    await page.goto('/diaries/1');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 삭제 버튼 클릭
    await page.click('[data-testid="diary-delete-button"]');
    
    // 모달 노출 확인
    await expect(page.locator('[data-testid="delete-modal"]')).toBeVisible();
    
    // 삭제 버튼 클릭
    await page.click('[data-testid="delete-modal-delete"]');
    
    // 목록 페이지로 이동하는지 확인
    await expect(page).toHaveURL('/diaries');
    
    // 목록 페이지에서 삭제된 일기가 보이지 않는지 확인
    await page.waitForSelector('[data-testid="diaries-list-wrapper"]');
    
    // 삭제된 일기(id: 1)가 목록에 없는지 확인
    const diaryItems = await page.locator('[data-testid^="diary-item-"]').count();
    expect(diaryItems).toBe(1); // 남은 일기는 1개만 있어야 함
  });
});
