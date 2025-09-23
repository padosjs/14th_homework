import { ChangeEvent, useState } from "react";
import _ from "lodash";
import { SearchInputProps, UseSearchReturn } from "./types";

export const useSearch = ({ onSearch }: SearchInputProps): UseSearchReturn => {
    const [keyword, setKeyword] = useState("");

    const getDebounce = _.debounce((value: string) => {
        onSearch(value);
    }, 500);

    const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
        getDebounce(event.target.value);
    };

    return {
        keyword,
        onChangeKeyword,
    };
};