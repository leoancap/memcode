import { CreateExercisePage } from "src/components/pages/CreateExercise/CreateExercise";
import { prisma } from "src/lib/prisma";

export const getServerSideProps = async ({ query: { deck: deckId } }) => {
  const deck = await prisma.deck.findFirst({
    where: { id: { equals: deckId as string } },
  });
  const serializedDeck = JSON.parse(JSON.stringify(deck));
  return {
    props: { deck: serializedDeck },
  };
};

export default function ExerciseCreate(pageProps: any): JSX.Element {
  return <CreateExercisePage {...pageProps} />;
}
