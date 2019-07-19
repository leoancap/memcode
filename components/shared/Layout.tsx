import * as React from "react"
import Head from "next/head"
import styled, { ThemeProvider, Global } from "../../styled"
import { useStore } from "../../store"
import { darkTheme, lightTheme } from "../../styled/themes/base"
import { globalStyles } from "../../styled/global"
import Link from "./Link"
import { Button, Box, Flex, Text } from "@rebass/emotion"
import { observer } from "mobx-react-lite"
import { LightBulb } from "../../styled/lightBulb"
import PopUp from "./PopUp"
import Modal from "react-modal"
import { resetGlobalState } from "mobx/lib/internal"
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
          <Box mr="auto" pl={[1, 2, 4, 6]}>
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
            pr={[1, 2, 4, 6]}
          >
            <PlugInWrapper>
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
  /* display: flex; */
  /* align-items: center; */
  overflow: hidden;
  height: 100vh;
`

export const TextStyled = styled(Text)`
  color: ${props => props.theme.co2};
`

const PlugInWrapper = styled.div`
  img {
    height: 3rem;
    width: 3rem;
    filter: invert(1);
  }
`

export const Header = styled(Flex)`
  height: 7rem;
  background: ${props => props.theme.bg2};
`

export const NavHeader = styled.nav``

export const LinkStyled = styled.h5`
  /* text-decoration: none; */
  /* font-size: ${props => props.theme.fz2}; */
`

export default Layout
