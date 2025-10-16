import { useState, useEffect } from "react";
import { Emotion, getEmotionImage } from "@/commons/constants/enum";

export type DiaryData = {
  id: number;
  title: string;
  content: string;
  emotion: Emotion;
  createdAt: string;
};

export type DiaryCardData = {
  id: number;
  emotion: Emotion;
  date: string;
  title: string;
  image: string;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}. ${month}. ${day}`;
};

const getEmotionImagePath = (emotion: Emotion): string => {
  const imageName = getEmotionImage(emotion, "medium");
  // enum.ts는 .svg를 반환하지만 실제 파일은 .png이므로 변환
  const imageNameWithPng = imageName.replace('.svg', '.png');
  return `/images/${imageNameWithPng}`;
};

export const useDiaryBinding = () => {
  const [diaries, setDiaries] = useState<DiaryCardData[]>([]);

  useEffect(() => {
    const loadDiaries = () => {
      try {
        const storedData = localStorage.getItem("diaries");
        if (!storedData) {
          setDiaries([]);
          return;
        }

        const parsedData: DiaryData[] = JSON.parse(storedData);
        const transformedData: DiaryCardData[] = parsedData.map((diary) => ({
          id: diary.id,
          emotion: diary.emotion,
          date: formatDate(diary.createdAt),
          title: diary.title,
          image: getEmotionImagePath(diary.emotion),
        }));

        setDiaries(transformedData);
      } catch (error) {
        console.error("Failed to load diaries from localStorage:", error);
        setDiaries([]);
      }
    };

    loadDiaries();
  }, []);

  return { diaries };
};

