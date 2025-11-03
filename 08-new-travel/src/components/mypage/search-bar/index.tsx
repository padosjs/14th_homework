"use client";

import { useState } from "react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Button from "@/components/button/button";
import styles from "./styles.module.css";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  placeholder = "상품명을 검색하세요",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch?.(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch?.("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <div className={styles.inputContainer}>
          <MagnifyingGlassIcon className={styles.icon} />
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.input}
          />
          {query && (
            <Button
              className="simple-button-small"
              icon={XMarkIcon}
              onClick={handleClear}
            />
          )}
        </div>
        <Button className="black-button" text="검색" onClick={handleSearch} />
      </div>
    </div>
  );
}
