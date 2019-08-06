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

app.set("port", process.env.PORT || 5000)

app.post("*", async (req, res) => {
  const { code, solution, tests, isTesting } = req.body
  const results = await evalPythonCode(
    isTesting ? code : solution,
    solution,
    tests,
  )
  res.writeHeader(200, { "Content-Type": "text/json" })
  res.end(JSON.stringify(results))
})

app.listen(app.get("port"))
