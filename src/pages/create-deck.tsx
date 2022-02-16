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
import { TDeckInput } from "src/types/Domain";
import { api } from "src/utils/api";
import { useSetState } from "@mantine/hooks";
import { Language } from "@prisma/client";

export default function CreateDecks() {
  const session = useSession();
  React.useEffect(() => {
    if (session.status === "unauthenticated") {
      Router.push("/");
    }
  }, []);

  const [deckData, setDeckData] = useSetState<TDeckInput>({
    title: "",
    description: "",
    tags: [],
    language: "Typescript",
  });

  const handleChange = ({ target: { name, value } }: any) => {
    setDeckData({
      [name]: value,
    });
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await api.createDeck(deckData);
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
              label="Description"
              name="description"
              value={deckData.description}
              onChange={handleChange}
              minRows={6}
              size="lg"
            />
            <Select
              label="Language"
              onChange={(language) =>
                setDeckData({ language: language as Language })
              }
              name="language"
              value={deckData.language}
              size="md"
              data={Object.values(Language).map((l) => ({
                value: l,
                label: l,
              }))}
            />
            <Button type="submit">Create Deck</Button>
          </Group>
        </form>
      </Box>
    </Layout>
  );
}
