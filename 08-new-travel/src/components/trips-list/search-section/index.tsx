"use client";

import { useState } from "react";
import { MagnifyingGlassIcon, CalendarIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { ko } from 'date-fns/locale';
import styles from "./styles.module.css";

export default function SearchSection() {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.searchRow}>
        {/* 날짜 선택기 */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className={styles.datePicker}>
              <CalendarIcon className={styles.calendarIcon} />
              <div className={styles.dateText}>
                {date?.from ? (
                  <>
                    <span>
                      {date.from.getFullYear()}.
                      {String(date.from.getMonth() + 1).padStart(2, '0')}.
                      {String(date.from.getDate()).padStart(2, '0')}
                    </span>
                    <span> - </span>
                    <span>
                      {date.to
                        ? `${date.to.getFullYear()}.${String(date.to.getMonth() + 1).padStart(2, '0')}.${String(date.to.getDate()).padStart(2, '0')}`
                        : 'YYYY.MM.DD'
                      }
                    </span>
                  </>
                ) : (
                  <>
                    <span>YYYY.MM.DD</span>
                    <span> - </span>
                    <span>YYYY.MM.DD</span>
                  </>
                )}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar mode="range" selected={date} captionLayout="dropdown" onSelect={setDate} locale={ko} />
          </PopoverContent>
        </Popover>

        {/* 검색 입력 */}
        <div className={styles.searchInput}>
          <MagnifyingGlassIcon className={styles.searchIcon} />
          <input
            type="text"
            placeholder="제목을 검색해 주세요."
            className={styles.input}
          />
        </div>

        {/* 검색 버튼 */}
        <button className={styles.searchButton}>
          검색
        </button>

        {/* 숙박권 판매하기 버튼 */}
        <button className={styles.sellButton}>
          <PlusIcon className={styles.plusIcon} />
          숙박권 판매하기
        </button>
      </div>
    </div>
  );
}
