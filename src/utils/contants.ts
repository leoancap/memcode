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

// export const pyDefaultCode = `def add(x):
// `;

// const pyDefaultSolution = `def add(a, b): return a + b
// `;

export const reDefaultCode = `let add = (a:int, b:int) => {

};
`;

export const reDefaultSolution = `let add = (a:int, b:int) => {
  a + b;
};
`;

export type TLevel = "easy" | "good" | "hard";
