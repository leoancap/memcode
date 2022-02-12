import { Code, Group, Title } from "@mantine/core";
import React from "react";

export default function Solution({ solution }: any) {
  return (
    <Group direction="column">
      <Title>Solution</Title>
      <pre>
        <Code>{solution}</Code>
      </pre>
    </Group>
  );
}
