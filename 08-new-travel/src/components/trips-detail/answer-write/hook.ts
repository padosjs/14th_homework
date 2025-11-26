import { useState, ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import {
  CREATE_TRAVELPRODUCT_QUESTION_ANSWER,
  UPDATE_TRAVELPRODUCT_QUESTION_ANSWER,
  FETCH_TRAVELPRODUCT_QUESTION_ANSWERS,
} from '@/app/trips/[tripId]/queries';

interface IUseAnswerWriteProps {
  isEdit?: boolean;
  answerId?: string;
  questionId: string;
  initialContent?: string;
  onEditComplete?: () => void;
}

export default function useAnswerWrite({
  isEdit = false,
  answerId,
  questionId,
  initialContent = '',
  onEditComplete,
}: IUseAnswerWriteProps) {
  // 답변 작성 뮤테이션
  const [createAnswer] = useMutation(CREATE_TRAVELPRODUCT_QUESTION_ANSWER, {
    refetchQueries: [
      {
        query: FETCH_TRAVELPRODUCT_QUESTION_ANSWERS,
        variables: { travelproductQuestionId: questionId, page: 1 },
      },
    ],
  });

  // 답변 수정 뮤테이션
  const [updateAnswer] = useMutation(UPDATE_TRAVELPRODUCT_QUESTION_ANSWER, {
    refetchQueries: [
      {
        query: FETCH_TRAVELPRODUCT_QUESTION_ANSWERS,
        variables: { travelproductQuestionId: questionId, page: 1 },
      },
    ],
  });

  // 답변 내용 상태
  const [content, setContent] = useState<string>(initialContent);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  // 내용 변경 핸들러
  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = event.target.value;
    setContent(value);
    setIsButtonDisabled(value.trim().length === 0);
  };

  // 답변 작성 핸들러
  const onClickCreateAnswer = async () => {
    try {
      await createAnswer({
        variables: {
          travelproductQuestionId: questionId,
          createTravelproductQuestionAnswerInput: {
            contents: content,
          },
        },
      });
      // 폼 초기화
      setContent('');
      setIsButtonDisabled(true);
      if (onEditComplete) {
        onEditComplete();
      }
    } catch (error) {
      console.error(error);
      alert('답변 등록에 실패했습니다.');
    }
  };

  // 답변 수정 핸들러
  const onClickUpdateAnswer = async () => {
    try {
      if (!answerId) {
        throw new Error('Answer ID is missing.');
      }
      await updateAnswer({
        variables: {
          travelproductQuestionAnswerId: answerId,
          updateTravelproductQuestionAnswerInput: {
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
      alert('답변 수정에 실패했습니다.');
    }
  };

  return {
    content,
    onChangeContent,
    onClickCreateAnswer,
    onClickUpdateAnswer,
    isButtonDisabled,
    isEdit,
  };
}
