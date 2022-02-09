import ts from "typescript";
import { evalWorker } from "./evalWorker";

export interface ICodeError {
  error: string;
  message: string;
}

export interface ITestCodeResults extends ICodeError {
  results: IResults[];
}

export interface IResults {
  user: string;
  solution: string;
}

export interface ITestCode {
  code: string;
  solution: string;
  testsStrings: string;
  bundledExercises?: string;
}

const transpileCode = (code: string, test: string, bundledExercises = "") =>
  `${ts.transpile(bundledExercises)} ; ${ts.transpile(code)} ; ${test}`;

export async function testCode({
  code,
  solution,
  testsStrings,
  bundledExercises = "",
}: ITestCode): Promise<ITestCodeResults> {
  let results: IResults[] = [];
  let error: ICodeError = {
    message: "",
    error: "",
  };
  const tests = testsStrings.split(";").filter((v) => v);

  for (let i = 0; i < tests.length; i++) {
    try {
      const { message: userCode } = await evalWorker(
        transpileCode(code, tests[i], bundledExercises),
        1000
      );

      const { message: codeSolution } = await evalWorker(
        transpileCode(solution, tests[i], bundledExercises),
        1000
      );

      results.push({
        user:
          typeof userCode !== "undefined" ? userCode.toString() : "undefined",
        solution:
          typeof codeSolution !== "undefined"
            ? codeSolution.toString()
            : "undefined",
      });

      if (userCode !== codeSolution) {
        error = {
          message: "Code and Solution don't always return the same value",
          error: "",
        };
      }
    } catch (error) {
      return {
        ...error,
        results,
      };
    }
  }
  return {
    ...error,
    results,
  };
}
