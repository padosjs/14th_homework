"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { Selectbox } from "@/commons/components/selectbox";
import { Searchbar } from "@/commons/components/searchbar";
import { Button } from "@/commons/components/button";
import { Pagination } from "@/commons/components/pagination";
import { Emotion, getEmotionLabel, getEmotionColor } from "@/commons/constants/enum";
import { useDiaryModal } from "./hooks/index.link.modal.hook";

// Mock 데이터
const mockDiaries = [
  // 첫 번째 행
  {
    id: 1,
    emotion: Emotion.SAD,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다. 한줄까지만 노출 됩니다.",
    image: "/images/emotion-sad-m.png",
  },
  {
    id: 2,
    emotion: Emotion.SURPRISE,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
    image: "/images/emotion-surprise-m.png",
  },
  {
    id: 3,
    emotion: Emotion.ANGRY,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
    image: "/images/emotion-angry-m.png",
  },
  {
    id: 4,
    emotion: Emotion.HAPPY,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
    image: "/images/emotion-happy-m.png",
  },
  // 두 번째 행
  {
    id: 5,
    emotion: Emotion.ETC,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다. 한줄까지만 노출 됩니다.",
    image: "/images/emotion-etc-m.png",
  },
  {
    id: 6,
    emotion: Emotion.SURPRISE,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
    image: "/images/emotion-surprise-m.png",
  },
  {
    id: 7,
    emotion: Emotion.ANGRY,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
    image: "/images/emotion-angry-m.png",
  },
  {
    id: 8,
    emotion: Emotion.HAPPY,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
    image: "/images/emotion-happy-m.png",
  },
  // 세 번째 행
  {
    id: 9,
    emotion: Emotion.SAD,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다. 한줄까지만 노출 됩니다.",
    image: "/images/emotion-sad-m.png",
  },
  {
    id: 10,
    emotion: Emotion.SURPRISE,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
    image: "/images/emotion-surprise-m.png",
  },
  {
    id: 11,
    emotion: Emotion.ANGRY,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
    image: "/images/emotion-angry-m.png",
  },
  {
    id: 12,
    emotion: Emotion.HAPPY,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
    image: "/images/emotion-happy-m.png",
  },
];

export default function Diaries() {
  const { openDiaryModal } = useDiaryModal();

  // 4개씩 그룹화
  const rows = [];
  for (let i = 0; i < mockDiaries.length; i += 4) {
    rows.push(mockDiaries.slice(i, i + 4));
  }

  return (
    <div className={styles.container} data-testid="diaries-container">
      <div className={styles.gap32}></div>
      <div className={styles.search}>
        <div className={styles.searchLeft}>
          <Selectbox
            variant="primary"
            size="medium"
            theme="light"
            placeholder="전체"
            className={styles.selectbox}
          />
          <Searchbar
            variant="primary"
            size="medium"
            theme="light"
            placeholder="검색어를 입력해 주세요."
            className={styles.searchbar}
          />
        </div>
        <Button
          variant="primary"
          size="medium"
          theme="light"
          className={styles.writeButton}
          onClick={openDiaryModal}
          data-testid="write-diary-button"
          leftIcon={
            <Image
              src="/icons/plus_outline_light_m.svg"
              alt="추가"
              width={24}
              height={24}
            />
          }
        >
          일기쓰기
        </Button>
      </div>
      <div className={styles.gap42}></div>
      <div className={styles.main}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((diary) => (
              <div key={diary.id} className={styles.diaryCard}>
                <div className={styles.cardImageWrapper}>
                  <Image
                    src={diary.image}
                    alt={getEmotionLabel(diary.emotion)}
                    width={274}
                    height={208}
                    className={styles.cardImage}
                  />
                  <Image
                    src="/icons/close_outline_light_s.svg"
                    alt="닫기"
                    width={24}
                    height={24}
                    className={styles.closeIcon}
                  />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <span
                      className={styles.emotion}
                      style={{ color: getEmotionColor(diary.emotion) }}
                    >
                      {getEmotionLabel(diary.emotion)}
                    </span>
                    <span className={styles.date}>{diary.date}</span>
                  </div>
                  <div className={styles.title}>{diary.title}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.gap40}></div>
      <div className={styles.pagination}>
        <Pagination
          variant="primary"
          size="medium"
          theme="light"
          currentPage={1}
          totalPages={3}
          onPageChange={() => {}}
          maxVisiblePages={5}
          className={styles.pagination}
        />
      </div>
      <div className={styles.gap40}></div>
    </div>
  );
}

