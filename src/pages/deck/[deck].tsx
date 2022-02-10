import React from "react";
import { ExercisePage } from "src/components/pages/Exercise";
import { prisma } from "src/lib/prisma";

export const getServerSideProps = async ({ query: { deck: deckId } }) => {
  const deck = await prisma.deck.findFirst({
    where: { id: { equals: deckId as string } },
    include: { exercises: true },
  });

  const serializedDeck = JSON.parse(JSON.stringify(deck));
  return {
    props: { deck: serializedDeck },
  };
};

export default function DeckPage(pageProps: any) {
  return <ExercisePage {...pageProps} />;
}
