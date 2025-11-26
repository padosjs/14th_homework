import { useState, ChangeEvent } from 'react';
import { useParams } from 'next/navigation';
import { useMutation } from '@apollo/client';
import {
  CREATE_TRAVELPRODUCT_QUESTION,
  UPDATE_TRAVELPRODUCT_QUESTION,
  FETCH_TRAVELPRODUCT_QUESTIONS,
} from '@/app/trips/[tripId]/queries';

interface IUseQuestionWriteProps {
  isEdit?: boolean;
  questionId?: string;
  initialContent?: string;
  onEditComplete?: () => void;
}

export default function useQuestionWrite({
  isEdit = false,
  questionId,
  initialContent = '',
  onEditComplete,
}: IUseQuestionWriteProps) {
  const { tripId } = useParams();

  // 문의 작성 뮤테이션
  const [createQuestion] = useMutation(CREATE_TRAVELPRODUCT_QUESTION, {
    refetchQueries: [
      {
        query: FETCH_TRAVELPRODUCT_QUESTIONS,
        variables: { travelproductId: String(tripId), page: 1 },
      },
    ],
  });

  // 문의 수정 뮤테이션
  const [updateQuestion] = useMutation(UPDATE_TRAVELPRODUCT_QUESTION, {
    refetchQueries: [
      {
        query: FETCH_TRAVELPRODUCT_QUESTIONS,
        variables: { travelproductId: String(tripId), page: 1 },
      },
    ],
  });

  // 문의 내용 상태
  const [content, setContent] = useState<string>(initialContent);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const MAX_CHARS = 100;

  // 내용 변경 핸들러
  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = event.target.value;
    if (value.length <= MAX_CHARS) {
      setContent(value);
      setIsButtonDisabled(value.trim().length === 0);
    }
  };

  // 문의 작성 핸들러
  const onClickCreateQuestion = async () => {
    try {
      await createQuestion({
        variables: {
          travelproductId: String(tripId),
          createTravelproductQuestionInput: {
            contents: content,
          },
        },
      });
      // 폼 초기화
      setContent('');
      setIsButtonDisabled(true);
    } catch (error) {
      console.error(error);
      alert('문의 등록에 실패했습니다.');
    }
  };

  // 문의 수정 핸들러
  const onClickUpdateQuestion = async () => {
    try {
      if (!questionId) {
        throw new Error('Question ID is missing.');
      }
      await updateQuestion({
        variables: {
          travelproductQuestionId: questionId,
          updateTravelproductQuestionInput: {
            contents: content,
          },
        },
      });
      setContent('');
      setIsButtonDisabled(true);
      if (onEditComplete) {
        onEditComplete();
      }
    } catch (error) {
      console.error(error);
      alert('문의 수정에 실패했습니다.');
    }
  };

  return {
    content,
    onChangeContent,
    onClickCreateQuestion,
    onClickUpdateQuestion,
    isButtonDisabled,
    isEdit,
    charCount: content.length,
    maxChars: MAX_CHARS,
  };
}
