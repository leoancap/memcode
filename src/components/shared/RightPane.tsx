import styled from "../../styled";
import React from "react";
import "react-tabs/style/react-tabs.css";
import { useSession } from "next-auth/react";
import Results from "../exercise/Results";
import ErrorCode from "../exercise/ErrorCode";
import { Tabs, Text, Box, Code } from "@mantine/core";

interface IRightPane {
  // exercise: IExercise
  exercise: any;
  rightPane: string;
  results: any[];
  error: string;
  language: string;
}

export const RightPane = ({ results, exercise, error }: IRightPane) => {
  const [activeTab, setActiveTab] = React.useState(0);

  React.useEffect(() => {
    if (results) {
      setActiveTab(2);
    }
  }, [results]);

  const session = useSession();

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
      </Tabs>
    </Box>
  );
};
