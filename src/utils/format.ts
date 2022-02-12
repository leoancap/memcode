let prettier = null;
let tsParser = null;

export const formatTS = async (code: string) => {
  try {
    if (!prettier) prettier = await import("prettier/standalone");
    if (!tsParser) tsParser = await import("prettier/parser-typescript");

    return prettier.format(code, {
      parser: "typescript",
      plugins: [tsParser],
    });
  } catch (e) {
    console.log("error formatting: ", e);
    return code;
  }
};
