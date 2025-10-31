"use client"

import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  // 고정 그룹 기반 페이지 윈도우 계산 (1-5, 6-10, 11-15 등)
  const getPages = () => {
    const windowSize = 5
    const currentGroup = Math.ceil(currentPage / windowSize)
    const startPage = (currentGroup - 1) * windowSize + 1
    const endPage = Math.min(currentGroup * windowSize, totalPages)

    const pages = []
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  const pages = getPages()
  const windowSize = 5
  const currentGroup = Math.ceil(currentPage / windowSize)
  const groupStartPage = (currentGroup - 1) * windowSize + 1
  const groupEndPage = Math.min(currentGroup * windowSize, totalPages)

  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      {/* 이전 그룹 버튼 */}
      <button
        onClick={() => onPageChange(Math.max(1, groupStartPage - 1))}
        disabled={currentPage === 1}
        className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* 페이지 번호 버튼들 */}
      <div className="flex gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "w-8 h-8 rounded-lg typography-me-16-24 transition-colors",
              currentPage === page
                ? "bg-gray-100 text-black"
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            {page}
          </button>
        ))}
      </div>

      {/* 다음 그룹 버튼 */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, groupEndPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  )
}
