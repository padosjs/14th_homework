import { useState, useEffect } from "react";

export type FilterType = "default" | "landscape" | "portrait";

export interface ImageSize {
  width: number;
  height: number;
}

// 모바일 크기 (767px 미만)
const MOBILE_FILTER_SIZE_MAP: Record<FilterType, ImageSize> = {
  default: { width: 280, height: 280 },
  landscape: { width: 280, height: 210 },
  portrait: { width: 280, height: 372 },
};

// 데스크톱 크기 (767px 이상)
const DESKTOP_FILTER_SIZE_MAP: Record<FilterType, ImageSize> = {
  default: { width: 640, height: 640 },
  landscape: { width: 640, height: 480 },
  portrait: { width: 480, height: 640 },
};

export const useImageFilter = () => {
  const [filter, setFilter] = useState<FilterType>("default");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 767);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const imageSize = isMobile 
    ? MOBILE_FILTER_SIZE_MAP[filter] 
    : DESKTOP_FILTER_SIZE_MAP[filter];

  return {
    filter,
    setFilter,
    imageSize,
  };
};

