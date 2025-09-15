export interface PaginationProps {
    startPage: number;
    setStartPage: (page: number) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    lastPage: number;
    refetch: (variables: {
        page: number;
    }) => void;
}

export interface UsePaginationReturn {
    startPage: number;
    onClickPage: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onClickPrevPage: () => void;
    onClickNextPage: () => void;
    currentPage: number;
}