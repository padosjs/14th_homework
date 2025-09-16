"use client"

import styles from './styles.module.css';
import useBoardComments from "./hook";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentItem from "@/components/boards-detail/comment-list-item";
import CommentWrite from "@/components/boards-detail/comment-write";
import { useState } from 'react';

export default function BoardComments() {

    const {
        data,
        loading,
        error,
        hasMore,
        onNext
    } = useBoardComments()

    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

    if (loading) {
        return <p className={styles.statusMessage}>댓글을 불러오는 중입니다...</p>;
    }

    if (error) {
        return <p className={styles.statusMessage}>오류가 발생했습니다: {error.message}</p>;
    }

    return (
        <div>
            <InfiniteScroll
                dataLength={data?.fetchBoardComments.length ?? 0}
                hasMore={hasMore}
                next={onNext}
                loader={<div>로딩중입니다</div>}
            >
                <ul className={styles.commentList}>
                    {data?.fetchBoardComments.map((comment: any) => (
                        // 4. 현재 댓글이 수정 모드인지 확인하여 조건부 렌더링
                        editingCommentId === comment._id ? (
                            // 수정 모드일 때 CommentWrite 컴포넌트 렌더링
                            <CommentWrite
                                key={comment._id}
                                isEdit={true}
                                commentId={comment._id}
                                initialWriter={comment.writer}
                                initialContent={comment.contents}
                                initialRating={comment.rating}
                                onEditComplete={() => setEditingCommentId(null)}  // 새로 추가: 수정 완료 콜백 전달
                            />
                        ) : (
                            // 일반 댓글일 때 CommentItem 컴포넌트 렌더링
                            <CommentItem
                                key={comment._id}
                                comment={comment}
                                onEdit={() => setEditingCommentId(comment._id)} // 2. onEdit 핸들러 props로 전달
                            />
                        )
                    ))}
                </ul>
            </InfiniteScroll>
        </div>
    );
}