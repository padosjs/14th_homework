"use client";

import useBoardsWrite from './hook';
import { Button } from '@commons/ui';
import styles from './styles.module.css';
import { IBoardsWriteProps, Board } from "./types"
import Postcode from '../PostcodePopup';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { IScehma, schema, editSchema } from "./schema"
import { useEffect } from 'react';

export default function BoardsWrite(props: IBoardsWriteProps) {
    const {
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
        onClickDeleteImage,
    } = useBoardsWrite(props)

    const boardData = data?.fetchBoard as Board | undefined;
    const UPLOAD_LIMIT = 3;

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
        getValues,
    } = useForm<IScehma>({
        resolver: zodResolver(props.isEdit ? editSchema : schema),
        mode: "onChange",
        defaultValues: {
            writer: props.isEdit ? boardData?.writer || "" : "",
            password: props.isEdit ? "●●●●●●" : "",
            title: props.isEdit ? boardData?.title || "" : "",
            content: props.isEdit ? boardData?.contents || "" : "",
        }
    })

    const onSubmitCreate = (formData: IScehma) => {
        const fullData = {
            ...formData,
            zipcode,
            address,
            addressDetail,
            youtubeUrl,
            imageUrls,
        }
        onClickSubmit(fullData as any);
    }

    const onClickUpdateWithValidation = () => {
        if (props.isEdit) {
            // 수정 모드에서는 title과 content만 검증
            const { title, content } = getValues();
            if (!title || !content) {
                alert("제목과 내용을 입력해주세요.");
                return;
            }
        } else if (!isValid) {
            console.error("폼 유효성 검사 실패");
            return;
        }

        const formData = getValues();
        const fullData = {
            ...formData,
            zipcode,
            address,
            addressDetail,
            youtubeUrl,
            imageUrls,
            passwordforedit,
        };
        onClickUpdate(fullData as any);
    }

    useEffect(() => {
        if (props.isEdit && boardData) {
            setValue("writer", boardData.writer || "");
            setValue("password", "●●●●●●");
            setValue("title", boardData.title || "");
            setValue("content", boardData.contents || "");
        }
    }, [props.isEdit, boardData, setValue])


    return (
        <form className={styles['main-content']} onSubmit={props.isEdit ? (e) => e.preventDefault() : handleSubmit(onSubmitCreate)}>
            <div className={styles['page-container']}>
                <h1 className={styles['page-title']}>게시물 {props.isEdit ? "수정" : "등록"}</h1>
                <div className={styles['input-group-column']}>
                    <div className={styles['input-container']}>
                        <label htmlFor="writer" className={`${styles['input-title']} ${styles['required']}`}>작성자 <p className={styles['input-title-asterisk']}>*</p></label>
                        <input
                            id="writer"
                            className={`${styles['input-text']} ${errors.writer ? styles['input-error'] : ''}`}
                            type="text"
                            placeholder="작성자명을 입력해주세요."
                            {...register("writer")}
                            disabled={props.isEdit}
                        />
                        {errors.writer && <p className={styles['error-message']}>{errors.writer.message}</p>}
                    </div>
                    <div className={styles['input-container']}>
                        <label htmlFor="password" className={`${styles['input-title']} ${styles['required']}`}>비밀번호 <p className={styles['input-title-asterisk']}>*</p></label>
                        <input
                            id="password"
                            className={`${styles['input-text']} ${errors.password ? styles['input-error'] : ''}`}
                            type="password"
                            placeholder="비밀번호를 입력해주세요."
                            {...register("password")}
                            disabled={props.isEdit}
                        />
                        {errors.password && <p className={styles['error-message']}>{errors.password.message}</p>}
                    </div>
                </div>
                <div className={styles['divider']}></div>
                <div className={styles['input-container']}>
                    <label htmlFor="title" className={`${styles['input-title']} ${styles['required']}`}>제목 <p className={styles['input-title-asterisk']}>*</p></label>
                    <input
                        id="title"
                        className={`${styles['input-text']} ${errors.title ? styles['input-error'] : ''}`}
                        type="text"
                        placeholder="제목을 입력해주세요."
                        {...register("title")}
                    />
                    {errors.title && <p className={styles['error-message']}>{errors.title.message}</p>}
                </div>
                <div className={styles['divider']}></div>
                <div className={styles['input-container']}>
                    <label htmlFor="content" className={`${styles['input-title']} ${styles['required']}`}>내용 <p className={styles['input-title-asterisk']}>*</p></label>
                    <textarea
                        id="content"
                        className={`${styles['input-text']} ${styles['textarea-field']} ${errors.content ? styles['input-error'] : ''}`}
                        placeholder="내용을 입력해주세요."
                        rows={13}
                        {...register("content")}
                    />
                    {errors.content && <p className={styles['error-message']}>{errors.content.message}</p>}
                </div>
                <div className={styles['divider']}></div>
                <div className={styles['input-group-address']}>
                    <div className={styles['input-button-group-address']}>
                        <input
                            className={styles['input-text']}
                            type="text"
                            placeholder="01234"
                            value={zipcode}
                            readOnly
                        />
                        <Postcode onAddressComplete={setAddressAndZipcode} />
                    </div>
                    <input
                        className={styles['input-text']}
                        type="text"
                        placeholder="주소를 입력해주세요."
                        value={address}
                        readOnly
                    />
                    <input
                        className={styles['input-text']}
                        type="text"
                        placeholder="상세주소"
                        onChange={onChangeAddressDetail}
                        value={addressDetail}
                    />
                </div>
                <div className={styles['divider']}></div>
                <div className={styles['input-container']}>
                    <label htmlFor="youtubeUrl" className={styles['input-title']}>유튜브 링크</label>
                    <input
                        id="youtubeUrl"
                        className={styles['input-text']}
                        type="text"
                        placeholder="링크를 입력해주세요"
                        value={youtubeUrl}
                        onChange={onChangeYoutubeUrl}
                    />
                </div>
                <div className={styles['divider']}></div>
                <div className={styles['button-group-image-upload']}>
                    {Array.from({ length: UPLOAD_LIMIT }).map((_, index) => (
                        <div key={index} className={styles['image-upload-item']}>
                            {imageUrls[index] ? (
                                <>
                                    <img
                                        src={`https://storage.googleapis.com/${imageUrls[index]}`}
                                        alt={`업로드된 이미지 ${index + 1}`}
                                        className={styles['uploaded-image']}
                                        onClick={() => onClickImage(index)}
                                    />
                                    <div className={styles['image-delete-button']} onClick={() => onClickDeleteImage(index)}>
                                        <XMarkIcon className={styles['image-delete-button-icon']} />
                                    </div>
                                </>
                            ) : (
                                <div className={styles['image-upload-button']} onClick={() => onClickImage(index)}>
                                    <PlusIcon className={styles['button-icon']} />
                                    <span>클릭해서 사진 업로드</span>
                                </div>
                            )}
                            <input
                                style={{ display: "none" }}
                                type="file"
                                onChange={(event) => onChangeFile(event, index)}
                                ref={(el) => { fileRef.current[index] = el; }}
                                accept="image/jpeg, image/png"
                            />
                        </div>
                    ))}
                </div>
                <div className={styles['divider']}></div>
                <div className={styles['button-group']}>
                    <Button className="white-button" text="취소" onClick={() => router.back()} />
                    {props.isEdit ? (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className="blue-button" text="수정" disabled={!isValid} />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>글을 작성할 때 입력하셨던 비밀번호를 입력해 주세요.</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <input
                                            className={styles['input-text']}
                                            type="password"
                                            placeholder='비밀번호 입력'
                                            value={passwordforedit}
                                            onChange={onChangePasswordforedit}
                                        />
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>취소</AlertDialogCancel>
                                    <AlertDialogAction onClick={onClickUpdateWithValidation}>확인</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    ) : (
                        <Button className="blue-button" text="등록" type="submit" disabled={!isValid} />
                    )}
                </div>
            </div>
        </form>
    );
}