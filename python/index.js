const { evalPythonCode } = require("./evalPythonCode")
const app = require("express")()
const bodyParser = require("body-parser")
const cors = require("cors")
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())
app.use(cors({}))

const code = `
def square(x): return x*x
`

const solution = `
def square(x): return x*x
`
const tests = "square(2); square(3)"

app.post("*", async (req, res) => {
  const { code, solution, tests, isTesting } = req.body
  const results = await evalPythonCode(
    isTesting ? code : solution,
    solution,
    tests,
  )
  console.log(results)
  res.writeHeader(200, { "Content-Type": "text/json" })
  res.end(JSON.stringify(results))
})

app.listen(5000, () => {
  console.log("listening ")
})
