import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Emotion } from "@/commons/constants/enum";

// 폼 스키마 정의
const updateDiarySchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  content: z.string().min(1, "내용을 입력해주세요"),
  emotion: z.nativeEnum(Emotion, { message: "감정을 선택해주세요" }),
});

type UpdateDiaryFormData = z.infer<typeof updateDiarySchema>;

type Diary = {
  id: number;
  title: string;
  content: string;
  emotion: Emotion;
  createdAt: string;
};

export const useDiaryUpdate = (diary: Diary | null) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<UpdateDiaryFormData>({
    resolver: zodResolver(updateDiarySchema),
    defaultValues: {
      title: diary?.title || "",
      content: diary?.content || "",
      emotion: diary?.emotion || Emotion.HAPPY,
    },
  });

  const { register, handleSubmit, formState: { errors, isValid }, reset } = form;

  // 수정 모드 시작
  const startEdit = () => {
    if (diary) {
      reset({
        title: diary.title,
        content: diary.content,
        emotion: diary.emotion,
      });
      setIsEditing(true);
    }
  };

  // 수정 모드 취소
  const cancelEdit = () => {
    setIsEditing(false);
    reset();
  };

  // 일기 수정 처리
  const updateDiary = (data: UpdateDiaryFormData) => {
    if (!diary) return;

    try {
      // 로컬스토리지에서 diaries 데이터 가져오기
      const diariesData = localStorage.getItem("diaries");
      if (diariesData) {
        const diaries: Diary[] = JSON.parse(diariesData);
        
        // 해당 일기 찾아서 업데이트
        const updatedDiaries = diaries.map((d) => 
          d.id === diary.id 
            ? { ...d, title: data.title, content: data.content, emotion: data.emotion }
            : d
        );
        
        // 로컬스토리지에 저장
        localStorage.setItem("diaries", JSON.stringify(updatedDiaries));
        
        // 수정 모드 종료
        setIsEditing(false);
        
        // 페이지 새로고침을 위한 커스텀 이벤트 발생
        window.dispatchEvent(new CustomEvent("diary-updated"));
      }
    } catch (error) {
      console.error("Failed to update diary:", error);
    }
  };

  // 폼 제출 처리
  const onSubmit = handleSubmit(updateDiary);

  return {
    isEditing,
    startEdit,
    cancelEdit,
    onSubmit,
    register,
    errors,
    isValid,
  };
};
