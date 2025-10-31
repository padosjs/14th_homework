// UI에서 사용할 타입
export interface BoardPost {
  id: string
  number: number
  title: string
  author: string
  date: string
  content?: string
  thumbnail?: string
}

export interface BoardListProps {
  posts: BoardPost[]
  isLoading?: boolean
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

// GraphQL API 응답 타입
export interface FetchBoardsResponse {
  fetchBoards: GraphQLBoard[]
}

export interface FetchBoardsCountResponse {
  fetchBoardsCount: number
}

export interface GraphQLBoard {
  _id: string
  writer: string
  title: string
  contents: string
  createdAt: string
}

export interface BoardAddress {
  zipcode?: string
  address?: string
  addressDetail?: string
}

export interface GraphQLBoardDetail {
  _id: string
  writer: string
  title: string
  contents: string
  createdAt: string
  youtubeUrl?: string
  boardAddress?: BoardAddress
  images?: string[]
}

export interface FetchBoardResponse {
  fetchBoard: GraphQLBoardDetail
}

// 게시물 생성 관련 타입
export interface BoardAddressInput {
  zipcode?: string
  address?: string
  addressDetail?: string
}

export interface CreateBoardInput {
  title: string
  contents: string
  writer?: string
  password?: string
  youtubeUrl?: string
  boardAddress?: BoardAddressInput
  images?: string[]
}

export interface CreateBoardResponse {
  createBoard: {
    _id: string
  }
}

// 게시물 수정 관련 타입
export interface UpdateBoardInput {
  title?: string
  contents?: string
  youtubeUrl?: string
  boardAddress?: BoardAddressInput
  images?: string[]
}

export interface UpdateBoardResponse {
  updateBoard: {
    _id: string
  }
}

// 댓글 관련 타입 - GraphQL API 응답
export interface GraphQLComment {
  _id: string
  writer: string
  contents: string
  rating: number
  createdAt: string
}

export interface FetchBoardCommentsResponse {
  fetchBoardComments: GraphQLComment[]
}

export interface CreateBoardCommentInput {
  writer: string
  password: string
  contents: string
  rating: number
}

export interface CreateBoardCommentResponse {
  createBoardComment: GraphQLComment
}

export interface UpdateBoardCommentInput {
  contents?: string
  rating?: number
}

export interface UpdateBoardCommentResponse {
  updateBoardComment: GraphQLComment
}

export interface DeleteBoardCommentResponse {
  deleteBoardComment: boolean
}

// 댓글 관련 타입 - UI
export interface Comment {
  id: string
  author: string
  rating: number // 1-5
  content: string
  date: string
  profileImage?: string
}

export interface CommentFormData {
  author: string
  password: string
  content: string
  rating: number // 1-5
}
