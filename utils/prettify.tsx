const prettier = require("prettier/standalone")
const plugins = [require("prettier/parser-babylon")]

export function prettify(code) {
  const opts = {
    cursorOffset: 2,
    rangeStart: 0,
    rangeEnd: Infinity,
    useTabs: false,
    tabWidth: 2,
    proseWrap: "never",
    printWidth: 80,
    singleQuote: false,
    trailingComma: "all",
    bracketSpacing: true,
    jsxBracketSameLine: false,
    parser: "babel",
    insertPragma: false,
    requirePragma: false,
    semi: false,
    originalText: code,
  }

  const formatted: any = {}
  try {
    formatted.code = prettier.format(code, { ...opts, plugins })
  } catch (error) {
    formatted.error = error.message
  }
  return formatted
}
