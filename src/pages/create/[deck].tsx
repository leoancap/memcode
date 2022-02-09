import React from "react";
import dynamic from "next/dynamic";

import { Button, Flex, Text } from "rebass";
import Router from "next/router";
import {
  runReasonEndpoint,
  jsDefaultCode,
  reDefaultCode,
  tsDefaultCode,
  jsDefaultSolution,
  reDefaultSolution,
  tsDefaultSolution,
} from "src/utils/contants";
import { testCode } from "src/utils/testCode";
import { Layout } from "src/components";
import styled from "src/styled";
import { prisma } from "src/lib/prisma";

const Editor: any = dynamic(import("../../components/js/Editor"), {
  ssr: false,
});

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

function ExerciseCreate({ deck }) {
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

  const onSubmit = async () => {
    if (deck.language === "Reason") {
      const rawResponse = await fetch(runReasonEndpoint, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(exerciseData),
      });
      const res = await rawResponse.json();
      console.log(res);
      if (res.error) {
        setError(res.error.message);
      } else if (title.length === 0) {
        setError("Title can't be empty");
      } else if (description.length === 0) {
        setError("Description can't be empty");
      } else {
        const res = await (
          await fetch("/api/create-exercise", {
            method: "POST",
            body: JSON.stringify({
              ...exerciseData,
              tests: tests
                .split(";")
                .filter((t) => t)
                .join(";"),
              deckId: deck.id,
            }),
          })
        ).json();
        console.log({ res });
        Router.push(`/deck/${deck.id}`);
      }
    } else {
      const res = await testCode({ code, solution, testsStrings: tests });
      if (res.error) {
        setError(res.message);
      } else {
        if (title.length === 0) {
          setError("Title can't be empty");
        } else if (description.length === 0) {
          setError("Description can't be empty");
        } else {
          const res = await (
            await fetch("/api/create-exercise", {
              method: "POST",
              body: JSON.stringify({
                ...exerciseData,
                tests: tests
                  .split(";")
                  .filter((t) => t)
                  .join(";"),
                deckId: deck.id,
              }),
            })
          ).json();
          console.log({ res });
          Router.push(`/deck/${deck.id}`);
        }
      }
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Layout>
      <Container>
        <FormWrapper>
          <FormField>
            <Label>Title:</Label>
            <InputStyled
              onChange={handleChange}
              name="title"
              placeholder="add"
              value={exerciseData.title}
            />
          </FormField>
          <FormField>
            <Label>Description:</Label>
            <TextAreaStyled
              onChange={handleChange}
              name="description"
              placeholder="This is the description of the add function"
              value={exerciseData.description}
            />
          </FormField>
          <EditorWrapper>
            <EditorTitle>Default Code:</EditorTitle>
            <Editor
              height="30vh"
              defaultCode=""
              code={exerciseData.code}
              onChange={handleEditorChange("code")}
            />
          </EditorWrapper>
          <EditorWrapper>
            <EditorTitle>Solution:</EditorTitle>
            <Editor
              height="30vh"
              defaultCode=""
              code={exerciseData.solution}
              onChange={handleEditorChange("solution")}
            />
          </EditorWrapper>
          <EditorWrapper>
            <EditorTitle>
              tests: <span>every test case must be semicolon separated.</span>
            </EditorTitle>
            <Editor
              height="30vh"
              defaultCode=""
              code={exerciseData.tests}
              onChange={handleEditorChange("tests")}
            />
          </EditorWrapper>
          <ErrorBanner show={!!error}>
            <pre>
              <code>
                <b>Error:</b> {error}{" "}
              </code>
            </pre>
          </ErrorBanner>
          <CreateButton onClick={onSubmit}>Create Exercise</CreateButton>
        </FormWrapper>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = async ({ query: { deck: deckId } }) => {
  const deck = await prisma.deck.findFirst({
    where: { id: { equals: deckId as string } },
  });
  const serializedDeck = JSON.parse(JSON.stringify(deck));
  return {
    props: { deck: serializedDeck },
  };
};

const Container = styled.div`
  padding-bottom: 7rem;
  padding-top: 110px;
`;

const ErrorBanner = styled.div<{ show: boolean }>`
  display: none;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1rem;
  padding: 0;
  border-radius: 0.9rem;
  background: #fd766e;
  transition: all 0.5s ease;
  width: 98%;
  h1 {
    font-size: 0;
  }
  ${({ show }) =>
    show &&
    `
  height: auto;
  display: block;
  padding: 1rem;
  pre {
    font-size: 18px;
    color: #FEefef;
  }
  code {
    white-space: pre-wrap;
  }

  `}
`;

const EditorWrapper = styled.div``;

const EditorTitle = styled.div`
  font-size: 18px;
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.bo1};
`;

const FormWrapper = styled(Flex)`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
  max-width: 60%;
  @media (max-width: 950px) {
    max-width: 95%;
  }
  background: ${(props) => props.theme.bg1};
  flex-direction: column;
  box-shadow: ${(props) => props.theme.bo2};
  border-radius: 0.3rem;
`;

const FormField = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.bo1};
`;

const Label = styled(Text)`
  padding: 1rem;
  font-size: 18px;
`;

const InputStyled = styled.input`
  height: 4rem;
  border-radius: 0.9rem;
  margin-left: 1rem;
  margin-bottom: 7px;
  width: 75%;
  border: 1px solid ${(props) => props.theme.bo1};
  background: ${(props) => props.theme.bg1};
  color: ${(props) => props.theme.co1};
  width: 50%;
  margin-right: 1rem;
  max-width: 75vw;
  font-size: 16px;
  padding-left: 1rem;
  &:focus,
  &:hover {
    outline: none;
  }
`;

const TextAreaStyled = styled.textarea`
  &:focus,
  &:hover {
    outline: none;
  }
  background: ${(props) => props.theme.bg1};
  color: ${(props) => props.theme.co1};
  font-size: 16px;
  width: 75%;
  max-width: 75vw;
  height: 8rem;
  max-height: 20rem;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 5px;
  border-radius: 0.9rem;
  border: 1px solid ${(props) => props.theme.bo1};
  resize: vertical;
`;

const CreateButton = styled(Button)`
  background: ${(props) => props.theme.bg1};
  border-radius: 0.9rem;
  cursor: pointer;
  color: ${(props) => props.theme.co1};
  filter: invert(1);
  margin: 2rem auto;
  font-size: 18px;
`;
export default ExerciseCreate;
