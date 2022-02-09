import styled from "../../styled"
import { Button, Box, Flex, Text } from "rebass"

export const GlobalContainer = styled.div`
  overflow: hidden;
  overflow-y: auto;
  height: 100vh;
`

export const TextStyled = styled(Text)<{ invert: boolean }>`
  color: ${props => props.theme.co2};
  img {
    ${({ invert }) =>
      invert &&
      `
    filter: invert(1);
    `}
    height: 4rem;
    width: 4rem;
  }
`

export const PlugInWrapper = styled.div<{ invert: boolean }>`
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
  z-index: 1000;
  top: 0;
  width: 99%;
  padding: 0 10%;
  background: ${props => props.theme.bg1};
`

export const NavHeader = styled.nav``

export const LinkStyled = styled.h5``
