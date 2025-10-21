"use client";

import Link from "next/link";
import { Input } from "@/commons/components/input";
import { Button } from "@/commons/components/button";
import { URL_PATHS } from "@/commons/constants/url";
import styles from "./styles.module.css";
import useSignupForm from "./hooks/index.form.hook";

export default function AuthSignup() {
  const { register, handleSubmit, errors, isValid, isLoading } = useSignupForm();

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>회원가입</h1>
          <p className={styles.subtitle}>
            마음일기에 오신 것을 환영합니다
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} data-testid="signup-form">
          <div className={styles.inputGroup}>
            <label className={styles.label}>이메일</label>
            <Input
              variant="primary"
              size="large"
              theme="light"
              type="email"
              placeholder="이메일을 입력해 주세요"
              className={styles.input}
              data-testid="signup-email-input"
              {...register("email")}
            />
            {errors.email && (
              <p className={styles.errorMessage} data-testid="signup-email-error">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>비밀번호</label>
            <Input
              variant="primary"
              size="large"
              theme="light"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              className={styles.input}
              data-testid="signup-password-input"
              {...register("password")}
            />
            {errors.password && (
              <p className={styles.errorMessage} data-testid="signup-password-error">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>비밀번호 재입력</label>
            <Input
              variant="primary"
              size="large"
              theme="light"
              type="password"
              placeholder="비밀번호를 다시 입력해 주세요"
              className={styles.input}
              data-testid="signup-password-confirm-input"
              {...register("passwordConfirm")}
            />
            {errors.passwordConfirm && (
              <p className={styles.errorMessage} data-testid="signup-password-confirm-error">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>이름</label>
            <Input
              variant="primary"
              size="large"
              theme="light"
              type="text"
              placeholder="이름을 입력해 주세요"
              className={styles.input}
              data-testid="signup-name-input"
              {...register("name")}
            />
            {errors.name && (
              <p className={styles.errorMessage} data-testid="signup-name-error">
                {errors.name.message}
              </p>
            )}
          </div>

          <Button
            variant="primary"
            size="large"
            theme="light"
            className={styles.submitButton}
            disabled={!isValid || isLoading}
            type="submit"
            data-testid="signup-submit-button"
          >
            {isLoading ? "가입 중..." : "회원가입"}
          </Button>

          <div className={styles.footer}>
            <span className={styles.footerText}>이미 계정이 있으신가요?</span>
            <Link href={URL_PATHS.auth.login} className={styles.loginLink}>
              로그인하기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

