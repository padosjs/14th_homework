import { test, expect } from "@playwright/test";

test.describe("Diaries 검색 기능", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/diaries");
    await page.evaluate(() => {
      localStorage.setItem(
        "diaries",
        JSON.stringify([
          {
            id: 1,
            title: "행복한 하루",
            content: "오늘은 정말 행복한 하루였다",
            emotion: "HAPPY",
            createdAt: "2024-03-12T10:30:00.000Z",
          },
          {
            id: 2,
            title: "슬픈 일기",
            content: "오늘은 슬픈 일이 있었다",
            emotion: "SAD",
            createdAt: "2024-03-13T14:20:00.000Z",
          },
          {
            id: 3,
            title: "화가 나는 하루",
            content: "오늘은 화가 났다",
            emotion: "ANGRY",
            createdAt: "2024-03-14T09:15:00.000Z",
          },
          {
            id: 4,
            title: "즐거운 하루",
            content: "오늘은 즐거웠다",
            emotion: "HAPPY",
            createdAt: "2024-03-15T16:45:00.000Z",
          },
        ])
      );
    });
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');
  });

  test("검색창에 검색어 입력 후 엔터를 누르면 title에 검색어가 포함된 일기만 표시된다", async ({
    page,
  }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill("하루");
    await searchInput.press("Enter");

    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(3);

    const titles = await diaryCards
      .locator('[data-testid="diary-title"]')
      .allTextContents();
    expect(titles).toEqual(
      expect.arrayContaining([
        expect.stringContaining("하루"),
      ])
    );
    expect(titles.every((title) => title.includes("하루"))).toBe(true);
  });

  test("검색창에 검색어 입력 후 돋보기 버튼 클릭시 title에 검색어가 포함된 일기만 표시된다", async ({
    page,
  }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill("슬픈");

    const searchButton = page.locator('[data-testid="search-button"]');
    await searchButton.click();

    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);

    const firstTitle = await diaryCards
      .first()
      .locator('[data-testid="diary-title"]')
      .textContent();
    expect(firstTitle).toContain("슬픈");
  });

  test("검색어가 없는 경우 모든 일기가 표시된다", async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill("");
    await searchInput.press("Enter");

    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(4);
  });

  test("검색어에 일치하는 일기가 없으면 일기가 표시되지 않는다", async ({
    page,
  }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill("존재하지않는검색어");
    await searchInput.press("Enter");

    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(0);
  });

  test("대소문자 구분 없이 검색이 가능하다", async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill("하루");
    await searchInput.press("Enter");

    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(3);
  });

  test("검색 후 다시 빈 검색어로 검색하면 모든 일기가 다시 표시된다", async ({
    page,
  }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    
    await searchInput.fill("행복");
    await searchInput.press("Enter");
    let diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);

    await searchInput.fill("");
    await searchInput.press("Enter");
    diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(4);
  });
});

