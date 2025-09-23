"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import styles from "./styles.module.css";
import { useSearch } from "./hooks";
import { SearchInputProps } from "./types";

export default function SearchInput({ onSearch }: SearchInputProps) {
    const { keyword, onChangeKeyword } = useSearch({ onSearch });

    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<DateRange | undefined>(undefined);

    return (
        <div className={styles.container}>
            <Popover open={open} onOpenChange={setOpen}>
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
                    <Calendar mode="range" selected={date} captionLayout="dropdown" onSelect={setDate} />
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