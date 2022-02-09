import React from "react";

import styled from "../../styled";

export default function ErrorCode({ error }: any) {
  return (
    <Wrapper>
      <DescriptionWrapper>
        <h1>Error</h1>
        <pre>
          <code>{error}</code>
        </pre>
      </DescriptionWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 2rem;
  width: 100%;
  code {
    white-space: pre-wrap;
    word-break: break-all;
    font-size: 16px;
  }
`;
const DescriptionWrapper = styled.div`
  padding: 0 auto;
  width: 100%;
  h1 {
    text-align: center;
    padding: 1rem;
    /* border-bottom: 0.5px solid ${(props) => props.theme.bo1}; */
  }
  p {
    font-size: 16px;
  }
`;
