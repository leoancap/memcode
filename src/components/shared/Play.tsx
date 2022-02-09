import React from "react";
import styled from "../../styled";

export function Play() {
  return (
    <Wrapper>
      <svg width="30" height="30" viewBox="3.5,4.5,24,24">
        <path d="M 11 9 L 24 16 L 11 23 z" />
      </svg>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  &:hover {
    /* transform: scale(1.03); */
    border-width: 6px;
    filter: invert(0.1);
  }
  svg {
    path {
      fill: ${(props) => props.theme.co1};
    }
  }
  width: 5rem;
  height: 5rem;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background-color: ${(props) => props.theme.bg1};
  cursor: pointer;
  border-radius: 100%;
  transition: all 0.3s;
  border-width: 3px;
  border-style: solid;
  border-color: ${(props) => props.theme.bo1};
  border-image: initial;
`;
