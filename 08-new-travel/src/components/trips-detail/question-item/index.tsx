import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import AnswerWrite from '../answer-write';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import {
  DELETE_TRAVELPRODUCT_QUESTION,
  DELETE_TRAVELPRODUCT_QUESTION_ANSWER,
  FETCH_TRAVELPRODUCT_QUESTIONS,
  FETCH_TRAVELPRODUCT_QUESTION_ANSWERS,
} from '@/app/trips/[tripId]/queries';
import { useParams } from 'next/navigation';
import styles from './styles.module.css';

interface IQuestionItemProps {
  question: any;
  onEdit: () => void;
  sellerId?: string;
  currentUserId?: string;
}

export default function QuestionItem({
  question,
  onEdit,
  sellerId,
  currentUserId,
}: IQuestionItemProps) {
  const { tripId } = useParams();
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteAnswerDialogOpen, setIsDeleteAnswerDialogOpen] = useState(false);
  const [deletingAnswerId, setDeletingAnswerId] = useState<string | null>(null);

  const { data: answersData } = useQuery(FETCH_TRAVELPRODUCT_QUESTION_ANSWERS, {
    variables: { travelproductQuestionId: question._id, page: 1 },
  });

  const [deleteQuestion] = useMutation(DELETE_TRAVELPRODUCT_QUESTION, {
    update(cache, { data }) {
      if (data?.deleteTravelproductQuestion) {
        cache.modify({
          fields: {
            fetchTravelproductQuestions(existingQuestions = [], { readField }) {
              return existingQuestions.filter(
                (questionRef: any) => readField('_id', questionRef) !== question._id
              );
            },
          },
        });
      }
    },
  });

  const [deleteAnswer] = useMutation(DELETE_TRAVELPRODUCT_QUESTION_ANSWER, {
    update(cache, { data }) {
      if (data?.deleteTravelproductQuestionAnswer) {
        cache.modify({
          fields: {
            fetchTravelproductQuestionAnswers(existingAnswers = [], { readField }) {
              return existingAnswers.filter(
                (answerRef: any) => readField('_id', answerRef) !== deletingAnswerId
              );
            },
          },
        });
      }
    },
  });

  const handleDelete = async () => {
    try {
      await deleteQuestion({
        variables: { travelproductQuestionId: question._id },
      });
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const handleDeleteAnswer = async () => {
    if (!deletingAnswerId) return;
    try {
      await deleteAnswer({
        variables: { travelproductQuestionAnswerId: deletingAnswerId },
      });
      setIsDeleteAnswerDialogOpen(false);
      setDeletingAnswerId(null);
    } catch (error) {
      console.error('답변 삭제 실패:', error);
      alert('답변 삭제에 실패했습니다.');
    }
  };

  const answers = answersData?.fetchTravelproductQuestionAnswers || [];
  const isOwner = question.user?._id === currentUserId;
  const canAnswer = sellerId === currentUserId;

  return (
    <div className={styles['question-item']}>
      <div className={styles['question-header']}>
        <div className={styles['user-info']}>
          <img
            src={
              question.user?.picture
                ? `https://storage.googleapis.com/${question.user.picture}`
                : '/assets/images/profilephoto.jpg'
            }
            alt={question.user?.name || '사용자'}
            className={styles['profile-image']}
            onError={(e) => {
              e.currentTarget.src = '/assets/images/profilephoto.jpg';
            }}
          />
          <span className={styles['user-name']}>{question.user?.name || '익명'}</span>
          <span className={styles['date']}>
            {new Date(question.createdAt).toLocaleDateString()}
          </span>
        </div>
        {isOwner && (
          <div className={styles['button-group']}>
            <button className={styles['icon-button']} onClick={onEdit}>
              <PencilIcon className={styles['icon']} />
            </button>
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <AlertDialogTrigger asChild>
                <button className={styles['icon-button']}>
                  <TrashIcon className={styles['icon']} />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>문의를 삭제하시겠어요?</AlertDialogTitle>
                  <AlertDialogDescription>
                    삭제된 문의는 복구할 수 없습니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
      <p className={styles['question-content']}>{question.contents}</p>

      {answers.length > 0 && (
        <div className={styles['answers-section']}>
          {answers.map((answer: any) => (
            editingAnswerId === answer._id ? (
              <AnswerWrite
                key={answer._id}
                isEdit={true}
                answerId={answer._id}
                questionId={question._id}
                initialContent={answer.contents}
                onEditComplete={() => setEditingAnswerId(null)}
              />
            ) : (
              <div key={answer._id} className={styles['answer-item']}>
                <div className={styles['answer-header']}>
                  <div className={styles['user-info']}>
                    <img
                      src={
                        answer.user?.picture
                          ? `https://storage.googleapis.com/${answer.user.picture}`
                          : '/assets/images/profilephoto.jpg'
                      }
                      alt={answer.user?.name || '판매자'}
                      className={styles['profile-image']}
                      onError={(e) => {
                        e.currentTarget.src = '/assets/images/profilephoto.jpg';
                      }}
                    />
                    <span className={styles['user-name']}>{answer.user?.name || '판매자'}</span>
                    <span className={styles['seller-badge']}>판매자</span>
                    <span className={styles['date']}>
                      {new Date(answer.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {canAnswer && (
                    <div className={styles['button-group']}>
                      <button
                        className={styles['icon-button']}
                        onClick={() => setEditingAnswerId(answer._id)}
                      >
                        <PencilIcon className={styles['icon']} />
                      </button>
                      <button
                        className={styles['icon-button']}
                        onClick={() => {
                          setDeletingAnswerId(answer._id);
                          setIsDeleteAnswerDialogOpen(true);
                        }}
                      >
                        <TrashIcon className={styles['icon']} />
                      </button>
                    </div>
                  )}
                </div>
                <p className={styles['answer-content']}>{answer.contents}</p>
              </div>
            )
          ))}
        </div>
      )}

      {canAnswer && !showAnswerForm && answers.length === 0 && (
        <button
          className={styles['answer-button']}
          onClick={() => setShowAnswerForm(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7.11856 17.1153C6.8679 17.1153 6.65773 17.0305 6.48806 16.861C6.31856 16.6915 6.23381 16.4814 6.23381 16.2308V14.7308H18.6088L18.9261 15.048V6H20.4261C20.6767 6 20.8868 6.08475 21.0563 6.25425C21.226 6.42392 21.3108 6.634 21.3108 6.8845V18.4693C21.3108 18.8723 21.1258 19.1522 20.7558 19.309C20.386 19.4658 20.0587 19.4019 19.7741 19.1173L17.7723 17.1153H7.11856ZM6.23381 12.7308L4.23206 14.7328C3.9474 15.0173 3.62015 15.0812 3.25031 14.9245C2.88031 14.7677 2.69531 14.4877 2.69531 14.0845V3.38475C2.69531 3.13408 2.78015 2.92392 2.94981 2.75425C3.11931 2.58475 3.3294 2.5 3.58006 2.5H16.0416C16.2922 2.5 16.5023 2.58475 16.6718 2.75425C16.8413 2.92392 16.9261 3.13408 16.9261 3.38475V11.8463C16.9261 12.0968 16.8413 12.3068 16.6718 12.4765C16.5023 12.646 16.2922 12.7308 16.0416 12.7308H6.23381ZM15.4261 11.2308V4H4.19531V11.9233L4.88781 11.2308H15.4261Z" fill="#333333" />
          </svg>
          답변하기
        </button>
      )}

      {showAnswerForm && (
        <AnswerWrite
          questionId={question._id}
          onEditComplete={() => setShowAnswerForm(false)}
        />
      )}

      <AlertDialog open={isDeleteAnswerDialogOpen} onOpenChange={setIsDeleteAnswerDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>답변을 삭제하시겠어요?</AlertDialogTitle>
            <AlertDialogDescription>
              삭제된 답변은 복구할 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAnswer}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
