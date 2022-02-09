import React from "react";

import styled from "../../styled";

interface rightPane {
  exercise: any;
}

export default function Description({ exercise }: rightPane) {
  return (
    <Wrapper>
      <DescriptionWrapper>
        <h1>Description</h1>
        <p>{exercise.description}</p>
      </DescriptionWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 2rem;
`;
const DescriptionWrapper = styled.div`
  margin: 0 auto;
  h1 {
    text-align: center;
  }
  p {
    font-size: 16px;
    text-align: left;
  }
`;
