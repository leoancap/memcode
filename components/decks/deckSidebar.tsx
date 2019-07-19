import React from "react"
import { Box, Flex, Text } from "@rebass/emotion"
import { useStore } from "../../store"
import styled from "../../styled"
import map from "ramda/src/map"
import { IDeck } from "../../generated/apolloComponents"
import { findDecksByLanguage } from "../../graphql/deck/queries/findDeck"
import { MyCtx } from "../../typings/MyCtx"
import { apiUrl } from "../../lib/apollo"
import { createApolloFetch } from "apollo-fetch"

const languages = ["Typescript", "Javascript"]
const tags = [
  "Algorithms",
  "String",
  "Array",
  "Mathematics",
  "Data Structures",
  "Beginner",
]

interface IDeckSidebar {
  setDecks: (decks: IDeck[]) => void
}

export default function DeckSidebar({ ...props }) {
  const store = useStore()

  console.log(props)

  const apolloFetch = createApolloFetch({ uri: apiUrl })

  const fetchDecks = (language: string) => async () => {
    const decks = await apolloFetch({
      query: findDecksByLanguage,
      variables: {
        language,
      },
    })
    console.log(decks)
  }

  return (
    <Container>
      <LanguagesWrapper>
        <h1>Languages</h1>
        {map((lan: string) => (
          <LanguageStyled onClick={fetchDecks(lan)} key={lan}>
            {lan}
          </LanguageStyled>
        ))(languages)}
      </LanguagesWrapper>
      {/* <FilterTags>
        <h1>Tags</h1>
        {map((tag: string) => <LanguageStyled key={tag}>{tag}</LanguageStyled>)(
          tags,
        )}
      </FilterTags> */}
    </Container>
  )
}

const Container = styled(Box)`
  /* flex-direction: column; */
  /* margin-left: auto; */
  /* width: 20rem; */
  width: 15%;
  @media (max-width: 950px) {
    width: 50%;
  }
`

const LanguagesWrapper = styled(Flex)`
  flex-direction: column;
`

const FilterTags = styled(Flex)`
  flex-direction: column;
`

const LanguageStyled = styled(Text)`
  cursor: pointer;
  background: ${props => props.theme.bg4};
  padding: 1rem;
  font-size: 16px;
  border-radius: 0.2rem;
  border-bottom: 1px solid ${props => props.theme.bo1};
`
