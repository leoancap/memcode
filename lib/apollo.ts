import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { setContext } from "apollo-link-context"
import { createHttpLink } from "apollo-link-http"
import { onError } from "apollo-link-error"
import fetch from "isomorphic-unfetch"
import Router from "next/router"

let apolloClient: ApolloClient<NormalizedCacheObject>

const isServer = typeof window === "undefined"

export const runPythonEndpoint =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/"
    : "https://memcode.leoancap.now.sh/python"

export const uri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/be"
    : "https://memcode.leoancap.now.sh/be"

export function createApolloClient(state: any, { getToken }: any) {
  if (apolloClient) {
    return apolloClient
  } else {
    const httpLink = createHttpLink({
      fetch,
      // uri: process.env.NEXT_APP_GRAPHQL_ENDPOINT,
      uri,
      credentials: "include",
    })

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, location: ${locations}, Path: ${path}`,
          )
          if (!isServer && message.includes("not authenticated")) {
            Router.replace("/continue")
          }
        })
      }
      if (networkError) console.log(`[Network Error]: ${networkError}`)
    })

    const authLink = setContext((_, { headers }) => {
      const token = getToken()
      return {
        headers: {
          ...headers,
          cookie: token ? `qid=${token}` : "",
        },
      }
    })

    const cache = new InMemoryCache()

    cache.restore(state || {})

    if (isServer) {
      return new ApolloClient({
        cache,
        link: errorLink.concat(authLink.concat(httpLink)),
        ssrMode: true,
      })
    } else {
      return (apolloClient = new ApolloClient({
        cache,
        connectToDevTools: true,
        link: errorLink.concat(authLink.concat(httpLink)),
      }))
    }
  }
}
