import { gql } from "@apollo/client";

export const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation CreatePointTransactionOfLoading($paymentId: ID!) {
    createPointTransactionOfLoading(paymentId: $paymentId) {
      _id
      amount
      balance
      impUid
      status
      statusDetail
      createdAt
    }
  }
`;
