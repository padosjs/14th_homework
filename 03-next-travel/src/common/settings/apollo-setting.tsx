"use client"

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    uri: "http://main-practice.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache()
})

export default function ApolloSetting(props) {

    return (
        <ApolloProvider client={client}>
            {props.allpage}
        </ApolloProvider>
    )
}