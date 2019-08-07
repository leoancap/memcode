import React from "react"
import { Box, Flex, Text } from "@rebass/emotion"
import { useStore } from "../../store"
import styled from "../../styled"
import map from "ramda/src/map"
import { IDeck } from "../../generated/apolloComponents"
import { Languages } from "../../typings/appTypes"

export const languages: Languages[] = [
  "All",
  "Typescript",
  "Javascript",
  "Python",
]
const tags = [
  "Algorithms",
  "String",
  "Array",
  "Mathematics",
  "Data Structures",
  "Beginner",
]

interface IDeckSidebar {
  setCurrentLanguage: (language: Languages) => void
  currentLanguage: Languages
}

export default function DeckSidebar({
  setCurrentLanguage,
  currentLanguage,
}: IDeckSidebar) {
  return (
    <Container>
      <LanguagesWrapper>
        <h1>Languages</h1>
        {map((lan: Languages) => (
          <LanguageStyled
            isSelected={lan === currentLanguage}
            onClick={() => {
              setCurrentLanguage(lan)
            }}
            key={lan}
          >
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
  width: 15rem;
  position: fixed;
  top: calc(80px + 7rem);
  left: 10%;
`

const LanguagesWrapper = styled(Flex)`
  flex-direction: column;
`

const FilterTags = styled(Flex)`
  flex-direction: column;
`

const LanguageStyled = styled(Text)<{ isSelected: boolean }>`
  cursor: pointer;
  padding: 1rem;
  font-size: 16px;
  border-radius: 0.2rem;
  border-bottom: 1px solid ${props => props.theme.bo1};
  background: ${props => props.theme.bg1};
  ${props =>
    props.isSelected &&
    `
        filter: brightness(90%);
      `}
  &:hover {
    filter: invert(0.09);
  }
`
