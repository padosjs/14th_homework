"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/boards/SearchBar"
import { DateRangePicker } from "@/components/boards/DateRangePicker"
import { cn } from "@/lib/utils"

interface BoardFiltersProps {
  onSearch?: (query: string, startDate?: Date, endDate?: Date) => void
  className?: string
}

export function BoardFilters({ onSearch, className }: BoardFiltersProps) {
  const [query, setQuery] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    onSearch?.(searchQuery, startDate, endDate)
  }

  const handleDateChange = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start)
    setEndDate(end)
    onSearch?.(query, start, end)
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex gap-3 items-center w-full">
        {/* 날짜 선택 */}
        <div className="bg-gray-50 rounded-lg p-3 flex-shrink-0">
          <DateRangePicker onDateChange={handleDateChange} />
        </div>

        {/* 검색창 */}
        <div className="flex-1">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* 검색 버튼 */}
        <Button
          variant="ghost"
          className="bg-black text-white hover:bg-gray-800 px-4 h-12 rounded-lg typography-sb-18-24"
        >
          검색
        </Button>
      </div>
    </div>
  )
}
