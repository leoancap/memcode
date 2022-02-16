import { request } from "src/lib/request";
import {
  TDeck,
  TDeckInput,
  TExercise,
  TExercisePayload,
  TRunCodeSummary,
  TRunReasonPayload,
} from "src/types/Domain";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https//memcode.vercel.app";

export const runReasonEndpoint =
  "https://fathomless-refuge-53477.herokuapp.com/";
// export const runReasonEndpoint = "http://localhost:1234";

export const api = {
  getDecks: (): Promise<TDeck[]> =>
    request.post(`${baseURL}/api/get-decks`, {}),

  getDeck: (deckId: TDeck["id"]): Promise<TDeck> =>
    request.post(`${baseURL}/api/get-deck`, { deckId }),

  createDeck: (deckData: TDeckInput) =>
    request.post(`${baseURL}/api/create-deck`, deckData),

  createExercise: (
    exerciseData: Pick<TExercise, "deckId"> & TExercisePayload
  ) => request.post(`${baseURL}/api/create-exercise`, exerciseData),

  updateExercise: (
    exerciseData: Pick<TExercise, "id" | "deckId"> & Partial<TExercisePayload>
  ) => request.post(`${baseURL}/api/update-exercise`, exerciseData),

  deleteExercise: ({ id, deckId }: Pick<TExercise, "id" | "deckId">) =>
    request.post(`${baseURL}/api/delete-exercise`, { id, deckId }),

  runReason: (reasonPayload: TRunReasonPayload): Promise<TRunCodeSummary> =>
    request.post(runReasonEndpoint, reasonPayload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }),
};
