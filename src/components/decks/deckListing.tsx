import React from "react";
import Router from "next/router";
import Image from "next/image";
import jsLogo from "public/javascript.svg";
import tsLogo from "public/typescript.svg";
import reLogo from "public/reason.png";
import { useSession } from "next-auth/react";

import { Cross1Icon } from "@radix-ui/react-icons";
import { Card, Grid, Text, Box, Group, Title } from "@mantine/core";
import { TDeck } from "src/types/Domain";

const getLogo = (language: string) => {
  if (language === "Javascript") return jsLogo;
  if (language === "Reason") return reLogo;
  return tsLogo;
};

interface IDecksListing {
  decks: TDeck[];
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

  const getIsAuthorPlaying = (deck: TDeck) =>
    session.status === "authenticated" && session.data.id === deck.userId;

  return (
    <Grid gutter="lg" justify="space-between" columns={2}>
      {decks.map((deck: TDeck) => (
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
              {getIsAuthorPlaying(deck) ? (
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
              ) : null}
            </Group>
            <Card.Section>
              <Text lineClamp={4} m="sm">
                {deck.description}
              </Text>
            </Card.Section>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}
