import { Box, Title, Text } from "@mantine/core";
import React from "react";
import { TExercise } from "src/types/Domain";

interface rightPane {
  exercise: TExercise;
}

export default function Description({ exercise }: rightPane) {
  return (
    <Box>
      <Title order={2}>Description</Title>
      <Text>{exercise.description}</Text>
    </Box>
  );
}
