"use client";

import { ReactNode, useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./auth.provider";
import { useModal } from "../modal/modal.provider";
import { checkAccess, URL_PATHS } from "@/commons/constants/url";
import { Modal } from "@/commons/components/modal";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, isInitialized } = useAuth();
  const { openModal, closeModal } = useModal();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const hasShownModal = useRef(false);

  useEffect(() => {
    // 초기화가 완료되지 않았으면 대기
    if (!isInitialized) {
      return;
    }

    // 테스트 환경인지 확인
    const isTestEnv = process.env.NEXT_PUBLIC_TEST_ENV === "test";

    // 테스트 환경에서는 항상 로그인 유저로 처리 (모든 페이지 접속 가능)
    if (isTestEnv) {
      setIsAuthorized(true);
      return;
    }

    // 실제 환경에서는 로그인 여부에 따라 접근 권한 확인
    const hasAccess = checkAccess(pathname, isLoggedIn);

    if (hasAccess) {
      setIsAuthorized(true);
      hasShownModal.current = false; // 접근 권한이 있으면 모달 표시 플래그 초기화
    } else {
      setIsAuthorized(false);
      
      // 모달을 아직 보여주지 않았을 때만 표시
      if (!hasShownModal.current) {
        hasShownModal.current = true;
        
        openModal(
          <Modal
            variant="info"
            actions="single"
            title="로그인해주세요"
            description="이 페이지는 로그인이 필요합니다."
            confirmText="확인"
            onConfirm={() => {
              closeModal(); // 모든 모달 닫기
              router.push(URL_PATHS.auth.login); // 로그인 페이지로 이동
            }}
          />
        );
      }
    }
  }, [pathname, isLoggedIn, isInitialized, openModal, closeModal, router]);

  // 인가 전까지 빈 화면 표시
  if (!isAuthorized) {
    return null;
  }

  // 인가 성공시 children 표시
  return <>{children}</>;
}

