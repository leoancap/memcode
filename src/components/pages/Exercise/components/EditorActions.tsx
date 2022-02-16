import { ActionIcon, Box, Button, Group, Text, Title } from "@mantine/core";
import { Pencil1Icon, PlayIcon } from "@radix-ui/react-icons";
import { Editor } from "src/components/Editor/Editor";

export const EditorActions = ({
  code,
  currentExercise,
  handleEvalCode,
  handleFormat,
  isExecuting,
  setCode,
  title,
  onUpdateExercise = undefined,
}) => (
  <>
    <Group mb="xs" align="center" noWrap position="right">
      <Title mr="auto" order={1}>
        <Text lineClamp={1}>{title}</Text>
      </Title>
      {onUpdateExercise ? (
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
