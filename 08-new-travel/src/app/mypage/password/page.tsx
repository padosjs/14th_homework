"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import UserInfoCard from "@/components/mypage/user-info-card";
import PasswordForm from "@/components/mypage/password-form";
import { useAccessTokenStore } from "@/commons/stores/access-token-store";
import { FETCH_USER_LOGGED_IN } from "@/lib/queries/user";
import styles from "./styles.module.css";

const RESET_USER_PASSWORD = gql`
  mutation resetUserPassword($password: String!) {
    resetUserPassword(password: $password)
  }
`;

export default function PasswordPage() {
  const router = useRouter();
  const { setAccessToken } = useAccessTokenStore();
  const [resetUserPassword] = useMutation(RESET_USER_PASSWORD);

  // Apollo 캐시에서 사용자 정보 조회 (서버에 쿼리하지 않음)
  const { data } = useQuery(FETCH_USER_LOGGED_IN, {
    fetchPolicy: 'cache-first'
  });

  const handlePasswordChange = async (newPassword: string) => {
    try {
      const result = await resetUserPassword({
        variables: { password: newPassword }
      });

      if (result.data?.resetUserPassword) {
        alert("비밀번호가 변경되었습니다.");

        // 로그아웃 처리
        setAccessToken("");

        // 로그인 페이지로 이동
        router.push("/login");
      } else {
        alert("비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      alert("비밀번호 변경 중 오류가 발생했습니다.");
      console.error("Password reset error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>비밀번호 변경</h1>

      <UserInfoCard
        name={data?.fetchUserLoggedIn?.name || ""}
        points={data?.fetchUserLoggedIn?.userPoint?.amount || 0}
      />

      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>새 비밀번호 설정</h2>
        <PasswordForm onSubmit={handlePasswordChange} />
      </div>
    </div>
  );
}
