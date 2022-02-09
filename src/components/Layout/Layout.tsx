import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import { Box } from "rebass";
import Modal from "react-modal";

import logo from "public/logo.svg";
import login from "public/plug-in.png";
import { GlobalContainer, Header, TextStyled, PlugInWrapper } from "./styles";
import { signIn, useSession } from "next-auth/react";
import { Link, Popup } from "src/components";

import { User } from "@styled-icons/feather";

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
};

type ILayout = {
  children: React.ReactChild;
  title?: string;
};

export const Layout = ({ children, title = "MemCode" }: ILayout) => {
  const session = useSession();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement("body");
    }
  }, []);

  const [modalOpen, setModalOpen] = React.useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  const isDark = false;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <GlobalContainer>
        <Header alignItems="center">
          <Box mr="auto">
            <Link prefetch={true} to="/">
              <TextStyled invert={isDark} fontSize={[2, 3, 4, 5]} pr="auto">
                <Image src={logo} alt="logo" width="48" height="48" />
              </TextStyled>
            </Link>
          </Box>
          {/* {session.status === "authenticated" && ( */}
          {/*   <Box pl="2rem"> */}
          {/*     <Link prefetch={true} to="/strenghten"> */}
          {/*       <TextStyled fontSize={[2, 3, 4]}>Strenghten</TextStyled> */}
          {/*     </Link> */}
          {/*   </Box> */}
          {/* )} */}

          <Box
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (session.status === "authenticated") {
                setModalOpen(true);
              } else {
                signIn();
              }
            }}
            pl="2rem"
          >
            <PlugInWrapper invert={isDark}>
              {session.status === "authenticated" ? (
                <img
                  src={session.data.user.image}
                  title="Disconnect"
                  alt="avatar"
                  style={{ width: "48px", height: "48px" }}
                />
              ) : (
                <User width={48} height={48} title={"Connect with Github"} />
              )}
            </PlugInWrapper>
          </Box>
          <Modal
            isOpen={modalOpen}
            onAfterOpen={() => {}}
            onRequestClose={toggleModal}
            shouldCloseOnOverlayClick={true}
            style={customStyles}
          >
            <Popup />
          </Modal>
        </Header>
        {children}
      </GlobalContainer>
    </>
  );
};
