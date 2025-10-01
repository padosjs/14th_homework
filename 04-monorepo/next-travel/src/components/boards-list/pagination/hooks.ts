import { PaginationProps, UsePaginationReturn } from "./types";

export const usePagination = (props: PaginationProps): UsePaginationReturn => {
    const { startPage, setStartPage, currentPage, setCurrentPage } = props

    const onClickPage = (event: React.MouseEvent<HTMLButtonElement>) => {
        const page = Number(event.currentTarget.id);
        props.refetch({ page })
        setCurrentPage(page);
    }

    const onClickPrevPage = () => {
        if (startPage === 1) return;
        setStartPage(startPage - 5)
        props.refetch({ page: startPage - 5 })
        setCurrentPage(startPage - 5)
    }

    const onClickNextPage = () => {
        if (startPage + 5 <= props.lastPage) {
            setStartPage(startPage + 5)
            props.refetch({ page: startPage + 5 })
            setCurrentPage(startPage + 5)
        }
    }

    return {
        startPage,
        onClickPage,
        onClickPrevPage,
        onClickNextPage,
        currentPage,
    }
}