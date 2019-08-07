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
        <ResultsWrapper>
          <Tests>
            <h1>Tests</h1>
            {tests.split(";").map((test, key: number) => (
              <section key={key}>
                <span>{test}</span>
              </section>
            ))}
          </Tests>
          <UserResults>
            <h1>Received</h1>
            {results.map((res, key: number) => (
              <section key={key}>
                <span>{res.user}</span>
              </section>
            ))}
          </UserResults>
          <SolResults>
            <h1>Expected</h1>
            {results.map((res, key: number) => (
              <section key={key}>
                <span>{res.solution}</span>
              </section>
            ))}
          </SolResults>
          <ComparedResults>
            <h1>Results</h1>
            {results.map((res, key: number) =>
              res.solution === res.user ? (
                <section key={key}>
                  <EmojiWrapper key={key} style={{}}>
                    ✅
                  </EmojiWrapper>
                </section>
              ) : (
                <section key={key}>
                  <EmojiWrapper key={key} style={{}}>
                    🚫
                  </EmojiWrapper>
                </section>
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
    font-size: 17px;
  }
  p {
    font-size: 16px;
  }
`

const ResultsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-gap: 1rem;

  h1 {
    border-radius: 0.5rem;
    padding: 1rem;
    text-align: center;
    box-shadow: ${props => props.theme.bo2};
  }
  section {
    width: 100%;
    padding: 1rem;
    height: 100%;
    border: 0.5px solid ${props => props.theme.bo2};
    box-shadow: ${props => props.theme.bo2};
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  span {
    font-size: 16px;
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
`
