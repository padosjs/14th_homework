import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Emotion } from "@/commons/constants/enum";

type Diary = {
  id: number;
  title: string;
  content: string;
  emotion: Emotion;
  createdAt: string;
};

export const useDiaryDetail = () => {
  const [diary, setDiary] = useState<Diary | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // URL에서 ID 추출
    const segments = pathname.split("/");
    const id = segments[segments.length - 1];
    const diaryId = parseInt(id, 10);

    if (isNaN(diaryId)) {
      return;
    }

    // 로컬스토리지에서 diaries 데이터 가져오기
    const diariesData = localStorage.getItem("diaries");
    if (!diariesData) {
      return;
    }

    try {
      const diaries: Diary[] = JSON.parse(diariesData);
      const foundDiary = diaries.find((d) => d.id === diaryId);
      setDiary(foundDiary || null);
    } catch (error) {
      console.error("Failed to parse diaries data:", error);
    }
  }, [pathname]);

  return { diary };
};

