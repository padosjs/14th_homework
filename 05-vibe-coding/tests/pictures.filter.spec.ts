import { test, expect } from "@playwright/test";

test.describe("Pictures 필터 기능", () => {
  test("페이지 로드 시 기본 필터가 선택되어 있고 이미지가 640x640 사이즈로 표시된다", async ({
    page,
  }) => {
    await page.goto("/pictures");
    await page.waitForSelector('[data-testid="pictures-container"]', {
      timeout: 2000,
    });

    // 이미지가 로드될 때까지 대기
    const images = page.locator('[data-testid="dog-image"]');
    await expect(images).toHaveCount(6, { timeout: 2000 });

    // 첫 번째 이미지의 사이즈가 640x640인지 확인
    const firstImage = images.first();
    const width = await firstImage.getAttribute("width");
    const height = await firstImage.getAttribute("height");
    
    expect(width).toBe("640");
    expect(height).toBe("640");
  });

  test("가로형 필터 선택 시 이미지가 640x480 사이즈로 변경된다", async ({
    page,
  }) => {
    await page.goto("/pictures");
    await page.waitForSelector('[data-testid="pictures-container"]', {
      timeout: 2000,
    });

    // 이미지가 로드될 때까지 대기
    const images = page.locator('[data-testid="dog-image"]');
    await expect(images).toHaveCount(6, { timeout: 2000 });

    // 필터 선택박스 찾기 (select 태그에 data-testid가 적용됨)
    const selectbox = page.locator('select[data-testid="filter-selectbox"]');
    await selectbox.selectOption("landscape");

    // 이미지 사이즈가 변경되었는지 확인
    const firstImage = images.first();
    const width = await firstImage.getAttribute("width");
    const height = await firstImage.getAttribute("height");
    
    expect(width).toBe("640");
    expect(height).toBe("480");
  });

  test("세로형 필터 선택 시 이미지가 480x640 사이즈로 변경된다", async ({
    page,
  }) => {
    await page.goto("/pictures");
    await page.waitForSelector('[data-testid="pictures-container"]', {
      timeout: 2000,
    });

    // 이미지가 로드될 때까지 대기
    const images = page.locator('[data-testid="dog-image"]');
    await expect(images).toHaveCount(6, { timeout: 2000 });

    // 필터 선택박스 찾기 (select 태그에 data-testid가 적용됨)
    const selectbox = page.locator('select[data-testid="filter-selectbox"]');
    await selectbox.selectOption("portrait");

    // 이미지 사이즈가 변경되었는지 확인
    const firstImage = images.first();
    const width = await firstImage.getAttribute("width");
    const height = await firstImage.getAttribute("height");
    
    expect(width).toBe("480");
    expect(height).toBe("640");
  });

  test("필터 변경 시 모든 이미지의 사이즈가 동일하게 변경된다", async ({
    page,
  }) => {
    await page.goto("/pictures");
    await page.waitForSelector('[data-testid="pictures-container"]', {
      timeout: 2000,
    });

    // 이미지가 로드될 때까지 대기
    const images = page.locator('[data-testid="dog-image"]');
    await expect(images).toHaveCount(6, { timeout: 2000 });

    // 가로형 필터 선택 (select 태그에 data-testid가 적용됨)
    const selectbox = page.locator('select[data-testid="filter-selectbox"]');
    await selectbox.selectOption("landscape");

    // 모든 이미지가 640x480인지 확인
    const imageCount = await images.count();
    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i);
      const width = await image.getAttribute("width");
      const height = await image.getAttribute("height");
      
      expect(width).toBe("640");
      expect(height).toBe("480");
    }
  });

  test("필터 변경 후 기본 필터로 다시 선택 시 640x640으로 복원된다", async ({
    page,
  }) => {
    await page.goto("/pictures");
    await page.waitForSelector('[data-testid="pictures-container"]', {
      timeout: 2000,
    });

    // 이미지가 로드될 때까지 대기
    const images = page.locator('[data-testid="dog-image"]');
    await expect(images).toHaveCount(6, { timeout: 2000 });

    // 가로형 필터 선택 (select 태그에 data-testid가 적용됨)
    const selectbox = page.locator('select[data-testid="filter-selectbox"]');
    await selectbox.selectOption("landscape");

    // 다시 기본 필터 선택
    await selectbox.selectOption("default");

    // 이미지가 640x640으로 복원되었는지 확인
    const firstImage = images.first();
    const width = await firstImage.getAttribute("width");
    const height = await firstImage.getAttribute("height");
    
    expect(width).toBe("640");
    expect(height).toBe("640");
  });
});

