import React from "react"
import dynamic from "next/dynamic"

import { MyCtx } from "../../typings/MyCtx"
import styled from "../../styled"
import Layout from "../../components/shared/Layout"
import { Button, Box, Flex, Text } from "@rebass/emotion"
import { useCreateExerciseMutation } from "../../generated/apolloComponents"
import { testCode } from "../../utils/testCode"
import Router from "next/router"
import { findDeckByIdQuery } from "../../graphql/deck/queries/findDeck"
import fetch from "isomorphic-unfetch"
import { runPythonEndpoint } from "../../lib/apollo"

const jsDefaultCode = `const add = (a, b) => {
  
}`
const jsDefaultSolution = `const add = (a, b) => {
  return a + b
}`
const tsDefaultCode = `const add = (a:number, b:number) => {
  
}`
const tsDefaultSolution = `const add = (a:number, b:number):number => {
  return a + b
}`

const pyDefaultCode = `def add(x): 
`

const pyDefaultSolution = `def add(a, b): return a + b 
`

const Editor: any = dynamic(import("../../components/js/Editor"), {
  ssr: false,
})

function ExerciseCreate({ deck }) {
  const createExercise = useCreateExerciseMutation()

  const [error, setError] = React.useState<string>("")

  const [exerciseData, setExerciseData] = React.useState({
    title: "",
    description: "",
    code:
      deck.language === "Python"
        ? pyDefaultCode
        : deck.language === "Javascript"
        ? jsDefaultCode
        : tsDefaultCode,
    solution:
      deck.language === "Python"
        ? pyDefaultSolution
        : deck.language === "Javascript"
        ? jsDefaultSolution
        : tsDefaultSolution,
    tests: `add(1,2);
add(2,3);`,
  })
  const { title, description, code, solution, tests } = exerciseData

  const handleChange = ({ target: { name, value } }: any) => {
    if (name === "tags") {
      setExerciseData({
        ...exerciseData,
        [name]: value.split(",").map(v => v.trim()),
      })
    } else {
      setExerciseData({
        ...exerciseData,
        [name]: value,
      })
    }
  }

  const handleEditorChange = (name: string) => value => {
    setExerciseData({
      ...exerciseData,
      [name]: value,
    })
  }

  const onSubmit = async () => {
    if (deck.language === "Python") {
      const rawResponse = await fetch(runPythonEndpoint, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(exerciseData),
      })
      const res = await rawResponse.json()
      if (res.message) {
        setError(res.message)
      } else {
        await createExercise({
          variables: {
            data: {
              ...exerciseData,
              tests: tests
                .split(";")
                .filter(t => t)
                .join(";"),
              deckId: deck.id,
            },
          },
        })
        Router.push(`/exercise/${deck.id}`)
      }
    } else {
      const res = await testCode(code, solution, tests)
      if (res.error) {
        setError(res.message)
      } else {
        if (title.length === 0) {
          setError("Title can't be empty")
        } else if (description.length === 0) {
          setError("Description can't be empty")
        } else {
          await createExercise({
            variables: {
              data: {
                ...exerciseData,
                tests: tests
                  .split(";")
                  .filter(t => t)
                  .join(";"),
                deckId: deck.id,
              },
            },
          })
          Router.push(`/deck/${deck.id}`)
        }
      }
    }
  }

  React.useEffect(() => {
    window.scrollTo(0, 0)
  })

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
  )
}

ExerciseCreate.getInitialProps = async ({
  apolloClient,
  query: { deck },
}: MyCtx) => {
  try {
    const {
      data: { findDeckById },
    } = await apolloClient.query({
      query: findDeckByIdQuery,
      variables: { deckId: deck },
    })
    return { deck: findDeckById }
  } catch (error) {
    console.log("error::::::::::: ", error)
  }
}

const Container = styled.div`
  /* overflow: auto; */
  /* overflow-x: hidden; */
  /* height: 100%; */
  padding-bottom: 7rem;
  padding-top: 110px;
`

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
`

const EditorWrapper = styled.div``

const EditorTitle = styled.div`
  font-size: 18px;
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.bo1};
`

const FormWrapper = styled(Flex)`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
  max-width: 60%;
  @media (max-width: 950px) {
    max-width: 95%;
  }
  background: ${props => props.theme.bg1};
  flex-direction: column;
  box-shadow: ${props => props.theme.bo2};
  border-radius: 0.3rem;
`

const FormField = styled.div`
  border-bottom: 1px solid ${props => props.theme.bo1};
`

const Label = styled(Text)`
  padding: 1rem;
  font-size: 18px;
`

const InputStyled = styled.input`
  height: 4rem;
  border-radius: 0.9rem;
  margin-left: 1rem;
  margin-bottom: 7px;
  width: 75%;
  border: 1px solid ${props => props.theme.bo1};
  background: ${props => props.theme.bg1};
  color: ${props => props.theme.co1};
  width: 50%;
  margin-right: 1rem;
  max-width: 75vw;
  font-size: 16px;
  padding-left: 1rem;
  &:focus,
  &:hover {
    outline: none;
  }
`

const TextAreaStyled = styled.textarea`
  &:focus,
  &:hover {
    outline: none;
  }
  background: ${props => props.theme.bg1};
  color: ${props => props.theme.co1};
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
  border: 1px solid ${props => props.theme.bo1};
  resize: vertical;
`

const CreateButton = styled(Button)`
  background: ${props => props.theme.bg1};
  border-radius: 0.9rem;
  cursor: pointer;
  color: ${props => props.theme.co1};
  filter: invert(1);
  margin: 2rem auto;
  font-size: 18px;
`
export default ExerciseCreate
