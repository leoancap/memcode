import React from "react"
import dynamic from "next/dynamic"

import styled from "../../styled"
import Layout from "../../components/shared/Layout"
import { Button, Box, Flex, Text } from "@rebass/emotion"
import { useCreateExerciseMutation } from "../../generated/apolloComponents"
import { testCode } from "../../utils/testCode"
import Router from "next/router"

const Editor: any = dynamic(import("../../components/js/Editor"), {
  ssr: false,
})

function ExerciseCreate({ deck }) {
  const createExercise = useCreateExerciseMutation()

  const [error, setError] = React.useState<string>("")

  const [exerciseData, setExerciseData] = React.useState({
    title: "",
    description: "",
    code: `const add = (a:number, b:number) => {
  return a + b
}
`,
    solution: `const add = (a, b) => {
  return a + b
}`,
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
    const res = await testCode(code, solution, tests)
    if (res.error) {
      setError(res.message)
    } else {
      if (title.length === 0) {
        setError("Title can't be empty")
      } else if (description.length === 0) {
        setError("Description can't be empty")
      } else {
        console.log(res)
        await createExercise({
          variables: {
            data: {
              ...exerciseData,
              tests: tests
                .split(";")
                .filter(t => t)
                .join(";"),
              deckId: deck,
            },
          },
        })
        Router.push(`/exercise/${deck}`)
      }
    }
  }

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [error])

  return (
    <Layout>
      <Container>
        <PageHeader alignItems="center">
          <Box mr="auto" pl={[1, 2, 4, 6]}>
            <PageCrumb fontSize={[2, 3, 4, 5]} mr="auto">
              Create an Exercise
            </PageCrumb>
          </Box>
        </PageHeader>
        <ErrorBanner show={!!error}>
          <h1>
            <b>Error:</b> {error}{" "}
          </h1>
        </ErrorBanner>

        <FormWrapper>
          <FormField>
            <Label>Title</Label>
            <InputStyled
              onChange={handleChange}
              name="title"
              placeholder="add"
              value={exerciseData.title}
            />
          </FormField>
          <FormField>
            <Label>Description</Label>
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
          <CreateButton onClick={onSubmit}>Create Exercise</CreateButton>
        </FormWrapper>
      </Container>
    </Layout>
  )
}

ExerciseCreate.getInitialProps = ({ query }) => {
  return { ...query }
}

const Container = styled.div`
  overflow: auto;
  overflow-x: hidden;
  height: 100%;
  padding-bottom: 7rem;
`
const PageHeader = styled(Flex)`
  height: 7rem;
  background: ${props => props.theme.bg4};
  border-bottom: solid 0.5px ${props => props.theme.bo1};
  margin-bottom: 1rem;
`

const ErrorBanner = styled.div<{ show: boolean }>`
  height: 0;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1rem;
  padding: 0;
  border-radius: 0.9rem;
  max-width: 60%;
  @media (max-width: 950px) {
    max-width: 95%;
  }
  background: #fd766e;
  transition: all 0.5s ease;
  h1 {
    font-size: 0;
  }
  ${({ show }) =>
    show &&
    `
  height: 6rem;
  padding: 1rem;
  h1 {
    font-size: 18px;
    color: #FEefef;
  }

  `}
`

const EditorWrapper = styled.div``

const EditorTitle = styled.div`
  font-size: 18px;
  margin: 1rem;
  span {
    font-size: 14px;
  }
`

const PageCrumb = styled(Text)`
  color: ${props => props.theme.co3};
  font-weight: 500;
`

const FormWrapper = styled(Flex)`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
  max-width: 60%;
  @media (max-width: 950px) {
    max-width: 95%;
  }
  background: ${props => props.theme.bg4};
  flex-direction: column;
  border: 1px solid ${props => props.theme.bo1};
  border-radius: 0.5rem;
`

const FormField = styled.div`
  /* justify-content: space-between; */
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
  background: ${props => props.theme.bg4};
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
  background: ${props => props.theme.bg4};
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
  background: ${props => props.theme.bg3};
  border-radius: 0.9rem;
  color: ${props => props.theme.co3};
  margin: 0 auto;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
  margin-top: 2rem;
  font-size: 18px;
`
export default ExerciseCreate
