import { GetServerSidePropsContext } from "next";
import React from "react";
import { ExercisePage } from "src/components/pages/Exercise";
import { DeckProvider } from "src/context/DeckContext";
import { getDeck } from "../api/get-deck";

export default function DeckPage(pageProps: any) {
  return (
    <DeckProvider>
      <ExercisePage {...pageProps} />;
    </DeckProvider>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const deckId = context.params?.deck as string;

  const deck = await getDeck(deckId);

  return {
    props: {
      fallback: {
        [`/deck/${deckId}`]: deck,
      },
    },
  };
}
