import React from "react";
import { useSession } from "next-auth/react";
import { DeckListing, DeckSidebar, Layout, Link } from "src/components";
import { Button, Container, Title, Group } from "@mantine/core";
import { api } from "src/utils/api";
import useSwr from "swr";

enum Languages {
  All = "All",
  Typescript = "Typescript",
  Javascript = "Javascript",
  Reason = "Reason",
}

export function Decks() {
  const session = useSession();

  const { data: initialDecks } = useSwr("decks", api.getDecks);

  const [decks, setDecks] = React.useState(initialDecks || []);

  const [currentLanguage, setCurrentLanguage] = React.useState<Languages>(
    Languages.All
  );

  React.useEffect(() => {
    setDecks((decks) =>
      decks.filter(
        (deck) => currentLanguage === "All" || deck.language === currentLanguage
      )
    );
  }, [currentLanguage]);

  return (
    <Layout
      navbar={
        <Group sx={{ paddingTop: "80px" }} mx="xl" direction="column">
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
