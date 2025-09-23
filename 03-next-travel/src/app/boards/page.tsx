"use client";

import BoardsList from "@/components/boards-list/list";
import { FETCH_BOARDS, DELETE_BOARD, FETCH_BOARDS_COUNT } from "./queries";
import { useQuery, useMutation } from "@apollo/client";
import { IQuery } from "./types";
import Pagination from "@/components/boards-list/pagination";
import { useState } from "react";
import styles from "./styles.module.css";
import SearchInput from "@/components/boards-list/search/index";
import Button from "@/components/button/button";
import Link from "next/link";
import { PencilSquareIcon } from '@heroicons/react/24/outline';

export default function BoardsListPage() {
    const [keyword, setKeyword] = useState("");
    const [startPage, setStartPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const { data, refetch } = useQuery<IQuery>(FETCH_BOARDS, {
        variables: {
            search: keyword,
            page: currentPage,
        },
    });
    const { data: dataBoardsCount, refetch: refetchBoardsCount } = useQuery(
        FETCH_BOARDS_COUNT,
        {
            variables: {
                search: keyword,
            },
        }
    );
    const [deleteBoard] = useMutation(DELETE_BOARD);

    const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

    const handleSearch = (newKeyword: string) => {
        setKeyword(newKeyword);
        setCurrentPage(1);
        setStartPage(1);
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1>트립토크 게시판</h1>
                <div className={styles.controlBar}>
                    <SearchInput onSearch={handleSearch} />
                    <div className={styles.linkWrapper}>
                        <Link href="/boards/new">
                            <Button className="blue-button" icon={PencilSquareIcon} text="트립토크 등록" />
                        </Link>
                    </div>
                </div>
                <div className={styles.listContainer}>
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
        </div>
    );
}