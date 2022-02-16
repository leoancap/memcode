import { Language } from "@prisma/client";
import { TExercise } from "src/types/Domain";

export const jsDefaultCode = `const newExercise = (a) => {
  
}`;

export const jsDefaultSolution = `const newExercise = (a) => {
  return a
}`;

export const tsDefaultCode = `const newExercise = (a) => {
  
}`;

export const tsDefaultSolution = `const newExercise = (a)=> {
  return a
}`;

export const reDefaultCode = `let newExercise = (a) => {

};
`;

export const reDefaultSolution = `let newExercise = (a) => {
  a;
};
`;

export const defaultExercise: TExercise = {
  title: "newExercise",
  description: "Implement the newExercise function",
  code: "let newExercise = (a,b) => a+b;",
  solution: "let newExercise = (a,b) => a+b;",
  tests: ["newExercise(2);"],
  id: "mock",
  deckId: "mock",
  userId: "mock",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const getDefaultCode = (language: Language, withSolution: boolean) => {
  if (language === "Reason")
    return withSolution ? reDefaultSolution : reDefaultCode;
  if (language === "Javascript")
    return withSolution ? jsDefaultSolution : jsDefaultCode;
  return withSolution ? tsDefaultSolution : tsDefaultCode;
};

export const defaultTests = ["newExercise(2);"];

export const getDefaultExercise = ({ language }) => ({
  title: "[No Name]",
  description: "Add the description of the exercise",
  code: getDefaultCode(language, false),
  solution: getDefaultCode(language, true),
  tests: defaultTests,
});
