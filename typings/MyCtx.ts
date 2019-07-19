import { ApolloClient, NormalizedCacheObject } from "apollo-boost"
import { NextPageContext } from "next"
import { IStore } from "../store"

export interface MyCtx extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>
  store: IStore
}
