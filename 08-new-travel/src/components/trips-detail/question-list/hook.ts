import { useState } from 'react';
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

  const onLoadMore = () => {
    const currentPage = Math.ceil(questions.length / 10) + 1;
    fetchMore({
      variables: { page: currentPage },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchTravelproductQuestions?.length) {
          setHasMore(false);
          return prev;
        }
        return {
          fetchTravelproductQuestions: [
            ...prev.fetchTravelproductQuestions,
            ...fetchMoreResult.fetchTravelproductQuestions,
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
