"use client"

import { useAccessTokenStore } from '@/commons/stores/access-token-store';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { ReactNode } from 'react';

interface IProps { children: ReactNode; }

export default function ApolloSetting(props: IProps) {

    const { accessToken } = useAccessTokenStore()

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