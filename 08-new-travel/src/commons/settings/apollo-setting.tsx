"use client"

import { useAccessTokenStore } from '@/commons/stores/access-token-store';
import { ApolloClient, ApolloProvider, InMemoryCache, Observable, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { useMemo } from 'react';
import { getAccessToken } from '@/commons/libraries/get-access-token';

export default function ApolloSetting(props) {
    const { accessToken, setAccessToken } = useAccessTokenStore()

    const client = useMemo(() => {
        const uploadLink = createUploadLink({
            uri: "http://main-practice.codebootcamp.co.kr/graphql",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
            if (graphQLErrors) {
                for (let err of graphQLErrors) {
                    // 토큰 만료 (401) 에러 처리
                    if (err.extensions?.code === 'UNAUTHENTICATED') {
                        return new Observable((observer) => {
                            (async () => {
                                try {
                                    const newAccessToken = await getAccessToken();
                                    if (newAccessToken) {
                                        setAccessToken(newAccessToken);

                                        const oldHeaders = operation.getContext().headers;
                                        operation.setContext({
                                            headers: {
                                                ...oldHeaders,
                                                authorization: `Bearer ${newAccessToken}`
                                            }
                                        });

                                        const result = await forward(operation).toPromise();
                                        observer.next(result);
                                        observer.complete();
                                    } else {
                                        // 토큰 갱신 실패
                                        window.location.href = '/login';
                                        observer.error(err);
                                    }
                                } catch (error) {
                                    // 갱신 중 에러
                                    window.location.href = '/login';
                                    observer.error(error);
                                }
                            })();
                        });
                    }
                }
            }

            if (networkError) {
                if ('statusCode' in networkError && networkError.statusCode === 401) {
                    return new Observable((observer) => {
                        (async () => {
                            try {
                                const newAccessToken = await getAccessToken();
                                if (newAccessToken) {
                                    setAccessToken(newAccessToken);

                                    const oldHeaders = operation.getContext().headers;
                                    operation.setContext({
                                        headers: {
                                            ...oldHeaders,
                                            authorization: `Bearer ${newAccessToken}`
                                        }
                                    });

                                    const result = await forward(operation).toPromise();
                                    observer.next(result);
                                    observer.complete();
                                } else {
                                    window.location.href = '/login';
                                    observer.error(networkError);
                                }
                            } catch (error) {
                                window.location.href = '/login';
                                observer.error(error);
                            }
                        })();
                    });
                }
            }
        });

        const apolloClient = new ApolloClient({
            link: errorLink.concat(uploadLink),
            cache: new InMemoryCache(),
        });

        return apolloClient;
    }, [accessToken, setAccessToken])

    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    );
}