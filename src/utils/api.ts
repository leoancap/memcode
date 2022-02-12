import { request } from "src/lib/request";
import { TExercise } from "src/types/Domain";

// export const runReasonEndpoint =
//   "https://fathomless-refuge-53477.herokuapp.com/";
export const runReasonEndpoint = "http://localhost:1234";

export const runPythonEndpoint = "https://memcode-api.now.sh/python";

export const api = {
  removeExercise: async ({ id, deckId }: Pick<TExercise, "id" | "deckId">) => {
    return await request.post("/api/remove-exercise", { id, deckId });
  },
  runReason: async ({ code, solution, tests, bundledExercises, isTesting }) => {
    const res = await request.post(runReasonEndpoint, {
      code: code,
      solution: solution,
      tests: tests,
      bundledExercises,
      isTesting: isTesting,
    });
    console.log({ res });
    return res;
  },
};
