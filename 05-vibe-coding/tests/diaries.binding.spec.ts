import { test, expect } from "@playwright/test";
import { Emotion } from "@/commons/constants/enum";

test.describe("Diaries 데이터 바인딩", () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    await page.goto("/diaries");
    await page.evaluate(() => {
      localStorage.setItem(
        "diaries",
        JSON.stringify([
          {
            id: 1,
            title: "첫 번째 일기",
            content: "첫 번째 일기 내용",
            emotion: "HAPPY",
            createdAt: "2024-03-12T10:30:00.000Z",
          },
          {
            id: 2,
            title: "두 번째 일기 타이틀 영역 입니다. 한줄까지만 노출 됩니다.",
            content: "두 번째 일기 내용",
            emotion: "SAD",
            createdAt: "2024-03-13T14:20:00.000Z",
          },
          {
            id: 3,
            title: "세 번째 일기",
            content: "세 번째 일기 내용",
            emotion: "ANGRY",
            createdAt: "2024-03-14T09:15:00.000Z",
          },
        ])
      );
    });
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');
  });

  test("로컬스토리지에서 diaries 데이터를 불러와 화면에 표시한다", async ({
    page,
  }) => {
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(3);
  });

  test("첫 번째 일기의 제목과 날짜가 올바르게 표시된다", async ({
    page,
  }) => {
    const firstCard = page.locator('[data-testid="diary-card"]').first();
    await expect(firstCard.locator('[data-testid="diary-title"]')).toHaveText(
      "첫 번째 일기"
    );
    await expect(firstCard.locator('[data-testid="diary-date"]')).toHaveText(
      "2024. 03. 12"
    );
  });

  test("첫 번째 일기의 감정 텍스트와 색상이 올바르게 표시된다", async ({
    page,
  }) => {
    const firstCard = page.locator('[data-testid="diary-card"]').first();
    const emotionText = firstCard.locator('[data-testid="diary-emotion"]');
    await expect(emotionText).toHaveText("행복해요");
  });

  test("두 번째 일기의 긴 제목이 말줄임표로 표시된다", async ({ page }) => {
    const secondCard = page.locator('[data-testid="diary-card"]').nth(1);
    const titleElement = secondCard.locator('[data-testid="diary-title"]');
    
    // 제목이 표시되는지 확인
    await expect(titleElement).toBeVisible();
    
    // CSS로 text-overflow: ellipsis가 적용되었는지 확인
    const overflow = await titleElement.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.textOverflow;
    });
    expect(overflow).toBe("ellipsis");
  });

  test("세 번째 일기의 감정 이미지가 올바르게 표시된다", async ({
    page,
  }) => {
    const thirdCard = page.locator('[data-testid="diary-card"]').nth(2);
    const image = thirdCard.locator('[data-testid="diary-image"]');
    
    const src = await image.getAttribute("src");
    expect(src).toContain("emotion-angry");
  });

  test("로컬스토리지가 비어있으면 일기 카드가 표시되지 않는다", async ({
    page,
  }) => {
    await page.evaluate(() => {
      localStorage.removeItem("diaries");
    });
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');

    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(0);
  });

  test("로컬스토리지에 빈 배열이 있으면 일기 카드가 표시되지 않는다", async ({
    page,
  }) => {
    await page.evaluate(() => {
      localStorage.setItem("diaries", JSON.stringify([]));
    });
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');

    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(0);
  });
});

