import { Group } from "@mantine/core";
import React from "react";

export default function ErrorCode({ error }: any) {
  return (
    <Group direction="column">
      <h1>Error</h1>
      <pre>
        <code>{error}</code>
      </pre>
    </Group>
  );
}
