import { gql } from "@apollo/client";

export const CREATE_BOARD_COMMENT = gql`
    mutation createBoardComment($boardId: ID!, $createBoardCommentInput: CreateBoardCommentInput!) {
        createBoardComment(
            boardId: $boardId,
            createBoardCommentInput: $createBoardCommentInput
        ) {
            _id
            writer
            contents
            rating
        }
    }
`;

export const FETCH_BOARD_COMMENTS = gql`
    query fetchBoardComments($boardId: ID!) {
        fetchBoardComments(boardId: $boardId) {
            _id
            writer
            contents
            createdAt
            rating
        }
    }
`;