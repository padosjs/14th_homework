"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useMutation } from "@apollo/client"
import { BoardPost } from "@/types/board"
import { cn } from "@/lib/utils"
import { DELETE_BOARD } from "@/lib/graphql"

interface BoardListItemProps {
  post: BoardPost
  className?: string
  onRefetch?: () => void
}

export function BoardListItem({ post, className, onRefetch }: BoardListItemProps) {
  const router = useRouter()
  const [deleteBoard] = useMutation(DELETE_BOARD)

  const handleClick = () => {
    router.push(`/boards/${post.id}`)
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent row click navigation

    if (!confirm("정말 이 게시글을 삭제하시겠습니까?")) {
      return
    }

    try {
      await deleteBoard({
        variables: {
          boardId: post.id
        }
      })
      alert("게시글이 삭제되었습니다.")
      onRefetch?.()
    } catch (error) {
      console.error("게시글 삭제 실패:", error)
      alert("게시글 삭제에 실패했습니다.")
    }
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        "group border border-gray-100 rounded-lg px-6 py-3 flex gap-2 items-center w-full hover:bg-gray-50 transition-colors cursor-pointer relative",
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

      {/* 삭제 아이콘 */}
      <div
        onClick={handleDelete}
        className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <Image
          src="/icons/outline/delete.svg"
          alt="Delete"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </div>
    </div>
  )
}
