import { test, expect } from "@playwright/test";

test.describe("일기 카드 라우팅 테스트", () => {
  test.beforeEach(async ({ page }) => {
    // 실제 데이터로 로컬스토리지 설정
    await page.goto("/diaries");
    
    await page.evaluate(() => {
      const diaries = [
        {
          id: 1,
          title: "테스트 일기 1",
          content: "테스트 내용 1",
          emotion: "HAPPY",
          createdAt: "2024-01-01",
        },
        {
          id: 2,
          title: "테스트 일기 2",
          content: "테스트 내용 2",
          emotion: "SAD",
          createdAt: "2024-01-02",
        },
      ];
      localStorage.setItem("diaries", JSON.stringify(diaries));
    });

    // 페이지 새로고침하여 로컬스토리지 데이터 적용
    await page.reload();
    
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diaries-container"]');
  });

  test("일기 카드 클릭 시 상세 페이지로 이동", async ({ page }) => {
    // 첫 번째 일기 카드 클릭
    const firstCard = page.locator('[data-testid="diary-card"]').first();
    await firstCard.click();

    // URL이 /diaries/1로 변경되었는지 확인
    await expect(page).toHaveURL("/diaries/1");
  });

  test("삭제 아이콘 클릭 시 페이지 이동하지 않음", async ({ page }) => {
    // 현재 URL 저장
    const currentUrl = page.url();

    // 삭제 아이콘 클릭
    const deleteIcon = page.locator('[data-testid="diary-delete-icon"]').first();
    await deleteIcon.click();

    // URL이 변경되지 않았는지 확인 (잠시 대기 후 확인)
    await page.waitForTimeout(200);
    expect(page.url()).toBe(currentUrl);
  });

  test("여러 개의 일기 카드 클릭 시 각각 올바른 상세 페이지로 이동", async ({ page }) => {
    // 두 번째 일기 카드 클릭
    const secondCard = page.locator('[data-testid="diary-card"]').nth(1);
    await secondCard.click();

    // URL이 /diaries/2로 변경되었는지 확인
    await expect(page).toHaveURL("/diaries/2");
  });
});

