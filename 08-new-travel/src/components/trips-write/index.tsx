"use client";

import useTripsWrite from "./hook";
import Button from "@/components/button/button";
import styles from "./styles.module.css";
import { ITripsWriteProps, Travelproduct } from "./types";
import Postcode from "../PostcodePopup";
import KakaoMap from "@/components/KakaoMap";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { ISchema, schema, editSchema } from "./schema";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TripsWrite(props: ITripsWriteProps) {
  const {
    onChangeAddressDetail,
    onClickSubmit,
    onClickUpdate,
    setAddressAndZipcode,
    zipcode,
    address,
    addressDetail,
    lat,
    lng,
    data,
    router,
    imageUrls,
    previewUrls,
    fileRef,
    onChangeFile,
    onClickImage,
    onClickDeleteImage,
    isSubmitting,
    uploadingStates,
  } = useTripsWrite(props);

  const travelproductData = data?.fetchTravelproduct as
    | Travelproduct
    | undefined;
  const UPLOAD_LIMIT = 3;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
    control,
  } = useForm<ISchema>({
    resolver: zodResolver(props.isEdit ? editSchema : schema),
    mode: "onChange",
    defaultValues: {
      name: props.isEdit ? travelproductData?.name || "" : "",
      remarks: props.isEdit ? travelproductData?.remarks || "" : "",
      contents: props.isEdit ? travelproductData?.contents || "" : "",
      price: props.isEdit ? String(travelproductData?.price || "") : "",
      tags: props.isEdit
        ? travelproductData?.tags?.join("#") || ""
        : "",
    },
  });

  const onSubmitCreate = (formData: ISchema) => {
    const fullData = {
      ...formData,
      zipcode,
      address,
      addressDetail,
      imageUrls,
    };
    onClickSubmit(fullData as any);
  };

  const onClickUpdateWithValidation = () => {
    if (props.isEdit) {
      const { name, remarks, contents, price } = getValues();
      if (!name || !remarks || !contents || !price) {
        alert("필수 항목을 모두 입력해주세요.");
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
      imageUrls,
    };
    onClickUpdate(fullData as any);
  };

  useEffect(() => {
    if (props.isEdit && travelproductData) {
      setValue("name", travelproductData.name || "");
      setValue("remarks", travelproductData.remarks || "");
      setValue("contents", travelproductData.contents || "");
      setValue("price", String(travelproductData.price || ""));
      setValue(
        "tags",
        travelproductData.tags?.join("#") || ""
      );
    }
  }, [props.isEdit, travelproductData, setValue]);

  // ReactQuill toolbar configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['code-block'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'align',
    'link', 'image', 'video',
    'code-block'
  ];

  return (
    <form
      className={styles["main-content"]}
      onSubmit={props.isEdit ? (e) => e.preventDefault() : handleSubmit(onSubmitCreate)}
    >
      <div className={styles["page-container"]}>
        <h1 className={styles["page-title"]}>
          숙박권 {props.isEdit ? "수정" : "판매"}하기
        </h1>

        {/* 상품명 */}
        <div className={styles["input-container"]}>
          <label
            htmlFor="name"
            className={`${styles["input-title"]} ${styles["required"]}`}
          >
            상품명 <span className={styles["input-title-asterisk"]}>*</span>
          </label>
          <input
            id="name"
            className={`${styles["input-text"]} ${
              errors.name ? styles["input-error"] : ""
            }`}
            type="text"
            placeholder="상품명을 입력해 주세요."
            {...register("name")}
          />
          {errors.name && (
            <p className={styles["error-message"]}>{errors.name.message}</p>
          )}
        </div>

        <div className={styles["divider"]}></div>

        {/* 한줄 요약 */}
        <div className={styles["input-container"]}>
          <label
            htmlFor="remarks"
            className={`${styles["input-title"]} ${styles["required"]}`}
          >
            한줄 요약 <span className={styles["input-title-asterisk"]}>*</span>
          </label>
          <input
            id="remarks"
            className={`${styles["input-text"]} ${
              errors.remarks ? styles["input-error"] : ""
            }`}
            type="text"
            placeholder="상품을 한줄로 요약해 주세요."
            {...register("remarks")}
          />
          {errors.remarks && (
            <p className={styles["error-message"]}>{errors.remarks.message}</p>
          )}
        </div>

        <div className={styles["divider"]}></div>

        {/* 상품 설명 */}
        <div className={styles["input-container"]}>
          <label
            htmlFor="contents"
            className={`${styles["input-title"]} ${styles["required"]}`}
          >
            상품 설명 <span className={styles["input-title-asterisk"]}>*</span>
          </label>
          <div className={styles["quill-wrapper"]}>
            <Controller
              name="contents"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  theme="snow"
                  value={field.value || ""}
                  onChange={field.onChange}
                  modules={modules}
                  formats={formats}
                  placeholder="내용을 입력해 주세요."
                />
              )}
            />
          </div>
          {errors.contents && (
            <p className={styles["error-message"]}>
              {errors.contents.message}
            </p>
          )}
        </div>

        <div className={styles["divider"]}></div>

        {/* 판매 가격 */}
        <div className={styles["input-container"]}>
          <label
            htmlFor="price"
            className={`${styles["input-title"]} ${styles["required"]}`}
          >
            판매 가격 <span className={styles["input-title-asterisk"]}>*</span>
          </label>
          <input
            id="price"
            className={`${styles["input-text"]} ${
              errors.price ? styles["input-error"] : ""
            }`}
            type="text"
            placeholder="판매 가격을 입력해 주세요. (원 단위)"
            {...register("price")}
          />
          {errors.price && (
            <p className={styles["error-message"]}>{errors.price.message}</p>
          )}
        </div>

        <div className={styles["divider"]}></div>

        {/* 태그 입력 */}
        <div className={styles["input-container"]}>
          <label htmlFor="tags" className={styles["input-title"]}>
            태그 입력
          </label>
          <input
            id="tags"
            className={styles["input-text"]}
            type="text"
            placeholder='태그를 입력해 주세요. (#으로 구분, 예: #조용한 #깨끗한 #친절함)'
            {...register("tags")}
          />
        </div>

        <div className={styles["divider"]}></div>

        {/* 주소 및 지도 */}
        <div className={styles["address-map-container"]}>
          {/* 주소 입력 영역 */}
          <div className={styles["address-section"]}>
            <div className={styles["input-container"]}>
              <label className={styles["input-title"]}>
                주소
              </label>
              <div className={styles["zipcode-group"]}>
                <input
                  className={styles["input-text-zipcode"]}
                  type="text"
                  placeholder="01234"
                  value={zipcode}
                  readOnly
                />
                <Postcode onAddressComplete={setAddressAndZipcode} />
              </div>
              <input
                className={styles["input-text"]}
                type="text"
                placeholder="주소"
                value={address}
                readOnly
              />
              <input
                className={styles["input-text"]}
                type="text"
                placeholder="상세주소를 입력해 주세요."
                onChange={onChangeAddressDetail}
                value={addressDetail}
              />
            </div>

            <div className={styles["coordinate-group"]}>
              <div className={styles["input-container"]}>
                <label className={styles["input-title"]}>위도(LAT)</label>
                <input
                  className={styles["input-text"]}
                  type="text"
                  placeholder="주소를 먼저 입력해 주세요."
                  value={lat || ""}
                  disabled
                />
              </div>
              <div className={styles["input-container"]}>
                <label className={styles["input-title"]}>경도(LNG)</label>
                <input
                  className={styles["input-text"]}
                  type="text"
                  placeholder="주소를 먼저 입력해 주세요."
                  value={lng || ""}
                  disabled
                />
              </div>
            </div>
          </div>

          {/* 지도 영역 */}
          <div className={styles["map-section"]}>
            <label className={styles["input-title"]}>상세 위치</label>
            <div className={styles["map-container"]}>
              {lat && lng ? (
                <KakaoMap lat={lat} lng={lng} />
              ) : (
                <div className={styles["map-placeholder"]}>
                  <p>주소를 먼저 입력해 주세요.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles["divider"]}></div>

        {/* 사진 첨부 */}
        <div className={styles["input-container"]}>
          <label className={styles["input-title"]}>사진 첨부</label>
          <div className={styles["button-group-image-upload"]}>
            {Array.from({ length: UPLOAD_LIMIT }).map((_, index) => (
              <div key={index} className={styles["image-upload-item"]}>
                {imageUrls[index] || previewUrls[index] ? (
                  <>
                    <img
                      src={
                        imageUrls[index]
                          ? `https://storage.googleapis.com/${imageUrls[index]}`
                          : previewUrls[index]
                      }
                      alt={`업로드된 이미지 ${index + 1}`}
                      className={styles["uploaded-image"]}
                      onClick={() => onClickImage(index)}
                    />
                    {uploadingStates[index] && (
                      <div className={styles["uploading-overlay"]}>
                        <span>업로드 중...</span>
                      </div>
                    )}
                    <div
                      className={styles["image-delete-button"]}
                      onClick={() => onClickDeleteImage(index)}
                    >
                      <XMarkIcon
                        className={styles["image-delete-button-icon"]}
                      />
                    </div>
                  </>
                ) : (
                  <div
                    className={styles["image-upload-button"]}
                    onClick={() => onClickImage(index)}
                  >
                    <PlusIcon className={styles["button-icon"]} />
                    <span>클릭해서 사진 업로드</span>
                  </div>
                )}
                <input
                  style={{ display: "none" }}
                  type="file"
                  onChange={(event) => onChangeFile(event, index)}
                  ref={(el) => {
                    fileRef.current[index] = el;
                  }}
                  accept="image/jpeg, image/png"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 버튼 그룹 */}
        <div className={styles["button-group"]}>
          <Button
            className="white-button"
            text="취소"
            onClick={() => router.back()}
          />
          {props.isEdit ? (
            <Button
              className="blue-button"
              text="수정"
              disabled={!isValid}
              onClick={onClickUpdateWithValidation}
            />
          ) : (
            <Button
              className="blue-button"
              text="등록"
              type="submit"
              disabled={!isValid}
            />
          )}
        </div>
      </div>
    </form>
  );
}
