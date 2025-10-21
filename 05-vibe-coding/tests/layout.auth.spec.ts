import { test, expect } from "@playwright/test";

test.describe("레이아웃 인증 상태 표시 테스트", () => {
  test.describe("비로그인 유저", () => {
    test.beforeEach(async ({ page }) => {
      // 로컬스토리지 초기화
      await page.goto("/diaries");
      await page.evaluate(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      });
      await page.reload();
    });

    test("비회원으로 /diaries에 접속하여 페이지 로드 확인", async ({ page }) => {
      await page.goto("/diaries");
      // 레이아웃 헤더 로드 확인
      await page.waitForSelector('[data-testid="layout-header"]');
      const header = page.locator('[data-testid="layout-header"]');
      await expect(header).toBeVisible();
    });

    test("layout의 로그인버튼 노출여부 확인", async ({ page }) => {
      await page.goto("/diaries");
      await page.waitForSelector('[data-testid="layout-header"]');
      
      // 로그인 버튼이 보여야 함
      const loginButton = page.locator('[data-testid="login-button"]');
      await expect(loginButton).toBeVisible();
      
      // 로그아웃 버튼은 보이지 않아야 함
      const logoutButton = page.locator('[data-testid="logout-button"]');
      await expect(logoutButton).not.toBeVisible();
      
      // 유저 이름은 보이지 않아야 함
      const userName = page.locator('[data-testid="user-name"]');
      await expect(userName).not.toBeVisible();
    });

    test("로그인버튼 클릭하여 /auth/login 페이지로 이동", async ({ page }) => {
      await page.goto("/diaries");
      await page.waitForSelector('[data-testid="layout-header"]');
      
      // 로그인 버튼 클릭
      const loginButton = page.locator('[data-testid="login-button"]');
      await loginButton.click();
      
      // 로그인 페이지로 이동 확인
      await page.waitForURL("/auth/login");
      expect(page.url()).toContain("/auth/login");
    });
  });

  test.describe("로그인 유저", () => {
    test("로그인 후 /diaries에서 유저 정보와 로그아웃 버튼 노출 확인", async ({ page }) => {
      // 1. 비회원으로 /auth/login에 접속하여 페이지 로드 확인
      await page.goto("/auth/login");
      await page.waitForSelector('[data-testid="login-form"]');
      
      // 2. 로그인 시도
      await page.locator('[data-testid="login-email-input"]').fill("a@c.com");
      await page.locator('[data-testid="login-password-input"]').fill("1234qwer");
      
      const submitButton = page.locator('[data-testid="login-submit-button"]');
      await submitButton.click();
      
      // 3. 로그인 성공 후, 완료 모달 클릭하여 /diaries 페이지 로드 확인
      await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });
      await page.locator('[data-testid="modal-confirm-button"]').click();
      await page.waitForURL("/diaries");
      await page.waitForSelector('[data-testid="layout-header"]');
      
      // 4. layout에서 유저이름, 로그아웃버튼 노출여부 확인
      const userName = page.locator('[data-testid="user-name"]');
      await expect(userName).toBeVisible();
      
      // 유저 이름이 실제로 표시되는지 확인 (빈 문자열이 아님)
      const userNameText = await userName.textContent();
      expect(userNameText).toBeTruthy();
      expect(userNameText?.length).toBeGreaterThan(0);
      
      const logoutButton = page.locator('[data-testid="logout-button"]');
      await expect(logoutButton).toBeVisible();
      
      // 로그인 버튼은 보이지 않아야 함
      const loginButton = page.locator('[data-testid="login-button"]');
      await expect(loginButton).not.toBeVisible();
    });

    test("로그아웃버튼 클릭하여 /auth/login 페이지 이동 및 로그인버튼 노출 확인", async ({ page }) => {
      // 로그인 과정
      await page.goto("/auth/login");
      await page.waitForSelector('[data-testid="login-form"]');
      
      await page.locator('[data-testid="login-email-input"]').fill("a@c.com");
      await page.locator('[data-testid="login-password-input"]').fill("1234qwer");
      
      const submitButton = page.locator('[data-testid="login-submit-button"]');
      await submitButton.click();
      
      await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });
      await page.locator('[data-testid="modal-confirm-button"]').click();
      await page.waitForURL("/diaries");
      await page.waitForSelector('[data-testid="layout-header"]');
      
      // 6. 로그아웃버튼 클릭하여 /auth/login 페이지 로드 확인
      const logoutButton = page.locator('[data-testid="logout-button"]');
      await logoutButton.click();
      
      await page.waitForURL("/auth/login");
      expect(page.url()).toContain("/auth/login");
      
      // 8. /diaries에 접속하여 페이지 로드 확인
      await page.goto("/diaries");
      await page.waitForSelector('[data-testid="layout-header"]');
      
      // 9. layout에 로그인버튼 노출여부 확인
      const loginButton = page.locator('[data-testid="login-button"]');
      await expect(loginButton).toBeVisible();
      
      // 로그아웃 버튼과 유저 이름은 보이지 않아야 함
      const logoutButtonAfter = page.locator('[data-testid="logout-button"]');
      await expect(logoutButtonAfter).not.toBeVisible();
      
      const userName = page.locator('[data-testid="user-name"]');
      await expect(userName).not.toBeVisible();
    });
  });
});

