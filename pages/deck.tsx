import React from "react"
import { useStore } from "../store"
import styled from "../styled"
import Layout, { TextStyled } from "../components/shared/Layout"
import { Box, Flex, Text } from "@rebass/emotion"
import Link from "../components/shared/Link"
import { MyCtx } from "../typings/MyCtx"
import { observer } from "mobx-react-lite"
import {
  findDeckByTitleQuery,
  findDeckByIdQuery,
  findDeckByIdAndUserQuery,
} from "../graphql/deck/queries/findDeck"
import {
  IExercise,
  useDeleteExerciseMutation,
} from "../generated/apolloComponents"
import { DeleteDeckIcon } from "../components/decks/deckListing"
import Router from "next/router"

const Deck: any = observer(({ deck }: any) => {
  const store = useStore()

  const deleteExercise = useDeleteExerciseMutation()

  const { exercises } = deck

  const handleExerciseClick = (exerciseId: string) => () => {
    Router.push(`/exercise/${deck.id}/${exerciseId}`)
  }

  return (
    <Layout>
      <Content>
        <PageHeader alignItems="center">
          <Box mr="auto" pl={[1, 2, 4, 6]}>
            <PageCrumb fontSize={[2, 3, 4]} mr="auto">
              {deck.title}
            </PageCrumb>
          </Box>
          {store.user && store.user === deck.user.uuid && (
            <Box ml="2rem" pr={[1, 2, 4, 6]}>
              <Link to={`/${deck.user.id}/${deck.id}/exercise-create`}>
                <PageCrumbButton fontSize={[2, 3, 4]}>
                  Create Exercise
                </PageCrumbButton>
              </Link>
            </Box>
          )}
        </PageHeader>
        <Container>
          <ExercisesListing>
            {exercises.map((exer: IExercise, key: number) => (
              <ExercisesItem
                onClick={handleExerciseClick(exer.id)}
                key={exer.id + key}
              >
                <section>
                  <ExercisesTitle>{key + 1}</ExercisesTitle>
                  <ExercisesTitle>{exer.title}</ExercisesTitle>
                </section>
                <ExercisesDescription>{exer.description}</ExercisesDescription>
                <ExerciseOuter>
                  {store && store.user && deck.user.uuid === store.user && (
                    <DeleteDeckIcon
                      onClick={async () => {
                        await deleteExercise({
                          variables: {
                            deckId: deck.id,
                            exerciseId: exer.id,
                          },
                        })
                        Router.push(`/${deck.user.id}/${deck.id}`)
                      }}
                    >
                      <svg
                        viewBox="0 0 20 20"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line
                          x1="0"
                          y1="20"
                          x2="20"
                          y2="0"
                          stroke="#fafafa"
                          strokeWidth="2"
                        />
                        <line
                          x1="0"
                          y1="0"
                          x2="20"
                          y2="20"
                          stroke="#fafafa"
                          strokeWidth="2"
                        />
                      </svg>
                    </DeleteDeckIcon>
                  )}
                  <section>
                    <ExercisesTitle>{key + 1}</ExercisesTitle>
                    <ExercisesTitle>{exer.title}</ExercisesTitle>
                  </section>
                  <ExercisesDescription>
                    {exer.description}
                  </ExercisesDescription>
                </ExerciseOuter>
              </ExercisesItem>
            ))}
          </ExercisesListing>
        </Container>
      </Content>
    </Layout>
  )
})

Deck.getInitialProps = async ({
  apolloClient,
  query: { user, deck },
}: MyCtx) => {
  await apolloClient.resetStore()
  const {
    data: { findDeckByIdAndUser },
  } = await apolloClient.query({
    query: findDeckByIdAndUserQuery,
    variables: { user, deckId: deck },
  })
  return { deck: findDeckByIdAndUser }
}

export const PageHeader = styled(Flex)`
  height: 7rem;
  background: ${props => props.theme.bg1};
  border-bottom: solid 0.5px ${props => props.theme.bo1};
`

const PageCrumb = styled(Text)`
  color: ${props => props.theme.co1};
  font-weight: 500;
`
const PageCrumbButton = styled(Text)`
  background: ${props => props.theme.bg1};
  border-radius: 1.9rem;
  padding: 1rem;
  color: ${props => props.theme.co1};
  font-weight: 500;
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

const Container = styled(Box)``

const ExercisesListing = styled.div`
  text-decoration: none;
  margin-left: auto;
  margin-right: auto;
`

const ExerciseOuter = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  background: ${props => props.theme.bg1};
  transform: translateY(-50%);
  margin-left: -1.5rem;
  padding: 1.5rem;
  clip-path: polygon(0% 110%, 1% 110%, 1% 0%, 0% 0%);
  cursor: pointer;
  box-shadow: 1px 3px 5px rgba(50, 50, 50, 0.1);
  border-radius: 0.6rem;
  transition: clip-path 0.5s ease-in-out;
`
const ExercisesItem = styled.div`
  &:hover {
    div {
      clip-path: polygon(0% 100%, 200% 100%, 200% 0%, 0% 0%);
    }
  }
  nav {
    margin-top: 1%;
  }
  cursor: pointer;
  position: relative;
  text-decoration: none;
  margin: 15px;
  padding: 1.5rem;
  background: ${props => props.theme.bg1};
  color: ${props => props.theme.co1};
  box-shadow: 1px 3px 5px rgba(50, 50, 50, 0.1);
  border-radius: 0.6rem;
  section {
    display: flex;
    border-top-right-radius: 0.6rem;
    border-top-left-radius: 0.6rem;
    margin-left: -15px;
    margin-right: -15px;
    margin-top: -15px;
    padding-top: 1.5rem;
  }
  margin-left: auto;
  margin-right: auto;
  max-width: 60%;
  @media (max-width: 950px) {
    max-width: 80%;
  }
`
const ExercisesTitle = styled.div`
  font-size: 18px;
  padding-left: 1rem;
  padding-bottom: 1rem;
`
const ExercisesDescription = styled.div`
  box-shadow: 0 -2px 5px -5px rgba(50, 50, 50, 0.1);

  font-size: 16px;
  word-break: break-all;
`

export default Deck
