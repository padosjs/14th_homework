"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@apollo/client"
import { Button } from "@/components/ui/button"
import { BoardFilters } from "@/components/boards/BoardFilters"
import { BoardList } from "@/components/boards/BoardList"
import { Pagination } from "@/components/boards/Pagination"
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "@/lib/graphql"
import { BoardPost, FetchBoardsResponse, FetchBoardsCountResponse, GraphQLBoard } from "@/types/board"

const ITEMS_PER_PAGE = 10

export default function BoardsPage() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [startDate, setStartDate] = useState<string | undefined>(undefined)
  const [endDate, setEndDate] = useState<string | undefined>(undefined)

  const handleSearch = (query: string, start?: Date, end?: Date) => {
    setSearchQuery(query)
    setStartDate(start?.toISOString())
    setEndDate(end?.toISOString())
    setCurrentPage(1) // 검색 시 첫 페이지로 이동
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // 게시글 목록 조회
  const { data: boardsData, loading: boardsLoading, error: boardsError, refetch: refetchBoards } = useQuery<FetchBoardsResponse>(FETCH_BOARDS, {
    variables: {
      page: currentPage,
      search: searchQuery || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined
    },
    fetchPolicy: "network-only"
  })

  // 전체 게시글 수 조회 (페이지네이션용)
  const { data: countData, refetch: refetchCount } = useQuery<FetchBoardsCountResponse>(FETCH_BOARDS_COUNT, {
    variables: {
      search: searchQuery || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined
    }
  })

  // 삭제 후 목록 새로고침 함수
  const handleRefetch = async () => {
    await Promise.all([
      refetchBoards({
        page: currentPage,
        search: searchQuery || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined
      }),
      refetchCount({
        search: searchQuery || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined
      })
    ])
  }

  // GraphQL 응답을 기존 BoardPost 형식으로 변환
  const posts: BoardPost[] = boardsData?.fetchBoards?.map((board: GraphQLBoard, index: number) => ({
    id: board._id,
    number: (countData?.fetchBoardsCount || 0) - ((currentPage - 1) * ITEMS_PER_PAGE + index),
    title: board.title,
    author: board.writer,
    date: new Date(board.createdAt).toLocaleDateString("ko-KR")
  })) || []

  const totalCount = countData?.fetchBoardsCount || 0
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return (
    <main className="w-full max-w-[1280px] mx-auto px-8 py-12">
      <div className="flex flex-col gap-10">
        <h1 className="typography-b-28-36 text-black">트립토크 게시판</h1>

        <div className="flex items-end gap-3">
          <div className="flex-1">
            <BoardFilters onSearch={handleSearch} />
          </div>

          <Button
            onClick={() => router.push("/boards/new")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 h-12 rounded-lg typography-sb-18-24 flex items-center gap-2"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 4a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H5a1 1 0 110-2h6V5a1 1 0 011-1z" />
            </svg>
            트립토크 등록
          </Button>
        </div>

        <div className="min-h-[800px] flex flex-col gap-6">
          {boardsError && (
            <div className="text-red-500 text-center">
              게시글을 불러오는데 실패했습니다.
            </div>
          )}

          {boardsLoading ? (
            <div className="text-center">로딩 중...</div>
          ) : (
            <>
              <BoardList posts={posts} onRefetch={handleRefetch} />

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </main>
  )
}
