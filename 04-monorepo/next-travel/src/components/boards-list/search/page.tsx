"use client";

import * as React from "react";
import { ChangeEvent, useState } from "react";
import _ from "lodash";
import { ChevronDownIcon } from "lucide-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ko } from 'date-fns/locale';
import styles from "./styles.module.css";

interface SearchInputProps { onSearch: (newKeyword: string, newStartDate: any, newEndDate: any) => void; }

const useSearch = ({ onSearch }: SearchInputProps) => {
    const [keyword, setKeyword] = useState("");
    const [date, setDate] = useState<DateRange | undefined>(undefined);
    const [open, setOpen] = useState(false);

    const getDebounce = React.useCallback(
        _.debounce((currentKeyword: string, currentDate: DateRange | undefined) => {
            onSearch(currentKeyword, currentDate?.from, currentDate?.to);
        }, 500),
        [onSearch]
    );

    const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
        const newKeyword = event.target.value;
        setKeyword(newKeyword);
        getDebounce(newKeyword, date);
    };

    const onChangeDate = (newDate: DateRange | undefined) => {
        setDate(newDate);
        getDebounce(keyword, newDate);
    };

    const toggleOpen = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    return {
        keyword,
        onChangeKeyword,
        date,
        onChangeDate,
        open,
        toggleOpen,
    };
};


export default function SearchInput({ onSearch }: SearchInputProps) {

    const { keyword, onChangeKeyword, date, onChangeDate, open, toggleOpen } = useSearch({ onSearch });

    return (
        <div className={styles.container}>
            <Popover open={open} onOpenChange={toggleOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" id="date" className={styles.calendarContainer}>
                        {date?.from ? (
                            date.to ? `${date.from.toLocaleDateString()} - ${date.to.toLocaleDateString()}` : date.from.toLocaleDateString()
                        ) : (
                            "날짜 범위 선택"
                        )}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar mode="range" selected={date} captionLayout="dropdown" onSelect={onChangeDate} locale={ko} />
                </PopoverContent>
            </Popover>
            <div className={styles.inputContainer}>
                <MagnifyingGlassIcon className={styles.icon} />
                <input
                    className={styles.input}
                    type="text"
                    onChange={onChangeKeyword}
                    placeholder="제목을 검색해주세요."
                    value={keyword}
                />
            </div>
        </div>
    );
}