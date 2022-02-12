import { Deck, Exercise } from "@prisma/client";

export type TDeck = Deck & {
  exercises: Exercise[];
};

export type TExercise = Exercise;

export type TLevel = "easy" | "good" | "hard";

export type TEditorMode = "vim" | "default";

export type TBool = "true" | "false";
