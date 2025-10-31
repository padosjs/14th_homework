"use client"

import { BoardPost } from "@/types/board"
import { BoardListItem } from "@/components/boards/BoardListItem"
import { cn } from "@/lib/utils"

interface BoardListProps {
  posts: BoardPost[]
  className?: string
}

export function BoardList({ posts, className }: BoardListProps) {
  return (
    <div className={cn("bg-white rounded-2xl shadow-custom overflow-hidden px-8 py-4", className)}>
      {/* 헤더 */}
      <div className="px-6 py-4 flex gap-2 items-center bg-white">
        {/* 번호 헤더 */}
        <div className="w-16 flex-shrink-0">
          <p className="typography-me-16-20 text-gray-900 text-center">번호</p>
        </div>

        {/* 제목 헤더 */}
        <div className="flex-1 min-w-0">
          <p className="typography-me-16-20 text-gray-900">제목</p>
        </div>

        {/* 작성자 헤더 */}
        <div className="w-24 flex-shrink-0">
          <p className="typography-me-16-20 text-gray-900 text-center">작성자</p>
        </div>

        {/* 날짜 헤더 */}
        <div className="w-24 flex-shrink-0">
          <p className="typography-me-16-20 text-gray-900 text-center">날짜</p>
        </div>
      </div>

      {/* 게시글 목록 */}
      <div className="px-6 py-6 space-y-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <BoardListItem key={post.id} post={post} />
          ))
        ) : (
          <div className="py-12 text-center">
            <p className="typography-r-16-24 text-gray-500">게시글이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}
