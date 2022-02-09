import React from "react";
import { Box, Flex, Text } from "rebass";
import { useSession } from "next-auth/react";
import { DeckListing, DeckSidebar, Layout, Link } from "src/components";
import { prisma } from "src/lib/prisma";
import styled from "src/styled";

enum Languages {
  All = "All",
  Typescript = "Typescript",
  Javascript = "Javascript",
  Reason = "Reason",
}

export default function Decks({ initialDecks = [] }) {
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
    <Layout>
      <Content>
        <PageHeader alignItems="center">
          <Box mr="auto">
            <PageCrumb fontSize={[2, 3, 4]} mr="auto">
              Decks
            </PageCrumb>
          </Box>
          {session.status === "authenticated" && (
            <Box ml="2rem">
              <Link to="/create-deck" prefetch={true}>
                <PageCrumbButton fontSize={[2, 3, 4]}>New Deck</PageCrumbButton>
              </Link>
            </Box>
          )}
        </PageHeader>
        <Container>
          <DeckSidebar
            currentLanguage={currentLanguage}
            setCurrentLanguage={setCurrentLanguage}
          />
          <DeckListing decks={decks} />
        </Container>
      </Content>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const initialDecks = JSON.parse(JSON.stringify(await prisma.deck.findMany()));

  return {
    props: { initialDecks },
  };
};

export const PageHeader = styled(Flex)`
  height: 70px;
  background: ${(props) => props.theme.bg1};
  border-bottom: solid 0.5px ${(props) => props.theme.bo1};
  position: fixed;
  z-index: 1;
  width: 99%;
  padding: 0 10%;
`;

const PageCrumb = styled(Text)`
  color: ${(props) => props.theme.co1};
  font-weight: 500;
  font-size: 18px;
`;
const PageCrumbButton = styled(Text)`
  background: ${(props) => props.theme.bg1};
  border-radius: 0.5rem;
  padding: 0.5rem 2rem;
  color: ${(props) => props.theme.co1};
  filter: invert(1);
  font-weight: 500;
  font-size: 18px;
  transition: all 0.3s ease;
  &:hover {
    /* transform: scale(1.001); */
    filter: invert(0.8);
  }
`;

const Content = styled.div`
  padding-top: 80px;
  padding-bottom: 7rem;
`;

const Container = styled(Flex)`
  padding-top: 7rem;
  justify-content: center;
  margin: 0 auto;
  width: 80%;
  @media (max-width: 950px) {
    flex-direction: column;
    align-items: center;
  }
`;
