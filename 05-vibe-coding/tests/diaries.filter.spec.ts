import { test, expect } from "@playwright/test";
import { Emotion, getEmotionLabel } from "@/commons/constants/enum";

test.describe("Diaries 필터 기능", () => {
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
            title: "놀란 하루",
            content: "오늘은 깜짝 놀랐다",
            emotion: "SURPRISE",
            createdAt: "2024-03-15T11:20:00.000Z",
          },
          {
            id: 5,
            title: "또 행복한 하루",
            content: "오늘도 행복했다",
            emotion: "HAPPY",
            createdAt: "2024-03-16T16:45:00.000Z",
          },
        ])
      );
    });
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');
  });

  test("필터 선택박스에 모든 emotion 옵션이 표시된다", async ({ page }) => {
    const selectbox = page.locator('select[data-testid="emotion-filter"]');
    
    // 옵션 텍스트 확인
    const options = await selectbox.locator("option").allTextContents();
    
    expect(options).toContain("전체");
    expect(options).toContain("행복해요");
    expect(options).toContain("슬퍼요");
    expect(options).toContain("놀랐어요");
    expect(options).toContain("화나요");
  });

  test("전체 필터 선택 시 모든 일기가 표시된다", async ({ page }) => {
    const selectbox = page.locator('select[data-testid="emotion-filter"]');
    await selectbox.selectOption("");

    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(5);
  });

  test("행복해요 필터 선택 시 HAPPY emotion 일기만 표시된다", async ({
    page,
  }) => {
    const selectbox = page.locator('select[data-testid="emotion-filter"]');
    await selectbox.selectOption("HAPPY");

    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(2);

    const emotions = await diaryCards
      .locator('[data-testid="diary-emotion"]')
      .allTextContents();
    expect(emotions.every((emotion) => emotion === "행복해요")).toBe(true);
  });

  test("슬퍼요 필터 선택 시 SAD emotion 일기만 표시된다", async ({
    page,
  }) => {
    const selectbox = page.locator('select[data-testid="emotion-filter"]');
    await selectbox.selectOption("SAD");

    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);

    const emotion = await diaryCards
      .first()
      .locator('[data-testid="diary-emotion"]')
      .textContent();
    expect(emotion).toBe("슬퍼요");
  });

  test("놀랐어요 필터 선택 시 SURPRISE emotion 일기만 표시된다", async ({
    page,
  }) => {
    const selectbox = page.locator('select[data-testid="emotion-filter"]');
    await selectbox.selectOption("SURPRISE");

    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);

    const emotion = await diaryCards
      .first()
      .locator('[data-testid="diary-emotion"]')
      .textContent();
    expect(emotion).toBe("놀랐어요");
  });

  test("화나요 필터 선택 시 ANGRY emotion 일기만 표시된다", async ({
    page,
  }) => {
    const selectbox = page.locator('select[data-testid="emotion-filter"]');
    await selectbox.selectOption("ANGRY");

    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);

    const emotion = await diaryCards
      .first()
      .locator('[data-testid="diary-emotion"]')
      .textContent();
    expect(emotion).toBe("화나요");
  });

  test("검색 후 필터를 적용하면 검색 결과 중에서 필터링된다", async ({
    page,
  }) => {
    // 먼저 "하루"로 검색 (3개 결과: 행복한 하루, 화가 나는 하루, 놀란 하루, 또 행복한 하루)
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill("하루");
    await searchInput.press("Enter");

    let diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(4);

    // 행복해요 필터 적용
    const selectbox = page.locator('select[data-testid="emotion-filter"]');
    await selectbox.selectOption("HAPPY");

    diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(2);

    const titles = await diaryCards
      .locator('[data-testid="diary-title"]')
      .allTextContents();
    expect(titles).toContain("행복한 하루");
    expect(titles).toContain("또 행복한 하루");
  });

  test("필터 적용 후 검색하면 필터가 유지된 상태로 검색된다", async ({
    page,
  }) => {
    // 먼저 행복해요 필터 적용
    const selectbox = page.locator('select[data-testid="emotion-filter"]');
    await selectbox.selectOption("HAPPY");

    let diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(2);

    // "하루"로 검색
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill("하루");
    await searchInput.press("Enter");

    diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(2);

    const titles = await diaryCards
      .locator('[data-testid="diary-title"]')
      .allTextContents();
    expect(titles).toContain("행복한 하루");
    expect(titles).toContain("또 행복한 하루");
  });

  test("필터를 전체로 변경하면 모든 일기가 다시 표시된다", async ({
    page,
  }) => {
    // 행복해요 필터 적용
    const selectbox = page.locator('select[data-testid="emotion-filter"]');
    await selectbox.selectOption("HAPPY");

    let diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(2);

    // 전체 필터로 변경
    await selectbox.selectOption("");

    diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(5);
  });
});

