import { test, expect } from "@playwright/test";

test.describe("일기 상세 페이지 데이터 바인딩 테스트", () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 실제 데이터 저장
    await page.goto("/diaries");
    
    await page.evaluate(() => {
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
          content: "두 번째 일기 내용입니다. 두 번째 일기 내용입니다.",
          emotion: "SAD",
          createdAt: "2024.07.13",
        },
        {
          id: 3,
          title: "세 번째 일기",
          content: "세 번째 일기 내용입니다. 세 번째 일기 내용입니다. 세 번째 일기 내용입니다.",
          emotion: "ANGRY",
          createdAt: "2024.07.14",
        },
      ];
      localStorage.setItem("diaries", JSON.stringify(diaries));
    });
  });

  test("성공시나리오: ID가 1인 일기 상세 페이지에서 실제 데이터가 올바르게 표시됨", async ({ page }) => {
    // ID가 1인 일기 상세 페이지로 이동
    await page.goto("/diaries/1");
    
    // 페이지가 완전히 로드될 때까지 대기 (고정식별자 data-testid 대기)
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 제목 확인
    const title = await page.locator('[data-testid="diary-detail-title"]').textContent();
    expect(title).toBe("첫 번째 일기");
    
    // 감정 텍스트 확인
    const emotionText = await page.locator('[data-testid="diary-detail-emotion-text"]').textContent();
    expect(emotionText).toBe("행복해요");
    
    // 작성일 확인
    const date = await page.locator('[data-testid="diary-detail-date"]').textContent();
    expect(date).toBe("2024.07.12");
    
    // 내용 확인
    const content = await page.locator('[data-testid="diary-detail-content"]').textContent();
    expect(content).toBe("첫 번째 일기 내용입니다.");
  });

  test("성공시나리오: ID가 2인 일기 상세 페이지에서 실제 데이터가 올바르게 표시됨", async ({ page }) => {
    // ID가 2인 일기 상세 페이지로 이동
    await page.goto("/diaries/2");
    
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 제목 확인
    const title = await page.locator('[data-testid="diary-detail-title"]').textContent();
    expect(title).toBe("두 번째 일기");
    
    // 감정 텍스트 확인
    const emotionText = await page.locator('[data-testid="diary-detail-emotion-text"]').textContent();
    expect(emotionText).toBe("슬퍼요");
    
    // 작성일 확인
    const date = await page.locator('[data-testid="diary-detail-date"]').textContent();
    expect(date).toBe("2024.07.13");
    
    // 내용 확인
    const content = await page.locator('[data-testid="diary-detail-content"]').textContent();
    expect(content).toBe("두 번째 일기 내용입니다. 두 번째 일기 내용입니다.");
  });

  test("성공시나리오: ID가 3인 일기 상세 페이지에서 실제 데이터가 올바르게 표시됨", async ({ page }) => {
    // ID가 3인 일기 상세 페이지로 이동
    await page.goto("/diaries/3");
    
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 제목 확인
    const title = await page.locator('[data-testid="diary-detail-title"]').textContent();
    expect(title).toBe("세 번째 일기");
    
    // 감정 텍스트 확인
    const emotionText = await page.locator('[data-testid="diary-detail-emotion-text"]').textContent();
    expect(emotionText).toBe("화나요");
    
    // 작성일 확인
    const date = await page.locator('[data-testid="diary-detail-date"]').textContent();
    expect(date).toBe("2024.07.14");
    
    // 내용 확인
    const content = await page.locator('[data-testid="diary-detail-content"]').textContent();
    expect(content).toBe("세 번째 일기 내용입니다. 세 번째 일기 내용입니다. 세 번째 일기 내용입니다.");
  });

  test("실패시나리오: 존재하지 않는 ID의 일기를 조회하면 데이터가 표시되지 않음", async ({ page }) => {
    // 존재하지 않는 ID로 이동
    await page.goto("/diaries/999");
    
    // 페이지가 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diary-detail-wrapper"]');
    
    // 제목이 빈 문자열이거나 표시되지 않음
    const title = await page.locator('[data-testid="diary-detail-title"]').textContent();
    expect(title).toBe("");
  });
});

