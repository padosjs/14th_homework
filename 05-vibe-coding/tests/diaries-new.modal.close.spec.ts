import { test, expect } from "@playwright/test";

test.describe("DiariesNew 모달 닫기 기능", () => {
  test.beforeEach(async ({ page }) => {
    // /diaries 페이지로 이동
    await page.goto("/diaries");

    // 페이지 로드 대기 - data-testid로 식별
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 일기쓰기 버튼 클릭
    await page.click('[data-testid="write-diary-button"]');

    // 일기쓰기 모달이 열릴 때까지 대기
    await page.waitForSelector('[data-testid="diary-modal"]');
  });

  test("닫기 버튼 클릭 시 등록취소 모달이 열린다", async ({ page }) => {
    // 닫기 버튼 클릭
    await page.click('[data-testid="close-modal-button"]');

    // 등록취소 모달이 나타나는지 확인
    const cancelModal = page.locator('[data-testid="modal"]');
    await expect(cancelModal).toBeVisible();

    // 모달 제목이 올바른지 확인
    const modalTitle = page.locator('[data-testid="modal-title"]');
    await expect(modalTitle).toHaveText("등록을 취소하시겠습니까?");

    // 모달 설명이 올바른지 확인
    const modalDescription = page.locator('[data-testid="modal-description"]');
    await expect(modalDescription).toHaveText(
      "작성 중인 내용은 저장되지 않습니다."
    );

    // 두 개의 버튼이 있는지 확인
    const confirmButton = page.locator('[data-testid="modal-confirm-button"]');
    const cancelButton = page.locator('[data-testid="modal-cancel-button"]');
    await expect(confirmButton).toBeVisible();
    await expect(cancelButton).toBeVisible();
    await expect(confirmButton).toHaveText("등록취소");
    await expect(cancelButton).toHaveText("계속작성");
  });

  test("계속작성 버튼 클릭 시 등록취소 모달만 닫힌다", async ({ page }) => {
    // 닫기 버튼 클릭하여 등록취소 모달 열기
    await page.click('[data-testid="close-modal-button"]');
    await page.waitForSelector('[data-testid="modal"]');

    // 계속작성 버튼 클릭
    await page.click('[data-testid="modal-cancel-button"]');

    // 등록취소 모달이 닫혔는지 확인
    const cancelModal = page.locator('[data-testid="modal"]');
    await expect(cancelModal).not.toBeVisible();

    // 일기쓰기 모달은 여전히 열려있는지 확인
    const diaryModal = page.locator('[data-testid="diary-modal"]');
    await expect(diaryModal).toBeVisible();
  });

  test("등록취소 버튼 클릭 시 모든 모달이 닫힌다", async ({ page }) => {
    // 닫기 버튼 클릭하여 등록취소 모달 열기
    await page.click('[data-testid="close-modal-button"]');
    await page.waitForSelector('[data-testid="modal"]');

    // 등록취소 버튼 클릭
    await page.click('[data-testid="modal-confirm-button"]');

    // 등록취소 모달이 닫혔는지 확인
    const cancelModal = page.locator('[data-testid="modal"]');
    await expect(cancelModal).not.toBeVisible();

    // 일기쓰기 모달도 닫혔는지 확인
    const diaryModal = page.locator('[data-testid="diary-modal"]');
    await expect(diaryModal).not.toBeVisible();
  });

  test("dim 영역 클릭 시 등록취소 모달이 열린다", async ({ page }) => {
    // modalWrapper 밖의 빈 공간(좌측 상단)을 클릭 - dim 영역 클릭 효과
    await page.mouse.click(10, 10);

    // 등록취소 모달이 나타나는지 확인
    const cancelModal = page.locator('[data-testid="modal"]');
    await expect(cancelModal).toBeVisible();

    // 모달 제목이 올바른지 확인
    const modalTitle = page.locator('[data-testid="modal-title"]');
    await expect(modalTitle).toHaveText("등록을 취소하시겠습니까?");
  });
});

