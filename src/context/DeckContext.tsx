import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { usePrevious } from "src/hooks/usePrevious";
import { TDeck, TExercise, TExercisePayload } from "src/types/Domain";
import { api } from "src/utils/api";
import { getDefaultExercise } from "src/utils/constants";
import useSWR from "swr";

type TDeckContext = {
  deck: TDeck;
  currentExercise: TExercise;
  setCurrentExercise: (newExercise: TExercise) => void;
  previousExercise: TExercise;
  onCreateExercise?: (args: any) => Promise<any>;
  onDeleteExercise?: (args: any) => Promise<any>;
  onUpdateExercise?: (args: any) => Promise<any>;
};

const initialState: TDeckContext = {
  deck: undefined,
  currentExercise: undefined,
  setCurrentExercise: undefined,
  previousExercise: undefined,
  onCreateExercise: undefined,
  onDeleteExercise: undefined,
  onUpdateExercise: undefined,
};
export const DeckContext = React.createContext<TDeckContext>(initialState);

export const DeckProvider = ({ children }) => {
  const { query } = useRouter();
  const session = useSession();
  const deckId = query.deck as string;
  const key = React.useMemo(() => `/deck/${deckId}`, [deckId]);
  const { data: deck, mutate } = useSWR(key, () => api.getDeck(deckId));

  const [currentExercise, setCurrentExercise] = React.useState<
    TExercise | undefined
  >(deck.exercises[0]);
  const previousExercise = usePrevious(currentExercise);

  const onCreateExercise = React.useCallback(async (_) => {
    const newExercise = getDefaultExercise({
      language: deck.language,
    });

    mutate(
      { ...deck, exercises: [...deck.exercises, newExercise as TExercise] },
      false
    );

    await api.createExercise({ ...newExercise, deckId: deck.id });

    mutate();
  }, []);

  const onDeleteExercise = React.useCallback(
    async (exerciseId: TExercise["id"]) => {
      mutate(
        {
          ...deck,
          exercises: deck.exercises.filter((e) => e.id !== exerciseId),
        },
        false
      );

      await api.deleteExercise({ id: exerciseId, deckId: deck.id });

      mutate();
    },
    []
  );

  const onUpdateExercise = React.useCallback(
    async (newProperty: Partial<TExercisePayload>) => {
      const updatedExercise = { ...currentExercise, ...newProperty };

      mutate(
        {
          ...deck,
          exercises: deck.exercises.map((e) =>
            e.id === updatedExercise.id ? updatedExercise : e
          ),
        },
        false
      );
      await api.updateExercise({
        deckId: currentExercise.deckId,
        id: currentExercise.id,
        ...newProperty,
      });

      mutate();
    },
    [currentExercise]
  );

  const isAuthorPlaying = React.useMemo(
    () =>
      session.status === "authenticated" &&
      // Check [...next-auth].tsx to see userId being injected into data
      session.data.userId === deck.userId,
    [session]
  );
  const value: TDeckContext = {
    deck,
    currentExercise,
    setCurrentExercise,
    previousExercise,
    ...(isAuthorPlaying && {
      onCreateExercise,
      onDeleteExercise,
      onUpdateExercise,
    }),
  };
  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
};
