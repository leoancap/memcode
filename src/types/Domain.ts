import { Deck, Exercise } from "@prisma/client";

export type TDeck = Deck & {
  exercises: Exercise[];
};

export type TExercise = Exercise;
