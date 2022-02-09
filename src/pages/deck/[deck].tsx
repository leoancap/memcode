import React from "react";
import dynamic from "next/dynamic";
import { Box, Flex, Text } from "rebass";
import SplitPane from "react-split-pane";
import { useSession } from "next-auth/react";
import { Layout, Link, Play, RightPane, ShadowScroll } from "src/components";
import styled, { css } from "src/styled";
import { prisma } from "src/lib/prisma";
import { useEvalCode } from "src/hooks/useEvalCode";
import { Exercise } from "@prisma/client";
import { TLevel } from "src/utils/contants";
import Router from "next/router";

const Editor = dynamic(import("../../components/js/Editor"), {
  ssr: false,
});

type IExercisePage = {
  deck: any;
  exercise: string;
};

const ExercisePage = ({ deck = {} }: IExercisePage) => {
  const [userCode, setUserCode] = React.useState("");
  const [currentExerIndex, setCurrentExerIndex] = React.useState(0);

  const exercises = deck.exercises ?? [];

  let currentExercise: Partial<Exercise> = exercises[currentExerIndex];
  if (!currentExercise) {
    currentExercise = {
      title: "add",
      description: "Implement the add function",
      code: "let add = (a,b) => a+b",
      solution: "let add = (a,b) => a+b",
      tests: "add(2,2);",
    };
  }

  const { error, results, evalCode, rightPane, setRightPane } = useEvalCode({
    code: userCode,
    solution: currentExercise.solution,
    tests: currentExercise.tests,
    language: deck.language,
    bundledExercises: deck.bundledExercises,
  });

  React.useEffect(() => {
    if (currentExercise) {
      setUserCode(currentExercise.code);
      setRightPane("description");
    }
  }, [currentExerIndex]);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     evalCode()
  //   }, 20)
  // }, [userCode])
  const handleReview = (level: TLevel) => async () => {
    // await addDeckToReview({
    //   variables: {
    //     exerciseId: currentExercise.id,
    //     deckId: deck.id,
    //     level,
    //   },
    // });
  };

  const removeExercise = React.useCallback(async (exerciseId: string) => {
    const res = await (
      await fetch("/api/remove-exercise", {
        method: "POST",
        body: JSON.stringify({ exerciseId, deckId: deck.id }),
      })
    ).json();
    Router.reload();
    console.log({ res });
  }, []);

  const session = useSession();

  const isSideBarOpen = true;

  // console.log({ deck });
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
            {session.status === "authenticated" &&
              session.data.id === deck.userId && (
                <Box ml="auto">
                  <Link to={`/create/${deck.id}`}>
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
              defaultSize={isSideBarOpen ? "20rem" : "1.8rem"}
              allowResize={false}
            >
              {isSideBarOpen ? (
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
                      {exercises.map((exer: Partial<Exercise>, key: number) => (
                        <ExercisesItemPane
                          onClick={() => {
                            setCurrentExerIndex(key);
                          }}
                          key={exer.id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>
                            {key + 1} - {exer.title}
                          </span>
                          {session.status === "authenticated" && (
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                removeExercise(exer.id);
                              }}
                              style={{ marginRight: "1rem" }}
                            >
                              x
                            </span>
                          )}
                        </ExercisesItemPane>
                      ))}
                    </section>
                  </ShadowScroll>
                  <ToggleExercisePaneButton
                    onClick={() => {
                      // store.toggleSideBar;
                    }}
                  >
                    <span>{"◀︎"}</span>
                  </ToggleExercisePaneButton>
                </ExercisesPane>
              ) : (
                <ToggleExercisePaneButton
                  onClick={() => {
                    // store.toggleSideBar;
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
                    onChange={(value) => {
                      setUserCode(value);
                    }}
                    evalCode={evalCode}
                  />
                </EditorPane>
                <ResultsPane>
                  <RightPane
                    results={results}
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
  );
};

export const getServerSideProps = async ({ query: { deck: deckId } }) => {
  const deck = await prisma.deck.findFirst({
    where: { id: { equals: deckId as string } },
    include: { exercises: true },
  });

  const bundledExercises = deck.exercises
    .map((exer) => exer.solution)
    .join(" ; ");

  const serializedDeck = JSON.parse(JSON.stringify(deck));
  return {
    props: { deck: { ...serializedDeck, bundledExercises } },
  };
};
export const PageHeader = styled(Flex)`
  height: 70px;
  background: ${(props) => props.theme.bg1};
  border-bottom: solid 0.5px ${(props) => props.theme.bo1};
  width: 100%;
  padding: 0 10%;
  padding-right: 11%;
`;

const PageCrumb = styled(Text)`
  color: ${(props) => props.theme.co1};
  font-weight: 500;
  font-size: 18px;
`;
const PageCrumbButton = styled(Text)`
  background: ${(props) => props.theme.bg1};
  color: ${(props) => props.theme.co1};
  filter: invert(1);
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.3s ease;
  &:hover {
    filter: invert(0.9);
  }
`;
const ExercisesItemPane = styled.div`
  cursor: pointer;
  font-size: 16px;
  background: ${(props) => props.theme.bg1};
  transition: background-color 0.1s ease-in-out;
  &:hover {
    background: ${(props) => props.theme.bg1};
    color: ${(props) => props.theme.co1};
  }
  color: ${(props) => props.theme.co1};
  padding: 1rem;
  width: 100%;
  border-bottom: 0.5px solid ${(props) => props.theme.bo1};
`;
const Content = styled.div`
  height: 100%;
  width: 100vw;
  padding-top: 80px;
  overflow: hidden;
`;
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
`;
const Container = styled(Flex)`
  height: calc(100vh - 12rem);
  overflow-x: hidden;
  overflow-y: hidden;
  width: 100vw;
  ${ResizerCss}
`;
const ToggleExercisePaneButton = styled.div`
  cursor: pointer;
  position: relative;
  border-right: 0.5px solid ${(props) => props.theme.bo1};
  border-left: 0.5px solid ${(props) => props.theme.bo1};
  background: ${(props) => props.theme.bg1};
  height: 100%;
  width: 1.5em;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  &:hover {
    background: ${(props) => props.theme.bg1};
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
`;
const ExercisesPane = styled.div`
  display: flex;
  justify-content: space-between;
  border-right: 0.5px solid rgba(0, 0, 0, 0.5);
  height: 100%;
  background: ${(props) => props.theme.bg1};
  section {
    width: 18.5rem;
    overflow-y: auto;
    margin-bottom: 14rem;
  }
`;
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
`;
const ResultsPane = styled.div`
  position: relative;
  height: 100%;
`;

export default ExercisePage;
