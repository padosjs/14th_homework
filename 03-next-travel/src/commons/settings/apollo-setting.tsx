"use client"

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ReactNode } from 'react';

const client = new ApolloClient({
    uri: "http://main-practice.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache()
})

interface IProps {
    children: ReactNode;
}

export default function ApolloSetting(props: IProps) {

    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    )
}