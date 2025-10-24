import { useState, useCallback } from "react";

export const useDiaryFilter = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string>("");

  const handleFilterChange = useCallback((emotion: string) => {
    setSelectedEmotion(emotion);
  }, []);

  return {
    selectedEmotion,
    handleFilterChange,
  };
};

