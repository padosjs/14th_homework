import { useInfiniteQuery } from "@tanstack/react-query";

interface DogApiResponse {
  message: string[];
  status: string;
}

const fetchDogs = async (): Promise<DogApiResponse> => {
  const response = await fetch(
    "https://dog.ceo/api/breeds/image/random/6"
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch dogs");
  }
  
  return response.json();
};

export const useFetchDogs = () => {
  return useInfiniteQuery({
    queryKey: ["dogs"],
    queryFn: fetchDogs,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // 무한 스크롤을 위해 항상 다음 페이지 반환
      return allPages.length + 1;
    },
  });
};

