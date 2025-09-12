"use client";

import Button from "@/components/button/button";
import useBoards from "./hook";
import { TrashIcon } from "@heroicons/react/24/outline";
import styles from "./styles.module.css";
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

export default function BoardsList() {
  const { onClickDelete, onClickRow, data } = useBoards();

  return (
    <div className={styles["main-content"]}>
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
        {data?.fetchBoards?.map((board, index) => (
          <div key={board._id} className={styles["table-row-body"]}>
            <div className={styles["row-content"]} onClick={() => onClickRow(board._id)}>
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
    </div>
  );
}