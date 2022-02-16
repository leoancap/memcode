import { Decks } from "src/components/pages/Decks";
import { api } from "src/utils/api";

export default function Index(props: any) {
  return <Decks {...props} />;
}

export const getStaticProps = async () => {
  const initialDecks = await api.getDecks();

  return {
    props: {
      fallback: {
        decks: initialDecks,
      },
    },
  };
};
