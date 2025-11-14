import { gql } from "@apollo/client";

// 신규 등록을 위한 뮤테이션
export const CREATE_TRAVELPRODUCT = gql`
  mutation createTravelproduct($createTravelproductInput: CreateTravelproductInput!) {
    createTravelproduct(createTravelproductInput: $createTravelproductInput) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      travelproductAddress {
        zipcode
        address
        addressDetail
        lat
        lng
      }
      seller {
        _id
        name
        picture
      }
    }
  }
`;

// 기존 상품 수정을 위한 뮤테이션
export const UPDATE_TRAVELPRODUCT = gql`
  mutation updateTravelproduct(
    $travelproductId: ID!
    $updateTravelproductInput: UpdateTravelproductInput!
  ) {
    updateTravelproduct(
      travelproductId: $travelproductId
      updateTravelproductInput: $updateTravelproductInput
    ) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      travelproductAddress {
        zipcode
        address
        addressDetail
        lat
        lng
      }
      seller {
        _id
        name
        picture
      }
    }
  }
`;

// 특정 상품 조회 (수정 모드에서 데이터 로드)
export const FETCH_TRAVELPRODUCT = gql`
  query fetchTravelproduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      travelproductAddress {
        zipcode
        address
        addressDetail
        lat
        lng
      }
      seller {
        _id
        name
      }
    }
  }
`;

// 파일 업로드 뮤테이션
export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;
