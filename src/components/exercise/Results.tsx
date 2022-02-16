import {
  Grid,
  Group,
  Title,
  Text,
  Card,
  ActionIcon,
  Center,
  Input,
} from "@mantine/core";
import { CheckIcon, PlusIcon } from "@radix-ui/react-icons";
import React from "react";

export default function Results({
  results,
  currentExercise,
  onUpdateExercise,
}) {
  const { tests } = currentExercise;

  const [isEditing, setIsEditing] = React.useState(null);
  const [edittedTest, setEdittedTest] = React.useState("");

  const [isCreating, setIsCreating] = React.useState(false);
  const [newTest, setNewTest] = React.useState("");

  return (
    <Grid>
      <Grid.Col span={3}>
        <Group spacing="xs" align="center" direction="column">
          <Card sx={{ width: "100%" }}>
            <Title align="center" order={6}>
              Tests
            </Title>
          </Card>
          {tests.map((test, key: number) => (
            <Card sx={{ width: "100%", padding: 10 }} key={key}>
              <Input
                onChange={(e) => {
                  console.log("here");
                  setEdittedTest(e.target.value);
                }}
                readOnly={isEditing !== key}
                sx={{
                  input: { textAlign: isEditing === key ? "left" : "center" },
                }}
                value={isEditing === key ? edittedTest : test}
                variant={isEditing === key ? "filled" : "unstyled"}
                {...(onUpdateExercise &&
                  (isEditing === key
                    ? {
                        rightSection: (
                          <ActionIcon
                            onClick={() => {
                              const newA = Object.assign(tests.slice(), {
                                [key]: edittedTest,
                              });
                              console.log({ newA });
                              onUpdateExercise({
                                tests: newA,
                              });
                              setIsEditing(null);
                            }}
                          >
                            <CheckIcon />
                          </ActionIcon>
                        ),
                      }
                    : {
                        onDoubleClick: () => {
                          setEdittedTest(test);
                          setIsEditing(key);
                        },
                      }))}
              />
            </Card>
          ))}
          {onUpdateExercise ? (
            <Card sx={{ width: "100%" }}>
              <Center>
                {isCreating ? (
                  <Input
                    value={newTest}
                    variant="filled"
                    sx={{ input: { textAlign: "left" } }}
                    onChange={(e) => setNewTest(e.target.value)}
                    rightSection={
                      <ActionIcon
                        onClick={() => {
                          onUpdateExercise({ tests: [...tests, newTest] });
                          setIsCreating(false);
                          setNewTest("");
                        }}
                      >
                        <CheckIcon />
                      </ActionIcon>
                    }
                  />
                ) : (
                  <ActionIcon
                    onClick={() => {
                      setIsCreating(true);
                    }}
                  >
                    <PlusIcon />
                  </ActionIcon>
                )}
              </Center>
            </Card>
          ) : null}
        </Group>
      </Grid.Col>
      <Grid.Col span={3}>
        <Group spacing="xs" align="center" direction="column">
          <Card sx={{ width: "100%" }}>
            <Title align="center" order={6}>
              Received
            </Title>
          </Card>
          {results.map((res, key: number) => (
            <Card sx={{ width: "100%" }} key={key}>
              <Text align="center">{res.user.slice(0.6)}</Text>
            </Card>
          ))}
        </Group>
      </Grid.Col>
      <Grid.Col span={3}>
        <Group spacing="xs" align="center" direction="column">
          <Card sx={{ width: "100%" }}>
            <Title align="center" order={6}>
              Expected
            </Title>
          </Card>
          {results.map((res, key: number) => (
            <Card sx={{ width: "100%" }} key={key}>
              <Text align="center">{res.solution.slice(0, 6)}</Text>
            </Card>
          ))}
        </Group>
      </Grid.Col>
      <Grid.Col span={3}>
        <Group spacing="xs" align="center" direction="column">
          <Card sx={{ width: "100%" }}>
            <Title align="center" order={6}>
              Results
            </Title>
          </Card>
          {results.map((res, key: number) => (
            <Card sx={{ width: "100%" }} key={key}>
              <Text align="center">
                {res.solution === res.user ? "✅" : "🚫"}
              </Text>
            </Card>
          ))}
        </Group>
      </Grid.Col>
    </Grid>
  );
}
