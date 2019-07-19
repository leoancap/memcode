import styled from "../../styled"
import React from "react"
import { useStore } from "../../store"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import { IExercise } from "../../generated/apolloComponents"
import { Button, Text, Box } from "@rebass/emotion"
import { prettify } from "../../utils/prettify"
import Results from "../exercise/Results"
import ErrorCode from "../exercise/ErrorCode"

interface IRightPane {
  exercise: IExercise
  rightPane: string
  results: any
  handleReview: (value: number) => void
  error: string
}

export default ({ results, exercise, handleReview, error }: IRightPane) => {
  const store = useStore()
  // console.log(results)
  // console.log(error)
  const [tabIndex, setTabIndex] = React.useState(0)

  React.useEffect(() => {
    if (results) {
      setTabIndex(2)
    }
  }, [results])

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
                <pre>{prettify(exercise.solution).code}</pre>
              </code>
            </SolutionWrapper>
          </TabContent>
        </TabPanel>
        <TabPanel>
          <TabContent>
            <Results tests={exercise.tests} results={results} />
            {error && <ErrorCode error={error} />}
            {store && store.user && (
              <StrenghtenButtons>
                <Button onClick={handleReview(-1)}>Again</Button>
                <Button onClick={handleReview(1)}>Good</Button>
                <Button onClick={handleReview(2)}>Easy</Button>
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
    border-color: ${props => props.theme.bo1};
  }
  .react-tabs__tab-list {
    border-color: ${props => props.theme.bo1};
  }
  .react-tabs__tab--disabled {
    color: inherit !important;
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
  justify-content: space-evenly;
  right: 0;
  height: 6rem;
  width: 100%;
  button {
    transition: transform 400ms ease-in-out;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
      font-size: 18px;
    }
    font-size: 16px;
    margin: 1rem;
    &:first-child {
      background: #fb7771;
    }
    &:nth-child(2) {
      background: #3bba33;
    }
  }
`
