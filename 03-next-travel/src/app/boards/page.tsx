"use client";

import BoardsList from "@/components/boards-list/list";
import { FETCH_BOARDS, DELETE_BOARD, FETCH_BOARDS_COUNT } from './queries';
import { useQuery, useMutation } from "@apollo/client";
import { IQuery } from "./types";
import Pagination from "@/components/boards-list/pagination";
import { useState } from "react";
import styles from "./styles.module.css";

export default function BoardsListPage() {
    const { data, refetch } = useQuery<IQuery>(FETCH_BOARDS);

    const [deleteBoard] = useMutation(DELETE_BOARD);

    const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT)
    const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10)

    const [startPage, setStartPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <BoardsList
                    data={data?.fetchBoards ?? []}
                    deleteBoard={deleteBoard}
                    refetch={refetch}
                />
                <Pagination
                    refetch={refetch}
                    lastPage={lastPage}
                    startPage={startPage}
                    setStartPage={setStartPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}