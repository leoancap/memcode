import React from "react"
import { useStore } from "../store"
import styled from "../styled"
import Layout from "../components/Layout/Layout"
import { Box, Flex, Text } from "rebass"
import Link from "../components/shared/Link"
import { MyCtx } from "../typings/MyCtx"
import { decksQuery } from "../graphql/deck/queries/decks"
import DeckSidebar from "../components/decks/deckSidebar"
import DeckListing from "../components/decks/deckListing"
import { Languages } from "../typings/appTypes"
import { useApolloClient } from "react-apollo-hooks"
import gql from "graphql-tag"

const getDecksQuery = gql`
  {
    decks @client {
      id
      title
      description
      tags
      language
      bundledExercises
      user {
        id
        uuid
      }
    }
  }
`

export default function Decks({ initialDecks }) {
  const store = useStore()

  const [decks, setDecks] = React.useState(initialDecks)

  const [currentLanguage, setCurrentLanguage] = React.useState<Languages>("All")

  React.useEffect(() => {
    setDecks(
      initialDecks.filter(
        deck => currentLanguage === "All" || deck.language === currentLanguage,
      ),
    )
  }, [currentLanguage])

  return (
    <Layout>
      <Content>
        <PageHeader alignItems="center">
          <Box mr="auto">
            <PageCrumb fontSize={[2, 3, 4]} mr="auto">
              Decks
            </PageCrumb>
          </Box>
          {store.user && (
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
  )
}
Decks.getInitialProps = async ({ apolloClient }: MyCtx) => {
  await apolloClient.resetStore()
  const {
    data: { decks },
  } = await apolloClient.query({ query: decksQuery })
  return { initialDecks: decks }
}

export const PageHeader = styled(Flex)`
  height: 70px;
  background: ${props => props.theme.bg1};
  border-bottom: solid 0.5px ${props => props.theme.bo1};
  position: fixed;
  z-index: 1;
  width: 99%;
  padding: 0 10%;
`

const PageCrumb = styled(Text)`
  color: ${props => props.theme.co1};
  font-weight: 500;
  font-size: 18px;
`
const PageCrumbButton = styled(Text)`
  background: ${props => props.theme.bg1};
  border-radius: 0.5rem;
  padding: 0.5rem 2rem;
  color: ${props => props.theme.co1};
  filter: invert(1);
  font-weight: 500;
  font-size: 18px;
  transition: all 0.3s ease;
  &:hover {
    /* transform: scale(1.001); */
    filter: invert(0.8);
  }
`

const Content = styled.div`
  padding-top: 80px;
  padding-bottom: 7rem;
`

const Container = styled(Flex)`
  padding-top: 7rem;
  justify-content: center;
  margin: 0 auto;
  width: 80%;
  @media (max-width: 950px) {
    flex-direction: column;
    align-items: center;
  }
`
