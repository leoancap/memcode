import React from "react"
import { useStore } from "../store"
import styled from "../styled"
import Layout from "../components/shared/Layout"
import { Button, Box, Flex, Text } from "@rebass/emotion"
import { useCreateDeckMutation } from "../generated/apolloComponents"
import { decksQuery } from "../graphql/deck/queries/decks"
import Router from "next/router"

export default function CreateDecks() {
  const store = useStore()

  const createDeck = useCreateDeckMutation()

  const [deckData, setDeckData] = React.useState({
    title: "",
    description: "",
    tags: [""],
    language: "Typescript",
  })

  const handleChange = ({ target: { name, value } }: any) => {
    if (name === "tags") {
      setDeckData({
        ...deckData,
        [name]: value.split(",").map(v => v.trim()),
      })
    } else {
      setDeckData({
        ...deckData,
        [name]: value,
      })
    }
  }

  const onSubmit = async () => {
    await createDeck({
      variables: { data: deckData },
    })
    Router.push("/")
  }

  return (
    <Layout>
      <Container>
        <PageHeader alignItems="center">
          <Box mr="auto" pl={[1, 2, 4, 6]}>
            <PageCrumb fontSize={[2, 3, 4, 5]} mr="auto">
              Create a Deck
            </PageCrumb>
          </Box>
        </PageHeader>
        <FormWrapper px={[2, 3, 4]} py={[3, 4, 5]} my={[2, 4]} mx={"auto"}>
          <FormField>
            <Label>Title</Label>
            <InputStyled
              onChange={handleChange}
              name="title"
              value={deckData.title}
            />
          </FormField>
          <FormField>
            <Label>Language</Label>
            <Select
              onChange={handleChange}
              name="language"
              value={deckData.language}
            >
              <option value="Typescript">Typescript</option>
              <option value="Javascript">Javascript</option>
              <option value="Python">Javascript</option>
            </Select>
          </FormField>
          <FormField>
            <Label>Tags</Label>
            <InputStyled
              onChange={handleChange}
              value={deckData.tags}
              name="tags"
            />
          </FormField>
          <FormField>
            <div />
            <TagsTip>
              E.g. Algorithms, fp, string. (should be comma separated)
            </TagsTip>
          </FormField>
          <FormField>
            <Label>Description</Label>
            <TextAreaStyled
              onChange={handleChange}
              name="description"
              value={deckData.description}
            />
          </FormField>
          <FormField>
            <div />
            <CreateButton onClick={onSubmit}>Create Deck</CreateButton>
          </FormField>
        </FormWrapper>
      </Container>
    </Layout>
  )
}

const Container = styled.div``
export const PageHeader = styled(Flex)`
  height: 7rem;
  background: ${props => props.theme.bg4};
  border-bottom: solid 0.5px ${props => props.theme.bo1};
`

const PageCrumb = styled(Text)`
  color: ${props => props.theme.co3};
  font-weight: 500;
`

const FormWrapper = styled(Flex)`
  background: ${props => props.theme.bg4};
  flex-direction: column;
  width: 50rem;
  max-width: 90vw;
  border: 1px solid ${props => props.theme.bo1};
  border-radius: 0.5rem;
`

const FormField = styled(Flex)`
  justify-content: space-between;
`

const Label = styled(Text)`
  padding-top: 1rem;
  padding-right: 1rem;
  font-size: 16px;
  margin-bottom: 5rem;
  width: 10rem;
  text-align: right;
`

export const TagsTip = styled.p`
  padding: 0;
  margin: 0;
  margin-top: -3rem;
  margin-bottom: 1rem;
  padding-left: 2rem;
  font-size: 13px;
  width: 75%;
  max-width: 75vw;
`

const Select = styled.select`
  height: 4rem;
  border-radius: 0.9rem;
  border: 0px solid ${props => props.theme.bo1};
  width: 50%;
  max-width: 75vw;
  margin-right: 25%;
  &:focus {
    outline: none;
  }
  background: ${props => props.theme.bg4};
  filter: brightness(90%);
  font-size: 16px;
  padding-left: 2rem;
  color: ${props => props.theme.co1};
  option {
    font-size: 16px;
    color: ${props => props.theme.co1};
  }
`

const InputStyled = styled.input`
  height: 4rem;
  border-radius: 0.9rem;
  border: 1px solid ${props => props.theme.bo1};
  background: ${props => props.theme.bg4};
  width: 75%;
  max-width: 75vw;
  font-size: 16px;
  padding-left: 1rem;
`

const TextAreaStyled = styled.textarea`
  background: ${props => props.theme.bg4};
  font-size: 16px;
  width: 75%;
  max-width: 75vw;
  padding: 0.5rem 1rem;
  border-radius: 0.9rem;
  border: 1px solid ${props => props.theme.bo1};
  resize: vertical;
`

const CreateButton = styled(Button)`
  background: ${props => props.theme.bg3};
  border-radius: 0.9rem;
  color: ${props => props.theme.co3};
  margin: 0 auto;
  margin-top: 2rem;
  font-size: 18px;
`
