import React from "react";
import Results from "../exercise/Results";
import { Tabs, Code, Checkbox, Group, Button, ScrollArea } from "@mantine/core";

import { RichText } from "src/components/Editor/RichText";
import { Editor } from "src/components/Editor/Editor";
import { useDidUpdate } from "@mantine/hooks";
import { ConfigContext } from "src/context/ConfigContext";
import { DeckContext } from "src/context/DeckContext";

export const RightPane = ({ results = [], error }) => {
  const { currentExercise, previousExercise, onUpdateExercise } =
    React.useContext(DeckContext);

  const [activeTab, setActiveTab] = React.useState(0);

  const [isEditing, setIsEditing] = React.useState(false);

  useDidUpdate(() => {
    if (currentExercise.id !== previousExercise.id) {
      setActiveTab(0);
      setIsEditing(false);
    }
  }, [currentExercise, previousExercise]);

  useDidUpdate(() => {
    if ((results && results.length > 0) || error) setActiveTab(2);
  }, [results]);

  const { configState, dispatch } = React.useContext(ConfigContext);

  const description = React.useMemo(
    () =>
      currentExercise ? currentExercise.description : "Add a new exercise",
    [currentExercise]
  );
  const [newDescription, setNewDescription] = React.useState(description);

  const solution = React.useMemo(
    () => (currentExercise ? currentExercise.solution : "Add a new exercise"),
    [currentExercise]
  );
  const [newSolution, setNewSolution] = React.useState(solution);

  return (
    <>
      <Tabs
        variant="outline"
        onTabChange={setActiveTab}
        active={activeTab}
        sx={{
          height: "100%",
          "& .mantine-Tabs-body": {
            height: isEditing ? `calc(100% - 80px)` : "95%",
            overflow: isEditing ? "unset" : "hidden",
          },
        }}
      >
        <Tabs.Tab label="Description">
          <>
            <ScrollArea
              offsetScrollbars
              sx={{ maxHeight: "100%", height: "auto" }}
            >
              <RichText
                controls={[]}
                sx={{ height: "100%", overflow: "auto", fontSize: 18 }}
                value={newDescription}
                readOnly={!isEditing}
                {...(onUpdateExercise && {
                  onDoubleClick: () => setIsEditing(true),
                })}
                onChange={(value) => setNewDescription(value)}
              />
            </ScrollArea>
            {isEditing && (
              <Group my="xs" position="apart">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    onUpdateExercise({ description: newDescription });
                    setIsEditing(false);
                  }}
                >
                  Save
                </Button>
              </Group>
            )}
          </>
        </Tabs.Tab>
        <Tabs.Tab label={"Solution"}>
          {isEditing ? (
            <>
              <ScrollArea
                offsetScrollbars
                sx={{ height: "auto", maxHeight: "100%" }}
              >
                <Editor
                  code={newSolution}
                  onChange={(value: string) => setNewSolution(value)}
                  height="100%"
                />
              </ScrollArea>
              <Group my="xs" position="apart">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    onUpdateExercise({ solution: newSolution });
                    setIsEditing(false);
                  }}
                >
                  Save
                </Button>
              </Group>
            </>
          ) : (
            <pre
              {...(onUpdateExercise && {
                onDoubleClick: () => setIsEditing(true),
              })}
            >
              <Code>{newSolution}</Code>
            </pre>
          )}
        </Tabs.Tab>
        <Tabs.Tab disabled={!results} label="Results">
          <Results
            onUpdateExercise={onUpdateExercise}
            currentExercise={currentExercise}
            results={results}
          />
          {error && (
            <pre>
              <Code
                sx={(theme) => ({
                  fontSize: 18,
                  color: theme.colors.red[7],
                })}
              >
                {error}
              </Code>
            </pre>
          )}
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
    </>
  );
};
