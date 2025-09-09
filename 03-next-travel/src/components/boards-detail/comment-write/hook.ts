import { useState, ChangeEvent, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { CREATE_BOARD_COMMENT, FETCH_BOARD_COMMENTS } from './queries';

export default function useCommentWrite() {
    const { boardId } = useParams();
    
    const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT, {
        refetchQueries: [
            {
                query: FETCH_BOARD_COMMENTS,
                variables: { boardId: String(boardId) },
            },
        ],
    });

    const [writer, setWriter] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const rating = 0;

    const [writerError, setWriterError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [contentError, setContentError] = useState<boolean>(false);

    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);


    const onChangeWriter = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setWriter(event.target.value);
        checkFormValidity(event.target.value, password, content);
    };
    const onChangePassword = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setPassword(event.target.value);
        checkFormValidity(writer, event.target.value, content);
    };
    const onChangeContent = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setContent(event.target.value);
        checkFormValidity(writer, password, event.target.value);
    };

    const checkFormValidity = (writer: string, password: string, content: string): void => {
        if (writer && password && content) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    };

    const onClickCreateComment = async () => {
        try {
            const result = await createBoardComment({
                variables: {
                    boardId: String(boardId),
                    createBoardCommentInput: {
                        writer,
                        password,
                        contents: content,
                        rating
                    }
                }
            });
            console.log(result.data.createBoardComment);
            // 폼 초기화
            setWriter("");
            setPassword("");
            setContent("");
            setIsButtonDisabled(true);
        } catch (error) {
            console.error(error);
            alert("댓글 등록에 실패했습니다.");
        }
    };

    return {
        onChangeWriter,
        onChangePassword,
        onChangeContent,
        onClickCreateComment,
        writer,
        password,
        content,
        writerError,
        passwordError,
        contentError,
        isButtonDisabled,
    }
}