import { test, expect } from "@playwright/test";

test.describe("DiariesNew 폼 등록 기능", () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화
    await page.goto("/diaries");
    await page.evaluate(() => {
      localStorage.removeItem("diaries");
    });

    // /diaries 페이지로 이동
    await page.goto("/diaries");

    // 페이지 로드 대기 - data-testid로 식별
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 일기쓰기 버튼 클릭
    await page.click('[data-testid="write-diary-button"]');

    // 일기쓰기 모달이 열릴 때까지 대기
    await page.waitForSelector('[data-testid="diary-modal"]');
  });

  test("모든 필드를 입력하면 등록하기 버튼이 활성화된다", async ({ page }) => {
    // 초기 상태에서 등록하기 버튼은 비활성화되어 있어야 함
    const submitButton = page.locator('[data-testid="submit-diary-button"]');
    await expect(submitButton).toBeDisabled();

    // 감정 선택 (기본값 HAPPY가 이미 선택되어 있음)
    
    // 제목 입력
    await page.fill('[data-testid="diary-title-input"]', "테스트 일기 제목");

    // 내용 입력
    await page.fill('[data-testid="diary-content-textarea"]', "테스트 일기 내용입니다.");

    // 등록하기 버튼이 활성화되었는지 확인
    await expect(submitButton).toBeEnabled();
  });

  test("등록하기 버튼 클릭 시 로컬스토리지에 데이터가 저장된다", async ({ page }) => {
    // 제목 입력
    await page.fill('[data-testid="diary-title-input"]', "첫 번째 일기");

    // 내용 입력
    await page.fill('[data-testid="diary-content-textarea"]', "첫 번째 일기 내용입니다.");

    // 등록하기 버튼 클릭
    await page.click('[data-testid="submit-diary-button"]');

    // 로컬스토리지에 데이터가 저장되었는지 확인
    const diaries = await page.evaluate(() => {
      const data = localStorage.getItem("diaries");
      return data ? JSON.parse(data) : null;
    });

    expect(diaries).not.toBeNull();
    expect(diaries).toHaveLength(1);
    expect(diaries[0]).toMatchObject({
      id: 1,
      title: "첫 번째 일기",
      content: "첫 번째 일기 내용입니다.",
      emotion: "HAPPY",
    });
    expect(diaries[0].createdAt).toBeDefined();
  });

  test("기존 데이터가 있을 때 새로운 일기를 추가하면 id가 증가한다", async ({ page }) => {
    // 첫 번째 일기 등록
    await page.fill('[data-testid="diary-title-input"]', "첫 번째 일기");
    await page.fill('[data-testid="diary-content-textarea"]', "첫 번째 일기 내용");
    await page.click('[data-testid="submit-diary-button"]');

    // 등록완료 모달 대기
    await page.waitForSelector('[data-testid="modal"]');
    
    // 확인 버튼 클릭하여 상세페이지로 이동
    await page.click('[data-testid="modal-confirm-button"]');

    // 다시 일기 목록으로 이동
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 일기쓰기 버튼 클릭
    await page.click('[data-testid="write-diary-button"]');
    await page.waitForSelector('[data-testid="diary-modal"]');

    // 두 번째 일기 등록
    await page.fill('[data-testid="diary-title-input"]', "두 번째 일기");
    await page.fill('[data-testid="diary-content-textarea"]', "두 번째 일기 내용");
    await page.click('[data-testid="submit-diary-button"]');

    // 로컬스토리지 확인
    const diaries = await page.evaluate(() => {
      const data = localStorage.getItem("diaries");
      return data ? JSON.parse(data) : null;
    });

    expect(diaries).toHaveLength(2);
    expect(diaries[1].id).toBe(2);
    expect(diaries[1].title).toBe("두 번째 일기");
  });

  test("등록 완료 후 등록완료 모달이 표시된다", async ({ page }) => {
    // 제목 입력
    await page.fill('[data-testid="diary-title-input"]', "테스트 일기");

    // 내용 입력
    await page.fill('[data-testid="diary-content-textarea"]', "테스트 일기 내용");

    // 등록하기 버튼 클릭
    await page.click('[data-testid="submit-diary-button"]');

    // 등록완료 모달이 나타나는지 확인
    const successModal = page.locator('[data-testid="modal"]');
    await expect(successModal).toBeVisible();

    // 모달 제목 확인
    const modalTitle = page.locator('[data-testid="modal-title"]');
    await expect(modalTitle).toHaveText("등록이 완료되었습니다");

    // 확인 버튼 확인
    const confirmButton = page.locator('[data-testid="modal-confirm-button"]');
    await expect(confirmButton).toBeVisible();
    await expect(confirmButton).toHaveText("확인");
  });

  test("등록완료 모달의 확인 버튼 클릭 시 상세페이지로 이동하고 모든 모달이 닫힌다", async ({ page }) => {
    // 제목 입력
    await page.fill('[data-testid="diary-title-input"]', "상세페이지 테스트");

    // 내용 입력
    await page.fill('[data-testid="diary-content-textarea"]', "상세페이지로 이동 테스트");

    // 등록하기 버튼 클릭
    await page.click('[data-testid="submit-diary-button"]');

    // 등록완료 모달 대기
    await page.waitForSelector('[data-testid="modal"]');

    // 확인 버튼 클릭
    await page.click('[data-testid="modal-confirm-button"]');

    // URL이 상세페이지로 변경되었는지 확인 (/diaries/1)
    await page.waitForURL(/\/diaries\/\d+/);
    expect(page.url()).toMatch(/\/diaries\/1$/);

    // 모든 모달이 닫혔는지 확인
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).not.toBeVisible();

    const diaryModal = page.locator('[data-testid="diary-modal"]');
    await expect(diaryModal).not.toBeVisible();
  });

  test("감정을 변경하고 등록하면 선택한 감정으로 저장된다", async ({ page }) => {
    // SAD 감정 선택
    await page.click('input[type="radio"][value="SAD"]');

    // 제목 입력
    await page.fill('[data-testid="diary-title-input"]', "슬픈 일기");

    // 내용 입력
    await page.fill('[data-testid="diary-content-textarea"]', "오늘은 슬펐어요.");

    // 등록하기 버튼 클릭
    await page.click('[data-testid="submit-diary-button"]');

    // 로컬스토리지 확인
    const diaries = await page.evaluate(() => {
      const data = localStorage.getItem("diaries");
      return data ? JSON.parse(data) : null;
    });

    expect(diaries[0].emotion).toBe("SAD");
  });
});

