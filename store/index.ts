import { useStaticRendering } from "mobx-react-lite"
import { types } from "mobx-state-tree"
import { createContext, useContext } from "react"

const isServer = typeof window === "undefined"

useStaticRendering(isServer)

export interface IEnvironments {
  [key: string]: string
}
export interface ITokens {
  accessToken: string
  refreshToken: string
}

export type IStore = typeof Store.Type
type IStoreState = typeof Store.CreationType

let store: IStore | null = null

export function createStore(storeState: IStoreState): IStore {
  if (isServer) {
    return Store.create(storeState)
  } else if (store !== null) {
    return store
  } else {
    return (store = Store.create(storeState))
  }
}

const Tokens = types.model("Tokens", {
  accessToken: types.string,
  refreshToken: types.string,
})

const Store = types
  .model("Store", {
    environments: types.map(types.string),
    tokens: types.maybe(Tokens),
    user: "",
    dark: false,
    vim: false,
    sideBarOpen: true,
  })
  .views(self => ({
    get isAuthenticated() {
      return typeof self.tokens !== "undefined"
    },
  }))
  .actions(self => ({
    setEnvironments(environments: { [key: string]: string }) {
      Object.entries(environments).map(([key, value]) => {
        if (value) {
          self.environments.set(key, value)
        }
      })
    },
    toggleVim() {
      self.vim = !self.vim
    },
    toggleSideBar() {
      self.sideBarOpen = !self.sideBarOpen
    },
    toggleTheme() {
      self.dark = !self.dark
    },
    setSideBar(value: boolean) {
      self.sideBarOpen = value
    },
    setVim(value: boolean) {
      self.vim = value
    },
    setTheme(theme: boolean) {
      self.dark = theme
    },
    setUser(uuid: string) {
      self.user = uuid
    },
  }))

export const StoreContext = createContext({} as IStore)
export const StoreProvider = StoreContext.Provider
export const useStore = () => useContext(StoreContext)
