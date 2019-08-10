import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { setContext } from "apollo-link-context"
import { createHttpLink } from "apollo-link-http"
import { onError } from "apollo-link-error"
import fetch from "isomorphic-unfetch"
import Router from "next/router"

let apolloClient: ApolloClient<NormalizedCacheObject>

export const isServer = typeof window === "undefined"

export const runReasonEndpoint =
  "https://fathomless-refuge-53477.herokuapp.com/"

export const runPythonEndpoint = "https://memcode-api.now.sh/python"

export const uri = "https://memcode-api.now.sh/graphql"

export function createApolloClient(state: any, { getToken }: any) {
  if (apolloClient) {
    return apolloClient
  } else {
    const httpLink = createHttpLink({
      fetch,
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
