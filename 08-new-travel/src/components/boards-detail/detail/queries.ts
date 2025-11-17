import { gql } from "@apollo/client";

export const FETCH_BOARD_LIST = gql`
    query fetchBoardList($boardId: ID!){
        fetchBoard(boardId: $boardId){
            writer
            title
            contents
            createdAt
            youtubeUrl
            likeCount
            dislikeCount
            boardAddress {
                zipcode
                address
                addressDetail
            }
            images
    }
}
`

export const LIKE_BOARD = gql`
    mutation likeBoard($boardId: ID!) {
        likeBoard(boardId: $boardId)
    }
`;

export const DISLIKE_BOARD = gql`
    mutation dislikeBoard($boardId: ID!) {
        dislikeBoard(boardId: $boardId)
    }
`;