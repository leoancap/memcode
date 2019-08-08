const { execute } = require("./reasonEval")

const evalReasonCode = (
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
      const resCode = execute(`${code}\n${tests[i]};`, {})
      const resSolution = execute(
        `${bundledExercises}\n${solution}\n${tests[i]};`,
      )
      const usr = resCode.result
      const sol = resSolution.result
      const lastIndUsr = usr.lastIndexOf("=")
      const lastIndSol = sol.lastIndexOf("=")

      results.push({
        user:
          resCode.stderr.length === 0
            ? usr.slice(lastIndUsr + 1).trim()
            : "undefined",
        solution:
          resSolution.stderr.length === 0
            ? sol.slice(lastIndSol + 1).trim()
            : "undefined",
      })
      if (resCode.stderr.length > 0) {
        return {
          error: {
            message: resCode.stderr,
          },
          results,
        }
      }
      if (resSolution.stderr.length > 0) {
        return {
          error: {
            message: resSolution.stderr,
          },
          results,
        }
      }
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
  evalReasonCode,
}
