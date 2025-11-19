"use client";

import { useState, ChangeEvent, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useMutation, useQuery, ApolloError } from "@apollo/client";
import { checkValidationFile } from "@/commons/libraries/image-validation";
import {
  CREATE_TRAVELPRODUCT,
  FETCH_TRAVELPRODUCT,
  UPDATE_TRAVELPRODUCT,
  UPLOAD_FILE,
} from "./queries";
import { FETCH_TRAVELPRODUCTS } from "@/app/trips/queries";
import { ITripsWriteProps, Travelproduct } from "./types";
import { ISchema } from "./schema";

interface IFormFullData extends ISchema {
  zipcode: string;
  address: string;
  addressDetail: string;
  imageUrls: string[];
  lat?: number;
  lng?: number;
}

export default function useTripsWrite(props: ITripsWriteProps) {
  const router = useRouter();
  const params = useParams();

  const [createTravelproduct] = useMutation(CREATE_TRAVELPRODUCT, {
    update(cache, { data }) {
      if (data?.createTravelproduct) {
        cache.modify({
          fields: {
            fetchTravelproducts(existingTravelproducts = [], { readField }: any) {
              return [data.createTravelproduct, ...existingTravelproducts];
            }
          }
        });
      }
    },
  });
  const [updateTravelproduct] = useMutation(UPDATE_TRAVELPRODUCT, {
    update(cache, { data }) {
      if (data?.updateTravelproduct) {
        cache.modify({
          fields: {
            fetchTravelproducts(existingTravelproducts = [], { readField }: any) {
              return existingTravelproducts.map((productRef: any) =>
                readField('_id', productRef) === data.updateTravelproduct._id
                  ? data.updateTravelproduct
                  : productRef
              );
            }
          }
        });
      }
    },
  });

  // 이미지 관련 상태
  const [imageUrls, setImageUrls] = useState(["", "", ""]);
  const [previewUrls, setPreviewUrls] = useState(["", "", ""]);
  const [selectedFiles, setSelectedFiles] = useState<(File | null)[]>([null, null, null]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingStates, setUploadingStates] = useState([false, false, false]);
  const fileRef = useRef<HTMLInputElement[] | null[]>([]);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  // 파일 선택 핸들러 - 미리보기만 표시하고 업로드는 나중에 진행
  const onChangeFile = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isValid = checkValidationFile(file);
    if (!isValid) return;

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
  };

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

  // 이미지 선택 핸들러
  const onClickImage = (index: number) => {
    fileRef.current[index]?.click();
  };

  // 이미지 삭제 핸들러
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
  };

  // 수정 모드에서 기존 데이터 조회
  const { data } = useQuery<{ fetchTravelproduct: Travelproduct }>(
    FETCH_TRAVELPRODUCT,
    {
      variables: {
        travelproductId: params.tripId,
      },
      skip: !props.isEdit,
    }
  );

  // 주소 관련 상태
  const [zipcode, setZipcode] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [addressDetail, setAddressDetail] = useState<string>("");
  const [lat, setLat] = useState<number | undefined>();
  const [lng, setLng] = useState<number | undefined>();

  // 주소 설정 함수
  const setAddressAndZipcode = (newAddress: string, newZipcode: string, latitude?: number, longitude?: number): void => {
    setAddress(newAddress);
    setZipcode(newZipcode);
    if (latitude !== undefined) {
      setLat(latitude);
    }
    if (longitude !== undefined) {
      setLng(longitude);
    }
  };

  // 상세주소 변경 핸들러
  const onChangeAddressDetail = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setAddressDetail(event.target.value);
  };

  // 수정 모드에서 기존 데이터 폼에 입력
  useEffect(() => {
    if (props.isEdit && data?.fetchTravelproduct) {
      setZipcode(data.fetchTravelproduct.travelproductAddress?.zipcode ?? "");
      setAddress(data.fetchTravelproduct.travelproductAddress?.address ?? "");
      setAddressDetail(
        data.fetchTravelproduct.travelproductAddress?.addressDetail ?? ""
      );
      setLat(data.fetchTravelproduct.travelproductAddress?.lat);
      setLng(data.fetchTravelproduct.travelproductAddress?.lng);

      const fetchedImages = data.fetchTravelproduct.images || [];
      const newImageUrls = ["", "", ""];
      for (let i = 0; i < fetchedImages.length && i < 3; i++) {
        newImageUrls[i] = fetchedImages[i];
      }
      setImageUrls(newImageUrls);
    }
  }, [props.isEdit, data]);

  // 등록 핸들러
  const onClickSubmit = async (data: IFormFullData) => {
    try {
      setIsSubmitting(true);

      // 이미지 일괄 업로드
      const uploadedUrls = await uploadAllImages();
      const filteredImages = uploadedUrls.filter((url) => url !== "");

      // 태그를 배열로 변환 (# 기준으로 분할)
      const tagsArray = data.tags
        ? data.tags
            .split("#")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
        : [];

      const result = await createTravelproduct({
        variables: {
          createTravelproductInput: {
            name: data.name,
            remarks: data.remarks,
            contents: data.contents,
            price: parseInt(data.price),
            tags: tagsArray,
            travelproductAddress: {
              zipcode: data.zipcode,
              address: data.address,
              addressDetail: data.addressDetail,
              lat: lat,
              lng: lng,
            },
            images: filteredImages,
          },
        },
      });

      router.push(`/trips/${result.data.createTravelproduct._id}`);
    } catch (error) {
      const errorMessage = (error as ApolloError).graphQLErrors[0]?.message;
      if (errorMessage) {
        alert(errorMessage);
      } else {
        alert("상품 등록에 실패했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 수정 핸들러
  const onClickUpdate = async (data: IFormFullData) => {
    try {
      setIsSubmitting(true);

      // 이미지 일괄 업로드
      const uploadedUrls = await uploadAllImages();
      const filteredImages = uploadedUrls.filter((url) => url !== "");

      // 태그를 배열로 변환 (# 기준으로 분할)
      const tagsArray = data.tags
        ? data.tags
            .split("#")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
        : [];

      const result = await updateTravelproduct({
        variables: {
          travelproductId: params.tripId,
          updateTravelproductInput: {
            name: data.name,
            remarks: data.remarks,
            contents: data.contents,
            price: parseInt(data.price),
            tags: tagsArray,
            travelproductAddress: {
              zipcode: data.zipcode,
              address: data.address,
              addressDetail: data.addressDetail,
              lat: lat,
              lng: lng,
            },
            images: filteredImages,
          },
        },
      });

      router.push(`/trips/${result.data.updateTravelproduct._id}`);
    } catch (error) {
      const errorMessage = (error as ApolloError).graphQLErrors[0]?.message;
      if (errorMessage) {
        alert(errorMessage);
      } else {
        alert("상품 수정에 실패했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
    setImageUrls,
    previewUrls,
    fileRef,
    onChangeFile,
    onClickImage,
    onClickDeleteImage,
    isSubmitting,
    uploadingStates,
  };
}
