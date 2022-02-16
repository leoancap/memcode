import React from "react";
import { TDeck, TExercise, TExercisePayload } from "src/types/Domain";
import { api } from "src/utils/api";
import { getDefaultExercise } from "src/utils/constants";

import { useSWRConfig } from "swr";

type TUseUpdateDeck = {
  deck: TDeck;
  currentExercise: TExercise;
  isAuthorPlaying: boolean;
};

export function useUpdateDeck({
  deck,
  currentExercise,
  isAuthorPlaying,
}: TUseUpdateDeck): {
  onCreateExercise?: (args: any) => Promise<any>;
  onDeleteExercise?: (args: any) => Promise<any>;
  onUpdateExercise?: (args: any) => Promise<any>;
} {
  const { mutate } = useSWRConfig();

  const [isLoading, setIsLoading] = React.useState(false);

  const key = React.useMemo(() => `/deck/${deck.id}`, [deck]);
  const onCreateExercise = React.useCallback(async (_) => {
    const newExercise = getDefaultExercise({
      language: deck.language,
    });
    mutate(
      key,
      { ...deck, exercises: [...deck.exercises, newExercise] },
      false
    );
    await api.createExercise({ ...newExercise, deckId: deck.id });
    mutate(key);
  }, []);

  const onDeleteExercise = React.useCallback(
    async (exerciseId: TExercise["id"]) => {
      mutate(
        key,
        {
          ...deck,
          exercises: deck.exercises.filter((e) => e.id !== exerciseId),
        },
        false
      );
      await api.deleteExercise({ id: exerciseId, deckId: deck.id });
      mutate(key);
    },
    []
  );

  const onUpdateExercise = React.useCallback(
    async (newProperty: Partial<TExercisePayload>) => {
      const updatedExercise = { ...currentExercise, ...newProperty };

      mutate(
        key,
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
      mutate(key);
    },
    [currentExercise]
  );

  const loadingThrottle = React.useCallback(
    (cb) => async (args: any) => {
      if (!isLoading) {
        setIsLoading(true);
        await cb(args);
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  if (!isAuthorPlaying) return {};

  return {
    onCreateExercise: loadingThrottle(onCreateExercise),
    onDeleteExercise: loadingThrottle(onDeleteExercise),
    onUpdateExercise: loadingThrottle(onUpdateExercise),
  };
}
