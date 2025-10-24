import { test, expect } from "@playwright/test";

test.describe("일기 상세 페이지 회고 등록 기능", () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화 및 테스트 데이터 준비
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
      ];
      localStorage.setItem("diaries", JSON.stringify(diaries));
      
      // 회고 데이터 초기화
      localStorage.removeItem("retrospects");
    });
  });

  test("성공시나리오: 회고 입력이 없으면 입력 버튼이 비활성화된다", async ({ page }) => {
    // ID가 1인 일기 상세 페이지로 이동
    await page.goto("/diaries/1");
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 입력 버튼이 비활성화 상태인지 확인
    const submitButton = page.locator('[data-testid="retrospect-submit-button"]');
    await expect(submitButton).toBeDisabled();
  });

  test("성공시나리오: 회고 입력이 있으면 입력 버튼이 활성화된다", async ({ page }) => {
    // ID가 1인 일기 상세 페이지로 이동
    await page.goto("/diaries/1");
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 회고 입력
    await page.fill('[data-testid="retrospect-input"]', "3년이 지나고 다시 보니 이때가 그립다.");
    
    // 입력 버튼이 활성화 상태인지 확인
    const submitButton = page.locator('[data-testid="retrospect-submit-button"]');
    await expect(submitButton).toBeEnabled();
  });

  test("성공시나리오: 첫 회고 등록 시 로컬스토리지에 id 1로 저장된다", async ({ page }) => {
    // ID가 1인 일기 상세 페이지로 이동
    await page.goto("/diaries/1");
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 회고 입력
    const retrospectContent = "첫 번째 회고입니다.";
    await page.fill('[data-testid="retrospect-input"]', retrospectContent);
    
    // 등록하기 버튼 클릭
    await page.click('[data-testid="retrospect-submit-button"]');
    
    // 페이지 새로고침 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 로컬스토리지 확인
    const retrospects = await page.evaluate(() => {
      const data = localStorage.getItem("retrospects");
      return data ? JSON.parse(data) : null;
    });
    
    expect(retrospects).not.toBeNull();
    expect(retrospects).toHaveLength(1);
    expect(retrospects[0]).toMatchObject({
      id: 1,
      content: retrospectContent,
      diaryId: 1,
    });
    expect(retrospects[0].createdAt).toBeDefined();
  });

  test("성공시나리오: 기존 회고가 있을 때 새로운 회고를 추가하면 id가 증가한다", async ({ page }) => {
    // 기존 회고 데이터 설정
    await page.goto("/diaries/1");
    await page.evaluate(() => {
      const existingRetrospects = [
        {
          id: 1,
          content: "첫 번째 회고",
          diaryId: 1,
          createdAt: "2024.07.15",
        },
        {
          id: 2,
          content: "두 번째 회고",
          diaryId: 2,
          createdAt: "2024.07.16",
        },
      ];
      localStorage.setItem("retrospects", JSON.stringify(existingRetrospects));
    });
    
    // 페이지 새로고침하여 기존 데이터 로드
    await page.reload();
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 새 회고 입력
    const newRetrospectContent = "세 번째 회고입니다.";
    await page.fill('[data-testid="retrospect-input"]', newRetrospectContent);
    
    // 등록하기 버튼 클릭
    await page.click('[data-testid="retrospect-submit-button"]');
    
    // 페이지 새로고침 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 로컬스토리지 확인
    const retrospects = await page.evaluate(() => {
      const data = localStorage.getItem("retrospects");
      return data ? JSON.parse(data) : null;
    });
    
    expect(retrospects).toHaveLength(3);
    expect(retrospects[2]).toMatchObject({
      id: 3,
      content: newRetrospectContent,
      diaryId: 1,
    });
  });

  test("성공시나리오: 등록 완료 후 입력 필드가 초기화되고 페이지가 새로고침된다", async ({ page }) => {
    // ID가 1인 일기 상세 페이지로 이동
    await page.goto("/diaries/1");
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 회고 입력
    await page.fill('[data-testid="retrospect-input"]', "테스트 회고입니다.");
    
    // 등록하기 버튼 클릭
    await page.click('[data-testid="retrospect-submit-button"]');
    
    // 페이지 새로고침 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 입력 필드가 초기화되었는지 확인
    const inputValue = await page.locator('[data-testid="retrospect-input"]').inputValue();
    expect(inputValue).toBe("");
    
    // 입력 버튼이 다시 비활성화되었는지 확인
    const submitButton = page.locator('[data-testid="retrospect-submit-button"]');
    await expect(submitButton).toBeDisabled();
  });

  test("성공시나리오: 다른 일기에 회고를 등록하면 해당 일기의 diaryId로 저장된다", async ({ page }) => {
    // ID가 2인 일기 상세 페이지로 이동
    await page.goto("/diaries/2");
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 회고 입력
    const retrospectContent = "두 번째 일기의 회고입니다.";
    await page.fill('[data-testid="retrospect-input"]', retrospectContent);
    
    // 등록하기 버튼 클릭
    await page.click('[data-testid="retrospect-submit-button"]');
    
    // 페이지 새로고침 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 로컬스토리지 확인
    const retrospects = await page.evaluate(() => {
      const data = localStorage.getItem("retrospects");
      return data ? JSON.parse(data) : null;
    });
    
    expect(retrospects).not.toBeNull();
    expect(retrospects[0]).toMatchObject({
      content: retrospectContent,
      diaryId: 2,
    });
  });
});

