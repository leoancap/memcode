import React from "react";
import { Box } from "rebass";
import { MoonSVG } from "public/moon";
import { StarSVG } from "public/star";
import VimSVG from "public/vimLogo.svg";
import { signOut } from "next-auth/react";
import styled from "src/styled";

export const Popup = () => {
  const isDark = false;
  const isVim = false;

  return (
    <PopUpWrapper>
      <ToggleField onClick={() => {}}>
        {isDark ? (
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
      <ToggleField onClick={() => {}}>
        <span>{isVim ? "Disable" : "Enable"} Vim </span>
        <img src={VimSVG} alt="" />
      </ToggleField>
      <Box width="100%" onClick={signOut}>
        <ShutDown dark={true}>
          <span>Logout</span>
          <img src="../../public/shut-down.png" alt="" />
        </ShutDown>
      </Box>
    </PopUpWrapper>
  );
};

const PopUpWrapper = styled.div`
  z-index: 2;
  border-radius: 0.5rem;
  margin: 0.5rem;
  padding: 0.5rem 0;
  box-shadow: ${(props) => props.theme.bo2};
  min-width: 20rem;
  min-height: 15rem;
  background: ${(props) => props.theme.bg1};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

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
  border-bottom: 0.5px solid ${(props) => props.theme.bo1};
  background: ${(props) => props.theme.bg1};
  color: ${(props) => props.theme.co1};
  transition: all 0.2s;
  &:hover {
    background: ${(props) => props.theme.bg2};
  }
  span {
    font-size: 16px;
    padding: 1rem;
  }
`;

const ShutDown = styled.div<{ dark: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background: ${(props) => props.theme.bg1};
  color: ${(props) => props.theme.co1};
  transition: filter 0.2s;
  &:hover {
    background: ${(props) => props.theme.bg2};
  }
  span {
    font-size: 16px;
    padding: 1rem;
  }
  img {
    width: 20px;
    height: 20px;
    ${(props) =>
      props.dark &&
      `
    filter: invert(1);
    `}
  }
`;
