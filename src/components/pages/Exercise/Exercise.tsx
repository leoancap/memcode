import React from "react";
import { Layout, RightPane } from "src/components";
import { useEvalCode } from "src/hooks/useEvalCode";
import { Grid, Button } from "@mantine/core";

import { useDidUpdate, useHotkeys } from "@mantine/hooks";
import { useFormatCode } from "src/hooks/useFormatCode";
import { ExerciseList } from "./components/ExerciseList";
import { EditorActions } from "./components/EditorActions";
import { ConfigContext } from "src/context/ConfigContext";
import { DeckContext } from "src/context/DeckContext";

export const ExercisePage = () => {
  const { configState } = React.useContext(ConfigContext);

  const {
    currentExercise,
    setCurrentExercise,
    previousExercise,
    onCreateExercise,
    deck,
  } = React.useContext(DeckContext);
  const exercises = deck.exercises;

  useDidUpdate(() => {
    const updatedExercise = exercises.find((e) => e.id === currentExercise?.id);
    if (updatedExercise) setCurrentExercise(updatedExercise);
  }, [deck.exercises]);

  const bundledExercises = React.useMemo(
    () =>
      configState.includePreviousExercises === "true"
        ? deck.exercises.map((exer) => exer.solution).join(" ;  ")
        : "",
    [deck, configState.includePreviousExercises]
  );

  const [currentCode, setCurrentCode] = React.useState(
    currentExercise?.code ?? ""
  );

  const { error, results, handleEvalCode, isExecuting } = useEvalCode({
    currentCode: currentCode,
    currentExercise,
    language: deck.language,
    bundledExercises: bundledExercises,
  });

  useDidUpdate(() => {
    if (currentExercise) setCurrentCode(currentExercise.code);
  }, [currentExercise, previousExercise]);

  const handleFormat = useFormatCode({
    code: currentCode,
    language: deck.language,
    setCode: setCurrentCode,
  });

  useHotkeys([
    ["ctrl+s", handleEvalCode],
    ["ctrl+f", handleFormat],
  ]);

  return (
    <Layout>
      <Grid columns={8} sx={{ height: "100%" }}>
        <Grid.Col
          sx={{ height: "100%", paddingBottom: onCreateExercise ? 40 : 0 }}
          span={1}
        >
          {onCreateExercise ? (
            <Button onClick={onCreateExercise} mb="sm" variant="default">
              New Exercise
            </Button>
          ) : null}
          <ExerciseList />
        </Grid.Col>
        <Grid.Col sx={{ height: "100%" }} span={7}>
          <Grid sx={{ height: "100%" }}>
            <Grid.Col sx={{ height: "100%" }} span={6}>
              <EditorActions
                {...{
                  code: currentCode,
                  handleEvalCode,
                  handleFormat,
                  isExecuting,
                  setCode: setCurrentCode,
                }}
              />
            </Grid.Col>
            <Grid.Col sx={{ height: "100%" }} span={6}>
              <RightPane
                {...{
                  error,
                  results,
                }}
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Layout>
  );
};
