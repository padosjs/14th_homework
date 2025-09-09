"use client"

import { useQuery } from "@apollo/client"
import { useParams } from 'next/navigation';
import { FETCH_BOARD_COMMENTS } from './queries';

export default function useBoardComments() {
    const { boardId } = useParams();

    const { data, loading, error } = useQuery(FETCH_BOARD_COMMENTS, {
        variables: { boardId: String(boardId) },
        skip: !boardId, // boardId가 없으면 쿼리를 실행하지 않습니다.
    });

    return {
        data,
        loading,
        error
    };
}