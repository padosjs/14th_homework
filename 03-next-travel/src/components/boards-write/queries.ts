import { gql } from "@apollo/client"

// 신규 등록을 위한 API 정의
export const CREATE_BOARD = gql`
    mutation createBoard($createBoardInput: CreateBoardInput!) {
            createBoard(createBoardInput: $createBoardInput){
            _id
        }
    }
`
export const FETCH_BOARDS = gql`
    query {
        fetchBoards(page: 1) {
            _id
            writer
            title
            createdAt
        }
    }
`
// 기존 내용 수정을 위한 API 정의
export const UPDATE_BOARD = gql`
   mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {
        updateBoard(
            updateBoardInput: $updateBoardInput
            password: $password,
            boardId: $boardId
        ) {
            _id
        }
    }
`
export const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!){
        fetchBoard(boardId: $boardId){
            writer
            title
            contents
        }
    }
`