"use client";

import { useState, ChangeEvent, useEffect } from 'react';
import { useMutation, useQuery, ApolloError } from "@apollo/client"
import { useRouter, useParams } from 'next/navigation';
import { CREATE_BOARD, FETCH_BOARD, FETCH_BOARDS, UPDATE_BOARD } from './queries';
import { IBoardsWriteProps, Board } from "./types";

export default function useBoardsWrite(props: IBoardsWriteProps) {
    const router = useRouter()
    const addressparams = useParams()

    const [createBoard] = useMutation(CREATE_BOARD)
    const [updateBoard] = useMutation(UPDATE_BOARD)

    // 수정 모드를 위한 Fetch
    const { data } = useQuery<{ fetchBoard: Board }>(FETCH_BOARD, {
        variables: {
            boardId: addressparams.boardId
        },
        skip: !props.isEdit
    });

    const [writer, setWriter] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordforedit, setPasswordforedit] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [zipcode, setZipcode] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [addressDetail, setAddressDetail] = useState<string>("");
    const [youtubeUrl, setYoutubeUrl] = useState<string>("");

    const [writerError, setWriterError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [titleError, setTitleError] = useState<boolean>(false);
    const [contentError, setContentError] = useState<boolean>(false);

    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const onChangeWriter = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setWriter(event.target.value);
        checkFormValidity(event.target.value, password, title, content);
    };
    const onChangePassword = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setPassword(event.target.value);
        checkFormValidity(writer, event.target.value, title, content);
    };
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setTitle(event.target.value);
        checkFormValidity(writer, password, event.target.value, content);
    };
    const onChangeContent = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setContent(event.target.value);
        checkFormValidity(writer, password, title, event.target.value);
    };
    const setAddressAndZipcode = (newAddress: string, newZipcode: string): void => {
        setAddress(newAddress);
        setZipcode(newZipcode);
    }
    const onChangeAddressDetail = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setAddressDetail(event.target.value);
    };
    const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setYoutubeUrl(event.target.value);
    };
    const onChangePasswordforedit = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setPasswordforedit(event.target.value);
    };

    const checkFormValidity = (writer: string, password: string, title: string, content: string): void => {
        // 수정 모드일 때는 writer와 password를 검사하지 않음
        if (props.isEdit) {
            if (title && content) {
                setIsButtonDisabled(false);
            } else {
                setIsButtonDisabled(true);
            }
        } else {
            // 신규 등록 모드일 때는 모든 필드 검사
            if (writer && password && title && content) {
                setIsButtonDisabled(false);
            } else {
                setIsButtonDisabled(true);
            }
        }
    };

    useEffect(() => {
        if (props.isEdit && data?.fetchBoard) {
            setTitle(data.fetchBoard.title ?? "");
            setContent(data.fetchBoard.contents ?? "");
            setZipcode(data.fetchBoard.boardAddress?.zipcode ?? "");
            setAddress(data.fetchBoard.boardAddress?.address ?? "");
            setAddressDetail(data.fetchBoard.boardAddress?.addressDetail ?? "");
            setYoutubeUrl(data.fetchBoard.youtubeUrl ?? "");
            checkFormValidity(writer, password, data.fetchBoard.title ?? "", data.fetchBoard.contents ?? "");
        }
    }, [props.isEdit, data]);

    // 신규 등록 기능
    const onClickSubmit = async () => {
        try {
            const result = await createBoard({
                variables: {
                    createBoardInput: {
                        writer: writer,
                        password: password,
                        title: title,
                        contents: content,
                        youtubeUrl: youtubeUrl,
                        boardAddress: {
                            zipcode: zipcode,
                            address: address,
                            addressDetail: addressDetail
                        }
                    }
                },
                refetchQueries: [{ query: FETCH_BOARDS }]
            })
            router.push(`/boards/${result.data.createBoard._id}`)
        } catch (error) { alert("에러가 발생하였습니다.") }
    }
    // 기존 내용 수정 기능 
    const onClickUpdate = async () => {
        try {
            const password = passwordforedit
            if (password === null) {
                return;
            }
            const updateBoardInput = {
                title: title,
                contents: content,
                youtubeUrl: youtubeUrl,
                boardAddress: {
                    zipcode: zipcode,
                    address: address,
                    addressDetail: addressDetail
                }
            };
            const result = await updateBoard({
                variables: {
                    updateBoardInput: updateBoardInput,
                    password: password,
                    boardId: addressparams.boardId
                },
                refetchQueries: [
                    { query: FETCH_BOARD, variables: { boardId: addressparams.boardId } },
                    { query: FETCH_BOARDS } // 이게 없으면 수정 후 들어가는 상세페이지 안의 '목록으로' 버튼 눌러서 이동했을 때 수정 사항이 바로 안 보임
                ]
            })
            router.push(`/boards/${result.data.updateBoard._id}`);
        } catch (error) {
            // 서버에서 받은 에러 메시지
            const errorMessage = (error as ApolloError).graphQLErrors[0]?.message;
            // 에러 메시지가 있다면 해당 메시지를 alert 창으로 띄우고
            if (errorMessage) {
                alert(errorMessage);
            } else {
                // 에러 메시지가 없을 경우를 대비하여 일반적인 메시지 표시
                alert("에러가 발생했습니다.");
            }
        }
    };

return {
    onChangeWriter,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onChangeAddressDetail,
    onChangeYoutubeUrl,
    onClickSubmit,
    onClickUpdate,
    setAddressAndZipcode,
    onChangePasswordforedit,
    writer,
    password,
    passwordforedit,
    title,
    content,
    zipcode,
    address,
    addressDetail,
    youtubeUrl,
    writerError,
    passwordError,
    titleError,
    contentError,
    isButtonDisabled,
    data,
    router
}
}