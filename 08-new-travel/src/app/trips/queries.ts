import { gql } from "@apollo/client";

export const FETCH_TRAVELPRODUCTS = gql`
  query fetchTravelproducts($page: Int, $search: String, $isSoldout: Boolean) {
    fetchTravelproducts(page: $page, search: $search, isSoldout: $isSoldout) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      soldAt
      travelproductAddress {
        address
        addressDetail
        zipcode
      }
      seller {
        _id
        name
        picture
      }
    }
  }
`;

export const FETCH_TRAVELPRODUCTS_OF_THE_BEST = gql`
  query fetchTravelproductsOfTheBest {
    fetchTravelproductsOfTheBest {
      _id
      name
      remarks
      price
      images
      pickedCount
      seller {
        _id
        name
        picture
      }
    }
  }
`;
