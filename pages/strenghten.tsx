import React from "react"
import { useStore } from "../store"
import styled from "../styled"
import Layout, { TextStyled } from "../components/shared/Layout"
import { Box, Flex, Text } from "@rebass/emotion"
import Link from "../components/shared/Link"
import { MyCtx } from "../typings/MyCtx"
import { myDecksToReviewQuery } from "../graphql/user/queries/myDecksToReview"
import DeckSidebar from "../components/decks/deckSidebar"
import DeckListing from "../components/decks/deckListing"

export default function Strenghten({ decks }) {
  const store = useStore()

  console.log(decks)

  return (
    <Layout>
      <Content>
        <PageHeader alignItems="center">
          <Box mr="auto" pl={[1, 2, 4, 6]}>
            <PageCrumb fontSize={[2, 3, 4]} mr="auto">
              Decks
            </PageCrumb>
          </Box>
          {store.user && (
            <Box ml="2rem" pr={[1, 2, 4, 6]}>
              <Link to="/deck-create">
                <PageCrumbButton fontSize={[2, 3, 4]}>
                  Create Deck
                </PageCrumbButton>
              </Link>
            </Box>
          )}
        </PageHeader>
        <Container>
          {/* <DeckSidebar /> */}
          <DeckListing isStrenghten={true} decks={decks} />
        </Container>
      </Content>
    </Layout>
  )
}
Strenghten.getInitialProps = async ({ apolloClient }: MyCtx) => {
  await apolloClient.resetStore()
  const {
    data: { myDecksToReview },
  } = await apolloClient.query({ query: myDecksToReviewQuery })
  return { decks: myDecksToReview }
}

export const PageHeader = styled(Flex)`
  height: 7rem;
  background: ${props => props.theme.bg2};
  border-bottom: solid 0.5px ${props => props.theme.bo1};
`

const PageCrumb = styled(Text)`
  color: ${props => props.theme.co2};
  font-weight: 500;
  font-size: 18px;
`
const PageCrumbButton = styled(Text)`
  background: ${props => props.theme.bg2};
  border-radius: 1.9rem;
  padding: 1rem;
  color: ${props => props.theme.co2};
  font-weight: 500;
  font-size: 18px;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.02);
  }
`

const Content = styled.div`
  overflow: auto;
  overflow-x: hidden;
  height: 100%;
  padding-bottom: 7rem;
`

const Container = styled(Flex)`
  /* width: 75%; */
  /* margin-left: auto; */
  /* margin-right: auto; */
  justify-content: center;
  width: 100%;
  @media (max-width: 950px) {
    flex-direction: column;
    align-items: center;
  }
`
