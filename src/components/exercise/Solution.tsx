import React from "react";

import styled from "../../styled";
import { prettify } from "../../utils/prettify";

export default function Solution({ language, solution }: any) {
  return (
    <Wrapper>
      <DescriptionWrapper>
        <h1>Solution</h1>
        <code>
          <pre>
            {language === "Python" ? solution : prettify(solution).code}
          </pre>
        </code>
      </DescriptionWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  width: 100%;
`;
const DescriptionWrapper = styled.div`
  /* margin: 0 auto; */
  code {
    width: 100%;
    font-size: 16px;
    text-align: left;
    pre {
      width: 100%;
      font-size: 16px;
      text-align: left;
    }
  }
  h1 {
    text-align: center;
    padding-bottom: 1rem;
    width: 100%;
    border-bottom: 0.5px solid ${(props) => props.theme.bo1};
  }
  p {
    font-size: 16px;
    text-align: left;
  }
`;
