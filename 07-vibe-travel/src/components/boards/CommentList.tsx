'use client'

import { Comment, CommentFormData } from '@/types/board'
import { CommentForm } from './CommentForm'
import { CommentItem } from './CommentItem'
import { cn } from '@/lib/utils'

interface CommentListProps {
  comments: Comment[]
  onCommentSubmit?: (data: CommentFormData) => void
  className?: string
}

export function CommentList({ comments, onCommentSubmit, className }: CommentListProps) {
  return (
    <div className={cn('flex flex-col gap-10 w-full', className)}>
      {/* 댓글 섹션 헤더 */}
      <div className="flex flex-col gap-6 w-full">
        {/* 댓글 제목 */}
        <div className="flex gap-2 items-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#333333" className="w-6 h-6">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
          <h3 className="typography-sb-16-24 text-black">댓글</h3>
        </div>

        {/* 댓글 등록 폼 */}
        <CommentForm onSubmit={onCommentSubmit} />
      </div>

      {/* 댓글 목록 */}
      <div className="flex flex-col gap-8 w-full">
        {comments.map((comment, index) => (
          <div key={comment.id}>
            <CommentItem comment={comment} />
            {index < comments.length - 1 && (
              <div className="border-t border-gray-200 mt-8" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
