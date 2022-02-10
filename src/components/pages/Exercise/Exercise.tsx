import React from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { Layout, Link, RightPane } from "src/components";
import { useEvalCode } from "src/hooks/useEvalCode";
import { defaultExercise, TLevel } from "src/utils/contants";
import Router from "next/router";
import {
  Grid,
  Button,
  Group,
  Title,
  Box,
  Space,
  ActionIcon,
  Card,
} from "@mantine/core";

import { PlayCircle, XCircle } from "@styled-icons/feather";
import { TDeck, TExercise } from "src/types/Domain";
import { api } from "src/utils/api";

const Editor = dynamic(import("../../js/Editor"), {
  ssr: false,
});

type IExercisePage = {
  deck: TDeck;
  exercise: string;
};

export const ExercisePage = ({ deck }: IExercisePage) => {
  const exercises = deck.exercises ?? [];

  const [userCode, setUserCode] = React.useState("");
  const [currentExercise, setCurrentExercise] = React.useState<TExercise>(
    exercises ? exercises[0] : defaultExercise
  );

  const bundledExercises = React.useMemo(
    () => deck.exercises.map((exer) => exer.solution).join(" ; "),
    [deck]
  );

  const { error, results, evalCode, rightPane, setRightPane } = useEvalCode({
    code: userCode,
    solution: currentExercise.solution,
    tests: currentExercise.tests,
    language: deck.language,
    bundledExercises: bundledExercises,
  });

  React.useEffect(() => {
    if (currentExercise) {
      setUserCode(currentExercise.code);
      setRightPane("description");
    }
  }, [currentExercise]);

  const handleReview = (level: TLevel) => async () => {};

  const removeExercise = React.useCallback(async (args) => {
    await api.removeExercise(args);
    Router.reload();
  }, []);

  const session = useSession();

  // console.log({ deck });
  return (
    <Layout>
      <Group mx="lg" mb="sm" align="center" position="left">
        <Title order={1}>{deck.title}</Title>
        <Space />
        <PlayCircle height={36} width={36} onClick={evalCode} />
        {session.status === "authenticated" && session.data.id === deck.userId && (
          <Link to={`/create/${deck.id}`}>
            <Button variant="default">New Exercise</Button>
          </Link>
        )}
      </Group>
      <Grid>
        <Grid.Col span={2}>
          <Group direction="column">
            {exercises.map((exer: TExercise) => {
              const selected = exer.id === currentExercise.id;
              return (
                <Card
                  shadow={selected && "lg"}
                  key={exer.id}
                  onClick={() => setCurrentExercise(exer)}
                >
                  <Group direction="row">
                    <Title order={5}>{exer.title}</Title>
                    {session.status === "authenticated" && (
                      <ActionIcon
                        onClick={(e: { stopPropagation: () => void }) => {
                          e.stopPropagation();
                          removeExercise(exer.id);
                        }}
                      >
                        <XCircle height={20} width={20} />
                      </ActionIcon>
                    )}
                  </Group>
                </Card>
              );
            })}
          </Group>
        </Grid.Col>
        <Grid.Col span={10}>
          <Grid>
            <Grid.Col span={6}>
              <Box sx={editorCss}>
                <Editor
                  height="inherit"
                  code={userCode}
                  language={deck.language}
                  onChange={(value: string) => {
                    setUserCode(value);
                  }}
                />
              </Box>
            </Grid.Col>
            <Grid.Col span={6}>
              <Box>
                <RightPane
                  results={results}
                  exercise={currentExercise}
                  rightPane={rightPane}
                  handleReview={handleReview}
                  error={error}
                  language={deck.language}
                />
              </Box>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Layout>
  );
};

const editorCss = {
  height: "100%",
  "*": { height: "calc(100vh - 14rem)" },
  outline: "none",
  fontFamily: "monaco !important",
  ".ace_scrollbar-h": { overflow: "hidden" },
};
