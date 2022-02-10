import { Group, Title } from "@mantine/core";
import React from "react";

import { prettify } from "../../utils/prettify";

export default function Solution({ solution }: any) {
  return (
    <Group direction="column">
      <Title>Solution</Title>
      <code>
        <pre>{prettify(solution).code}</pre>
      </code>
    </Group>
  );
}
