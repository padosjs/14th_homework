"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { Selectbox } from "@/commons/components/selectbox";
import { Searchbar } from "@/commons/components/searchbar";
import { Button } from "@/commons/components/button";
import { Pagination } from "@/commons/components/pagination";
import { getEmotionLabel, getEmotionColor } from "@/commons/constants/enum";
import { useDiaryModal } from "./hooks/index.link.modal.hook";
import { useDiaryBinding } from "./hooks/index.binding.hook";
import { useDiaryRouting } from "./hooks/index.link.routing.hook";

export default function Diaries() {
  const { openDiaryModal } = useDiaryModal();
  const { diaries } = useDiaryBinding();
  const { navigateToDetail } = useDiaryRouting();

  // 4개씩 그룹화
  const rows = [];
  for (let i = 0; i < diaries.length; i += 4) {
    rows.push(diaries.slice(i, i + 4));
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
              <div
                key={diary.id}
                className={styles.diaryCard}
                data-testid="diary-card"
                onClick={() => navigateToDetail(diary.id)}
              >
                <div className={styles.cardImageWrapper}>
                  <Image
                    src={diary.image}
                    alt={getEmotionLabel(diary.emotion)}
                    width={274}
                    height={208}
                    className={styles.cardImage}
                    data-testid="diary-image"
                  />
                  <Image
                    src="/icons/close_outline_light_s.svg"
                    alt="닫기"
                    width={24}
                    height={24}
                    className={styles.closeIcon}
                    data-testid="diary-delete-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <span
                      className={styles.emotion}
                      style={{ color: getEmotionColor(diary.emotion) }}
                      data-testid="diary-emotion"
                    >
                      {getEmotionLabel(diary.emotion)}
                    </span>
                    <span className={styles.date} data-testid="diary-date">{diary.date}</span>
                  </div>
                  <div className={styles.title} data-testid="diary-title">{diary.title}</div>
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

