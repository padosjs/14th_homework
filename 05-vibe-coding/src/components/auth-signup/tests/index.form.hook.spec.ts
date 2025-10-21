import { test, expect } from '@playwright/test';

test.describe('회원가입 폼 기능 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/signup');
    await page.waitForSelector('[data-testid="signup-form"]');
  });

  test('모든 인풋이 입력되면 회원가입 버튼이 활성화된다', async ({ page }) => {
    const timestamp = Date.now();
    const email = `test${timestamp}@test.com`;
    
    // 초기 상태에서 버튼은 비활성화
    const submitButton = page.locator('[data-testid="signup-submit-button"]');
    await expect(submitButton).toBeDisabled();

    // 이메일 입력
    await page.locator('[data-testid="signup-email-input"]').fill(email);
    await expect(submitButton).toBeDisabled();

    // 비밀번호 입력
    await page.locator('[data-testid="signup-password-input"]').fill('test1234');
    await expect(submitButton).toBeDisabled();

    // 비밀번호 확인 입력
    await page.locator('[data-testid="signup-password-confirm-input"]').fill('test1234');
    await expect(submitButton).toBeDisabled();

    // 이름 입력
    await page.locator('[data-testid="signup-name-input"]').fill('테스트');
    
    // 모든 필드가 입력되면 버튼 활성화
    await expect(submitButton).not.toBeDisabled();
  });

  test('회원가입에 성공하면 가입완료 모달이 표시되고 확인 클릭 시 로그인 페이지로 이동한다', async ({ page }) => {
    const timestamp = Date.now();
    const email = `test${timestamp}@test.com`;

    // API 응답 감지 및 _id 검증
    const responsePromise = page.waitForResponse(
      response => response.url().includes('graphql') && response.status() === 200,
      { timeout: 2000 }
    );

    // 폼 입력
    await page.locator('[data-testid="signup-email-input"]').fill(email);
    await page.locator('[data-testid="signup-password-input"]').fill('test1234');
    await page.locator('[data-testid="signup-password-confirm-input"]').fill('test1234');
    await page.locator('[data-testid="signup-name-input"]').fill('테스트');

    // 회원가입 버튼 클릭
    await page.locator('[data-testid="signup-submit-button"]').click();

    // API 응답 확인 및 _id 검증
    const response = await responsePromise;
    const responseData = await response.json();
    expect(responseData.data.createUser._id).toBeTruthy();

    // 가입완료 모달 대기
    await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });

    // 가입완료 모달 확인
    const modalTitle = page.locator('[data-testid="modal-title"]');
    await expect(modalTitle).toContainText('회원가입 완료');

    // 확인 버튼 클릭
    await page.locator('[data-testid="modal-confirm-button"]').click();

    // 로그인 페이지로 이동 확인
    await expect(page).toHaveURL('/auth/login');
  });

  test('회원가입에 실패하면 가입실패 모달이 표시되고 확인 클릭 시 모달이 닫힌다', async ({ page }) => {
    // API 모킹 - 실패 응답
    await page.route('**/graphql', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          errors: [
            {
              message: '이미 등록된 이메일입니다.',
            },
          ],
        }),
      });
    });

    // 폼 입력
    await page.locator('[data-testid="signup-email-input"]').fill('duplicate@test.com');
    await page.locator('[data-testid="signup-password-input"]').fill('test1234');
    await page.locator('[data-testid="signup-password-confirm-input"]').fill('test1234');
    await page.locator('[data-testid="signup-name-input"]').fill('테스트');

    // 회원가입 버튼 클릭
    await page.locator('[data-testid="signup-submit-button"]').click();

    // 가입실패 모달 대기
    await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });

    // 가입실패 모달 확인
    const modalTitle = page.locator('[data-testid="modal-title"]');
    await expect(modalTitle).toContainText('회원가입 실패');

    // 확인 버튼 클릭
    await page.locator('[data-testid="modal-confirm-button"]').click();

    // 모달이 닫히고 회원가입 페이지에 남아있는지 확인
    await expect(page.locator('[data-testid="modal"]')).not.toBeVisible();
    await expect(page).toHaveURL('/auth/signup');
  });

  test('이메일 검증 - @가 없으면 에러 메시지가 표시된다', async ({ page }) => {
    await page.locator('[data-testid="signup-email-input"]').fill('invalidemail');
    await page.locator('[data-testid="signup-password-input"]').click(); // blur trigger

    const errorMessage = page.locator('[data-testid="signup-email-error"]');
    await expect(errorMessage).toBeVisible();
  });

  test('비밀번호 검증 - 영문+숫자 8자리 미만이면 에러 메시지가 표시된다', async ({ page }) => {
    await page.locator('[data-testid="signup-password-input"]').fill('test12');
    await page.locator('[data-testid="signup-name-input"]').click(); // blur trigger

    const errorMessage = page.locator('[data-testid="signup-password-error"]');
    await expect(errorMessage).toBeVisible();
  });

  test('비밀번호 확인 검증 - 비밀번호와 일치하지 않으면 에러 메시지가 표시된다', async ({ page }) => {
    await page.locator('[data-testid="signup-password-input"]').fill('test1234');
    await page.locator('[data-testid="signup-password-confirm-input"]').fill('test5678');
    await page.locator('[data-testid="signup-name-input"]').click(); // blur trigger

    const errorMessage = page.locator('[data-testid="signup-password-confirm-error"]');
    await expect(errorMessage).toBeVisible();
  });

  test('이름 검증 - 최소 1글자 이상이 아니면 에러 메시지가 표시된다', async ({ page }) => {
    // 먼저 값을 입력한 후 지워야 change 이벤트가 발생
    await page.locator('[data-testid="signup-name-input"]').fill('테스트');
    await page.locator('[data-testid="signup-name-input"]').fill('');
    await page.locator('[data-testid="signup-email-input"]').click(); // blur trigger

    const errorMessage = page.locator('[data-testid="signup-name-error"]');
    await expect(errorMessage).toBeVisible();
  });
});

