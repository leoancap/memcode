import * as React from "react"
import Head from "next/head"
import styled, { ThemeProvider, Global } from "../../styled"
import { useStore } from "../../store"
import { darkTheme, lightTheme } from "../../styled/themes/base"
import { globalStyles } from "../../styled/global"
import Link from "./Link"
import { Button, Box, Flex, Text } from "@rebass/emotion"
import { observer } from "mobx-react-lite"
import PopUp from "./PopUp"
import Modal from "react-modal"
import Router from "next/router"

const customStyles = {
  content: {
    top: "15rem",
    left: "90%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: 0,
    borderRadius: "0.9rem",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    background: "transparent",
    zIndex: 2,
  },
}

const Layout = observer(({ children, title = "MemCode" }: any) => {
  const store = useStore()
  const theme = store.dark ? darkTheme : lightTheme

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement("body")
    }
  }, [])

  const [modalOpen, setModalOpen] = React.useState(false)

  const toggleModal = () => setModalOpen(!modalOpen)

  const handleContinue = () => {
    Router.push("/continue")
  }

  return (
    <GlobalContainer>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles(theme)} />
        <Header alignItems="center">
          <Box mr="auto">
            <Link to="/">
              <TextStyled fontSize={[2, 3, 4, 5]} pr="auto">
                MemCode
              </TextStyled>
            </Link>
          </Box>
          {store.user && (
            <Box pl="2rem">
              <Link to="/strenghten">
                <TextStyled fontSize={[2, 3, 4, 5]}>Strenghten</TextStyled>
              </Link>
            </Box>
          )}

          <Box
            style={{ cursor: "pointer" }}
            onClick={store.user ? toggleModal : handleContinue}
            pl="2rem"
          >
            <PlugInWrapper invert={store.dark}>
              <img src="../../static/plug-in.png" alt="" />
            </PlugInWrapper>
          </Box>
          <Modal
            isOpen={modalOpen}
            onAfterOpen={() => {}}
            onRequestClose={toggleModal}
            shouldCloseOnOverlayClick={true}
            style={customStyles}
          >
            <PopUp toggleModal={toggleModal} />
          </Modal>
        </Header>
        {children}
      </ThemeProvider>
    </GlobalContainer>
  )
})

export const GlobalContainer = styled.div`
  overflow: hidden;
  overflow-y: auto;
  height: 100vh;
`

export const TextStyled = styled(Text)`
  color: ${props => props.theme.co2};
`

const PlugInWrapper = styled.div<{ invert: boolean }>`
  img {
    height: 3rem;
    width: 3rem;
    ${({ invert }) =>
      invert &&
      `
      filter: invert(1);
    `}
  }
`

export const Header = styled(Flex)`
  height: 80px;
  position: fixed;
  z-index: 1;
  top: 0;
  width: 99%;
  padding: 0 10%;
  background: ${props => props.theme.bg2};
`

export const NavHeader = styled.nav``

export const LinkStyled = styled.h5``

export default Layout
