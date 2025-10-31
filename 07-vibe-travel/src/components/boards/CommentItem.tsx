'use client'

import { Comment } from '@/types/board'
import { cn } from '@/lib/utils'

interface CommentItemProps {
  comment: Comment
  className?: string
}

export function CommentItem({ comment, className }: CommentItemProps) {
  return (
    <div className={cn('flex flex-col gap-2 w-full', className)}>
      {/* 프로필, 별점, 수정/삭제 버튼 영역 */}
      <div className="flex items-center justify-between w-full">
        {/* 프로필 & 별점 */}
        <div className="flex gap-2 items-center">
          {/* 프로필 이미지 */}
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="#777777"
              className="w-3 h-3"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>

          {/* 이름 */}
          <p className="typography-l-14-20 text-gray-700">{comment.author}</p>

          {/* 별점 */}
          <div className="flex gap-1 ml-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill={index < comment.rating ? '#FCD34D' : 'none'}
                stroke="#FCD34D"
                strokeWidth="2"
                className="w-3.5 h-3.5"
              >
                <polygon points="12 2 15.09 10.26 24 10.35 17.77 16.88 20.16 25.02 12 19.77 3.84 25.02 6.23 16.88 0 10.35 8.91 10.26 12 2" />
              </svg>
            ))}
          </div>
        </div>

        {/* 수정/삭제 버튼 */}
        <div className="flex gap-2">
          <button className="p-1 hover:opacity-70 transition-opacity" aria-label="수정">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2">
              <path d="M3 17.25V21h3.75L17.81 9.94m-2.85-2.85l2.83-2.83a2 2 0 012.83 0l2.83 2.83a2 2 0 010 2.83l-2.83 2.83m-2.83-2.83l2.83-2.83" />
            </svg>
          </button>
          <button className="p-1 hover:opacity-70 transition-opacity" aria-label="삭제">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* 댓글 내용 */}
      <p className="typography-r-16-24 text-gray-800 whitespace-pre-wrap">{comment.content}</p>

      {/* 날짜 */}
      <div className="flex justify-end">
        <p className="typography-r-14-20 text-gray-500">{comment.date}</p>
      </div>
    </div>
  )
}
