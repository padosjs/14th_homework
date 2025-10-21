import { test, expect } from "@playwright/test";

test.describe("로그인 폼 기능 테스트", () => {
  test.beforeEach(async ({ page }) => {
    // 로그인 페이지로 이동
    await page.goto("/auth/login");
    // 폼이 로드될 때까지 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="login-form"]');
  });

  test("모든 인풋이 입력되면 로그인 버튼이 활성화된다", async ({ page }) => {
    // 초기 상태: 버튼 비활성화
    const submitButton = page.locator('[data-testid="login-submit-button"]');
    await expect(submitButton).toBeDisabled();

    // 이메일 입력
    await page.locator('[data-testid="login-email-input"]').fill("a@c.com");
    
    // 여전히 비활성화 (비밀번호 미입력)
    await expect(submitButton).toBeDisabled();

    // 비밀번호 입력
    await page.locator('[data-testid="login-password-input"]').fill("1234qwer");
    
    // 모든 입력 완료: 버튼 활성화
    await expect(submitButton).toBeEnabled();
  });

  test("이메일 형식이 올바르지 않으면 에러 메시지가 표시된다", async ({ page }) => {
    // @ 없는 이메일 입력
    await page.locator('[data-testid="login-email-input"]').fill("invalidemail");
    await page.locator('[data-testid="login-password-input"]').click(); // blur 이벤트 트리거

    // 에러 메시지 확인
    const errorMessage = page.locator('[data-testid="login-email-error"]');
    await expect(errorMessage).toBeVisible();
  });

  test("로그인 성공 시 accessToken과 user 정보가 로컬스토리지에 저장되고 일기 목록 페이지로 이동한다", async ({ page }) => {
    // 실제 API를 사용한 로그인 테스트
    await page.locator('[data-testid="login-email-input"]').fill("a@c.com");
    await page.locator('[data-testid="login-password-input"]').fill("1234qwer");
    
    const submitButton = page.locator('[data-testid="login-submit-button"]');
    await expect(submitButton).toBeEnabled();
    
    // 로그인 버튼 클릭
    await submitButton.click();

    // 모달이 나타날 때까지 대기 (네트워크 통신)
    await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });

    // 로그인 성공 모달 확인
    const modalTitle = page.locator('[data-testid="modal-title"]');
    await expect(modalTitle).toHaveText("로그인 완료");

    // 로컬스토리지에 accessToken 저장 확인
    const accessToken = await page.evaluate(() => localStorage.getItem("accessToken"));
    expect(accessToken).toBeTruthy();
    expect(typeof accessToken).toBe("string");

    // 로컬스토리지에 user 정보 저장 확인
    const userString = await page.evaluate(() => localStorage.getItem("user"));
    expect(userString).toBeTruthy();
    
    const user = JSON.parse(userString as string);
    expect(user).toHaveProperty("_id");
    expect(user).toHaveProperty("name");
    expect(typeof user._id).toBe("string");
    expect(typeof user.name).toBe("string");

    // 확인 버튼 클릭
    await page.locator('[data-testid="modal-confirm-button"]').click();

    // 모달이 닫히고 일기 목록 페이지로 이동했는지 확인
    await page.waitForURL("/diaries", { timeout: 1000 });
    expect(page.url()).toContain("/diaries");
  });

  test("로그인 실패 시 에러 모달이 표시된다", async ({ page }) => {
    // API 모킹을 위한 route 설정
    await page.route("**/graphql", async (route) => {
      const postData = route.request().postDataJSON();
      
      // loginUser mutation인 경우 에러 응답 반환
      if (postData.query.includes("loginUser")) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            errors: [
              {
                message: "이메일 또는 비밀번호가 올바르지 않습니다",
              },
            ],
          }),
        });
      } else {
        // 다른 요청은 그대로 통과
        await route.continue();
      }
    });

    // 잘못된 정보로 로그인 시도
    await page.locator('[data-testid="login-email-input"]').fill("wrong@email.com");
    await page.locator('[data-testid="login-password-input"]').fill("wrongpassword");
    
    const submitButton = page.locator('[data-testid="login-submit-button"]');
    await submitButton.click();

    // 에러 모달이 나타날 때까지 대기
    await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });

    // 로그인 실패 모달 확인
    const modalTitle = page.locator('[data-testid="modal-title"]');
    await expect(modalTitle).toHaveText("로그인 실패");

    // 확인 버튼 클릭하면 모달만 닫히고 페이지는 그대로
    await page.locator('[data-testid="modal-confirm-button"]').click();
    
    // 모달이 닫혔는지 확인
    await expect(page.locator('[data-testid="modal"]')).not.toBeVisible();
    
    // 여전히 로그인 페이지에 있는지 확인
    expect(page.url()).toContain("/auth/login");
  });

  test("로그인 후 fetchUserLoggedIn 실패 시 에러 모달이 표시된다", async ({ page }) => {
    // API 모킹을 위한 route 설정
    await page.route("**/graphql", async (route) => {
      const postData = route.request().postDataJSON();
      
      // loginUser는 성공
      if (postData.query.includes("loginUser")) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              loginUser: {
                accessToken: "mock-access-token",
              },
            },
          }),
        });
      }
      // fetchUserLoggedIn는 실패
      else if (postData.query.includes("fetchUserLoggedIn")) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            errors: [
              {
                message: "유저 정보를 가져올 수 없습니다",
              },
            ],
          }),
        });
      }
    });

    // 로그인 시도
    await page.locator('[data-testid="login-email-input"]').fill("test@test.com");
    await page.locator('[data-testid="login-password-input"]').fill("password");
    
    const submitButton = page.locator('[data-testid="login-submit-button"]');
    await submitButton.click();

    // 에러 모달이 나타날 때까지 대기
    await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });

    // 로그인 실패 모달 확인
    const modalTitle = page.locator('[data-testid="modal-title"]');
    await expect(modalTitle).toHaveText("로그인 실패");

    // 확인 버튼으로 모달 닫기
    await page.locator('[data-testid="modal-confirm-button"]').click();
  });
});
