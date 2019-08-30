import { runReasonEndpoint, runPythonEndpoint } from "../lib/apollo"

export const api = {
  runReason: async (currentExercise, userCode) => {
    const rawResponse = await fetch(runReasonEndpoint, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        code: userCode,
        solution: currentExercise.solution,
        tests: currentExercise.tests,
        isTesting: true,
      }),
    })
    const res = await rawResponse.json()
    return res
  },
  runPython: async (currentExercise, userCode) => {
    const rawResponse = await fetch(runPythonEndpoint, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        code: userCode,
        solution: currentExercise.solution,
        tests: currentExercise.tests,
        isTesting: true,
      }),
    })
    const res = await rawResponse.json()
    return res
  },
}
