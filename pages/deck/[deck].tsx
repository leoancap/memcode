import React, { useLayoutEffect } from "react"
import dynamic from "next/dynamic"
import { useStore } from "../../store"
import styled, { css } from "../../styled"
import Layout from "../../components/shared/Layout"
import { Button, Box, Flex, Text } from "@rebass/emotion"
import Link from "../../components/shared/Link"
import { MyCtx } from "../../typings/MyCtx"
import { findDeckByIdQuery } from "../../graphql/deck/queries/findDeck"
import SplitPane from "react-split-pane"
import Play from "../../components/shared/Play"
import { testCode } from "../../utils/testCode"
import cookie from "js-cookie"
import { observer } from "mobx-react-lite"
import {
  IDeck,
  useAddDeckToReviewMutation,
  useDeleteExerciseMutation,
} from "../../generated/apolloComponents"
import { NextComponentType } from "next"
import RightPane from "../../components/shared/RightPane"
import ShadowScroll from "../../components/js/ShadowScroll"
import { api } from "../../services"
import Router from "next/router";

const Editor: any = dynamic(import("../../components/js/Editor"), {
  ssr: false,
})

export enum RightPaneEnum {
  "description",
  "solution",
  "results",
}
type IResults = {
  user: string
  solution: string
}
type IExercisePage = {
  deck: IDeck
  exercise: string
}
const Exercise: NextComponentType = observer(({ deck }: IExercisePage) => {
  const store = useStore()
  const [rightPane, setRightPane] = React.useState<RightPaneEnum>(
    RightPaneEnum.description,
  )

  const deleteExercise = useDeleteExerciseMutation()

  const [userCode, setUserCode] = React.useState("")
  const [results, setResults] = React.useState<IResults[] | null>()
  const [error, setErrors] = React.useState("")
  const [isReviewed, setIsReviewed] = React.useState(false)
  const [currentExerIndex, setCurrentExerIndex] = React.useState(0)
  const addDeckToReview = useAddDeckToReviewMutation()
  let currentExercise: any = deck.exercises[currentExerIndex]
  if (!currentExercise) {
    currentExercise = {
      title: "add",
      description: "add description",
      code: "const add = (a,b) => a+b",
      solution: "const add = (a,b) => a+b",
      tests: "add(2,2)",
    }
  }
  React.useEffect(() => {
    if (currentExercise) {
      setUserCode(currentExercise.code)
      setRightPane(RightPaneEnum.description)
      setResults(null)
      setIsReviewed(false)
    }
  }, [currentExerIndex])
  const evalCode = async () => {
    if (deck.language === "Reason") {
      const res = await api.runReason(currentExercise, userCode)
      setResults(res.results)
      setRightPane(RightPaneEnum.results)
      if (res.error) {
        setErrors(res.error.message)
        setRightPane(RightPaneEnum.results)
      } else {
        setResults(res.results)
      }
    } else if (deck.language === "Python") {
      const res = await api.runPython(currentExercise, userCode)
      setResults(res.results)
      setRightPane(RightPaneEnum.results)
      if (res.message) {
        setErrors(res.message)
        setRightPane(RightPaneEnum.results)
        console.log(res)
      } else {
        setResults(res.results)
      }
    } else {
      const res = await testCode(
        userCode,
        currentExercise.solution,
        currentExercise.tests,
        deck.bundledExercises,
      )
      setResults(res.results)
      setRightPane(RightPaneEnum.results)
      if (res.message) {
        if (res.error !== "implementation") {
          setRightPane(RightPaneEnum.results)
          setErrors(res.message)
        } else {
          setErrors("")
        }
      } else {
        setErrors("")
      }
    }
  }
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     evalCode()
  //   }, 20)
  // }, [userCode])
  const handleReview = (level: -1 | 1 | 2) => async () => {
    setIsReviewed(true)
    await addDeckToReview({
      variables: {
        exerciseId: currentExercise.id,
        deckId: deck.id,
        level,
      },
    })
  }
  React.useEffect(() => {
    cookie.set("memcodeSidebar", store.sideBarOpen)
  }, [store.sideBarOpen])
  return (
    <>
      <Layout>
        <Content>
          <PageHeader alignItems="center">
            <Box mr="2rem">
              <PageCrumb fontSize={[2, 3, 4]} mr="0">
                {deck.title}
              </PageCrumb>
            </Box>
            <Box mr="2rem">
              <PageCrumb onClick={evalCode} fontSize={[2, 3, 4]}>
                <Play />
              </PageCrumb>
            </Box>
            {store.user && store.user === deck.user.uuid && (
              <Box ml="auto">
                <Link to={`/exercise-create/${deck.id}`}>
                  <PageCrumbButton fontSize={[2, 3, 4]}>
                    New Exercise
                  </PageCrumbButton>
                </Link>
              </Box>
            )}
          </PageHeader>
          <Container>
            <SplitPane
              split="vertical"
              defaultSize={store.sideBarOpen ? "20rem" : "1.8rem"}
              allowResize={false}
            >
              {store.sideBarOpen ? (
                <ExercisesPane>
                  <ShadowScroll
                    autoHide={true}
                    style={{
                      width: "18.5rem",
                      height: "100%",
                      marginBottom: "12rem",
                    }}
                  >
                    <section>
                      {deck.exercises.map((exer, key: number) => (
                        <ExercisesItemPane
                          isSelected={currentExercise.id === exer.id}
                          onClick={() => {
                            console.log("here")
                            setCurrentExerIndex(key)
                          }}
                          key={exer.id}
                        >
                          {key + 1} - {exer.title}
                          {currentExercise.id === exer.id &&
                            store.user === deck.user.uuid && (
                              <span
                                onClick={e => {
                                  e.stopPropagation()
                                  deleteExercise({
                                    variables: {
                                      deckId: deck.id,
                                      exerciseId: exer.id
                                    }
                                  })
                                  Router.push(`/deck/${deck.id}`)
                                }}
                              >
                                ❌
                              </span>
                            )}
                        </ExercisesItemPane>
                      ))}
                    </section>
                  </ShadowScroll>
                  <ToggleExercisePaneButton onClick={store.toggleSideBar}>
                    <span>{"◀︎"}</span>
                  </ToggleExercisePaneButton>
                </ExercisesPane>
              ) : (
                <ToggleExercisePaneButton onClick={store.toggleSideBar}>
                  <span>{"►"}</span>
                </ToggleExercisePaneButton>
              )}
              <SplitPane split="vertical" defaultSize="50%">
                <EditorPane>
                  <Editor
                    height="inherit"
                    code={userCode}
                    onChange={value => {
                      setUserCode(value)
                    }}
                    evalCode={evalCode}
                  />
                </EditorPane>
                <ResultsPane>
                  <RightPane
                    setRightPane={setRightPane}
                    results={results}
                    isReviewed={isReviewed}
                    exercise={currentExercise}
                    rightPane={rightPane}
                    handleReview={handleReview}
                    error={error}
                    language={deck.language}
                  />
                </ResultsPane>
              </SplitPane>
            </SplitPane>
          </Container>
        </Content>
      </Layout>
    </>
  )
})
Exercise.getInitialProps = async ({ apolloClient, query: { deck } }: MyCtx) => {
  const {
    data: { findDeckById },
  } = await apolloClient.query({
    query: findDeckByIdQuery,
    variables: { deckId: deck },
  })
  findDeckById.exercises.sort((a, b) => Number(a.id) - Number(b.id))
  return { deck: findDeckById }
}
export const PageHeader = styled(Flex)`
  height: 70px;
  background: ${props => props.theme.bg1};
  border-bottom: solid 0.5px ${props => props.theme.bo1};
  width: 100%;
  padding: 0 10%;
  padding-right: 11%;
`

const PageCrumb = styled(Text)`
  color: ${props => props.theme.co1};
  font-weight: 500;
  font-size: 18px;
`
const PageCrumbButton = styled(Text)`
  background: ${props => props.theme.bg1};
  color: ${props => props.theme.co1};
  filter: invert(1);
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.3s ease;
  &:hover {
    filter: invert(0.9);
  }
`
const ExercisesItemPane = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.theme.bg1};
  &:hover {
    background: ${props => props.theme.bg1};
    color: ${props => props.theme.co1};
  }
  color: ${props => props.theme.co1};
  padding: 1rem;
  width: 100%;
  border-bottom: 0.5px solid ${props => props.theme.bo1};
  ${({ isSelected }) =>
    isSelected &&
    `
    filter: invert(0.1)
  `}
  span {
    &:hover {
      transform: scale(1.1);
    }
  }
`

const Content = styled.div`
  height: 100%;
  width: 100vw;
  padding-top: 80px;
  overflow: hidden;
`
const ResizerCss = css`
  .Resizer {
    background: #000;
    opacity: 0.2;
    z-index: 1;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -moz-background-clip: padding;
    -webkit-background-clip: padding;
    background-clip: padding-box;
  }
  .Resizer:hover {
    -webkit-transition: all 2s ease;
    transition: all 2s ease;
  }
  .Resizer.vertical {
    width: 1px;
    margin: 0 -1px;
    border-left: 1px solid #767676;
    border-right: 1px solid #767676;
    cursor: col-resize;
  }
  .Resizer.vertical:hover {
    border-left: 1px solid #767676;
    border-right: 1px solid #767676;
  }
  .Resizer.vertical.disabled:hover {
    cursor: pointer;
  }
  .Resizer.disabled {
    width: 0;
    border-left: 0;
    border-right: 0px solid rgba(0, 0, 0, 0.5);
    /* border-color: transparent; */
    margin: 0;
  }
`
const Container = styled(Flex)`
  height: calc(100vh - 12rem);
  overflow-x: hidden;
  overflow-y: hidden;
  width: 100vw;
  ${ResizerCss}
`
const ToggleExercisePaneButton = styled.div`
  cursor: pointer;
  position: relative;
  border-right: 0.5px solid ${props => props.theme.bo1};
  border-left: 0.5px solid ${props => props.theme.bo1};
  background: ${props => props.theme.bg1};
  height: 100%;
  width: 1.5em;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  &:hover {
    background: ${props => props.theme.bg1};
  }
  span {
    margin: 0;
    padding: 0;
    text-align: center;
    font-size: 19px;
    position: absolute;
    top: 35%;
    right: 50%;
    transform: translate(50%);
  }
`
const ExercisesPane = styled.div`
  display: flex;
  justify-content: space-between;
  border-right: 0.5px solid rgba(0, 0, 0, 0.5);
  height: 100%;
  background: ${props => props.theme.bg1};
  section {
    width: 18.5rem;
    overflow-y: auto;
    margin-bottom: 14rem;
  }
`
const EditorPane = styled.div`
  height: 100%;
  * {
    height: calc(100vh - 14rem);
  }
  outline: none;
  font-family: monaco !important;
  .ace_scrollbar-h {
    overflow: hidden;
  }
`
const ResultsPane = styled.div`
  position: relative;
  height: 100%;
`
export default Exercise
