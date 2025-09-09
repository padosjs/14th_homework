"use client";

import BoardsDetail from "@/components/boards-detail/detail";
import CommentWrite from "@/components/boards-detail/comment-write";
import BoardComments from "@/components/boards-detail/comment-list";
import styles from "./styles.module.css"

export default function BoardDetailPage() {
    return (

        <div className={styles['page-container']}>
            <div className={styles['main-container']}>
                <BoardsDetail />
                <CommentWrite />
                <BoardComments />
            </div>
        </div>
    );
}