'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { CommentFormData, Comment } from '@/types/board'
import { cn } from '@/lib/utils'

interface CommentFormProps {
  onSubmit?: (data: CommentFormData) => Promise<void> | void
  editComment?: Comment
  onCancel?: () => void
  onUpdate?: (commentId: string, data: CommentFormData) => Promise<void> | void
  className?: string
}

const INITIAL_FORM_DATA: CommentFormData = {
  author: '',
  password: '',
  content: '',
  rating: 5,
}

export function CommentForm({ onSubmit, editComment, onCancel, onUpdate, className }: CommentFormProps) {
  const isEditMode = !!editComment
  
  const [formData, setFormData] = useState<CommentFormData>(INITIAL_FORM_DATA)
  const [isLoading, setIsLoading] = useState(false)

  // 수정 모드일 때 폼에 기존 댓글 데이터 미리 채우기
  useEffect(() => {
    if (editComment) {
      setFormData({
        author: editComment.author,
        password: '', // 비밀번호는 매번 새로 입력
        content: editComment.content,
        rating: editComment.rating,
      })
    } else {
      setFormData(INITIAL_FORM_DATA)
    }
  }, [editComment])

  const handleAuthorChange = (value: string) => {
    setFormData((prev) => ({ ...prev, author: value }))
  }

  const handlePasswordChange = (value: string) => {
    setFormData((prev) => ({ ...prev, password: value }))
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      content: e.target.value,
    }))
  }

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      if (isEditMode && editComment) {
        await onUpdate?.(editComment.id, formData)
      } else {
        await onSubmit?.(formData)
        // 성공 후 초기화
        setFormData(INITIAL_FORM_DATA)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6 w-full', className)}>
      {/* 작성자, 비밀번호 입력 */}
      <div className="flex gap-4 w-full">
        <div className="flex-1">
          <Input
            variant="form"
            placeholder="작성자 명을 입력해 주세요."
            value={formData.author}
            onChange={(e) => handleAuthorChange(e.target.value)}
            disabled={isEditMode}
          />
        </div>
        <div className="flex-1">
          <Input
            variant="form"
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            value={formData.password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
        </div>
      </div>

      {/* 별점 선택 */}
      <div className="flex gap-1 items-center w-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleRatingChange(index + 1)}
            className="p-1 hover:opacity-80 transition-opacity"
            aria-label={`${index + 1}점 선택`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={index < formData.rating ? '#FCD34D' : 'none'}
              stroke="#FCD34D"
              strokeWidth="2"
              className="cursor-pointer"
            >
              <polygon points="12 2 15.09 10.26 24 10.35 17.77 16.88 20.16 25.02 12 19.77 3.84 25.02 6.23 16.88 0 10.35 8.91 10.26 12 2" />
            </svg>
          </button>
        ))}
      </div>

      {/* 댓글 내용 입력 */}
      <Textarea
        variant="form"
        placeholder="댓글을 입력해 주세요."
        value={formData.content}
        onChange={handleContentChange}
      />

      {/* 등록/수정 버튼 */}
      <div className="flex justify-end gap-2">
        {isEditMode && (
          <Button
            variant="tertiary"
            size="m"
            onClick={onCancel}
            disabled={isLoading}
          >
            취소
          </Button>
        )}
        <Button
          variant="primary"
          size="m"
          onClick={handleSubmit}
          disabled={!formData.author || !formData.password || !formData.content || isLoading}
        >
          {isLoading ? (isEditMode ? '수정 중...' : '등록 중...') : (isEditMode ? '댓글 수정' : '댓글 등록')}
        </Button>
      </div>
    </div>
  )
}
