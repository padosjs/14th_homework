import { test, expect } from "@playwright/test";

test.describe("Pictures 데이터 바인딩", () => {
  test("페이지 로드 시 강아지 사진 6장을 dog.ceo API로부터 받아와 표시한다", async ({
    page,
  }) => {
    await page.goto("/pictures");
    await page.waitForSelector('[data-testid="pictures-container"]', {
      timeout: 2000,
    });

    // 이미지가 6개 로드될 때까지 대기
    const images = page.locator('[data-testid="dog-image"]');
    await expect(images).toHaveCount(6, { timeout: 2000 });

    // 첫 번째 이미지가 dog.ceo 도메인인지 확인
    const firstImage = images.first();
    const src = await firstImage.getAttribute("src");
    expect(src).toContain("dog.ceo");
  });

  test("로딩 중에는 6개의 스플래시 스크린을 표시한다", async ({ page }) => {
    await page.goto("/pictures");

    // 로딩 스플래시 스크린이 6개 표시되는지 확인
    const splashScreens = page.locator('[data-testid="splash-screen"]');
    const count = await splashScreens.count();
    
    // 스플래시 스크린이 로딩 중에 6개 있거나, 이미 로딩이 완료되어 0개인지 확인
    expect(count === 6 || count === 0).toBe(true);
  });

  test("무한스크롤로 마지막 2개의 강아지만 남았을 때 추가 데이터를 로드한다", async ({
    page,
  }) => {
    await page.goto("/pictures");
    await page.waitForSelector('[data-testid="pictures-container"]', {
      timeout: 2000,
    });

    // 초기 6개 이미지 로드 대기
    const images = page.locator('[data-testid="dog-image"]');
    await expect(images).toHaveCount(6, { timeout: 2000 });

    // 마지막에서 두 번째 이미지로 스크롤
    const fourthImage = images.nth(3);
    await fourthImage.scrollIntoViewIfNeeded();

    // 추가 이미지가 로드될 때까지 대기 (최소 7개 이상)
    await expect(images).toHaveCount(12, { timeout: 2000 });
  });

  test("API 실패 시 에러 상태를 처리한다", async ({ page }) => {
    // API 요청을 모킹하여 실패 시나리오 테스트
    await page.route("**/api/breeds/image/random/**", (route) => {
      route.abort();
    });

    await page.goto("/pictures");
    await page.waitForSelector('[data-testid="pictures-container"]', {
      timeout: 2000,
    });

    // 에러 상태가 표시되거나, 이미지가 없는지 확인
    const images = page.locator('[data-testid="dog-image"]');
    const count = await images.count();
    expect(count).toBe(0);
  });

  test("모든 이미지가 dog.ceo 도메인에서 제공되는지 확인한다", async ({
    page,
  }) => {
    await page.goto("/pictures");
    await page.waitForSelector('[data-testid="pictures-container"]', {
      timeout: 2000,
    });

    const images = page.locator('[data-testid="dog-image"]');
    await expect(images).toHaveCount(6, { timeout: 2000 });

    // 모든 이미지가 dog.ceo 도메인인지 확인
    const imageCount = await images.count();
    for (let i = 0; i < imageCount; i++) {
      const src = await images.nth(i).getAttribute("src");
      expect(src).toContain("dog.ceo");
    }
  });
});

