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
      // 기존 캐시에서 여행 상품 목록 읽기
      const existingData = cache.readQuery({
        query: FETCH_TRAVELPRODUCTS,
        variables: { page: 1, isSoldout: false },
      });

      // 새로 생성된 상품을 목록 맨 앞에 추가
      if (existingData && data?.createTravelproduct) {
        cache.writeQuery({
          query: FETCH_TRAVELPRODUCTS,
          variables: { page: 1, isSoldout: false },
          data: {
            fetchTravelproducts: [
              data.createTravelproduct,
              ...existingData.fetchTravelproducts,
            ],
          },
        });
      }
    },
  });
  const [updateTravelproduct] = useMutation(UPDATE_TRAVELPRODUCT, {
    update(cache, { data }) {
      // 기존 캐시에서 여행 상품 목록 읽기
      const existingData = cache.readQuery({
        query: FETCH_TRAVELPRODUCTS,
        variables: { page: 1, isSoldout: false },
      });

      // 업데이트된 상품을 목록에서 찾아서 교체
      if (existingData && data?.updateTravelproduct) {
        const updatedProduct = data.updateTravelproduct;
        const updatedList = existingData.fetchTravelproducts.map(
          (product) =>
            product._id === updatedProduct._id ? updatedProduct : product
        );

        cache.writeQuery({
          query: FETCH_TRAVELPRODUCTS,
          variables: { page: 1, isSoldout: false },
          data: {
            fetchTravelproducts: updatedList,
          },
        });
      }
    },
  });

  // 이미지 관련 상태
  const [imageUrls, setImageUrls] = useState(["", "", ""]);
  const [previewUrls, setPreviewUrls] = useState(["", "", ""]);
  const [uploadingStates, setUploadingStates] = useState([false, false, false]);
  const fileRef = useRef<HTMLInputElement[] | null[]>([]);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  // 파일 업로드 핸들러
  const onChangeFile = async (
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

    // 업로드 상태 표시
    const newUploadingStates = [...uploadingStates];
    newUploadingStates[index] = true;
    setUploadingStates(newUploadingStates);

    try {
      const result = await uploadFile({ variables: { file } });
      const url = result.data?.uploadFile.url;

      const newImageUrls = [...imageUrls];
      newImageUrls[index] = url;
      setImageUrls(newImageUrls);
    } catch (error) {
      console.error(error);
      alert("이미지 업로드에 실패했습니다.");

      // 실패 시 미리보기도 제거
      const newPreviewUrls = [...previewUrls];
      newPreviewUrls[index] = "";
      setPreviewUrls(newPreviewUrls);
    } finally {
      const newUploadingStates = [...uploadingStates];
      newUploadingStates[index] = false;
      setUploadingStates(newUploadingStates);
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
  const setAddressAndZipcode = (newAddress: string, newZipcode: string): void => {
    setAddress(newAddress);
    setZipcode(newZipcode);
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
      const filteredImages = data.imageUrls.filter((url) => url !== "");

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
    }
  };

  // 수정 핸들러
  const onClickUpdate = async (data: IFormFullData) => {
    try {
      const filteredImages = data.imageUrls.filter((url) => url !== "");

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
    uploadingStates,
    fileRef,
    onChangeFile,
    onClickImage,
    onClickDeleteImage,
  };
}
