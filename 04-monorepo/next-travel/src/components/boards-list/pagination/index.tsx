"use client"

import { usePagination } from "./hooks"
import styles from "./styles.module.css"
import { PaginationProps } from "./types";

export default function Pagination(props: PaginationProps) {
    const {
        startPage,
        onClickPage,
        onClickPrevPage,
        onClickNextPage,
        currentPage,
    } = usePagination(props)

    return (
        <div className={styles['pagination-container']}>
            <button className={styles['pagination-button']} onClick={onClickPrevPage}></button>
            {
                new Array(5).fill("_").map(
                    (_, index) => {
                        const pageNumber = index + startPage;
                        return (
                            pageNumber <= props.lastPage && (
                                <button
                                    key={pageNumber}
                                    id={String(pageNumber)}
                                    onClick={onClickPage}
                                    className={`${styles['pagination-button']} ${pageNumber === currentPage ? styles.active : ''}`}
                                >
                                    {pageNumber}
                                </button>
                            )
                        )
                    }
                )
            }
            <button className={styles['pagination-button']} onClick={onClickNextPage}></button>
        </div>
    )
}