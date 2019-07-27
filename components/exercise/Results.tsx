import React from "react"
import LinkNext from "next/link"
/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import styled from "../../styled"
import { IDeck, IExercise } from "../../generated/apolloComponents"

interface rightPane {
  exercise: IExercise
}

export default function Results({ results, tests }: any) {
  return (
    <Wrapper>
      <DescriptionWrapper>
        <h1>Results</h1>
        <ResultsWrapper>
          <Tests>
            <h1>Tests</h1>
            {tests.split(";").map((test, key: number) => (
              <span key={key}>{test}</span>
            ))}
          </Tests>
          <UserResults>
            <h1>Received</h1>
            {results.map((res, key: number) => (
              <span key={key}>{res.user}</span>
            ))}
          </UserResults>
          <SolResults>
            <h1>Expected</h1>
            {results.map((res, key: number) => (
              <span key={key}>{res.solution}</span>
            ))}
          </SolResults>
          <ComparedResults>
            <h1>Results</h1>
            {results.map((res, key: number) =>
              res.solution === res.user ? (
                <EmojiWrapper key={key} style={{}}>
                  ✅
                </EmojiWrapper>
              ) : (
                <EmojiWrapper key={key} style={{}}>
                  🚫
                </EmojiWrapper>
              ),
            )}
          </ComparedResults>
        </ResultsWrapper>
      </DescriptionWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  padding: 2rem;
`
const DescriptionWrapper = styled.div`
  margin: 0 auto;
  h1 {
    text-align: center;
  }
  p {
    font-size: 16px;
  }
`

const ResultsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 1fr;

  h1 {
    padding: 1rem;
    text-align: center;
    border: 0.5px solid ${props => props.theme.bo1};
  }
  span {
    font-size: 17px;
    padding: 1rem;
    text-align: center;
    height: 100%;
    border: 0.5px solid ${props => props.theme.bo1};
  }
`
const Tests = styled.div`
  display: flex;
  flex-direction: column;
`

const UserResults = styled.div`
  display: flex;
  flex-direction: column;
`

const SolResults = styled.div`
  display: flex;
  flex-direction: column;
`

const ComparedResults = styled.div`
  display: flex;
  flex-direction: column;
`

const EmojiWrapper = styled.div`
  font-size: 2.1rem;
  padding: 0.5rem;
  height: 100%;
  text-align: center;
  border: 0.5px solid ${props => props.theme.bo1};
`
