"use client";

import BoardsList from "@/components/boards-list/list";
import { FETCH_BOARDS, DELETE_BOARD, FETCH_BOARDS_COUNT } from "./queries";
import { useQuery, useMutation } from "@apollo/client";
import { IQuery } from "./types";
import Pagination from "@/components/boards-list/pagination";
import { useState } from "react";
import styles from "./styles.module.css";
import SearchInput from "@/components/boards-list/search/page";
import Button from "@/components/button/button";
import Link from "next/link";
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { withAuth } from "@/commons/hocs/withAuth"


function BoardsListPage() {
    const [keyword, setKeyword] = useState("");
    const [startPage, setStartPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState(undefined);
    const [endDate, setEndDate] = useState(undefined);

    const { data, refetch } = useQuery<IQuery>(FETCH_BOARDS, {
        variables: {
            search: keyword,
            page: currentPage,
            startDate: startDate,
            endDate: endDate,
        },
    });
    const { data: dataBoardsCount, refetch: refetchBoardsCount } = useQuery(
        FETCH_BOARDS_COUNT,
        {
            variables: {
                search: keyword,
                startDate: startDate,
                endDate: endDate,
            },
        }
    );
    const [deleteBoard] = useMutation(DELETE_BOARD);

    const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

    const handleSearch = (newKeyword: string, newStartDate: any, newEndDate: any) => {
        setKeyword(newKeyword);
        setStartDate(newStartDate);

        let adjustedEndDate = newEndDate;
        if (newEndDate) {
            // newEndDate를 복사한 후 시간을 변경합니다.
            adjustedEndDate = new Date(newEndDate);
            adjustedEndDate.setHours(23, 59, 59, 999);
        }
        setEndDate(adjustedEndDate);

        console.log(newStartDate, adjustedEndDate);
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

export default withAuth(BoardsListPage)