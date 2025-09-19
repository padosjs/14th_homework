import { useState, ChangeEvent } from 'react';
import { useParams } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { CREATE_BOARD_COMMENT, FETCH_BOARD_COMMENTS, UPDATE_BOARD_COMMENT } from './queries';

interface IUseCommentWriteProps {
    isEdit?: boolean;
    commentId?: string;
    initialWriter?: string;
    initialContent?: string;
    initialRating?: number;
    onEditComplete?: () => void;  // 새로 추가: 수정 완료 콜백 (optional)
}

/**
 * 댓글 작성 및 수정 로직을 담당하는 커스텀 훅
 * isEdit 값에 따라 댓글 등록 또는 수정 기능을 수행합니다.
 */
export default function useCommentWrite({
    isEdit = false,
    commentId,
    initialWriter = '',
    initialContent = '',
    initialRating = 0,
    onEditComplete,  // 새로 추가
}: IUseCommentWriteProps) {
    const { boardId } = useParams();

    // 댓글 등록 뮤테이션 훅
    const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT, {
        refetchQueries: [
            {
                query: FETCH_BOARD_COMMENTS,
                variables: { boardId: String(boardId) },
            },
        ],
    });

    // 댓글 수정 뮤테이션 훅
    const [updateBoardComment] = useMutation(UPDATE_BOARD_COMMENT, {
        refetchQueries: [
            {
                query: FETCH_BOARD_COMMENTS,
                variables: { boardId: String(boardId) },
            },
        ],
    });

    // 댓글 폼 상태 관리
    const [rating, setRating] = useState(initialRating);
    const [writer, setWriter] = useState<string>(initialWriter);
    const [password, setPassword] = useState<string>('');
    const [content, setContent] = useState<string>(initialContent);

    // 에러 메시지 상태 관리
    const [writerError, setWriterError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [contentError, setContentError] = useState<boolean>(false);

    // 버튼 비활성화 상태 관리
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    /**
     * 폼 유효성 검사 함수
     * 필수 입력 필드가 모두 채워졌는지 확인하고 버튼 활성화/비활성화를 결정합니다.
     */
    const checkFormValidity = (writerValue: string, passwordValue: string, contentValue: string): void => {
        if (isEdit) {
            // 수정 모드: 비밀번호와 내용만으로 유효성 검사
            if (passwordValue && contentValue) {
                setIsButtonDisabled(false);
            } else {
                setIsButtonDisabled(true);
            }
        } else {
            // 등록 모드: 작성자, 비밀번호, 내용 모두 유효성 검사
            if (writerValue && passwordValue && contentValue) {
                setIsButtonDisabled(false);
            } else {
                setIsButtonDisabled(true);
            }
        }
    };

    // 작성자 입력 필드 변경 핸들러
    const onChangeWriter = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setWriter(event.target.value);
        checkFormValidity(event.target.value, password, content);
    };

    // 비밀번호 입력 필드 변경 핸들러
    const onChangePassword = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setPassword(event.target.value);
        checkFormValidity(writer, event.target.value, content);
    };

    // 내용 입력 필드 변경 핸들러
    const onChangeContent = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setContent(event.target.value);
        checkFormValidity(writer, password, event.target.value);
    };

    /**
     * 댓글 등록 버튼 클릭 핸들러
     * GraphQL 뮤테이션을 실행하여 새 댓글을 등록합니다.
     */
    const onClickCreateComment = async () => {
        try {
            const result = await createBoardComment({
                variables: {
                    boardId: String(boardId),
                    createBoardCommentInput: {
                        writer,
                        password,
                        contents: content,
                        rating,
                    },
                },
            });
            console.log(result.data.createBoardComment);
            // 폼 초기화
            setWriter('');
            setPassword('');
            setContent('');
            setRating(0);
            setIsButtonDisabled(true);
        } catch (error) {
            console.error(error);
            alert('댓글 등록에 실패했습니다.');
        }
    };

    /**
     * 댓글 수정 버튼 클릭 핸들러
     * GraphQL 뮤테이션을 실행하여 기존 댓글을 수정합니다.
     */
    const onClickUpdateComment = async () => {
        try {
            if (!commentId) {
                throw new Error('Comment ID is missing.');
            }
            await updateBoardComment({
                variables: {
                    boardCommentId: commentId,
                    updateBoardCommentInput: {
                        contents: content,
                        rating,
                    },
                    password,
                }
            });
            setPassword('');
            setContent('');
            setIsButtonDisabled(true);
            if (onEditComplete) {
                onEditComplete();
            }
        } catch (error) {
            console.error(error);
            alert('댓글 수정에 실패했습니다.');
        }
    };

    return {
        onChangeWriter,
        onChangePassword,
        onChangeContent,
        onClickCreateComment,
        onClickUpdateComment,
        setRating,
        rating,
        writer,
        password,
        content,
        writerError,
        passwordError,
        contentError,
        isButtonDisabled,
        isEdit,
    };
}