import styled from "../../styled"
import React, { useEffect } from "react"
import { useStore } from "../../store"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import { IExercise } from "../../generated/apolloComponents"
import { Button, Text, Box } from "@rebass/emotion"
import { prettify } from "../../utils/prettify"
import Results from "../exercise/Results"
import ErrorCode from "../exercise/ErrorCode"
import { RightPaneEnum } from "../../pages/deck/[deck]"
import { IResults } from "../../utils/testCode"

interface IRightPane {
  exercise: IExercise
  rightPane: RightPaneEnum
  results: IResults[] | null
  handleReview: (value: number) => void
  error: string
  isReviewed: boolean
  language: string
}

export default ({
  language,
  results,
  exercise,
  handleReview,
  error,
  rightPane,
  isReviewed,
}: IRightPane) => {
  const store = useStore()
  const [tabIndex, setTabIndex] = React.useState(0)

  useEffect(() => {
    setTabIndex(rightPane)
  }, [rightPane])

  return (
    <Container>
      <Tabs selectedIndex={tabIndex} onSelect={setTabIndex}>
        <TabList>
          <Tab>
            <TabHeader>Description</TabHeader>
          </Tab>
          <Tab>
            <TabHeader>Solution</TabHeader>
          </Tab>
          <Tab disabled={!results}>
            <TabHeader>Results</TabHeader>
          </Tab>
        </TabList>

        <TabPanel>
          <TabContent>
            <p>{exercise.description}</p>
          </TabContent>
        </TabPanel>
        <TabPanel>
          <TabContent>
            <SolutionWrapper>
              <code>
                <pre>
                  {language === "Python"
                    ? exercise.solution
                    : prettify(exercise.solution).code}
                </pre>
              </code>
            </SolutionWrapper>
          </TabContent>
        </TabPanel>
        <TabPanel>
          <TabContent>
            {results && <Results tests={exercise.tests} results={results} />}
            {error && <ErrorCode error={error} />}
            {store && store.user && (
              <StrenghtenButtons>
                {isReviewed ? (
                  <h1 style={{ margin: "auto" }}>👁 Reviewed 👁</h1>
                ) : (
                  <>
                    <Button onClick={handleReview(-1)}>Again</Button>
                    <Button my="auto" onClick={handleReview(1)}>
                      Good
                    </Button>
                    <Button onClick={handleReview(2)}>Easy</Button>
                  </>
                )}
              </StrenghtenButtons>
            )}
          </TabContent>
        </TabPanel>
      </Tabs>
    </Container>
  )
}

const Container = styled.div`
  background-color: ${props => props.theme.bg1};
  .react-tabs__tab--selected {
    background-color: ${props => props.theme.bg1};
    color: ${props => props.theme.co1};
    /* border-color: ${props => props.theme.bo1}; */
    /* box-shadow: 0 1px 2px rgba(59, 64, 69, 0.1); */
    border: none;
    border-bottom:3px solid ${props => props.theme.co1};
    margin-left: 0.1rem;
  }
  .react-tabs__tab-list {
    border: none;
    /* border-color: ${props => props.theme.bo1}; */
    border-bottom:1px solid ${props => props.theme.bo1};
  }
  .react-tabs__tab--disabled {
    background-color: ${props => props.theme.bg1};
    color: ${props => props.theme.co1};
    /* color: inherit !important; */
    opacity: 0.5 !important;
  }
`

const TabHeader = styled(Text)`
  font-size: 19px;
  padding-left: 1rem;
  padding-right: 1rem;
`

const TabContent = styled(Box)`
  padding: 1rem;
  p {
    font-size: 18px;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  width: 100%;
`
const SolutionWrapper = styled.div`
  code {
    width: 100%;
    font-size: 20px;
    text-align: left;
    /* pre {
      width: 100%;
      font-size: 16px;
      text-align: left;
    } */
  }
`

const StrenghtenButtons = styled.div`
  position: absolute;
  bottom: 5%;
  margin-bottom: 14rem;
  display: flex;
  justify-content: space-between;
  right: 0;
  height: 6rem;
  width: 100%;
  button {
    transition: all 0.2s;
    cursor: pointer;
    &:hover {
      transform: scale(1.03);
      filter: invert(0.03);
    }
    margin: 1rem auto;
    font-size: 17px;
    &:first-child {
      background: #fb7771;
    }
    &:nth-child(2) {
      background: #3bba33;
    }
  }
`
