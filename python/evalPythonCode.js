const { promisify } = require("util")
const { PythonShell } = require("python-shell")

const evalCodeAsync = () => promisify(PythonShell.runString)
const evalSolutionAsync = () => promisify(PythonShell.runString)

const evalPythonCode = async (
  code,
  solution,
  testsStrings,
  bundledExercises = "",
) => {
  let results = []
  let error = {
    message: "",
    error: "",
  }
  const tests = testsStrings.split(";").filter(v => v)
  for (let i = 0; i < tests.length; i++) {
    try {
      const resCode = await evalCodeAsync()(`${code}\nprint(${tests[i]})`, {})
      const resSolution = await evalSolutionAsync()(
        `${bundledExercises}\n${solution}\nprint(${tests[i]})`,
        null,
      )

      results.push({
        user: resCode ? resCode[0] : "undefined",
        solution: resSolution ? resSolution[0] : "undefined",
      })
      if (results[i].user !== results[i].solution) {
        error = {
          message: "Code and Solution don't always return the same value",
          error: "implementation",
        }
      }
    } catch (err) {
      error.message = err.stack.substr(0, err.stack.indexOf(" at "))
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

module.exports = {
  evalPythonCode,
}
