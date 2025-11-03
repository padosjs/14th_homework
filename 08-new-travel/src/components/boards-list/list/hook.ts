"use client";

import { useRouter } from "next/navigation";
import { IUseBoardsProps } from "./types";

export default function useBoards({ deleteBoard, refetch }: IUseBoardsProps) {
  const router = useRouter();

  const onClickRow = (boardId: string) => {
    router.push(`/boards/${boardId}`);
  };

  const onClickDelete = async (boardId: string) => {
    await deleteBoard({ variables: { boardId } });
    await refetch();
  };

  return {
    onClickRow,
    onClickDelete,
  };
}