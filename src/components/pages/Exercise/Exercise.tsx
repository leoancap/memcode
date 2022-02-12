import React from "react";
import { useSession } from "next-auth/react";
import { Layout, Link, RightPane } from "src/components";
import { useEvalCode } from "src/hooks/useEvalCode";
import { defaultExercise } from "src/utils/constants";
import Router from "next/router";
import {
  Grid,
  Button,
  Group,
  Title,
  Box,
  ActionIcon,
  Text,
} from "@mantine/core";

import { PlayIcon, Cross1Icon } from "@radix-ui/react-icons";
import { TDeck, TExercise } from "src/types/Domain";
import { api } from "src/utils/api";
import { Editor } from "src/components/Editor/Editor";
import { useHotkeys } from "@mantine/hooks";
import { ConfigContext } from "src/utils/ConfigContext";
import { useFormatCode } from "src/hooks/useFormatCode";
// import Script from "next/script";

type IExercisePage = {
  deck: TDeck;
  exercise: string;
};

export const ExercisePage = ({ deck }: IExercisePage) => {
  const exercises = deck.exercises ?? [];

  const [code, setCode] = React.useState("");
  const [currentExercise, setCurrentExercise] = React.useState<TExercise>(
    exercises.length > 0 ? exercises[0] : defaultExercise
  );

  const { configState } = React.useContext(ConfigContext);

  const bundledExercises = React.useMemo(
    () =>
      configState.includePreviousExercises === "true"
        ? deck.exercises.map((exer) => exer.solution).join(" ;  ")
        : "",
    [deck, configState.includePreviousExercises]
  );

  const { error, results, evalCode, rightPane, setRightPane, isExecuting } =
    useEvalCode({
      code,
      solution: currentExercise.solution,
      tests: currentExercise.tests,
      language: deck.language,
      bundledExercises: bundledExercises,
    });

  React.useEffect(() => {
    if (currentExercise) {
      setCode(currentExercise.code);
      setRightPane("description");
    }
  }, [currentExercise]);

  const removeExercise = React.useCallback(async (args) => {
    await api.removeExercise(args);
    Router.reload();
  }, []);

  const handleFormat = useFormatCode({
    code,
    language: deck.language,
    setCode,
  });

  const session = useSession();

  useHotkeys([
    ["ctrl+s", evalCode],
    ["ctrl+f", handleFormat],
  ]);

  return (
    <Layout>
      {/* <Script */}
      {/*   src={`https://cdn.rescript-lang.org/v9.0.1/compiler.js`} */}
      {/*   strategy="lazyOnload" */}
      {/*   onLoad={() => { */}
      {/*     const comp = rescript_compiler.make(); */}
      {/*     console.log({ comp }); */}
      {/*   }} */}
      {/* /> */}
      {/* <Script */}
      {/*   src="https://reasonml.github.io/js/stdlibBundle.js" */}
      {/*   strategy="lazyOnload" */}
      {/*   onLoad={() => { */}
      {/*     // const comp = rescript_compiler.make(); */}
      {/*     console.log({ window }); */}
      {/*   }} */}
      {/* /> */}
      <Grid sx={{ height: "100%" }}>
        <Grid.Col span={2}>
          <Group m="xs" direction="column">
            {exercises.map((exer: TExercise, key: number) => {
              const selected = exer.id === currentExercise.id;
              return (
                <Group
                  sx={{
                    width: "100%",
                    cursor: "pointer",
                    ...(!selected && {
                      opacity: 0.5,
                    }),
                  }}
                  key={exer.id}
                  onClick={() => setCurrentExercise(exer)}
                  direction="row"
                  noWrap
                  position="apart"
                  mx="xs"
                >
                  <Text>{`${key + 1} - ${exer.title}`}</Text>
                  {session.status === "authenticated" &&
                    session.data.userId === deck.userId && (
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
              );
            })}
          </Group>
        </Grid.Col>
        <Grid.Col sx={{ height: "100%" }} span={10}>
          <Grid sx={{ height: "100%" }}>
            <Grid.Col span={6}>
              <Group mb="xs" align="center" noWrap position="right">
                <Title order={3}>{deck.title}</Title>
                {session.status === "authenticated" &&
                  session.data.userId === deck.userId && (
                    <Link to={`/create/${deck.id}`}>
                      <Button variant="default">New Exercise</Button>
                    </Link>
                  )}
                <Button
                  ml="auto"
                  // rightIcon={<PlayIcon height={18} width={18} />}
                  onClick={handleFormat}
                  variant="outline"
                >
                  Format
                </Button>
                <Button
                  rightIcon={<PlayIcon height={18} width={18} />}
                  onClick={evalCode}
                  loading={isExecuting}
                  loaderPosition="right"
                >
                  Execute
                </Button>
              </Group>
              <Box sx={{ height: "100%" }}>
                <Editor
                  height="100%"
                  code={code}
                  language={deck.language}
                  onChange={(value: string) => {
                    setCode(value);
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
