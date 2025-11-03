"use client";

import UserInfoCard from "@/components/mypage/user-info-card";
import PasswordForm from "@/components/mypage/password-form";
import { mockUserInfo } from "@/lib/mock-data";
import styles from "./styles.module.css";

export default function PasswordPage() {
  const handlePasswordChange = (newPassword: string) => {
    // Mock 처리 - 실제 API 연동은 나중에
    console.log("Password change requested:", newPassword);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>비밀번호 변경</h1>

      <UserInfoCard
        name={mockUserInfo.name}
        points={mockUserInfo.points}
        profileImage={mockUserInfo.profileImage}
      />

      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>새 비밀번호 설정</h2>
        <PasswordForm onSubmit={handlePasswordChange} />
      </div>
    </div>
  );
}
