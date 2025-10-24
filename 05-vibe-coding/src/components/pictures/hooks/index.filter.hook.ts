import { useState } from "react";

export type FilterType = "default" | "landscape" | "portrait";

export interface ImageSize {
  width: number;
  height: number;
}

const FILTER_SIZE_MAP: Record<FilterType, ImageSize> = {
  default: { width: 640, height: 640 },
  landscape: { width: 640, height: 480 },
  portrait: { width: 480, height: 640 },
};

export const useImageFilter = () => {
  const [filter, setFilter] = useState<FilterType>("default");

  const imageSize = FILTER_SIZE_MAP[filter];

  return {
    filter,
    setFilter,
    imageSize,
  };
};

