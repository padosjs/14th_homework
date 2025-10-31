"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DateRangePickerProps {
  onDateChange?: (startDate: Date | undefined, endDate: Date | undefined) => void
  className?: string
}

export function DateRangePicker({ onDateChange, className }: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date)
    onDateChange?.(date, endDate)
  }

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date)
    onDateChange?.(startDate, date)
  }

  const startDateString = startDate ? format(startDate, "yyyy.MM.dd") : "YYYY.MM.DD"
  const endDateString = endDate ? format(endDate, "yyyy.MM.dd") : "YYYY.MM.DD"

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* 캘린더 아이콘 */}
      <svg
        className="w-6 h-6 text-gray-700 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>

      {/* 시작 날짜 */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="typography-r-16-24 text-gray-600 hover:text-gray-900 transition-colors">
            {startDateString}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={handleStartDateChange}
            disabled={(date) => (endDate ? date > endDate : false)}
          />
        </PopoverContent>
      </Popover>

      {/* 대시 */}
      <span className="typography-r-16-24 text-gray-600">-</span>

      {/* 종료 날짜 */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="typography-r-16-24 text-gray-600 hover:text-gray-900 transition-colors">
            {endDateString}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={handleEndDateChange}
            disabled={(date) => (startDate ? date < startDate : false)}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
