"use client"

import Button from '@/components/button/button';
import styles from './styles.module.css';
import { gql, useQuery, useMutation } from "@apollo/client"
import { useRouter } from 'next/navigation';

const FETCH_BOARDS = gql`
    query {
        fetchBoards(page: 1) {
            _id
            writer
            title
            createdAt
        }
    }
`
const DELETE_BOARD = gql`
    mutation deleteBoard($boardId: ID!) {
        deleteBoard(boardId: $boardId)
    }
`
interface IBoard {
    _id: string;
    writer: string;
    title: string;
    createdAt: string;
}

interface IQuery {
    fetchBoards: IBoard[];
}

export default function Boards() {

    const { data } = useQuery<IQuery>(FETCH_BOARDS, {
        // fetchPolicy: 'network-only', 이 옵션 써서 갱신하였으나 BoardsNew()에서 뮤테이션 시에 리페치하는 걸로 대체 적용해서 해결함
    });
    const router = useRouter();
    const [deleteBoard] = useMutation(DELETE_BOARD);

    const onClickRow = (boardId: string) => {
        router.push(`/boards/${boardId}`);
    };

    const onClickDelete = async (boardId: string) => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");

        if (!confirmDelete) {
            return;
        }
        try {
            await deleteBoard({
                variables: { boardId },
                refetchQueries: [{ query: FETCH_BOARDS }],
            });
        } catch (error) {
            alert("문제가 발생했습니다.");
        }
    };

    return (
        <div className={styles['main-content']}>
            <div className={styles['table-container']}>
                <div className={`${styles['table-row-head']} ${styles['additional-class-if-any']}`}>
                    <div className={`${styles['table-cell-center-head']} ${styles['number-cell-width']}`}>번호</div>
                    <div className={`${styles['table-cell-left-head']} ${styles['title-cell-width']}`}>제목</div>
                    <div className={`${styles['table-cell-center-head']} ${styles['writer-cell-width']}`}>작성자</div>
                    <div className={`${styles['table-cell-center-head']} ${styles['date-cell-width']}`}>날짜</div>
                </div>
                {data?.fetchBoards?.map((board, index) =>
                    <div
                        key={board._id}
                        className={styles['table-row-body']}
                        onClick={() => onClickRow(board._id)}
                    >
                        <div className={`${styles['table-cell-center-gray']} ${styles['number-cell-width']}`}>{index + 1}</div>
                        <div className={`${styles['table-cell-left-black']} ${styles['title-cell-width']}`}>{board.title}</div>
                        <div className={`${styles['table-cell-center-black']} ${styles['writer-cell-width']}`}>{board.writer}</div>
                        <div className={`${styles['table-cell-center-gray']} ${styles['date-cell-width']}`}>
                            {new Date(board.createdAt).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            })}
                        </div>
                        <div className={styles['button-container']}>
                            <Button
                                className="simple-button"
                                icon="/assets/icons/outline/delete.svg"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClickDelete(board._id);
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}