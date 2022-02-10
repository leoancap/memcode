import React from "react";
import Router from "next/router";
import Image from "next/image";
import jsLogo from "public/javascript.svg";
import tsLogo from "public/typescript.svg";
import reLogo from "public/reason.png";
import { useSession } from "next-auth/react";

import { Cross1Icon } from "@radix-ui/react-icons";
import { Card, Grid, Text, Box, Group, Title } from "@mantine/core";
import { Deck } from "@prisma/client";

const getLogo = (language: string) => {
  if (language === "Javascript") return jsLogo;
  if (language === "Reason") return reLogo;
  return tsLogo;
};

interface IDecksListing {
  decks: Deck[];
  // isStrenghten?: boolean;
}

export function DeckListing({
  decks = [],
}: // isStrenghten = false,
IDecksListing) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDeckClick = (deckId: string) => () => {
    Router.push(`/deck/${deckId}`);
  };

  const session = useSession();

  return (
    <Grid gutter="lg" justify="space-between" columns={2}>
      {decks.map((deck: Deck) => (
        <Grid.Col key={deck.id} sx={{ minHeight: 80 }} span={1}>
          <Card
            sx={{ minHeight: "100%", cursor: "pointer" }}
            padding="sm"
            shadow="sm"
            onClick={handleDeckClick(deck.id)}
          >
            <Group position="apart" direction="row" noWrap>
              <Group>
                <Image
                  height={24}
                  width={24}
                  src={getLogo(deck.language)}
                  alt={deck.language}
                />
                <Title order={6}>{deck.title}</Title>
              </Group>
              {session.status === "authenticated" &&
                session.data.id === deck.userId && (
                  <Box
                    onClick={(e: { stopPropagation: () => void }) => {
                      e.stopPropagation();
                      setIsDeleting(true);
                      if (!isDeleting) {
                        // delete icon
                      }
                    }}
                    title="Delete Deck"
                  >
                    <Cross1Icon width={25} height={25} />
                  </Box>
                )}
            </Group>
            <Card.Section>
              <Text m="sm">{deck.description.slice(0, 255) + "..."}</Text>
            </Card.Section>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}
