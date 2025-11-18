import { gql } from "@apollo/client";

/**
 * 로그인한 사용자의 정보를 조회하는 GraphQL 쿼리
 * 사용자 ID, 이메일, 이름, 포인트 정보를 가져옵니다.
 */
export const FETCH_USER_LOGGED_IN = gql`
    query {
        fetchUserLoggedIn {
            _id
            email
            name
            userPoint {
                _id
                amount
            }
        }
    }
`;

/**
 * 로그인한 사용자의 타입 인터페이스
 * null 또는 undefined일 수 있으므로 선택적(optional)으로 처리합니다.
 */
export interface ILoggedInUser {
    _id: string;
    email: string;
    name: string;
    userPoint?: {
        _id: string;
        amount: number;
    };
}
