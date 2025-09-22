"use client";

import { useState, ChangeEvent, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useMutation, useQuery, ApolloError } from "@apollo/client"
import { checkValidationFile } from '@/commons/libraries/image-validation';
import { CREATE_BOARD, FETCH_BOARD, FETCH_BOARDS, UPDATE_BOARD, UPLOAD_FILE } from './queries';
import { IBoardsWriteProps, Board } from "./types";

export default function useBoardsWrite(props: IBoardsWriteProps) {
    const router = useRouter()
    const addressparams = useParams()

    const [createBoard] = useMutation(CREATE_BOARD)
    const [updateBoard] = useMutation(UPDATE_BOARD)


    // 이미지 파일 업로드 관련
    // 이미지 파일 업로드 관련
    // 이미지 파일 업로드 관련

    const [imageUrls, setImageUrls] = useState(["", "", ""])
    const fileRef = useRef<HTMLInputElement[] | null[]>([]);
    const [uploadFile] = useMutation(UPLOAD_FILE)

    const onChangeFile = async (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const isValid = checkValidationFile(file)
        if (!isValid) return

        try {
            const result = await uploadFile({ variables: { file } })
            const url = result.data?.uploadFile.url

            const newImageUrls = [...imageUrls];
            newImageUrls[index] = url;
            setImageUrls(newImageUrls);
        } catch (error) {
            console.error(error);
        }
    }
    const onClickImage = (index: number) => {
        fileRef.current[index]?.click()
    }
    const onClickDeleteImage = (index: number) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = "";
        setImageUrls(newImageUrls);

        if (fileRef.current[index]) {
            fileRef.current[index]!.value = "";
        }
    }
    // 이미지 파일 업로드 관련
    // 이미지 파일 업로드 관련
    // 이미지 파일 업로드 관련





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

            const fetchedImages = data.fetchBoard.images || [];
            const newImageUrls = ["", "", ""]; // 3개짜리 빈 배열 생성
            for (let i = 0; i < fetchedImages.length && i < 3; i++) {
                newImageUrls[i] = fetchedImages[i];
            }
            setImageUrls(newImageUrls);
        }
    }, [props.isEdit, data]);

    // 신규 등록 기능
    const onClickSubmit = async () => {
        try {
            const filteredImages = imageUrls.filter(url => url !== "");

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
                        },
                        // 필터링된 이미지 배열을 전달
                        images: filteredImages
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
                },
                images: imageUrls.filter(url => url !== "")
            };
            const result = await updateBoard({
                variables: {
                    updateBoardInput: updateBoardInput,
                    password: password,
                    boardId: addressparams.boardId
                },
                refetchQueries: [
                    { query: FETCH_BOARD, variables: { boardId: addressparams.boardId } },
                    { query: FETCH_BOARDS }
                ]
            })
            router.push(`/boards/${result.data.updateBoard._id}`);
        } catch (error) {
            const errorMessage = (error as ApolloError).graphQLErrors[0]?.message;
            if (errorMessage) {
                alert(errorMessage);
            } else {
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
        router,
        imageUrls,
        setImageUrls,
        fileRef,
        onChangeFile,
        onClickImage,
        onClickDeleteImage
    }
}