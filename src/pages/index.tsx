import { Decks } from "src/components/pages/Decks";
import { prisma } from "src/lib/prisma";

export default function Index(props: any) {
  return <Decks {...props} />;
}

export const getServerSideProps = async () => {
  const initialDecks = JSON.parse(JSON.stringify(await prisma.deck.findMany()));

  return {
    props: { initialDecks },
  };
};
