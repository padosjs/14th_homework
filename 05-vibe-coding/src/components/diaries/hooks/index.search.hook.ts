import { useState, useCallback } from "react";

export const useDiarySearch = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleSearch = useCallback((keyword: string) => {
    setSearchKeyword(keyword);
  }, []);

  return {
    searchKeyword,
    handleSearch,
  };
};

