import React from "react"
import LinkNext from "next/link"
/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import styled from "../../styled"
import { IDeck, IExercise } from "../../generated/apolloComponents"

interface rightPane {
  exercise: IExercise
}

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
  )
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
`
const DescriptionWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  h1 {
    text-align: center;
    padding: 1rem;
    border-bottom: 0.5px solid ${props => props.theme.bo1};
  }
  p {
    font-size: 16px;
  }
`
