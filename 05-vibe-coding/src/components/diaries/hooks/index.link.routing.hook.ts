import { useRouter } from "next/navigation";
import { URL_PATHS } from "@/commons/constants/url";

export const useDiaryRouting = () => {
  const router = useRouter();

  const navigateToDetail = (id: number) => {
    router.push(URL_PATHS.diaries.detail(String(id)));
  };

  return { navigateToDetail };
};

