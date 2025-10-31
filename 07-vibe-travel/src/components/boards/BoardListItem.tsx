"use client"

import { useRouter } from "next/navigation"
import { BoardPost } from "@/types/board"
import { cn } from "@/lib/utils"

interface BoardListItemProps {
  post: BoardPost
  className?: string
}

export function BoardListItem({ post, className }: BoardListItemProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/boards/${post.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        "border border-gray-100 rounded-lg px-6 py-3 flex gap-2 items-center w-full hover:bg-gray-50 transition-colors cursor-pointer",
        className
      )}
    >
      {/* 번호 */}
      <div className="w-16 flex-shrink-0">
        <p className="typography-l-14-20 text-gray-500 text-center">{post.number}</p>
      </div>

      {/* 제목 */}
      <div className="flex-1 min-w-0">
        <p className="typography-me-14-20 text-gray-900 truncate">{post.title}</p>
      </div>

      {/* 작성자 */}
      <div className="w-24 flex-shrink-0">
        <p className="typography-l-14-20 text-gray-900 text-center truncate">
          {post.author}
        </p>
      </div>

      {/* 날짜 */}
      <div className="w-24 flex-shrink-0">
        <p className="typography-l-14-20 text-gray-500 text-center">{post.date}</p>
      </div>
    </div>
  )
}
