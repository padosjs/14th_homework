"use client";

import { useState } from "react";
import Button from "../../button/button";
import Input from "../../input/input";
import styles from "./styles.module.css";

interface PasswordFormProps {
  onSubmit?: (newPassword: string) => void;
}

export default function PasswordForm({ onSubmit }: PasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("새 비밀번호를 입력해주세요.");
      return;
    }

    if (!confirmPassword) {
      setError("비밀번호 확인을 입력해주세요.");
      return;
    }

    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    onSubmit?.(password);

    setPassword("");
    setConfirmPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          새 비밀번호
        </label>
        <Input
          id="password"
          type="password"
          placeholder="8자 이상의 비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword" className={styles.label}>
          비밀번호 확인
        </label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.buttonGroup}>
        <Button type="submit" variant="blue-button">
          변경하기
        </Button>
      </div>
    </form>
  );
}
