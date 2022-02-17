import { Decks } from "src/components/pages/Decks";
import { getDecks } from "./api/get-decks";

export default function Index(props: any) {
  return <Decks {...props} />;
}

export async function getServerSideProps() {
  const initialDecks = await getDecks();

  return {
    props: {
      fallback: {
        decks: initialDecks,
      },
    },
  };
}
