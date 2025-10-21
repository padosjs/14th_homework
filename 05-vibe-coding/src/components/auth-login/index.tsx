"use client";

import Link from "next/link";
import { Input } from "@/commons/components/input";
import { Button } from "@/commons/components/button";
import { URL_PATHS } from "@/commons/constants/url";
import styles from "./styles.module.css";
import useLoginForm from "./hooks/index.form.hook";

export default function AuthLogin() {
  const { register, handleSubmit, errors, isValid, isLoading } = useLoginForm();

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>로그인</h1>
          <p className={styles.subtitle}>
            마음일기에 오신 것을 환영합니다
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} data-testid="login-form">
          <div className={styles.inputGroup}>
            <label className={styles.label}>이메일</label>
            <Input
              variant="primary"
              size="large"
              theme="light"
              type="email"
              placeholder="이메일을 입력해 주세요"
              className={styles.input}
              data-testid="login-email-input"
              {...register("email")}
            />
            {errors.email && (
              <p className={styles.errorMessage} data-testid="login-email-error">
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
              data-testid="login-password-input"
              {...register("password")}
            />
            {errors.password && (
              <p className={styles.errorMessage} data-testid="login-password-error">
                {errors.password.message}
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
            data-testid="login-submit-button"
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>

          <div className={styles.footer}>
            <span className={styles.footerText}>아직 계정이 없으신가요?</span>
            <Link href={URL_PATHS.auth.signup} className={styles.signupLink}>
              회원가입하기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

