import React from "react"
import { observer } from "mobx-react-lite"
import { useStore } from "../../store"
import styled from "../../styled"
import "react-toggle/style.css"
import Toggle from "react-toggle"
import cookie from "js-cookie"
import { Button, Box, Flex, Text } from "@rebass/emotion"
import Link from "./Link"

const Popup: any = observer(({ toggleModal, popupOpen }: any) => {
  const store = useStore()

  React.useEffect(() => {
    cookie.set("memcodeTheme", store.dark)
    cookie.set("memcodeVim", store.vim)
  }, [store.dark, store.vim])

  return (
    <PopUpWrapper>
      <ToggleField>
        <Toggle defaultChecked={store.dark} onChange={store.toggleTheme} />
        <span>Dark Mode</span>
      </ToggleField>
      <ToggleField>
        <Toggle defaultChecked={store.vim} onChange={store.toggleVim} />
        <span>Vim Mode</span>
      </ToggleField>
      <Box onClick={toggleModal}>
        <Link to="/logout">
          <ShutDown dark={store.dark}>
            <img src="../../static/shut-down.png" alt="" />
          </ShutDown>
        </Link>
      </Box>
    </PopUpWrapper>
  )
})

const PopUpWrapper = styled.div`
  z-index: 2;
  padding: 1rem;
  border-radius: 0.9rem;
  min-width: 20rem;
  min-height: 15rem;
  background: ${props => props.theme.bg1};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const ToggleField = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 16px;
    padding-left: 1rem;
  }
`

const ShutDown = styled.div<{ dark: boolean }>`
  margin: auto;
  img {
    margin: auto;
    width: 3rem;
    height: 3rem;
    ${props =>
      props.dark &&
      `
    filter: invert(1);
    `}
  }
`

export default Popup
