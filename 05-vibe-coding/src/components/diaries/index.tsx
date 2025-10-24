"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { Selectbox } from "@/commons/components/selectbox";
import { Searchbar } from "@/commons/components/searchbar";
import { Button } from "@/commons/components/button";
import { Pagination } from "@/commons/components/pagination";
import { Emotion, getEmotionLabel, getEmotionColor, EMOTION_DATA } from "@/commons/constants/enum";
import { useDiaryModal } from "./hooks/index.link.modal.hook";
import { useDiaryBinding } from "./hooks/index.binding.hook";
import { useDiaryRouting } from "./hooks/index.link.routing.hook";
import { useDiarySearch } from "./hooks/index.search.hook";
import { useDiaryFilter } from "./hooks/index.filter.hook";
import { usePagination } from "./hooks/index.pagination.hook";
import { useDiaryDelete } from "./hooks/index.delete.hook";
import { useAuth } from "@/commons/providers/auth/auth.provider";
import { useMemo } from "react";

export default function Diaries() {
  const { openDiaryModal } = useDiaryModal();
  const { diaries } = useDiaryBinding();
  const { navigateToDetail } = useDiaryRouting();
  const { searchKeyword, handleSearch } = useDiarySearch();
  const { selectedEmotion, handleFilterChange } = useDiaryFilter();
  const { deleteDiary } = useDiaryDelete();
  const { isLoggedIn } = useAuth();

  const filteredDiaries = useMemo(() => {
    let result = diaries;

    // 검색 필터 적용
    if (searchKeyword.trim()) {
      result = result.filter((diary) =>
        diary.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    // 감정 필터 적용
    if (selectedEmotion) {
      result = result.filter((diary) => diary.emotion === selectedEmotion);
    }

    return result;
  }, [diaries, searchKeyword, selectedEmotion]);

  // 페이지네이션 훅 사용
  const {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
  } = usePagination({
    items: filteredDiaries,
    itemsPerPage: 12, // 3행 4열 = 12개
  });

  // Emotion 필터 옵션 생성
  const emotionOptions = [
    { value: "", label: "전체" },
    ...Object.values(Emotion).map((emotion) => ({
      value: emotion,
      label: EMOTION_DATA[emotion].label,
    })),
  ];

  // 4개씩 그룹화 (페이지네이션된 아이템 사용)
  const rows = [];
  for (let i = 0; i < paginatedItems.length; i += 4) {
    rows.push(paginatedItems.slice(i, i + 4));
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
            options={emotionOptions}
            value={selectedEmotion}
            onChange={(e) => handleFilterChange(e.target.value)}
            data-testid="emotion-filter"
          />
          <Searchbar
            variant="primary"
            size="medium"
            theme="light"
            placeholder="검색어를 입력해 주세요."
            className={styles.searchbar}
            onSearch={handleSearch}
            data-testid="search-input"
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
                    alt={getEmotionLabel(diary.emotion as Emotion)}
                    width={274}
                    height={208}
                    className={styles.cardImage}
                    data-testid="diary-image"
                  />
                  {isLoggedIn && (
                    <Image
                      src="/icons/close_outline_light_s.svg"
                      alt="삭제"
                      width={24}
                      height={24}
                      className={styles.closeIcon}
                      data-testid="diary-delete-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteDiary(diary.id);
                      }}
                    />
                  )}
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <span
                      className={styles.emotion}
                      style={{ color: getEmotionColor(diary.emotion as Emotion) }}
                      data-testid="diary-emotion"
                    >
                      {getEmotionLabel(diary.emotion as Emotion)}
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
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          maxVisiblePages={5}
          className={styles.pagination}
          data-testid="pagination"
        />
      </div>
      <div className={styles.gap40}></div>
    </div>
  );
}

