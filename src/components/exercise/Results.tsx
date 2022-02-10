import { Space, Grid, Group, Title, Text, Card } from "@mantine/core";
import React from "react";

type TResults = {
  tests: string;
  results: Array<{
    user: string;
    solution: string;
  }>;
};

export default function Results({ results, tests }: TResults) {
  return (
    <>
      <Space />
      <Grid>
        <Grid.Col span={3}>
          <Group align="center" direction="column">
            <Card sx={{ width: "100%" }}>
              <Title align="center" order={4}>
                Tests
              </Title>
            </Card>
            {tests.split(";").map((test, key: number) => (
              <Card sx={{ width: "100%" }} key={key}>
                <Text align="center">{test}</Text>
              </Card>
            ))}
          </Group>
        </Grid.Col>
        <Grid.Col span={3}>
          <Group align="center" direction="column">
            <Card sx={{ width: "100%" }}>
              <Title align="center" order={4}>
                Received
              </Title>
            </Card>
            {results.map((res, key: number) => (
              <Card sx={{ width: "100%" }} key={key}>
                <Text align="center">{res.user.slice(0.6)}</Text>
              </Card>
            ))}
          </Group>
        </Grid.Col>
        <Grid.Col span={3}>
          <Group align="center" direction="column">
            <Card sx={{ width: "100%" }}>
              <Title align="center" order={4}>
                Expected
              </Title>
            </Card>
            {results.map((res, key: number) => (
              <Card sx={{ width: "100%" }} key={key}>
                <Text align="center">{res.solution.slice(0, 6)}</Text>
              </Card>
            ))}
          </Group>
        </Grid.Col>
        <Grid.Col span={3}>
          <Group align="center" direction="column">
            <Card sx={{ width: "100%" }}>
              <Title align="center" order={4}>
                Results
              </Title>
            </Card>
            {results.map((res, key: number) => (
              <Card sx={{ width: "100%" }} key={key}>
                <Text align="center">
                  {res.solution === res.user ? "✅" : "🚫"}
                </Text>
              </Card>
            ))}
          </Group>
        </Grid.Col>
      </Grid>
    </>
  );
}
