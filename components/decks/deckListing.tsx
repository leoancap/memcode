import React from "react"
import { Box, Card, Flex, Text } from "@rebass/emotion"
import { useStore } from "../../store"
import styled from "../../styled"
import map from "ramda/src/map"
import {
  IDeck,
  useDeleteDeckMutation,
  IDecksQuery,
  IDeckToReview,
} from "../../generated/apolloComponents"
import { decksQuery } from "../../graphql/deck/queries/decks"
import Link from "../shared/Link"
import Router from "next/router"
import jsLogo from "../../static/javascript.svg"
import tsLogo from "../../static/typescript.svg"
import pyLogo from "../../static/python.svg"

interface IDecksListing {
  decks: IDeck[] | IDeckToReview[]
  isStrenghten?: boolean
}

export default function DeckListing({
  decks,
  isStrenghten = false,
}: IDecksListing) {
  const store = useStore()

  const [isHoveringDelete, setIsHoveringDelete] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const deleteDeck = useDeleteDeckMutation()

  const handleDeckClick = (deckId: string) => () => {
    if (!isHoveringDelete) {
      Router.push(`/deck/${deckId}`)
    }
  }

  const logoSorter = (language: string) =>
    language === "Python" ? pyLogo : language === "Javascript" ? jsLogo : tsLogo

  return (
    <Container>
      {isStrenghten
        ? map((deck: IDeckToReview) => (
            <Box key={deck.id}>
              <Link to={`/review/${deck.deckToReviewId}`}>
                <DeckCard
                  fontSize={1}
                  fontWeight="bold"
                  borderRadius={8}
                  boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
                  py={2}
                  px={2}
                >
                  <TitleStyled my={2}>
                    <LanguageLogoWrapper>
                      <img src={logoSorter(deck.deck.language)} alt="" />
                    </LanguageLogoWrapper>
                    {deck.deck.title}
                  </TitleStyled>
                  <DescriptionText py={2}>
                    {deck.deck.description.slice(0, 255) + "..."}
                  </DescriptionText>
                  <TagsStyled pt={1} py={2}>
                    {map((tag: string) => (
                      <TextStyled key={tag} py={1} px={2} mr={2}>
                        {tag}
                      </TextStyled>
                    ))(deck.deck.tags)}
                  </TagsStyled>
                </DeckCard>
              </Link>
            </Box>
          ))(decks as IDeckToReview[])
        : map((deck: IDeck) => (
            <Box key={deck.id}>
              <DeckCard
                fontSize={1}
                fontWeight="bold"
                borderRadius={8}
                boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
                p={2}
                onClick={handleDeckClick(deck.id)}
              >
                <TitleStyled my={2}>
                  <LanguageLogoWrapper>
                    <img src={logoSorter(deck.language)} alt="" />
                  </LanguageLogoWrapper>
                  {deck.title}
                </TitleStyled>
                <DescriptionText my={2}>
                  {deck.description.slice(0, 255) + "..."}
                </DescriptionText>
                <TagsStyled pt={1} my={2}>
                  {map((tag: string) => (
                    <TextStyled key={tag} py={1} px={2} mr={2}>
                      {tag}
                    </TextStyled>
                  ))(deck.tags)}
                </TagsStyled>
                {store && store.user && deck.user.uuid === store.user && (
                  <DeleteDeckIcon
                    onMouseEnter={() => {
                      setIsHoveringDelete(true)
                    }}
                    onMouseLeave={() => {
                      setIsHoveringDelete(false)
                    }}
                    onClick={async () => {
                      setIsDeleting(true)
                      if (!isDeleting) {
                        await deleteDeck({
                          variables: {
                            deckId: deck.id,
                          },
                          update: (cache, { data }) => {
                            if (!data || !data.deleteDeck) {
                              return undefined
                            }
                            cache.writeQuery<IDecksQuery>({
                              query: decksQuery,
                              data: {
                                decks: data.deleteDeck,
                              },
                            })
                          },
                        })
                        Router.reload()
                      }
                    }}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="1"
                        y2="1"
                        y1="19"
                        x2="19"
                        stroke="#fafafa"
                        strokeWidth="2"
                      />
                      <line
                        x1="1"
                        y1="1"
                        x2="19"
                        y2="19"
                        stroke="#fafafa"
                        strokeWidth="2"
                      />
                    </svg>
                  </DeleteDeckIcon>
                )}
              </DeckCard>
            </Box>
          ))(decks as IDeck[])}
    </Container>
  )
}

const DeckCard = styled(Box)`
  position: relative;
  background: ${props => props.theme.bg1};
  color: ${props => props.theme.co1};
  display: flex;
  flex-direction: column;
  height: 20rem;
  border-radius: 0.9rem;
  box-shadow: ${props => props.theme.bo2};
  transition: box-shadow 0.2s ease 0s;
  &:hover {
    filter: invert(0.09);
  }
  cursor: pointer;
  transition: all 50ms;
`

export const DeleteDeckIcon = styled.nav`
  &:hover {
    transform: scale(1.15);
  }
  cursor: pointer;
  transition: transform 400ms ease-in-out;
  background: #fd766e;
  color: #fafafa;
  border-radius: 50%;
  position: absolute;
  height: 20px;
  width: 20px;
  top: 4%;
  right: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    position: absolute;
    /* top: 100%; */
    width: 14px;
    height: 14px;
  }
`

const LanguageLogoWrapper = styled.div`
  padding-right: 1rem;
  img {
    height: 1.5rem;
    width: 1.5rem;
  }
`

const DescriptionText = styled(Text)`
  text-overflow: clip;
  margin-bottom: auto;
  justify-self: flex-start;
  overflow: hidden;
  max-height: 10rem;
  color: ${props => props.theme.co1};
`

const TitleStyled = styled(Text)`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  transition: all 0.5s;
  color: ${props => props.theme.co1};
  width: 90%;
`

const Container = styled(Box)`
  width: 84%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  margin-left: 17%;
  margin-top: 1.5%;
`

const TextStyled = styled(Text)`
  border-radius: 0.8rem;
  background: ${props => props.theme.bg1};
  color: ${props => props.theme.co1};
  font-size: 15px;
`

const TagsStyled = styled(Box)`
  filter: invert(1);
  display: flex;
  flex-wrap: wrap;
`
