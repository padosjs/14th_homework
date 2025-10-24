"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { URL_PATHS } from "@/commons/constants/url";

export interface Diary {
  id: number;
  title: string;
  content: string;
  emotion: string;
  createdAt: string;
}

export const useDiaryDelete = (diary: Diary | null) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteDiary = () => {
    if (!diary) return;

    try {
      // 로컬스토리지에서 일기 목록 가져오기
      const diariesJson = localStorage.getItem('diaries');
      if (!diariesJson) return;

      const diaries: Diary[] = JSON.parse(diariesJson);
      
      // 해당 일기 제거
      const updatedDiaries = diaries.filter(d => d.id !== diary.id);
      
      // 로컬스토리지에 업데이트된 목록 저장
      localStorage.setItem('diaries', JSON.stringify(updatedDiaries));
      
      // 모달 닫기
      closeDeleteModal();
      
      // 목록 페이지로 이동
      router.push(URL_PATHS.diaries.list);
    } catch (error) {
      console.error('일기 삭제 중 오류 발생:', error);
    }
  };

  return {
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    deleteDiary,
  };
};
