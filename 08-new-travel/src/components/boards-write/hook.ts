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
    const [previewUrls, setPreviewUrls] = useState(["", "", ""])
    const [selectedFiles, setSelectedFiles] = useState<(File | null)[]>([null, null, null]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadingStates, setUploadingStates] = useState([false, false, false]);
    const fileRef = useRef<HTMLInputElement[] | null[]>([]);
    const [uploadFile] = useMutation(UPLOAD_FILE)

    const onChangeFile = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const isValid = checkValidationFile(file)
        if (!isValid) return

        // FileReader로 즉시 미리보기 생성
        const reader = new FileReader();
        reader.onload = (e) => {
            const newPreviewUrls = [...previewUrls];
            newPreviewUrls[index] = e.target?.result as string;
            setPreviewUrls(newPreviewUrls);
        };
        reader.readAsDataURL(file);

        // 파일 객체 저장 (나중에 일괄 업로드)
        const newSelectedFiles = [...selectedFiles];
        newSelectedFiles[index] = file;
        setSelectedFiles(newSelectedFiles);
    }

    // 선택된 모든 이미지를 병렬 업로드
    const uploadAllImages = async (): Promise<string[]> => {
        const uploadPromises = selectedFiles
            .map((file, index) => {
                // null이 아닌 파일만 업로드
                if (!file) return Promise.resolve(imageUrls[index] || "");

                // 업로드 시작 시 해당 이미지의 상태를 true로 설정
                setUploadingStates((prev) => {
                    const newStates = [...prev];
                    newStates[index] = true;
                    return newStates;
                });

                return uploadFile({ variables: { file } })
                    .then((result) => {
                        // 업로드 완료 후 해당 이미지의 상태를 false로 설정
                        setUploadingStates((prev) => {
                            const newStates = [...prev];
                            newStates[index] = false;
                            return newStates;
                        });
                        return result.data?.uploadFile.url || "";
                    })
                    .catch((error) => {
                        // 오류 발생 시에도 상태를 false로 설정
                        setUploadingStates((prev) => {
                            const newStates = [...prev];
                            newStates[index] = false;
                            return newStates;
                        });
                        console.error(`Image ${index} upload failed:`, error);
                        throw new Error(`${index + 1}번째 이미지 업로드 실패`);
                    });
            });

        try {
            const uploadedUrls = await Promise.all(uploadPromises);
            return uploadedUrls;
        } catch (error) {
            throw error;
        }
    };
    const onClickImage = (index: number) => {
        fileRef.current[index]?.click()
    }
    const onClickDeleteImage = (index: number) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = "";
        setImageUrls(newImageUrls);

        const newPreviewUrls = [...previewUrls];
        newPreviewUrls[index] = "";
        setPreviewUrls(newPreviewUrls);

        const newSelectedFiles = [...selectedFiles];
        newSelectedFiles[index] = null;
        setSelectedFiles(newSelectedFiles);

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

    const setAddressAndZipcode = (_newAddress: string, _newZipcode: string, _latitude?: number, _longitude?: number): void => {
        setAddress(_newAddress);
        setZipcode(_newZipcode);
        // 위경도는 필요시 사용하도록 변경 가능 (현재는 boards-write에서 사용하지 않음)
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
            setIsSubmitting(true);

            // 이미지 일괄 업로드
            const uploadedUrls = await uploadAllImages();
            const filteredImages = uploadedUrls.filter(url => url !== "");

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
                update(cache, { data: mutationData }) {
                    const existingBoards = cache.readQuery({ query: FETCH_BOARDS });
                    if (existingBoards) {
                        cache.writeQuery({
                            query: FETCH_BOARDS,
                            data: {
                                fetchBoards: [mutationData.createBoard, ...existingBoards.fetchBoards]
                            }
                        });
                    }
                }
            })
            router.push(`/boards/${result.data.createBoard._id}`)
        } catch (error) { alert("에러가 발생하였습니다.") }
        finally {
            setIsSubmitting(false);
        }
    }

    const onClickUpdate = async (data: IFormFullData) => {
        try {
            setIsSubmitting(true);

            const password = data.passwordforedit
            if (password === null || password === undefined) {
                return;
            }

            // 이미지 일괄 업로드
            const uploadedUrls = await uploadAllImages();
            const filteredImages = uploadedUrls.filter(url => url !== "");

            const updateBoardInput = {
                title: data.title,
                contents: data.content,
                youtubeUrl: data.youtubeUrl,
                boardAddress: {
                    zipcode: data.zipcode,
                    address: data.address,
                    addressDetail: data.addressDetail
                },
                images: filteredImages
            };
            const result = await updateBoard({
                variables: {
                    updateBoardInput: updateBoardInput,
                    password: password,
                    boardId: addressparams.boardId
                },
                update(cache, { data: mutationData }) {
                    const boardId = addressparams.boardId as string;

                    // Update FETCH_BOARD cache
                    cache.writeQuery({
                        query: FETCH_BOARD,
                        variables: { boardId },
                        data: {
                            fetchBoard: mutationData.updateBoard
                        }
                    });

                    // Update FETCH_BOARDS cache
                    const existingBoards = cache.readQuery({ query: FETCH_BOARDS });
                    if (existingBoards) {
                        cache.writeQuery({
                            query: FETCH_BOARDS,
                            data: {
                                fetchBoards: existingBoards.fetchBoards.map((board: any) =>
                                    board._id === mutationData.updateBoard._id
                                        ? mutationData.updateBoard
                                        : board
                                )
                            }
                        });
                    }
                }
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
        finally {
            setIsSubmitting(false);
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
        previewUrls,
        fileRef,
        onChangeFile,
        onClickImage,
        onClickDeleteImage,
        isSubmitting,
        uploadingStates,
    }
}