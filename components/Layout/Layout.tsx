import * as React from "react"
import Head from "next/head"
import { Box } from "@rebass/emotion"
import { observer } from "mobx-react-lite"
import Modal from "react-modal"
import Router from "next/router"

import { ThemeProvider, Global } from "../../styled"
import { useStore } from "../../store"
import { darkTheme, lightTheme } from "../../styled/themes/base"
import { globalStyles } from "../../styled/global"
import logo from "../../static/logo.svg"
import Link from "../shared/Link"
import PopUp from "../shared/PopUp"
import { GlobalContainer, Header, TextStyled, PlugInWrapper } from "./styles"

const customStyles = {
  content: {
    top: "50px",
    left: "82%",
    right: "auto",
    bottom: "auto",
    background: "transparent",
    margin: 0,
    transform: "translateX(-50%)",
    border: "none",
  },
  overlay: {
    background: "transparent",
    zIndex: 1000,
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
              <TextStyled invert={store.dark} fontSize={[2, 3, 4, 5]} pr="auto">
                <img src={logo} alt="" />
              </TextStyled>
            </Link>
          </Box>
          {store.user && (
            <Box pl="2rem">
              <Link to="/strenghten">
                <TextStyled fontSize={[2, 3, 4]}>Strenghten</TextStyled>
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

export default Layout
