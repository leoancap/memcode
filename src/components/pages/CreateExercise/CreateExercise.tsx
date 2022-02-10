import React from "react";

import {
  jsDefaultCode,
  reDefaultCode,
  tsDefaultCode,
  jsDefaultSolution,
  reDefaultSolution,
  tsDefaultSolution,
} from "src/utils/contants";
import { Layout } from "src/components";
import { Box, Button, Center, Textarea, TextInput, Title } from "@mantine/core";
import { Editor } from "src/components/Editor/Editor";

enum Languages {
  All = "All",
  Typescript = "Typescript",
  Javascript = "Javascript",
  Reason = "Reason",
}

const getDefaultCode = (language: Languages, withSolution: boolean) => {
  if (language === "Reason")
    return withSolution ? reDefaultSolution : reDefaultCode;
  if (language === "Javascript")
    return withSolution ? jsDefaultSolution : jsDefaultCode;
  return withSolution ? tsDefaultSolution : tsDefaultCode;
};

const defaultTests = `add(1, 2); 
add(2, 3);`;

const getInitialState = (language: Languages) => ({
  title: "",
  description: "",
  code: getDefaultCode(language, false),
  solution: getDefaultCode(language, true),
  tests: defaultTests,
});

export function CreateExercisePage({ deck }) {
  const [error, setError] = React.useState<string>("");

  const [exerciseData, setExerciseData] = React.useState(
    getInitialState(deck.language)
  );

  const { title, description, code, solution, tests } = exerciseData;

  const handleChange = ({ target: { name, value } }: any) => {
    if (name === "tags") {
      setExerciseData({
        ...exerciseData,
        [name]: value.split(",").map((v) => v.trim()),
      });
    } else {
      setExerciseData({
        ...exerciseData,
        [name]: value,
      });
    }
  };

  const handleEditorChange = (name: string) => (value) => {
    setExerciseData({
      ...exerciseData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("here", { exerciseData });
    // if (deck.language === "Reason") {
    //   const rawResponse = await fetch(runReasonEndpoint, {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     method: "POST",
    //     body: JSON.stringify(exerciseData),
    //   });
    //   const res = await rawResponse.json();
    //   console.log(res);
    //   if (res.error) {
    //     setError(res.error.message);
    //   } else if (title.length === 0) {
    //     setError("Title can't be empty");
    //   } else if (description.length === 0) {
    //     setError("Description can't be empty");
    //   } else {
    //     const res = await (
    //       await fetch("/api/create-exercise", {
    //         method: "POST",
    //         body: JSON.stringify({
    //           ...exerciseData,
    //           tests: tests
    //             .split(";")
    //             .filter((t) => t)
    //             .join(";"),
    //           deckId: deck.id,
    //         }),
    //       })
    //     ).json();
    //     console.log({ res });
    //     Router.push(`/deck/${deck.id}`);
    //   }
    // } else {
    //   const res = await testCode({ code, solution, testsStrings: tests });
    //   if (res.error) {
    //     setError(res.message);
    //   } else {
    //     if (title.length === 0) {
    //       setError("Title can't be empty");
    //     } else if (description.length === 0) {
    //       setError("Description can't be empty");
    //     } else {
    //       const res = await (
    //         await fetch("/api/create-exercise", {
    //           method: "POST",
    //           body: JSON.stringify({
    //             ...exerciseData,
    //             tests: tests
    //               .split(";")
    //               .filter((t) => t)
    //               .join(";"),
    //             deckId: deck.id,
    //           }),
    //         })
    //       ).json();
    //       console.log({ res });
    //       Router.push(`/deck/${deck.id}`);
    //     }
    //   }
    // }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Layout>
      <Center>
        <form onSubmit={onSubmit}>
          <TextInput
            onChange={handleChange}
            name="title"
            required
            label="Title"
            placeholder="add"
            value={exerciseData.title}
          />
          <Textarea
            onChange={handleChange}
            required
            label="Description"
            name="description"
            placeholder="This is the description of the add function"
            value={exerciseData.description}
          />
          <Box>
            <Title order={6}>Default Code:</Title>
            <Editor
              height="10rem"
              defaultCode=""
              code={exerciseData.code}
              onChange={handleEditorChange("code")}
            />
          </Box>
          <Box>
            <Title order={6}>Solution:</Title>
            <Editor
              height="10rem"
              defaultCode=""
              code={exerciseData.solution}
              onChange={handleEditorChange("solution")}
            />
          </Box>
          <Box>
            <Title order={6}>
              tests: <span>every test case must be semicolon separated.</span>
            </Title>
            <Editor
              height="5rem"
              defaultCode=""
              code={exerciseData.tests}
              onChange={handleEditorChange("tests")}
            />
          </Box>
          {error && (
            <Box>
              <pre>
                <code>
                  <b>Error:</b> {error}{" "}
                </code>
              </pre>
            </Box>
          )}
          <Center>
            <Button variant="filled" type="submit" my="xs">
              Create Exercise
            </Button>
          </Center>
        </form>
      </Center>
    </Layout>
  );
}
