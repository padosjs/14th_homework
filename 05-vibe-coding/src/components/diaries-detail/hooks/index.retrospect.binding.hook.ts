import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type Retrospect = {
  id: number;
  content: string;
  diaryId: number;
  createdAt: string;
};

export const useRetrospectBinding = () => {
  const [retrospects, setRetrospects] = useState<Retrospect[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const loadRetrospects = () => {
      // URL에서 ID 추출
      const segments = pathname.split("/");
      const id = segments[segments.length - 1];
      const diaryId = parseInt(id, 10);

      if (isNaN(diaryId)) {
        setRetrospects([]);
        return;
      }

      // 로컬스토리지에서 retrospects 데이터 가져오기
      const retrospectsData = localStorage.getItem("retrospects");
      if (retrospectsData) {
        try {
          const allRetrospects: Retrospect[] = JSON.parse(retrospectsData);
          // 현재 일기의 회고만 필터링
          const filteredRetrospects = allRetrospects.filter((r) => r.diaryId === diaryId);
          setRetrospects(filteredRetrospects);
        } catch (error) {
          console.error("Failed to parse retrospects data:", error);
          setRetrospects([]);
        }
      } else {
        setRetrospects([]);
      }
    };

    // 초기 데이터 로드
    loadRetrospects();

    // 커스텀 이벤트 리스너 (회고 추가/변경 시 다시 로드)
    const handleRetrospectChange = () => {
      loadRetrospects();
    };

    window.addEventListener("retrospects-change", handleRetrospectChange);

    return () => {
      window.removeEventListener("retrospects-change", handleRetrospectChange);
    };
  }, [pathname]);

  return { retrospects };
};

