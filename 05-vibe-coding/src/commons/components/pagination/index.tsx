import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

export type PaginationVariant = 'primary' | 'secondary' | 'tertiary';
export type PaginationSize = 'small' | 'medium' | 'large';
export type PaginationTheme = 'light' | 'dark';

export interface PaginationProps {
  variant?: PaginationVariant;
  size?: PaginationSize;
  theme?: PaginationTheme;
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  maxVisiblePages?: number;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  variant = 'primary',
  size = 'medium',
  theme = 'light',
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  className = '',
}) => {
  const handlePageClick = (page: number) => {
    if (page !== currentPage && onPageChange) {
      onPageChange(page);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  // 페이지 번호 배열 생성
  const getPageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageNumbers = getPageNumbers();
  const showPrevButton = totalPages > 1;
  const showNextButton = totalPages > 1;
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const paginationClassName = [
    styles.pagination,
    styles[`pagination--${variant}`],
    styles[`pagination--${size}`],
    styles[`pagination--${theme}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={paginationClassName}>
      {showPrevButton && (
        <button
          className={`${styles['pagination__arrow']} ${
            isPrevDisabled ? styles['pagination__arrow--disabled'] : ''
          }`}
          onClick={handlePrevClick}
          disabled={isPrevDisabled}
          aria-label="이전 페이지"
        >
          <Image
            src={
              isPrevDisabled
                ? '/icons/leftdisabled_outline_light_m.svg'
                : '/icons/leftenable_outline_light_m.svg'
            }
            alt="이전"
            width={24}
            height={24}
          />
        </button>
      )}

      <div className={styles['pagination__pages']}>
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`${styles['pagination__page']} ${
              page === currentPage ? styles['pagination__page--active'] : ''
            }`}
            onClick={() => handlePageClick(page)}
            aria-label={`페이지 ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      {showNextButton && (
        <button
          className={`${styles['pagination__arrow']} ${
            isNextDisabled ? styles['pagination__arrow--disabled'] : ''
          }`}
          onClick={handleNextClick}
          disabled={isNextDisabled}
          aria-label="다음 페이지"
        >
          <Image
            src={
              isNextDisabled
                ? '/icons/rightdisabled_outline_light_m.svg'
                : '/icons/rightenable_outline_light_m.svg'
            }
            alt="다음"
            width={24}
            height={24}
          />
        </button>
      )}
    </div>
  );
};

