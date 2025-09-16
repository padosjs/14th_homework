"use client"

import { useQuery } from "@apollo/client"
import { useParams } from 'next/navigation';
import { FETCH_BOARD_COMMENTS } from './queries';
import { useState } from "react";

export default function useBoardComments() {
    const { boardId } = useParams();

    const { data, loading, error, fetchMore } = useQuery(FETCH_BOARD_COMMENTS, {
        variables: { boardId: String(boardId), page: 1 },
        skip: !boardId,
    });

    const [hasMore, setHasMore] = useState(true)
    const onNext = () => {
        if (data === undefined) return;

        fetchMore({
            variables: { page: Math.ceil((data.fetchBoardComments.length ?? 5) / 5) + 1 },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult.fetchBoardComments?.length) {
                    setHasMore(false)
                    return
                }

                return {
                    fetchBoardComments: [...prev.fetchBoardComments, ...fetchMoreResult.fetchBoardComments]
                }
            }
        })
    }

    return {
        data,
        loading,
        error,
        hasMore,
        onNext
    };
}