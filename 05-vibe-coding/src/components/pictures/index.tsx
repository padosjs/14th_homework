"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Selectbox } from "@/commons/components/selectbox";
import { useFetchDogs } from "./hooks/index.binding.hook";
import { useImageFilter } from "./hooks/index.filter.hook";
import styles from "./styles.module.css";

const FILTER_OPTIONS = [
  { value: "default", label: "기본" },
  { value: "landscape", label: "가로형" },
  { value: "portrait", label: "세로형" },
];

export default function Pictures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { filter, setFilter, imageSize } = useImageFilter();
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useFetchDogs();

  // 모든 강아지 이미지를 하나의 배열로 합치기
  const allDogs = data?.pages.flatMap((page) => page.message) ?? [];

  // 무한스크롤 구현 - 스크롤 이벤트 기반
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isFetchingNextPage || !hasNextPage) {
        return;
      }

      const container = containerRef.current;
      const images = container.querySelectorAll('[data-testid="dog-image"]');
      
      if (images.length < 2) return;

      // 마지막에서 두 번째 이미지
      const targetImage = images[images.length - 2] as HTMLElement;
      
      if (targetImage) {
        const rect = targetImage.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // 초기 체크
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [allDogs.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className={styles.container} data-testid="pictures-container" ref={containerRef}>
      <div className={styles.gap32}></div>
      <div className={styles.filter}>
        <div className={styles.selectboxWrapper}>
          <Selectbox
            variant="primary"
            theme="light"
            size="medium"
            options={FILTER_OPTIONS}
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            data-testid="filter-selectbox"
          />
        </div>
      </div>
      <div className={styles.gap42}></div>
      <div className={styles.main}>
        {isLoading && (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={`splash-${i}`}
                className={styles.splashScreen}
                data-testid="splash-screen"
                style={{
                  width: `${imageSize.width}px`,
                  height: `${imageSize.height}px`,
                }}
              />
            ))}
          </>
        )}

        {!isLoading && !isError && (
          <>
            {allDogs.map((dogUrl, index) => (
              <div 
                key={`${dogUrl}-${index}`} 
                className={styles.imageWrapper}
                style={{
                  width: `${imageSize.width}px`,
                  height: `${imageSize.height}px`,
                }}
              >
                <Image
                  src={dogUrl}
                  alt={`강아지 사진 ${index + 1}`}
                  width={imageSize.width}
                  height={imageSize.height}
                  className={styles.image}
                  data-testid="dog-image"
                  unoptimized
                />
              </div>
            ))}

            {isFetchingNextPage && (
              <>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={`splash-next-${i}`}
                    className={styles.splashScreen}
                    data-testid="splash-screen"
                    style={{
                      width: `${imageSize.width}px`,
                      height: `${imageSize.height}px`,
                    }}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

