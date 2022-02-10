import React from "react";
import { useSession } from "next-auth/react";
import { DeckListing, DeckSidebar, Layout, Link } from "src/components";
import { Button, Container, Grid, Title, Anchor, Group } from "@mantine/core";

enum Languages {
  All = "All",
  Typescript = "Typescript",
  Javascript = "Javascript",
  Reason = "Reason",
}

export function Decks({ initialDecks = [] }) {
  const session = useSession();

  const [decks, setDecks] = React.useState(initialDecks);

  const [currentLanguage, setCurrentLanguage] = React.useState<Languages>(
    Languages.All
  );

  React.useEffect(() => {
    setDecks(
      initialDecks.filter(
        (deck) => currentLanguage === "All" || deck.language === currentLanguage
      )
    );
  }, [currentLanguage]);

  console.log({ initialDecks });
  return (
    <Layout
      navbar={
        <Group mx="xl" direction="column">
          <Group ml="sm" direction="column">
            <Title>Decks</Title>
            {session.status === "authenticated" && (
              <Link to="/create-deck" prefetch={true}>
                <Button size="sm" variant="default">
                  New Deck
                </Button>
              </Link>
            )}
          </Group>
          <DeckSidebar
            currentLanguage={currentLanguage}
            setCurrentLanguage={setCurrentLanguage}
          />
        </Group>
      }
    >
      <Container>
        <Container>
          <DeckListing decks={decks} />
        </Container>
      </Container>
    </Layout>
  );
}
