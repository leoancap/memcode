import { ActionIcon, Box, Button, Group, Text, Title } from "@mantine/core";
import { Pencil1Icon, PlayIcon } from "@radix-ui/react-icons";
import React from "react";
import { Editor } from "src/components/Editor/Editor";
import { DeckContext } from "src/context/DeckContext";

export const EditorActions = ({
  code,
  handleEvalCode,
  handleFormat,
  isExecuting,
  setCode,
}) => {
  const { deck, currentExercise, previousExercise, onUpdateExercise } =
    React.useContext(DeckContext);

  return (
    <>
      <Group mb="xs" align="center" noWrap position="right">
        <Title mr="auto" order={1}>
          <Text lineClamp={1}>{deck.title}</Text>
        </Title>
        {currentExercise && onUpdateExercise ? (
          <ActionIcon
            onClick={() => {
              onUpdateExercise({ code });
            }}
            title="Save file"
          >
            <Pencil1Icon />
          </ActionIcon>
        ) : null}
        <Button
          disabled={!currentExercise}
          onClick={handleFormat}
          variant="outline"
        >
          Format
        </Button>
        <Button
          rightIcon={<PlayIcon height={18} width={18} />}
          onClick={handleEvalCode}
          loading={isExecuting}
          loaderPosition="right"
          disabled={!currentExercise}
        >
          Execute
        </Button>
      </Group>
      <Box sx={{ height: "100%" }}>
        <Editor
          height="100%"
          code={code}
          onChange={(value: string) => {
            setCode(value);
          }}
        />
      </Box>
    </>
  );
};
