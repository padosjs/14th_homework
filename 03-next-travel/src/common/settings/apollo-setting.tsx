"use client"

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ReactNode } from 'react'; // ReactNode를 import 합니다.

const client = new ApolloClient({
    uri: "http://main-practice.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache()
})

interface IProps {
    allpage: ReactNode;
}

export default function ApolloSetting(props: IProps) {

    return (
        <ApolloProvider client={client}>
            {props.allpage}
        </ApolloProvider>
    )
}