import QuestionWrite from '../question-write';
import QuestionItem from '../question-item';
import useQuestionList from './hook';
import styles from './styles.module.css';

interface IQuestionListProps {
  sellerId?: string;
  currentUserId?: string;
}

export default function QuestionList({ sellerId, currentUserId }: IQuestionListProps) {
  const {
    questions,
    loading,
    error,
    editingQuestionId,
    setEditingQuestionId,
    hasMore,
    onLoadMore,
  } = useQuestionList();

  if (loading) return <p className={styles['loading']}>문의를 불러오는 중...</p>;
  if (error) return <p className={styles['error']}>문의를 불러올 수 없습니다.</p>;
  if (!questions.length) return <p className={styles['empty']}>등록된 문의사항이 없습니다.</p>;

  return (
    <div className={styles['question-list']}>
      {questions.map((question: any) => (
        editingQuestionId === question._id ? (
          <QuestionWrite
            key={question._id}
            isEdit={true}
            questionId={question._id}
            initialContent={question.contents}
            onEditComplete={() => setEditingQuestionId(null)}
          />
        ) : (
          <QuestionItem
            key={question._id}
            question={question}
            onEdit={() => setEditingQuestionId(question._id)}
            sellerId={sellerId}
            currentUserId={currentUserId}
          />
        )
      ))}
      {hasMore && (
        <button
          className={styles['load-more-button']}
          onClick={onLoadMore}
        >
          더보기
        </button>
      )}
    </div>
  );
}
