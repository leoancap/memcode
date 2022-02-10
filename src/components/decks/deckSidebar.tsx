import React from "react";
import { Container, Title, Chips, Chip } from "@mantine/core";

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
      <Title mb="sm" order={3}>
        Languages
      </Title>
      <Chips direction="column" value={currentLanguage}>
        {Object.values(Languages).map((lan: Languages) => (
          <Chip value={lan} onClick={() => setCurrentLanguage(lan)} key={lan}>
            {lan}
          </Chip>
        ))}
      </Chips>
    </Container>
  );
}
