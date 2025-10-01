import { gql } from "@apollo/client"

export const FETCH_BOARDS = gql`
    query fetchBoards($page: Int, $search: String, $startDate: DateTime, $endDate: DateTime){
        fetchBoards(page: $page, search: $search, startDate: $startDate, endDate: $endDate) {
                _id
                writer
                title
                contents
                createdAt
        }
    }
`
export const DELETE_BOARD = gql`
    mutation deleteBoard($boardId: ID!) {
        deleteBoard(boardId: $boardId)
    }
`

export const FETCH_BOARDS_COUNT = gql`
    query fetchBoardsCount($search: String, $startDate: DateTime, $endDate: DateTime) {
        fetchBoardsCount(search: $search, startDate: $startDate, endDate: $endDate)
    }
`