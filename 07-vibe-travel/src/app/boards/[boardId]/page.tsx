"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useQuery, useMutation } from "@apollo/client"
import { FETCH_BOARD, FETCH_BOARD_COMMENTS, CREATE_BOARD_COMMENT, UPDATE_BOARD_COMMENT, DELETE_BOARD_COMMENT } from "@/lib/graphql"
import { FetchBoardResponse, Comment, CommentFormData, FetchBoardCommentsResponse, CreateBoardCommentResponse, UpdateBoardCommentResponse, DeleteBoardCommentResponse, GraphQLComment } from "@/types/board"
import { CommentList } from "@/components/boards/CommentList"

function normalizeImageUrl(src: string): string {
  if (!src) return src
  if (/^https?:\/\//i.test(src)) return src
  if (src.startsWith("/")) return src
  return `https://storage.googleapis.com/${encodeURI(src)}`
}

function getYoutubeEmbedUrl(url: string): string | null {
  if (!url) return null

  // 이미 embed URL이면 그대로 반환
  if (url.includes("youtube.com/embed/")) return url

  // youtube.com/watch?v=ID 형식
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (watchMatch?.[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`
  }

  return null
}

// GraphQL 댓글 형식을 UI 형식으로 변환
function transformGraphQLComment(graphQLComment: GraphQLComment): Comment {
  const formattedDate = new Date(graphQLComment.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).replace(/\./g, ".").slice(0, -1)

  return {
    id: graphQLComment._id,
    author: graphQLComment.writer,
    rating: graphQLComment.rating,
    content: graphQLComment.contents,
    date: formattedDate,
    profileImage: undefined
  }
}

export default function BoardDetailPage({ params }: { params: { boardId: string } }) {
  const router = useRouter()
  const { data, loading, error } = useQuery<FetchBoardResponse>(FETCH_BOARD, {
    variables: { boardId: params.boardId },
    fetchPolicy: "network-only"
  })

  // 댓글 조회 쿼리
  const { data: commentsData, refetch: refetchComments } = useQuery<FetchBoardCommentsResponse>(FETCH_BOARD_COMMENTS, {
    variables: { boardId: params.boardId },
    fetchPolicy: "network-only"
  })

  // 댓글 작성 뮤테이션
  const [createBoardComment] = useMutation<CreateBoardCommentResponse>(CREATE_BOARD_COMMENT)

  // 댓글 수정 뮤테이션
  const [updateBoardComment] = useMutation<UpdateBoardCommentResponse>(UPDATE_BOARD_COMMENT)

  // 댓글 삭제 뮤테이션
  const [deleteBoardComment] = useMutation<DeleteBoardCommentResponse>(DELETE_BOARD_COMMENT)

  const handleCommentSubmit = async (formData: CommentFormData) => {
    try {
      await createBoardComment({
        variables: {
          boardId: params.boardId,
          createBoardCommentInput: {
            writer: formData.author,
            password: formData.password,
            contents: formData.content,
            rating: formData.rating
          }
        }
      })
      // 댓글 작성 성공 후 댓글 목록 새로고침
      refetchComments()
    } catch (error) {
      console.error("댓글 작성 실패:", error)
      alert("댓글 작성에 실패했습니다.")
    }
  }

  const handleCommentUpdate = async (commentId: string, formData: CommentFormData) => {
    try {
      await updateBoardComment({
        variables: {
          boardCommentId: commentId,
          updateBoardCommentInput: {
            contents: formData.content,
            rating: formData.rating
          },
          password: formData.password
        }
      })
      // 댓글 수정 성공 후 댓글 목록 새로고침
      refetchComments()
    } catch (error) {
      console.error("댓글 수정 실패:", error)
      alert("댓글 수정에 실패했습니다.")
    }
  }

  const handleCommentDelete = async (commentId: string) => {
    // 비밀번호 확인
    const password = prompt("댓글 비밀번호를 입력하세요:")
    if (!password) {
      return // 사용자가 취소하거나 빈 값 입력
    }

    try {
      await deleteBoardComment({
        variables: {
          boardCommentId: commentId,
          password: password
        }
      })
      // 댓글 삭제 성공 후 댓글 목록 새로고침
      refetchComments()
    } catch (error) {
      console.error("댓글 삭제 실패:", error)
      alert("댓글 삭제에 실패했습니다.")
    }
  }

  // GraphQL 댓글 데이터를 UI 형식으로 변환
  const comments: Comment[] = commentsData?.fetchBoardComments?.map(transformGraphQLComment) || []

  if (loading) {
    return (
      <main className="w-full max-w-[1280px] mx-auto px-8 py-12">
        <div className="flex items-center justify-center h-96">
          <p className="typography-r-16-24 text-gray-500">로딩 중...</p>
        </div>
      </main>
    )
  }

  if (error || !data?.fetchBoard) {
    return (
      <main className="w-full max-w-[1280px] mx-auto px-8 py-12">
        <div className="flex items-center justify-center h-96">
          <p className="typography-r-16-24 text-red-500">게시글을 불러올 수 없습니다.</p>
        </div>
      </main>
    )
  }

  const board = data.fetchBoard
  const formattedDate = new Date(board.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).replace(/\./g, ".").slice(0, -1)

  const post = {
    id: params.boardId,
    title: board.title,
    author: board.writer,
    date: formattedDate,
    content: board.contents,
    likes: 0,
    dislikes: 0,
  }

  const youtubeEmbedUrl = board.youtubeUrl ? getYoutubeEmbedUrl(board.youtubeUrl) : null

  return (
    <main className="w-full max-w-[1280px] mx-auto px-8 py-12">
        <div className="flex flex-col gap-10">
          {/* Post Title */}
          <h1 className="typography-b-28-36 text-black w-full whitespace-pre-wrap">
            {post.title}
          </h1>

          {/* Post Metadata */}
          <div className="flex flex-col gap-4">
            {/* Author and Date */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <img
                    src="/icons/outline/person.svg"
                    alt="profile"
                    width={16}
                    height={16}
                  />
                </div>
                <p className="typography-l-14-20 text-gray-700">{post.author}</p>
              </div>
              <p className="typography-r-14-20 text-gray-500">{post.date}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-200" />

            {/* Link and Location Icons */}
            <div className="flex gap-2 justify-end">
              <button className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity">
                <img
                  src="/icons/outline/link.svg"
                  alt="link"
                  width={24}
                  height={24}
                />
              </button>
              <button className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity">
                <img
                  src="/icons/outline/location.svg"
                  alt="location"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>

          {/* YouTube Video */}
          {youtubeEmbedUrl && (
            <div className="w-full rounded-lg overflow-hidden bg-black flex items-center justify-center" style={{ aspectRatio: "16 / 9" }}>
              <iframe
                width="100%"
                height="100%"
                src={youtubeEmbedUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  border: 'none',
                  display: 'block'
                }}
              />
            </div>
          )}

        {/* Images (본문 상단) */}
        {Array.isArray(board.images) && board.images.filter(Boolean).length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {board.images.filter(Boolean).map((rawSrc: string, idx: number) => (
              <div
                key={idx}
                className="relative w-full overflow-hidden rounded-lg bg-gray-50"
                style={{ aspectRatio: "4 / 3" }}
              >
                <img
                  src={normalizeImageUrl(rawSrc)}
                  alt={`게시글 이미지 ${idx + 1}`}
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        )}

          {/* Post Content */}
          <div className="typography-r-16-24 text-black whitespace-pre-wrap">
            {post.content}
          </div>

          {/* Like/Dislike Section */}
          <div className="flex gap-6 items-center justify-center">
            {/* Bad Button */}
            <div className="flex flex-col gap-1 items-center">
              <button className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity">
                <img
                  src="/icons/outline/bad.svg"
                  alt="dislike"
                  width={24}
                  height={24}
                />
              </button>
              <p className="typography-r-14-20 text-gray-700">{post.dislikes}</p>
            </div>

            {/* Good Button */}
            <div className="flex flex-col gap-1 items-center">
              <button className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity">
                <img
                  src="/icons/outline/good.svg"
                  alt="like"
                  width={24}
                  height={24}
                />
              </button>
              <p className="typography-r-14-20 text-red-500 font-semibold">{post.likes}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-6 items-center justify-center">
            {/* Back Button */}
            <Button
              variant="tertiary"
              className="flex items-center gap-2"
              onClick={() => router.push("/boards")}
            >
              <img
                src="/icons/outline/left_arrow.svg"
                alt="back"
                width={24}
                height={24}
              />
              목록으로
            </Button>

            {/* Edit Button */}
            <Button
              variant="tertiary"
              className="flex items-center gap-2"
              onClick={() => router.push(`/boards/${params.boardId}/edit`)}
            >
              <img
                src="/icons/outline/edit.svg"
                alt="edit"
                width={24}
                height={24}
              />
              수정하기
            </Button>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gray-200" />

          {/* Comments Section */}
          <CommentList
            comments={comments}
            onCommentSubmit={handleCommentSubmit}
            onCommentUpdate={handleCommentUpdate}
            onCommentDelete={handleCommentDelete}
          />
        </div>
    </main>
  )
}
