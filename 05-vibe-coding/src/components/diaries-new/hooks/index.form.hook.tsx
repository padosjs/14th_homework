"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Emotion } from "@/commons/constants/enum";
import { URL_PATHS } from "@/commons/constants/url";
import { useModal } from "@/commons/providers/modal/modal.provider";
import { Modal } from "@/commons/components/modal";

const diarySchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  content: z.string().min(1, "내용을 입력해주세요"),
  emotion: z.nativeEnum(Emotion),
});

type DiaryFormData = z.infer<typeof diarySchema>;

interface DiaryItem {
  id: number;
  title: string;
  content: string;
  emotion: Emotion;
  createdAt: string;
}

export const useFormHook = (initialEmotion: Emotion = Emotion.HAPPY) => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<DiaryFormData>({
    resolver: zodResolver(diarySchema),
    mode: "onChange",
    defaultValues: {
      emotion: initialEmotion,
      title: "",
      content: "",
    },
  });

  const onSubmit = (data: DiaryFormData) => {
    // 로컬스토리지에서 기존 데이터 가져오기
    const existingData = localStorage.getItem("diaries");
    const diaries: DiaryItem[] = existingData ? JSON.parse(existingData) : [];

    // 새로운 ID 계산
    const maxId = diaries.length > 0 ? Math.max(...diaries.map((d) => d.id)) : 0;
    const newId = maxId + 1;

    // 새로운 일기 데이터 생성
    const newDiary: DiaryItem = {
      id: newId,
      title: data.title,
      content: data.content,
      emotion: data.emotion,
      createdAt: new Date().toISOString(),
    };

    // 로컬스토리지에 저장
    diaries.push(newDiary);
    localStorage.setItem("diaries", JSON.stringify(diaries));

    // 등록완료 모달 표시
    openModal(
      <Modal
        variant="info"
        actions="single"
        title="등록이 완료되었습니다"
        confirmText="확인"
        onConfirm={() => {
          closeModal();
          closeModal(); // 일기쓰기 모달도 닫기
          router.push(URL_PATHS.diaries.detail(String(newId)));
        }}
      />
    );
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
    watch,
    isValid,
  };
};

