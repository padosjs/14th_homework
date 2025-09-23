import { ChangeEvent } from "react";

export interface SearchInputProps {
    onSearch: (keyword: string) => void;
}

export interface UseSearchReturn {
    keyword: string;
    onChangeKeyword: (event: ChangeEvent<HTMLInputElement>) => void;
}