import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { FETCH_TRAVELPRODUCT_QUESTIONS } from '@/app/trips/[tripId]/queries';

export default function useQuestionList() {
  const { tripId } = useParams();
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { data, loading, error, fetchMore } = useQuery(FETCH_TRAVELPRODUCT_QUESTIONS, {
    variables: { travelproductId: String(tripId), page: 1 },
  });

  const questions = data?.fetchTravelproductQuestions || [];

  // 첫 로드 후 문의 개수가 10개 미만이면 더보기 버튼 숨김
  useEffect(() => {
    if (!loading && questions.length > 0 && questions.length < 10) {
      setHasMore(false);
    }
  }, [loading, questions.length]);

  const onLoadMore = () => {
    const currentPage = Math.ceil(questions.length / 10) + 1;
    fetchMore({
      variables: { page: currentPage },
      updateQuery: (prev, { fetchMoreResult }) => {
        const newQuestions = fetchMoreResult?.fetchTravelproductQuestions || [];
        // 새로 불러온 데이터가 없거나 10개 미만이면 더 이상 데이터가 없음
        if (newQuestions.length === 0 || newQuestions.length < 10) {
          setHasMore(false);
        }
        if (newQuestions.length === 0) {
          return prev;
        }
        return {
          fetchTravelproductQuestions: [
            ...prev.fetchTravelproductQuestions,
            ...newQuestions,
          ],
        };
      },
    });
  };

  return {
    questions,
    loading,
    error,
    editingQuestionId,
    setEditingQuestionId,
    hasMore,
    onLoadMore,
  };
}
