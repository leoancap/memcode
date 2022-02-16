import { GetStaticProps } from "next";
import React from "react";
import { ExercisePage } from "src/components/pages/Exercise";
import { DeckProvider } from "src/context/DeckContext";
import { api } from "src/utils/api";

export default function DeckPage(pageProps: any) {
  return (
    <DeckProvider>
      <ExercisePage {...pageProps} />;
    </DeckProvider>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const deckId = context.params?.deck as string;

  const deck = await api.getDeck(deckId);

  return {
    props: {
      fallback: {
        [`/deck/${deckId}`]: deck,
      },
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
