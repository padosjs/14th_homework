import { gql } from "@apollo/client";

export const FETCH_BOARD_LIST = gql`
    query fetchBoardList($boardId: ID!){
        fetchBoard(boardId: $boardId){
            writer
            title
            contents
            createdAt
    }
}
`