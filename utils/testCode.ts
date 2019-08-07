import evalWorker from "./evalWorker"
import ts from "typescript"
export interface ICodeError {
  error: string
  message: string
}
export interface ITestCode extends ICodeError {
  results: IResults[]
}
export interface IResults {
  user: string
  solution: string
}
export async function testCode(
  code: string,
  solution: string,
  testsStrings: string,
  bundledExercises: string = "",
): Promise<ITestCode> {
  let results: IResults[] = []
  let error: ICodeError = {
    message: "",
    error: "",
  }
  const tests = testsStrings.split(";").filter(v => v)
  for (let i = 0; i < tests.length; i++) {
    try {
      const resCode = await evalWorker(
        ts.transpile(bundledExercises) +
          " ; " +
          ts.transpile(code) +
          ` ; ${tests[i]}`,
        1000,
      )
      const resSolution = await evalWorker(
        ts.transpile(bundledExercises) +
          " ; " +
          ts.transpile(solution) +
          ` ; ${tests[i]}`,
        1000,
      )
      results.push({
        user: typeof resCode !== "undefined" ? resCode.toString() : "undefined",
        solution:
          typeof resSolution !== "undefined"
            ? resSolution.toString()
            : "undefined",
      })
      if (resCode !== resSolution) {
        error = {
          message: "Code and Solution don't always return the same value",
          error: "",
        }
      }
    } catch (error) {
      return {
        ...error,
        results,
      }
    }
  }
  return {
    ...error,
    results,
  }
}
