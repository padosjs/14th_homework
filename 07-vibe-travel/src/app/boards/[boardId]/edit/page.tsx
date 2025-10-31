"use client"

import { useParams } from "next/navigation"
import { useQuery } from "@apollo/client"
import { FETCH_BOARD } from "@/lib/graphql"
import BoardForm from "@/components/boards/BoardForm"
import type { FetchBoardResponse } from "@/types/board"

export default function EditBoardPage() {
  const params = useParams()
  const boardId = params.boardId as string

  const { data, loading, error } = useQuery<FetchBoardResponse>(FETCH_BOARD, {
    variables: { boardId },
  })

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <div className="typography-me-16-24 text-gray-600">로딩 중...</div>
      </div>
    )
  }

  if (error || !data?.fetchBoard) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <div className="typography-me-16-24 text-gray-600">
          게시글을 불러올 수 없습니다.
        </div>
      </div>
    )
  }

  return <BoardForm mode="edit" boardId={boardId} initialData={data.fetchBoard} />
}
