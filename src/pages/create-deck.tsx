import React from "react";
import Router from "next/router";

import { useSession } from "next-auth/react";
import {
  Button,
  Box,
  Group,
  Select,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { Layout } from "src/components";

export default function CreateDecks() {
  const session = useSession();
  React.useEffect(() => {
    if (session.status === "unauthenticated") {
      Router.push("/");
    }
  }, []);

  const [deckData, setDeckData] = React.useState({
    title: "",
    description: "",
    tags: [],
    language: "Typescript",
  });

  const handleChange = ({ target: { name, value } }: any) => {
    setDeckData({
      ...deckData,
      [name]: value,
    });
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const res = await (
      await fetch("/api/create-deck", {
        method: "POST",
        body: JSON.stringify(deckData),
      })
    ).json();
    console.log({ res });
    Router.push("/");
  };

  return (
    <Layout>
      <Box>
        <form onSubmit={onSubmit}>
          <Group align="center" direction="column">
            <Title>Create a Deck</Title>
            <TextInput
              required
              label="Title"
              name="title"
              value={deckData.title}
              onChange={handleChange}
              size="lg"
            />
            <Textarea
              required
              label="description"
              name="description"
              value={deckData.description}
              onChange={handleChange}
              minRows={6}
              size="lg"
            />
            <Select
              label="Language"
              onChange={handleChange}
              value={deckData.language}
              size="md"
              data={[
                { value: "Typescript", label: "Typescript" },
                { value: "Javascript", label: "Javascript" },
                { value: "Reason", label: "Reason" },
              ]}
            />
            <Button type="submit">Create Deck</Button>
          </Group>
        </form>
      </Box>
    </Layout>
  );
}
