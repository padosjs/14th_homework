"use client";

import { useState } from "react";
import { useAuthGuard } from "@/commons/providers/auth/auth.guard.hook";
import { useModal } from "@/commons/providers/modal/modal.provider";
import { Modal } from "@/commons/components/modal";

export interface DiaryDeleteHook {
  deleteDiary: (id: number) => void;
  isDeleting: boolean;
}

/**
 * 일기 삭제 훅
 * 로그인 권한을 확인하고 일기 삭제 모달을 표시합니다.
 */
export const useDiaryDelete = (): DiaryDeleteHook => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { withAuthGuard } = useAuthGuard();
  const { openModal, closeModal } = useModal();

  /**
   * 일기 삭제 모달을 표시하는 함수
   * @param id 삭제할 일기의 ID
   */
  const showDeleteModal = (id: number) => {
    openModal(
      <Modal
        variant="danger"
        actions="dual"
        title="일기를 삭제하시겠습니까?"
        description="삭제된 일기는 복구할 수 없습니다."
        confirmText="삭제"
        cancelText="취소"
        onConfirm={() => {
          handleDeleteConfirm(id);
        }}
        onCancel={() => {
          closeModal();
        }}
      />,
      {
        onClose: () => {
          closeModal();
        },
      }
    );
  };

  /**
   * 일기 삭제 확인 처리 함수
   * @param id 삭제할 일기의 ID
   */
  const handleDeleteConfirm = (id: number) => {
    setIsDeleting(true);
    
    try {
      // 로컬스토리지에서 일기 데이터 가져오기
      const diariesData = localStorage.getItem("diaries");
      if (!diariesData) {
        console.error("일기 데이터를 찾을 수 없습니다.");
        return;
      }

      const diaries = JSON.parse(diariesData);
      
      // 해당 ID의 일기 제거
      const updatedDiaries = diaries.filter((diary: any) => diary.id !== id);
      
      // 로컬스토리지에 업데이트된 데이터 저장
      localStorage.setItem("diaries", JSON.stringify(updatedDiaries));
      
      // 모달 닫기
      closeModal();
      
      // 페이지 새로고침
      window.location.reload();
      
    } catch (error) {
      console.error("일기 삭제 중 오류가 발생했습니다:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * 일기 삭제 함수 (권한 검사 포함)
   * @param id 삭제할 일기의 ID
   */
  const deleteDiary = withAuthGuard((id: number) => {
    showDeleteModal(id);
  });

  return {
    deleteDiary,
    isDeleting,
  };
};
