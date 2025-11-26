import { gql } from "@apollo/client";

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
      pickedCount
      travelproductAddress {
        address
        addressDetail
        zipcode
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

export const DELETE_TRAVELPRODUCT = gql`
  mutation deleteTravelproduct($travelproductId: ID!) {
    deleteTravelproduct(travelproductId: $travelproductId)
  }
`;

// QUESTIONS
export const FETCH_TRAVELPRODUCT_QUESTIONS = gql`
  query fetchTravelproductQuestions($travelproductId: ID!, $page: Int) {
    fetchTravelproductQuestions(travelproductId: $travelproductId, page: $page) {
      _id
      contents
      createdAt
      updatedAt
      user {
        _id
        name
        picture
      }
    }
  }
`;

export const CREATE_TRAVELPRODUCT_QUESTION = gql`
  mutation createTravelproductQuestion(
    $travelproductId: ID!
    $createTravelproductQuestionInput: CreateTravelproductQuestionInput!
  ) {
    createTravelproductQuestion(
      travelproductId: $travelproductId
      createTravelproductQuestionInput: $createTravelproductQuestionInput
    ) {
      _id
      contents
      createdAt
      user {
        _id
        name
        picture
      }
    }
  }
`;

export const UPDATE_TRAVELPRODUCT_QUESTION = gql`
  mutation updateTravelproductQuestion(
    $travelproductQuestionId: ID!
    $updateTravelproductQuestionInput: UpdateTravelproductQuestionInput!
  ) {
    updateTravelproductQuestion(
      travelproductQuestionId: $travelproductQuestionId
      updateTravelproductQuestionInput: $updateTravelproductQuestionInput
    ) {
      _id
      contents
      updatedAt
    }
  }
`;

export const DELETE_TRAVELPRODUCT_QUESTION = gql`
  mutation deleteTravelproductQuestion($travelproductQuestionId: ID!) {
    deleteTravelproductQuestion(travelproductQuestionId: $travelproductQuestionId)
  }
`;

// ANSWERS
export const FETCH_TRAVELPRODUCT_QUESTION_ANSWERS = gql`
  query fetchTravelproductQuestionAnswers($travelproductQuestionId: ID!, $page: Int) {
    fetchTravelproductQuestionAnswers(
      travelproductQuestionId: $travelproductQuestionId
      page: $page
    ) {
      _id
      contents
      createdAt
      updatedAt
      user {
        _id
        name
        picture
      }
    }
  }
`;

export const CREATE_TRAVELPRODUCT_QUESTION_ANSWER = gql`
  mutation createTravelproductQuestionAnswer(
    $travelproductQuestionId: ID!
    $createTravelproductQuestionAnswerInput: CreateTravelproductQuestionAnswerInput!
  ) {
    createTravelproductQuestionAnswer(
      travelproductQuestionId: $travelproductQuestionId
      createTravelproductQuestionAnswerInput: $createTravelproductQuestionAnswerInput
    ) {
      _id
      contents
      createdAt
      user {
        _id
        name
        picture
      }
    }
  }
`;

export const UPDATE_TRAVELPRODUCT_QUESTION_ANSWER = gql`
  mutation updateTravelproductQuestionAnswer(
    $travelproductQuestionAnswerId: ID!
    $updateTravelproductQuestionAnswerInput: UpdateTravelproductQuestionAnswerInput!
  ) {
    updateTravelproductQuestionAnswer(
      travelproductQuestionAnswerId: $travelproductQuestionAnswerId
      updateTravelproductQuestionAnswerInput: $updateTravelproductQuestionAnswerInput
    ) {
      _id
      contents
      updatedAt
    }
  }
`;

export const DELETE_TRAVELPRODUCT_QUESTION_ANSWER = gql`
  mutation deleteTravelproductQuestionAnswer($travelproductQuestionAnswerId: ID!) {
    deleteTravelproductQuestionAnswer(
      travelproductQuestionAnswerId: $travelproductQuestionAnswerId
    )
  }
`;
