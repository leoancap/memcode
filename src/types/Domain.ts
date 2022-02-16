import { Deck, Exercise } from "@prisma/client";

export type TDeck = Deck & {
  exercises: Exercise[];
};

export type TDeckInput = Pick<
  TDeck,
  "title" | "description" | "language" | "tags"
>;

export type TRunReasonPayload = {
  code: string;
  solution: string;
  tests: string[];
  bundledExercises?: string;
  isTesting: boolean;
};

export type TExercise = Exercise;

export type TExercisePayload = Pick<
  TExercise,
  "title" | "description" | "code" | "solution" | "tests"
>;

export type TResult = {
  user: unknown;
  solution: unknown;
};

export type TRunCodeSummary = {
  error: {
    error?: string;
    message?: string;
  };
  results: TResult[];
};

export type TLevel = "easy" | "good" | "hard";

export type TEditorMode = "vim" | "default";

export type TBool = "true" | "false";
