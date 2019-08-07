import React from "react"
import { observer } from "mobx-react-lite"
import { useStore } from "../../store"
import styled from "../../styled"
import "react-toggle/style.css"
import Toggle from "react-toggle"
import cookie from "js-cookie"
import { Button, Box, Flex, Text } from "@rebass/emotion"
import Link from "./Link"
import { MoonSVG } from "../../static/moon"
import { StarSVG } from "../../static/star"
import VimSVG from "../../static/vimLogo.svg"

const Popup: any = observer(({ toggleModal, popupOpen }: any) => {
  const store = useStore()

  React.useEffect(() => {
    cookie.set("memcodeTheme", store.dark)
    cookie.set("memcodeVim", store.vim)
  }, [store.dark, store.vim])

  return (
    <PopUpWrapper>
      <ToggleField onClick={() => store.toggleTheme()}>
        {store.dark ? (
          <>
            <span>Dark mode</span>
            <StarSVG />
          </>
        ) : (
          <>
            <span>light mode</span>
            <MoonSVG />
          </>
        )}
      </ToggleField>
      <ToggleField onClick={() => store.toggleVim()}>
        <span>{store.vim ? "Disable" : "Enable"} Vim </span>
        <img src={VimSVG} alt="" />
      </ToggleField>
      <Box width="100%" onClick={toggleModal}>
        <Link to="/logout">
          <ShutDown dark={store.dark}>
            <span>Logout</span>
            <img src="../../static/shut-down.png" alt="" />
          </ShutDown>
        </Link>
      </Box>
    </PopUpWrapper>
  )
})

const PopUpWrapper = styled.div`
  z-index: 2;
  border-radius: 0.5rem;
  margin: 0.5rem;
  padding: 0.5rem 0;
  box-shadow: ${props => props.theme.bo2};
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
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  width: 100%;

  svg {
    transform: scale(1.35);
    margin-right: 0.2rem;
  }
  img {
    height: 20px;
    width: 20px;
  }
  padding: 1rem;
  border-bottom: 0.5px solid ${props => props.theme.bo1};
  background: ${props => props.theme.bg1};
  color: ${props => props.theme.co1};
  transition: all 0.2s;
  &:hover {
    background: ${props => props.theme.bg2};
  }
  span {
    font-size: 16px;
    padding: 1rem;
  }
`

const ShutDown = styled.div<{ dark: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background: ${props => props.theme.bg1};
  color: ${props => props.theme.co1};
  transition: filter 0.2s;
  &:hover {
    background: ${props => props.theme.bg2};
  }
  span {
    font-size: 16px;
    padding: 1rem;
  }
  img {
    width: 20px;
    height: 20px;
    ${props =>
      props.dark &&
      `
    filter: invert(1);
    `}
  }
`

export default Popup
