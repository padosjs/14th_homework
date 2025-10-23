"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth.provider";
import { useModal } from "../modal/modal.provider";
import { Modal } from "@/commons/components/modal";
import { URL_PATHS } from "@/commons/constants/url";

// 테스트 환경 변수 타입 선언
declare global {
  interface Window {
    __TEST_BYPASS__?: boolean;
  }
}

/**
 * 액션 GUARD Hook
 * 함수 실행 시 로그인 여부를 확인하고, 비로그인 시 로그인 모달을 표시합니다.
 * 
 * @returns {Object} 가드 기능 객체
 * @returns {Function} checkAuth - 로그인 여부를 확인하는 함수 (true: 로그인됨, false: 비로그인)
 * @returns {Function} withAuthGuard - 함수를 가드로 감싸는 HOF (로그인 시에만 실행)
 */
export const useAuthGuard = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { openModal, closeModal } = useModal();
  const hasShownModal = useRef(false);

  /**
   * 로그인 여부를 확인하는 함수
   * 테스트 환경과 실제 환경을 구분하여 처리합니다.
   * 
   * @returns {boolean} 로그인 여부 (true: 인가됨, false: 인가 실패)
   */
  const checkAuth = (): boolean => {
    // 테스트 환경인지 확인
    const isTestEnv = process.env.NEXT_PUBLIC_TEST_ENV === "test";

    // 테스트 환경에서는 window.__TEST_BYPASS__ 확인
    if (isTestEnv) {
      // window.__TEST_BYPASS__가 false인 경우에만 로그인 검사 수행
      if (window.__TEST_BYPASS__ === false) {
        return isLoggedIn;
      }
      // 기본값(undefined 또는 true)인 경우 로그인 유저로 간주
      return true;
    }

    // 실제 환경에서는 항상 로그인 검사 수행
    return isLoggedIn;
  };

  /**
   * 로그인하시겠습니까 모달을 표시하는 함수
   */
  const showLoginModal = () => {
    // 모달을 이미 표시한 경우 중복 표시 방지
    if (hasShownModal.current) {
      return;
    }

    hasShownModal.current = true;

    openModal(
      <Modal
        variant="info"
        actions="dual"
        title="로그인이 필요합니다"
        description="이 기능은 로그인이 필요합니다. 로그인하시겠습니까?"
        confirmText="로그인하러가기"
        cancelText="취소"
        onConfirm={() => {
          closeModal(); // 모든 모달 닫기
          hasShownModal.current = false; // 모달 플래그 초기화
          router.push(URL_PATHS.auth.login); // 로그인 페이지로 이동
        }}
        onCancel={() => {
          closeModal(); // 모든 모달 닫기
          hasShownModal.current = false; // 모달 플래그 초기화
        }}
      />,
      {
        // overlay(배경) 클릭으로 닫힐 때도 플래그를 초기화하여 다음 클릭 시 다시 표시되도록 처리
        onClose: () => {
          hasShownModal.current = false;
          closeModal();
        },
      }
    );
  };

  /**
   * 함수를 가드로 감싸는 고차 함수
   * 로그인이 필요한 액션을 실행하기 전에 로그인 여부를 확인합니다.
   * 
   * @param {Function} action - 실행할 함수
   * @returns {Function} 가드가 적용된 함수
   */
  const withAuthGuard = <T extends (...args: any[]) => any>(action: T): T => {
    return ((...args: Parameters<T>) => {
      if (!checkAuth()) {
        showLoginModal();
        return;
      }
      return action(...args);
    }) as T;
  };

  return {
    checkAuth,
    withAuthGuard,
  };
};

