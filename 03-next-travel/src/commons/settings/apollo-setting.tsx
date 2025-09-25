"use client"

import { useAccessTokenStore } from '@/commons/stores/access-token-store';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { ReactNode, useEffect } from 'react';

export default function ApolloSetting(props) {

    useEffect(() => {
        const result = localStorage.getItem("accessToken")
        setAccessToken(result ?? "")
    }, [])

    const { accessToken, setAccessToken } = useAccessTokenStore()

    const uploadLink = createUploadLink({
        uri: "http://main-practice.codebootcamp.co.kr/graphql",
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const client = new ApolloClient({
        link: uploadLink,
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    );
}