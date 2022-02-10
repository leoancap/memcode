import { TExercise } from "src/types/Domain";

export const runReasonEndpoint =
  "https://fathomless-refuge-53477.herokuapp.com/";

export const runPythonEndpoint = "https://memcode-api.now.sh/python";

export const jsDefaultCode = `const add = (a, b) => {
  
}`;

export const jsDefaultSolution = `const add = (a, b) => {
  return a + b
}`;

export const tsDefaultCode = `const add = (a:number, b:number) => {
  
}`;

export const tsDefaultSolution = `const add = (a:number, b:number):number => {
  return a + b
}`;

export const reDefaultCode = `let add = (a:int, b:int) => {

};
`;

export const reDefaultSolution = `let add = (a:int, b:int) => {
  a + b;
};
`;

export type TLevel = "easy" | "good" | "hard";

export type TEditorMode = "vim" | "default";

export const defaultExercise: TExercise = {
  title: "add",
  description: "Implement the add function",
  code: "let add = (a,b) => a+b",
  solution: "let add = (a,b) => a+b",
  tests: "add(2,2);",
  id: "mock",
  deckId: "mock",
  userId: "mock",
  createdAt: new Date(),
  updatedAt: new Date(),
};
