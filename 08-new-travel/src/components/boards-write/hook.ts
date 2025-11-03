"use client";

import { useState, ChangeEvent, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useMutation, useQuery, ApolloError } from "@apollo/client"
import { checkValidationFile } from '@/commons/libraries/image-validation';
import { CREATE_BOARD, FETCH_BOARD, FETCH_BOARDS, UPDATE_BOARD, UPLOAD_FILE } from './queries';
import { IBoardsWriteProps, Board } from "./types";
import { IScehma } from "./schema"; 

interface IFormFullData extends IScehma {
    zipcode: string;
    address: string;
    addressDetail: string;
    youtubeUrl: string;
    imageUrls: string[];
    passwordforedit?: string; 
}

export default function useBoardsWrite(props: IBoardsWriteProps) {
    const router = useRouter()
    const addressparams = useParams()

    const [createBoard] = useMutation(CREATE_BOARD)
    const [updateBoard] = useMutation(UPDATE_BOARD)


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

    const { data } = useQuery<{ fetchBoard: Board }>(FETCH_BOARD, {
        variables: {
            boardId: addressparams.boardId
        },
        skip: !props.isEdit
    });

    const [passwordforedit, setPasswordforedit] = useState<string>("");
    const [zipcode, setZipcode] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [addressDetail, setAddressDetail] = useState<string>("");
    const [youtubeUrl, setYoutubeUrl] = useState<string>("");

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

    useEffect(() => {
        if (props.isEdit && data?.fetchBoard) {
            setZipcode(data.fetchBoard.boardAddress?.zipcode ?? "");
            setAddress(data.fetchBoard.boardAddress?.address ?? "");
            setAddressDetail(data.fetchBoard.boardAddress?.addressDetail ?? "");
            setYoutubeUrl(data.fetchBoard.youtubeUrl ?? "");

            const fetchedImages = data.fetchBoard.images || [];
            const newImageUrls = ["", "", ""]; 
            for (let i = 0; i < fetchedImages.length && i < 3; i++) {
                newImageUrls[i] = fetchedImages[i];
            }
            setImageUrls(newImageUrls);
        }
    }, [props.isEdit, data]);


    const onClickSubmit = async (data: IFormFullData) => {
        try {
            const filteredImages = data.imageUrls.filter(url => url !== "");

            const result = await createBoard({
                variables: {
                    createBoardInput: {
                        writer: data.writer,
                        password: data.password,
                        title: data.title,
                        contents: data.content,
                        youtubeUrl: data.youtubeUrl,
                        boardAddress: {
                            zipcode: data.zipcode,
                            address: data.address,
                            addressDetail: data.addressDetail
                        },
                        images: filteredImages
                    }
                },
                refetchQueries: [{ query: FETCH_BOARDS }]
            })
            router.push(`/boards/${result.data.createBoard._id}`)
        } catch (error) { alert("에러가 발생하였습니다.") }
    }

    const onClickUpdate = async (data: IFormFullData) => {
        try {
            const password = data.passwordforedit 
            if (password === null || password === undefined) { 
                return;
            }
            const updateBoardInput = {
                title: data.title,
                contents: data.content,
                youtubeUrl: data.youtubeUrl,
                boardAddress: {
                    zipcode: data.zipcode,
                    address: data.address,
                    addressDetail: data.addressDetail
                },
                images: data.imageUrls.filter(url => url !== "")
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
        onChangeAddressDetail,
        onChangeYoutubeUrl,
        onClickSubmit,
        onClickUpdate,
        setAddressAndZipcode,
        onChangePasswordforedit,
        passwordforedit,
        zipcode,
        address,
        addressDetail,
        youtubeUrl,
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