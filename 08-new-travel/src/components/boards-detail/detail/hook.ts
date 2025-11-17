"use client";

import { useQuery, useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { FETCH_BOARD_LIST, LIKE_BOARD, DISLIKE_BOARD } from './queries';

export default function useBoardsDetail() {

    const addressparams = useParams()
    const router = useRouter();

    const onClickList = () => { router.push(`/boards/`); };
    const onClickEdit = () => { router.push(`/boards/${addressparams.boardId}/edit`); };

    const { data } = useQuery(FETCH_BOARD_LIST, {
        variables: {
            boardId: addressparams.boardId,
        }
    });

    const [likeBoard] = useMutation(LIKE_BOARD);
    const [dislikeBoard] = useMutation(DISLIKE_BOARD);

    const onClickLike = async () => {
        try {
            await likeBoard({
                variables: { boardId: addressparams.boardId },
                optimisticResponse: {
                    likeBoard: (data?.fetchBoard?.likeCount ?? 0) + 1,
                },
                refetchQueries: [
                    {
                        query: FETCH_BOARD_LIST,
                        variables: { boardId: addressparams.boardId }
                    }
                ]
            });
        } catch (error) {
            console.error(error);
        }
    };

    const onClickDislike = async () => {
        try {
            await dislikeBoard({
                variables: { boardId: addressparams.boardId },
                optimisticResponse: {
                    dislikeBoard: (data?.fetchBoard?.dislikeCount ?? 0) + 1,
                },
                refetchQueries: [
                    {
                        query: FETCH_BOARD_LIST,
                        variables: { boardId: addressparams.boardId }
                    }
                ]
            });
        } catch (error) {
            console.error(error);
        }
    };

    return {
        onClickList,
        onClickEdit,
        onClickLike,
        onClickDislike,
        data
    }
}