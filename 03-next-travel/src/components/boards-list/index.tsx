"use client"

import Button from '@/components/button/button';
import styles from './styles.module.css';
import useBoards from "./hook"

export default function BoardsList() {

    const {
        onClickDelete,
        onClickRow,
        data
    } = useBoards()

    return (
        <div className={styles['main-content']}>
            <div className={styles['table-container']}>
                <div className={`${styles['table-row-head']} ${styles['additional-class-if-any']}`}>
                    <div className={`${styles['table-cell-center-head']} ${styles['number-cell-width']}`}>번호</div>
                    <div className={`${styles['table-cell-left-head']} ${styles['title-cell-width']}`}>제목</div>
                    <div className={`${styles['table-cell-center-head']} ${styles['writer-cell-width']}`}>작성자</div>
                    <div className={`${styles['table-cell-center-head']} ${styles['date-cell-width']}`}>날짜</div>
                </div>
                {data?.fetchBoards?.map((board, index) =>
                    <div
                        key={board._id}
                        className={styles['table-row-body']}
                        onClick={() => onClickRow(board._id)}
                    >
                        <div className={`${styles['table-cell-center-gray']} ${styles['number-cell-width']}`}>{index + 1}</div>
                        <div className={`${styles['table-cell-left-black']} ${styles['title-cell-width']}`}>{board.title}</div>
                        <div className={`${styles['table-cell-center-black']} ${styles['writer-cell-width']}`}>{board.writer}</div>
                        <div className={`${styles['table-cell-center-gray']} ${styles['date-cell-width']}`}>
                            {new Date(board.createdAt).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            })}
                        </div>
                        <div className={styles['button-container']}>
                            <Button
                                className="simple-button"
                                icon="/assets/icons/outline/delete.svg"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClickDelete(board._id);
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}