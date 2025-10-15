"use client";

import { usePathname } from "next/navigation";
import { getLayoutVisibility } from "@/commons/constants/url";

export const useAreaVisibility = () => {
  const pathname = usePathname();
  const layoutVisibility = getLayoutVisibility(pathname);

  return {
    showHeader: layoutVisibility?.header.show ?? true,
    showLogo: layoutVisibility?.header.logo ?? true,
    showBanner: layoutVisibility?.banner ?? true,
    showNavigation: layoutVisibility?.navigation ?? true,
    showFooter: layoutVisibility?.footer ?? true,
  };
};

