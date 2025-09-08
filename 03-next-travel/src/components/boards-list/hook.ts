"use client"

import { useQuery, useMutation } from "@apollo/client"
import { useRouter } from 'next/navigation';
import { FETCH_BOARDS, DELETE_BOARD } from './queries';
import { IQuery } from "./types";

export default function useBoards() {

    const { data } = useQuery<IQuery>(FETCH_BOARDS, {
        // fetchPolicy: 'network-only', 이 옵션 써서 갱신하였으나 BoardsNew()에서 뮤테이션 시에 리페치하는 걸로 대체 적용해서 해결함
    });
    const router = useRouter();
    const [deleteBoard] = useMutation(DELETE_BOARD);

    const onClickRow = (boardId: string) => {
        router.push(`/boards/${boardId}`);
    };

    const onClickDelete = async (boardId: string) => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");

        if (!confirmDelete) {
            return;
        }
        try {
            await deleteBoard({
                variables: { boardId },
                refetchQueries: [{ query: FETCH_BOARDS }],
            });
        } catch (error) {
            alert("문제가 발생했습니다.");
        }
    };

    return {
        onClickRow,
        onClickDelete,
        data
    }
}