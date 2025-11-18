"use client";

import Button from "@/components/button/button";
import useBoards from "./hook";
import styles from "./styles.module.css";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IBoardsListProps, IBoard } from "./types";
import { useApolloClient } from "@apollo/client";
import { FETCH_BOARD_LIST } from "@/components/boards-detail/detail/queries";
import _ from "lodash";

export default function BoardsList({ data, deleteBoard, refetch }: IBoardsListProps) {
  const { onClickRow, onClickDelete } = useBoards({ deleteBoard, refetch });
  const client = useApolloClient();

  // Debounce 적용: 마우스를 빠르게 움직일 때 불필요한 요청을 방지
  const prefetchBoardDebounce = _.debounce((boardId: string) => {
    client.query({
      query: FETCH_BOARD_LIST,
      variables: { boardId },
    }).then((result) => {
      // 이미지 프리페치: GraphQL 응답에서 이미지 경로 추출하여 미리 다운로드
      const images = result.data?.fetchBoard?.images;
      if (images && images.length > 0) {
        images.forEach((imagePath: string) => {
          const img = new Image();
          img.src = `https://storage.googleapis.com/${imagePath}`;
        });
      }
    });
  }, 200);

  // Prefetch 함수 실행
  const prefetchBoard = (boardId: string) => () => {
    prefetchBoardDebounce(boardId);
  };

  return (
    <div className={styles["table-container"]}>
      <div className={`${styles["table-row-head"]} ${styles["additional-class-if-any"]}`}>
        <div className={`${styles["table-cell-center-head"]} ${styles["number-cell-width"]}`}>
          번호
        </div>
        <div className={`${styles["table-cell-left-head"]} ${styles["title-cell-width"]}`}>
          제목
        </div>
        <div className={`${styles["table-cell-center-head"]} ${styles["writer-cell-width"]}`}>
          작성자
        </div>
        <div className={`${styles["table-cell-center-head"]} ${styles["date-cell-width"]}`}>
          날짜
        </div>
      </div>
      {data?.map((board: IBoard, index: number) => (
        <div key={board._id} className={styles["table-row-body"]}>
          <div
            className={styles["row-content"]}
            onClick={() => onClickRow(board._id)}
            onMouseEnter={prefetchBoard(board._id)}
          >
            <div className={`${styles["table-cell-center-gray"]} ${styles["number-cell-width"]}`}>
              {index + 1}
            </div>
            <div className={`${styles["table-cell-left-black"]} ${styles["title-cell-width"]}`}>
              {board.title}
            </div>
            <div className={`${styles["table-cell-center-black"]} ${styles["writer-cell-width"]}`}>
              {board.writer}
            </div>
            <div className={`${styles["table-cell-center-gray"]} ${styles["date-cell-width"]}`}>
              {new Date(board.createdAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </div>
          </div>
          <div className={styles["button-container"]}>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="simple-button-small" icon={TrashIcon} iconColor="#ABABAB" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>삭제 확인</AlertDialogTitle>
                  <AlertDialogDescription>정말 삭제하시겠습니까?</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onClickDelete(board._id)}>
                    확인
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </div>
  );
}