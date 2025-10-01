"use client";

import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { FETCH_BOARD_LIST } from './queries';

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

    return {
        onClickList,
        onClickEdit,
        data
    }
}