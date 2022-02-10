import { TExercise } from "src/types/Domain";

export const api = {
  removeExercise: async ({ id, deckId }: Pick<TExercise, "id" | "deckId">) => {
    const res = await (
      await fetch("/api/remove-exercise", {
        method: "POST",
        body: JSON.stringify({ id, deckId }),
      })
    ).json();
    return res;
  },
};
