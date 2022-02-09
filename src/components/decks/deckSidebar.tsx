import React from "react";
import { Box, Flex, Text } from "rebass";
import styled from "../../styled";
import map from "ramda/src/map";

enum Languages {
  All = "All",
  Typescript = "Typescript",
  Javascript = "Javascript",
  Reason = "Reason",
}

const tags = [
  "Algorithms",
  "String",
  "Array",
  "Mathematics",
  "Data Structures",
  "Beginner",
];

interface IDeckSidebar {
  setCurrentLanguage: (language: Languages) => void;
  currentLanguage: Languages;
}

export function DeckSidebar({
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
              setCurrentLanguage(lan);
            }}
            key={lan as string}
          >
            {lan === "Reason" ? lan + "ML" : lan}
          </LanguageStyled>
        ))(Object.values(Languages))}
      </LanguagesWrapper>
    </Container>
  );
}

const Container = styled(Box)`
  width: 15rem;
  position: fixed;
  top: calc(80px + 7rem);
  left: 10%;
`;

const LanguagesWrapper = styled(Flex)`
  flex-direction: column;
`;

const LanguageStyled = styled(Text)<{ isSelected: boolean }>`
  cursor: pointer;
  padding: 1rem;
  font-size: 16px;
  border-radius: 0.2rem;
  border-bottom: 1px solid ${(props) => props.theme.bo1};
  background: ${(props) => props.theme.bg1};
  ${(props) =>
    props.isSelected &&
    `
        filter: brightness(90%);
      `}
  &:hover {
    filter: invert(0.09);
  }
`;
