import React, { useEffect } from "react"
import dynamic from "next/dynamic"
import { useStore } from "../../store"
import styled, { css } from "../../styled"
import Layout from "../../components/shared/Layout"
import { Button, Box, Flex, Text } from "@rebass/emotion"
import { findDeckByIdQuery } from "../../graphql/deck/queries/findDeck"
import SplitPane from "react-split-pane"
import Play from "../../components/shared/Play"
import { testCode } from "../../utils/testCode"
import cookie from "js-cookie"
import { observer } from "mobx-react-lite"
import {
  IExercise,
  useAddDeckToReviewMutation,
  IDeckToReview,
} from "../../generated/apolloComponents"
import { myDecksToReviewQuery } from "../../graphql/user/queries/myDecksToReview"
import redirect from "../../lib/redirect"
import { MyCtx } from "../../typings/MyCtx"
import { NextComponentType } from "next"
import RightPane from "../../components/shared/RightPane"
import { runPythonEndpoint } from "../../lib/apollo"
import { RightPaneEnum } from "../deck/[deck]"
import { api } from "../../services"

const Editor: any = dynamic(import("../../components/js/Editor"), {
  ssr: false,
})

export type IRightPane = "description" | "error" | "results" | "solution"
export const today = () => Math.floor((new Date() as any) / 8.64e7)

type IResults = {
  user: string
  solution: string
}

type IExercisePage = {
  deck: IDeckToReview
  bundledExercises: string
}

const Review: NextComponentType = observer(
  ({ deck, bundledExercises }: IExercisePage) => {
    const store = useStore()

    const [rightPane, setRightPane] = React.useState<RightPaneEnum>(
      RightPaneEnum.description,
    )
    const [userCode, setUserCode] = React.useState("")
    const [results, setResults] = React.useState<IResults[] | null>()
    const [error, setErrors] = React.useState("")
    const [currentExerIndex, setCurrentExerIndex] = React.useState(0)
    const [reviewedExercises, setReviewedExercises] = React.useState([])
    const [isReviewed, setIsReviewed] = React.useState(false)

    const addDeckToReview = useAddDeckToReviewMutation()

    const now = today()

    const exerToRev = deck.exercisesToReview
      .filter(exer => {
        if (
          exer.nextInterval + exer.lastAttempt <= now &&
          !reviewedExercises.includes(exer.exerciseId)
        ) {
          return true
        }
      })
      .map(exer => exer.exercise)

    const currentExercise: IExercise = exerToRev[currentExerIndex]

    React.useEffect(() => {
      setUserCode(currentExercise.code)
      setRightPane(RightPaneEnum.description)
      setResults(null)
      setIsReviewed(false)
    }, [currentExerIndex])

    const evalCode = async () => {
      if (deck.deck.language === "Reason") {
        const res = await api.runReason(currentExercise, userCode)
        setResults(res.results)
        setRightPane(RightPaneEnum.results)
        if (res.error) {
          setErrors(res.error.message)
          setRightPane(RightPaneEnum.results)
        } else {
          setResults(res.results)
        }
      } else if (deck.deck.language === "Python") {
        const res = await api.runPython(currentExercise, userCode)
        setResults(res.results)
        setRightPane(RightPaneEnum.results)
        if (res.message) {
          setErrors(res.message)
          setRightPane(RightPaneEnum.results)
        } else {
          setResults(res.results)
        }
      } else {
        const res = await testCode(
          userCode,
          currentExercise.solution,
          currentExercise.tests,
          bundledExercises,
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

    useEffect(() => {
      cookie.set("memcodeSidebar", store.sideBarOpen)
    }, [store.sideBarOpen])

    const handleReview = (level: -1 | 1 | 2) => async () => {
      if (exerToRev.length > 0) {
        setReviewedExercises([...reviewedExercises, currentExercise.id])
        if (currentExerIndex + 1 < exerToRev.length) {
          setUserCode(exerToRev[currentExerIndex + 1].code)
        }
        setCurrentExerIndex(0)
        setRightPane(RightPaneEnum.description)
        setResults(null)
      }
      await addDeckToReview({
        variables: {
          exerciseId: currentExercise.id,
          deckId: deck.deckToReviewId,
          level,
        },
      })
    }

    return (
      <>
        <Layout>
          <Content>
            <PageHeader alignItems="center">
              <Box mr="2rem">
                <PageCrumb fontSize={[2, 3, 4]} mr="0">
                  {deck.deck.title}
                </PageCrumb>
              </Box>
              <Box mr="2rem">
                <PageCrumb onClick={evalCode} fontSize={[2, 3, 4]}>
                  <Play />
                </PageCrumb>
              </Box>
            </PageHeader>
            <Container>
              <SplitPane
                split="vertical"
                defaultSize={store.sideBarOpen ? "20rem" : "1.8rem"}
                allowResize={false}
              >
                {store.sideBarOpen ? (
                  <ExercisesPane>
                    <section>
                      {exerToRev.map((exer, key: number) => (
                        <ExercisesItemPane
                          onClick={() => {
                            setCurrentExerIndex(key)
                          }}
                          isSelected={currentExercise.id === exer.id}
                          key={exer.id + key}
                        >
                          {key + 1} - {exer.title}{" "}
                          {currentExercise.id === exer.id && <span>👈</span>}
                        </ExercisesItemPane>
                      ))}
                    </section>
                    <ToggleExercisePaneButton
                      onClick={() => {
                        store.toggleSideBar()
                      }}
                    >
                      <span>{"◀︎"}</span>
                    </ToggleExercisePaneButton>
                  </ExercisesPane>
                ) : (
                  <ToggleExercisePaneButton
                    onClick={() => {
                      store.toggleSideBar()
                    }}
                  >
                    <span>{"►"}</span>
                  </ToggleExercisePaneButton>
                )}
                <SplitPane split="vertical" defaultSize="50%">
                  <EditorPane>
                    <Editor
                      height="inherit"
                      code={userCode}
                      language={deck.deck.language}
                      onChange={value => {
                        setUserCode(value)
                      }}
                      evalCode={evalCode}
                    />
                  </EditorPane>
                  <ResultsPane>
                    <RightPane
                      results={results}
                      isReviewed={isReviewed}
                      exercise={currentExercise}
                      rightPane={rightPane}
                      handleReview={handleReview}
                      language={deck.deck.language}
                      error={error}
                    />
                  </ResultsPane>
                </SplitPane>
              </SplitPane>
            </Container>
          </Content>
        </Layout>
      </>
    )
  },
)

Review.getInitialProps = async ({
  apolloClient,
  query: { deck },
  ...ctx
}: MyCtx) => {
  const {
    data: { myDecksToReview },
  } = await apolloClient.query({ query: myDecksToReviewQuery })
  const currentDeck = myDecksToReview.filter(d => d.deckToReviewId === deck)
  if (currentDeck.length === 0) {
    redirect(ctx, "/")
  }
  const {
    data: { findDeckById },
  } = await apolloClient.query({
    query: findDeckByIdQuery,
    variables: { deckId: deck },
  })
  return {
    deck: currentDeck[0],
    bundledExercises: findDeckById.bundledExercises,
  }
}

export const PageHeader = styled(Flex)`
  height: 7rem;
  background: ${props => props.theme.bg1};
  border-bottom: solid 0.5px ${props => props.theme.bo1};
  padding: 0 10%;
`

const PageCrumb = styled(Text)`
  color: ${props => props.theme.co1};
  font-weight: 500;
  font-size: 18px;
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
`

const Content = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  padding-top: 80px;
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
    -webkit-transition: all 1s ease;
    transition: all 1s ease;
  }

  .Resizer.vertical {
    width: 11px;
    margin: 0 -5px;
    border-left: 0.5px solid #777;
    background: transparent;
    border-right: 0.5px solid #777;
    cursor: col-resize;
  }
  .Resizer.vertical:hover {
    border-left: 4px solid #777;
    border-right: 4px solid #777;
  }
  .Resizer.vertical.disabled:hover {
    cursor: pointer;
  }
  .Resizer.disabled {
    width: 0;
    border-left: 0;
    border-right: 0px solid rgba(0, 0, 0, 0.5);
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
  section {
    width: 18.5rem;
    overflow-y: auto;
    margin-bottom: 14rem;
  }
`
const EditorPane = styled.div`
  /* width: 20rem; */
  /* padding-bottom: 6rem; */
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
  /* width: 20rem; */
  height: 100%;
`

export default Review
