"use client"

import styles from './styles.module.css';
import Button from "@/components/button/button";
import useBoardComments from "./hook";

export default function BoardComments() {

    const {
        data,
        loading,
        error
    } = useBoardComments()

    if (loading) {
        return <p className={styles.statusMessage}>댓글을 불러오는 중입니다...</p>;
    }

    if (error) {
        return <p className={styles.statusMessage}>오류가 발생했습니다: {error.message}</p>;
    }

    return (
        <div>
            {data?.fetchBoardComments.length > 0 ? (
                <ul className={styles.commentList}>
                    {data.fetchBoardComments.map((comment: any) => (
                        <li key={comment._id} className={styles.commentItem}>
                            <div className={styles.commentWriter}>
                                <img src="/assets/images/profileimg.png" className={styles.profileImage} />{comment.writer}
                                <div className={styles.ratingGroup}>
                                    <img src="/assets/icons/filled/star.svg" />
                                    <img src="/assets/icons/filled/star.svg" />
                                    <img src="/assets/icons/filled/star.svg" />
                                    <img src="/assets/icons/filled/star.svg" />
                                    <img src="/assets/icons/filled/star.svg" />
                                </div>
                                <div className={styles.buttonGroup}>
                                    <Button className="simple-button-small" icon="/assets/icons/outline/edit.svg" />
                                    <Button className="simple-button-small" icon="/assets/icons/outline/close.svg" />
                                </div>
                            </div>
                            <span className={styles.commentContents}>{comment.contents}</span>
                            <span className={styles.commentDate}> {new Date(comment.createdAt).toLocaleDateString()}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.statusMessage}>등록된 댓글이 없습니다.</p>
            )}
        </div>
    );
}