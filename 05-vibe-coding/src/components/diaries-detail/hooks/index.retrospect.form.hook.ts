import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePathname } from "next/navigation";

// Zod 스키마 정의
const retrospectSchema = z.object({
  content: z.string().min(1, "회고 내용을 입력해주세요."),
});

type RetrospectFormData = z.infer<typeof retrospectSchema>;

type Retrospect = {
  id: number;
  content: string;
  diaryId: number;
  createdAt: string;
};

export const useRetrospectForm = () => {
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    reset,
  } = useForm<RetrospectFormData>({
    resolver: zodResolver(retrospectSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
    },
  });

  // 현재 입력값 감시
  const content = watch("content");

  const onSubmit = (data: RetrospectFormData) => {
    // URL에서 diaryId 추출
    const segments = pathname.split("/");
    const id = segments[segments.length - 1];
    const diaryId = parseInt(id, 10);

    if (isNaN(diaryId)) {
      return;
    }

    // 로컬스토리지에서 기존 retrospects 가져오기
    const retrospectsData = localStorage.getItem("retrospects");
    let retrospects: Retrospect[] = [];
    let newId = 1;

    if (retrospectsData) {
      try {
        retrospects = JSON.parse(retrospectsData);
        // 가장 큰 id 찾기
        const maxId = Math.max(...retrospects.map((r) => r.id), 0);
        newId = maxId + 1;
      } catch (error) {
        console.error("Failed to parse retrospects data:", error);
      }
    }

    // 새로운 회고 생성
    const now = new Date();
    const createdAt = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;

    const newRetrospect: Retrospect = {
      id: newId,
      content: data.content,
      diaryId,
      createdAt,
    };

    // 로컬스토리지에 저장
    retrospects.push(newRetrospect);
    localStorage.setItem("retrospects", JSON.stringify(retrospects));

    // 폼 초기화
    reset();

    // 커스텀 이벤트 발생 (다른 컴포넌트에서 감지)
    window.dispatchEvent(new Event("retrospects-change"));
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    isValid: isValid && content.trim().length > 0,
    errors,
  };
};

