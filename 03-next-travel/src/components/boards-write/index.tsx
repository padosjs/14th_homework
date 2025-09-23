"use client";

import useBoardsWrite from './hook';
import InputField from '@/components/input/input'
import Button from '@/components/button/button';
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

export default function BoardsWrite(props: IBoardsWriteProps) {
    const {
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
    } = useBoardsWrite(props)

    const boardData = data?.fetchBoard as Board | undefined;
    const UPLOAD_LIMIT = 3;

    return (
        <div className={styles['main-content']}>
            <div className={styles['page-container']}>
                <h1 className={styles['page-title']}>게시물 {props.isEdit ? "수정" : "등록"}</h1>
                <div className={styles['input-group-column']}>
                    <InputField
                        title="작성자"
                        placeholderText="작성자명을 입력해주세요."
                        isRequired={true}
                        onChange={onChangeWriter}
                        value={props.isEdit ? boardData?.writer || "" : writer}
                        hasError={writerError}
                        errorMessage="필수 입력 사항입니다."
                        disabled={props.isEdit}
                    />
                    <InputField
                        title="비밀번호"
                        placeholderText="비밀번호를 입력해주세요."
                        isRequired={true}
                        onChange={onChangePassword}
                        value={props.isEdit ? "●●●●●●" : password}
                        hasError={passwordError}
                        errorMessage="필수 입력 사항입니다."
                        disabled={props.isEdit}
                    />
                </div>
                <div className={styles['divider']}></div>
                <InputField
                    title="제목"
                    placeholderText="제목을 입력해주세요."
                    isRequired={true}
                    onChange={onChangeTitle}
                    value={title}
                    hasError={titleError}
                    errorMessage="필수 입력 사항입니다."
                />
                <div className={styles['divider']}></div>
                <InputField
                    title="내용"
                    placeholderText="내용을 입력해주세요."
                    isRequired={true}
                    isTextArea={true}
                    rows={13}
                    onChange={onChangeContent}
                    value={content}
                    hasError={contentError}
                    errorMessage="필수 입력 사항입니다."
                />
                <div className={styles['divider']}></div>
                <div className={styles['input-group-address']}>
                    <div className={styles['input-button-group-address']}>
                        <InputField
                            placeholderText="01234"
                            value={zipcode}
                        />
                        <Postcode onAddressComplete={setAddressAndZipcode} />
                    </div>
                    <InputField
                        placeholderText="주소를 입력해주세요."
                        value={address}
                    />
                    <InputField
                        placeholderText="상세주소"
                        onChange={onChangeAddressDetail}
                        value={addressDetail}
                    />
                </div>
                <div className={styles['divider']}></div>
                <InputField
                    title="유튜브 링크"
                    placeholderText="링크를 입력해주세요"
                    value={youtubeUrl}
                    onChange={onChangeYoutubeUrl}
                />
                <div className={styles['divider']}></div>
                <div className={styles['button-group-image-upload']}>
                    {/* 이미지 업로드 버튼을 3개 생성 */}
                    {Array.from({ length: UPLOAD_LIMIT }).map((_, index) => (
                        <div key={index} className={styles['image-upload-item']}>
                            {/* 이미지가 업로드 되었을 때 */}
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
                                // 이미지가 없을 때
                                <div className={styles['image-upload-button']} onClick={() => onClickImage(index)}>
                                    <PlusIcon className={styles['button-icon']} />
                                    <span>클릭해서 사진 업로드</span>
                                </div>
                            )}
                            {/* 숨겨진 파일 인풋은 항상 존재 */}
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
                            <AlertDialogTrigger>
                                <Button className="blue-button" text="수정" disabled={isButtonDisabled} />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>글을 작성할 때 입력하셨던 비밀번호를 입력해 주세요.</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <InputField
                                            placeholderText='비밀번호 입력'
                                            value={passwordforedit}
                                            onChange={onChangePasswordforedit}
                                        />
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>취소</AlertDialogCancel>
                                    <AlertDialogAction onClick={onClickUpdate}>확인</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    ) : (
                        <Button className="blue-button" text="등록" onClick={onClickSubmit} disabled={isButtonDisabled} />
                    )}
                </div>
            </div>
        </div>
    );
}