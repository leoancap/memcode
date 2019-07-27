import ApolloClient from "apollo-client"
import { Container, default as NextApp } from "next/app"
import Head from "next/head"
import React, { Fragment } from "react"
import {
  ApolloProvider as ApolloHookProvider,
  getMarkupFromTree,
} from "react-apollo-hooks"
import { renderToString as renderFunction } from "react-dom/server"
import { createApolloClient } from "../lib/apollo"
import { createStore, IStore, StoreProvider } from "../store"
import { meQuery } from "../graphql/user/queries/me"
import { parseCookies } from "../utils/parseCookies"

export default class extends React.Component {
  static async getInitialProps(ctx: any) {
    const {
      Component,
      router,
      ctx: { req, res },
    } = ctx

    const store = createStore({
      user: "",
      dark: false,
      vim: false,
      sideBarOpen: true,
    })

    const apolloClient = createApolloClient(store, {
      getToken: () => parseCookies(req).qid,
    })
    const theme = parseCookies(req).memcodeTheme
    const vim = parseCookies(req).memcodeVim
    const sideBar = parseCookies(req).memcodeSidebar
    if (theme) {
      store.setTheme(JSON.parse(theme))
    }
    if (vim) {
      store.setVim(JSON.parse(vim))
    }
    if (sideBar) {
      store.setSideBar(JSON.parse(sideBar))
    }

    ctx.ctx.apolloClient = apolloClient
    ctx.ctx.store = store

    const appProps = await App.getInitialProps(ctx)

    const { data } = await apolloClient.query({ query: meQuery })
    if (data && data.me) {
      store.setUser(data.me.uuid)
    }

    if (res && res.finished) {
      try {
        await getMarkupFromTree({
          tree: (
            <App
              Component={Component}
              router={router}
              apolloClient={apolloClient}
              store={store}
              {...appProps}
            />
          ),
          renderFunction,
        })
      } catch (error) {
        // tslint:disable-next-line:no-console
        console.error("[Error 29948] Operating queries for SSR failed")
      }
    }

    Head.rewind()

    return {
      apolloState: apolloClient.cache.extract(),
      storeState: store,
      ...appProps,
    }
  }

  apolloClient: ApolloClient<any>
  store: IStore

  constructor(props: any) {
    super(props)
    this.store = createStore(props.storeState)
    this.apolloClient = createApolloClient(props.apolloState, {
      getToken: () => parseCookies().qid,
    })
  }

  render() {
    return (
      <>
        <App
          {...this.props}
          apolloClient={this.apolloClient}
          store={this.store}
        />
      </>
    )
  }
}

class App extends NextApp<any> {
  render() {
    const { Component, pageProps, store } = this.props

    return (
      <Container>
        <Head>
          <title>Hello, Next.js</title>
        </Head>
        <ApolloHookProvider client={this.props.apolloClient}>
          <StoreProvider value={this.props.store}>
            <Fragment>
              <Component {...pageProps} />
            </Fragment>
          </StoreProvider>
        </ApolloHookProvider>
      </Container>
    )
  }
}
