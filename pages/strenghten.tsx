import React from "react"
import { useStore } from "../store"
import styled from "../styled"
import Layout from "../components/Layout/Layout"
import { Box, Flex, Text } from "rebass"
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
        <Container>
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

const Content = styled.div`
  padding-bottom: 7rem;
  padding-top: 80px;
  width: 100%;
  display: grid;
  justify-content: center;
  align-content: center;
`

const Container = styled(Flex)`
  justify-content: center;
  width: 99%;
  margin-left: -10%;
  margin-right: 4%;
`
