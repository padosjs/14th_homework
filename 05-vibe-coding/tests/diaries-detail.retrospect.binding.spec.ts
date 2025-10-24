import { test, expect } from "@playwright/test";

test.describe("일기 상세 페이지 회고 데이터 바인딩 테스트", () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 실제 데이터 저장
    await page.goto("/diaries");
    
    await page.evaluate(() => {
      // 일기 데이터 준비
      const diaries = [
        {
          id: 1,
          title: "첫 번째 일기",
          content: "첫 번째 일기 내용입니다.",
          emotion: "HAPPY",
          createdAt: "2024.07.12",
        },
        {
          id: 2,
          title: "두 번째 일기",
          content: "두 번째 일기 내용입니다.",
          emotion: "SAD",
          createdAt: "2024.07.13",
        },
        {
          id: 3,
          title: "세 번째 일기",
          content: "세 번째 일기 내용입니다.",
          emotion: "ANGRY",
          createdAt: "2024.07.14",
        },
      ];
      localStorage.setItem("diaries", JSON.stringify(diaries));
      
      // 회고 데이터 준비 (여러 일기에 대한 회고)
      const retrospects = [
        {
          id: 1,
          content: "첫 번째 일기의 첫 번째 회고",
          diaryId: 1,
          createdAt: "2024.07.15",
        },
        {
          id: 2,
          content: "첫 번째 일기의 두 번째 회고",
          diaryId: 1,
          createdAt: "2024.07.16",
        },
        {
          id: 3,
          content: "두 번째 일기의 첫 번째 회고",
          diaryId: 2,
          createdAt: "2024.07.17",
        },
        {
          id: 4,
          content: "세 번째 일기의 첫 번째 회고",
          diaryId: 3,
          createdAt: "2024.07.18",
        },
        {
          id: 5,
          content: "첫 번째 일기의 세 번째 회고",
          diaryId: 1,
          createdAt: "2024.07.19",
        },
      ];
      localStorage.setItem("retrospects", JSON.stringify(retrospects));
    });
  });

  test("성공시나리오: ID가 1인 일기의 회고만 필터링되어 표시됨", async ({ page }) => {
    // ID가 1인 일기 상세 페이지로 이동
    await page.goto("/diaries/1");
    
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 회고 아이템 개수 확인 (ID 1인 일기의 회고는 3개)
    const retrospectItems = page.locator('[data-testid="retrospect-item"]');
    await expect(retrospectItems).toHaveCount(3);
    
    // 각 회고의 내용 확인
    const firstRetrospect = retrospectItems.nth(0);
    await expect(firstRetrospect.locator('[data-testid="retrospect-content"]')).toHaveText("첫 번째 일기의 첫 번째 회고");
    await expect(firstRetrospect.locator('[data-testid="retrospect-date"]')).toHaveText("[2024.07.15]");
    
    const secondRetrospect = retrospectItems.nth(1);
    await expect(secondRetrospect.locator('[data-testid="retrospect-content"]')).toHaveText("첫 번째 일기의 두 번째 회고");
    await expect(secondRetrospect.locator('[data-testid="retrospect-date"]')).toHaveText("[2024.07.16]");
    
    const thirdRetrospect = retrospectItems.nth(2);
    await expect(thirdRetrospect.locator('[data-testid="retrospect-content"]')).toHaveText("첫 번째 일기의 세 번째 회고");
    await expect(thirdRetrospect.locator('[data-testid="retrospect-date"]')).toHaveText("[2024.07.19]");
  });

  test("성공시나리오: ID가 2인 일기의 회고만 필터링되어 표시됨", async ({ page }) => {
    // ID가 2인 일기 상세 페이지로 이동
    await page.goto("/diaries/2");
    
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 회고 아이템 개수 확인 (ID 2인 일기의 회고는 1개)
    const retrospectItems = page.locator('[data-testid="retrospect-item"]');
    await expect(retrospectItems).toHaveCount(1);
    
    // 회고의 내용 확인
    await expect(retrospectItems.locator('[data-testid="retrospect-content"]')).toHaveText("두 번째 일기의 첫 번째 회고");
    await expect(retrospectItems.locator('[data-testid="retrospect-date"]')).toHaveText("[2024.07.17]");
  });

  test("성공시나리오: ID가 3인 일기의 회고만 필터링되어 표시됨", async ({ page }) => {
    // ID가 3인 일기 상세 페이지로 이동
    await page.goto("/diaries/3");
    
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 회고 아이템 개수 확인 (ID 3인 일기의 회고는 1개)
    const retrospectItems = page.locator('[data-testid="retrospect-item"]');
    await expect(retrospectItems).toHaveCount(1);
    
    // 회고의 내용 확인
    await expect(retrospectItems.locator('[data-testid="retrospect-content"]')).toHaveText("세 번째 일기의 첫 번째 회고");
    await expect(retrospectItems.locator('[data-testid="retrospect-date"]')).toHaveText("[2024.07.18]");
  });

  test("성공시나리오: 회고가 없는 일기는 빈 목록을 표시함", async ({ page }) => {
    // 회고 데이터 초기화 (일기 1개만 회고 추가)
    await page.goto("/diaries");
    await page.evaluate(() => {
      const retrospects = [
        {
          id: 1,
          content: "첫 번째 일기의 회고",
          diaryId: 1,
          createdAt: "2024.07.15",
        },
      ];
      localStorage.setItem("retrospects", JSON.stringify(retrospects));
    });
    
    // ID가 2인 일기 상세 페이지로 이동 (회고 없음)
    await page.goto("/diaries/2");
    
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 회고 아이템이 없어야 함
    const retrospectItems = page.locator('[data-testid="retrospect-item"]');
    await expect(retrospectItems).toHaveCount(0);
  });

  test("성공시나리오: 로컬스토리지에 회고 데이터가 없으면 빈 목록을 표시함", async ({ page }) => {
    // 회고 데이터 제거
    await page.goto("/diaries");
    await page.evaluate(() => {
      localStorage.removeItem("retrospects");
    });
    
    // ID가 1인 일기 상세 페이지로 이동
    await page.goto("/diaries/1");
    
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 회고 아이템이 없어야 함
    const retrospectItems = page.locator('[data-testid="retrospect-item"]');
    await expect(retrospectItems).toHaveCount(0);
  });

  test("성공시나리오: 다른 일기로 이동하면 해당 일기의 회고만 표시됨", async ({ page }) => {
    // ID가 1인 일기 상세 페이지로 먼저 이동
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // ID 1의 회고 개수 확인
    let retrospectItems = page.locator('[data-testid="retrospect-item"]');
    await expect(retrospectItems).toHaveCount(3);
    
    // ID가 2인 일기로 이동
    await page.goto("/diaries/2");
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // ID 2의 회고 개수 확인 (1개만 있어야 함)
    retrospectItems = page.locator('[data-testid="retrospect-item"]');
    await expect(retrospectItems).toHaveCount(1);
    await expect(retrospectItems.locator('[data-testid="retrospect-content"]')).toHaveText("두 번째 일기의 첫 번째 회고");
  });
});

