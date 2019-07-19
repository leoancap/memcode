import React from "react"
import LinkNext from "next/link"
/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import styled from "../../styled"
import { IDeck, IExercise } from "../../generated/apolloComponents"
import { prettify } from "../../utils/prettify"

interface rightPane {
  exercise: IExercise
}

export default function Solution({ solution }: any) {
  return (
    <Wrapper>
      <DescriptionWrapper>
        <h1>Solution</h1>
        <code>
          <pre>{prettify(solution).code}</pre>
        </code>
      </DescriptionWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  width: 100%;
`
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
    border-bottom: 0.5px solid ${props => props.theme.bo1};
  }
  p {
    font-size: 16px;
    text-align: left;
  }
`
