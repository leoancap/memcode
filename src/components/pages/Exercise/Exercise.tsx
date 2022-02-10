import React from "react";
import { useSession } from "next-auth/react";
import { Layout, Link, RightPane } from "src/components";
import { useEvalCode } from "src/hooks/useEvalCode";
import { defaultExercise } from "src/utils/contants";
import Router from "next/router";
import {
  Grid,
  Button,
  Group,
  Title,
  Box,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";

import { PlayIcon, Cross1Icon } from "@radix-ui/react-icons";
import { TDeck, TExercise } from "src/types/Domain";
import { api } from "src/utils/api";
import { Editor } from "src/components/Editor/Editor";
import { useHotkeys } from "@mantine/hooks";

type IExercisePage = {
  deck: TDeck;
  exercise: string;
};

export const ExercisePage = ({ deck }: IExercisePage) => {
  const exercises = deck.exercises ?? [];

  const [userCode, setUserCode] = React.useState("");
  const [currentExercise, setCurrentExercise] = React.useState<TExercise>(
    exercises.length > 0 ? exercises[0] : defaultExercise
  );

  const bundledExercises = React.useMemo(
    () => deck.exercises.map((exer) => exer.solution).join(" ; "),
    [deck]
  );

  const { error, results, evalCode, rightPane, setRightPane, isExecuting } =
    useEvalCode({
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

  const removeExercise = React.useCallback(async (args) => {
    await api.removeExercise(args);
    Router.reload();
  }, []);

  const session = useSession();

  useHotkeys([["ctrl+k", () => evalCode()]]);

  // console.log({ deck });
  return (
    <Layout>
      <Grid sx={{ height: "100%" }}>
        <Grid.Col span={2}>
          <Group m="xs" direction="column">
            {exercises.map((exer: TExercise, key: number) => {
              const selected = exer.id === currentExercise.id;
              return (
                <Box
                  sx={{
                    width: "100%",
                    cursor: "pointer",
                    // ...(selected && {
                    //   background: "gainsboro",
                    // }),
                  }}
                  key={exer.id}
                  onClick={() => setCurrentExercise(exer)}
                >
                  <Group mx="xs" position="apart" direction="row">
                    <Title order={5}>{`${key + 1} - ${exer.title}`}</Title>
                    {session.status === "authenticated" && (
                      <ActionIcon
                        onClick={(e: { stopPropagation: () => void }) => {
                          e.stopPropagation();
                          removeExercise(exer.id);
                        }}
                      >
                        <Cross1Icon height={20} width={20} />
                      </ActionIcon>
                    )}
                  </Group>
                </Box>
              );
            })}
          </Group>
        </Grid.Col>
        <Grid.Col sx={{ height: "100%" }} span={10}>
          <Grid sx={{ height: "100%" }}>
            <Grid.Col span={6}>
              <Group mb="xs" align="center" noWrap position="right">
                <Title mr="auto" order={3}>
                  {deck.title}
                </Title>
                <Button
                  rightIcon={<PlayIcon height={18} width={18} />}
                  onClick={evalCode}
                  loading={isExecuting}
                  loaderPosition="right"
                >
                  Execute
                </Button>
                {session.status === "authenticated" &&
                  session.data.id === deck.userId && (
                    <Link to={`/create/${deck.id}`}>
                      <Button variant="default">New Exercise</Button>
                    </Link>
                  )}
              </Group>
              <Box sx={{ height: "100%" }}>
                <Editor
                  height="100%"
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
