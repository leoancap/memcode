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
  tests: string[];
  bundledExercises?: string;
}

let ts = null;

const transpileCode = async (
  code: string,
  test: string,
  bundledExercises = ""
) => {
  if (!ts) {
    ts = await import("typescript");
  }
  const { transpile } = ts;

  return `${transpile(bundledExercises)} ; ${transpile(code)} ; ${test}`;
};

export async function evalTS({
  code,
  solution,
  tests,
  bundledExercises = "",
}: ITestCode): Promise<ITestCodeResults> {
  let results: IResults[] = [];
  let error: ICodeError = {
    message: "",
    error: "",
  };

  for (let i = 0; i < tests.length; i++) {
    try {
      const { message: userCode } = await evalWorker(
        await transpileCode(code, tests[i], bundledExercises),
        1000
      );

      const { message: codeSolution } = await evalWorker(
        await transpileCode(solution, tests[i], bundledExercises),
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
