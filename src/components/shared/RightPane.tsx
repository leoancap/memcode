import React from "react";
import Results from "../exercise/Results";
import ErrorCode from "../exercise/ErrorCode";
import { Tabs, Text, Box, Code, Checkbox, Group } from "@mantine/core";

import { ConfigContext } from "src/utils/ConfigContext";
import { TExercise } from "src/types/Domain";

export type TRightPaneTabs =
  | "description"
  | "results"
  | "solution"
  | "settings";

interface IRightPane {
  exercise: TExercise;
  rightPane: TRightPaneTabs;
  results: any[];
  error: string;
  language: string;
}

export const RightPane = ({
  results,
  exercise,
  error,
  rightPane,
}: IRightPane) => {
  const defaultActiveTab = React.useMemo(() => {
    if (rightPane === "description") return 0;
    if (rightPane === "solution") return 1;
    if (rightPane === "results") return 2;
    return 3;
  }, [rightPane]);

  const [activeTab, setActiveTab] = React.useState(0);

  React.useEffect(() => {
    setActiveTab(defaultActiveTab);
  }, [defaultActiveTab]);

  React.useEffect(() => {
    if (results) {
      setActiveTab(2);
    }
  }, [results]);

  const { configState, dispatch } = React.useContext(ConfigContext);

  return (
    <Box>
      <Tabs
        color="dark"
        variant="outline"
        onTabChange={setActiveTab}
        active={activeTab}
      >
        <Tabs.Tab label="Description">
          <Text>{exercise.description}</Text>
        </Tabs.Tab>
        <Tabs.Tab label="Solution">
          <Code>{exercise.solution}</Code>
        </Tabs.Tab>
        <Tabs.Tab disabled={!results} label="Tests">
          <Results tests={exercise.tests} results={results} />
          {error && <ErrorCode error={error} />}
        </Tabs.Tab>
        <Tabs.Tab label="Settings">
          <Group direction="column" spacing="xs">
            <Checkbox
              label="Vim"
              checked={configState.editorMode === "vim"}
              onChange={() => dispatch("toggleEditorMode")}
            />
            <Checkbox
              label="Include Previous Exercises"
              checked={configState.includePreviousExercises === "true"}
              onChange={() => dispatch("toggleIncludePreviousExercises")}
            />
          </Group>
        </Tabs.Tab>
      </Tabs>
    </Box>
  );
};
