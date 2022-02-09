import React from "react";
import { runReasonEndpoint } from "src/utils/contants";
import { testCode } from "src/utils/testCode";

type IResults = {
  user: string;
  solution: string;
};

type TEvalCode = {
  code: string;
  solution: string;
  tests: string;
  language: string;
  bundledExercises?: string;
};

export type IRightPane = "description" | "error" | "results" | "solution";

export function useEvalCode({
  code,
  solution,
  tests,
  language,
  bundledExercises = "",
}: TEvalCode) {
  const [rightPane, setRightPane] = React.useState<IRightPane>("description");
  const [results, setResults] = React.useState<IResults[] | null>();
  const [error, setErrors] = React.useState("");

  const evalCode = async () => {
    if (language === "Reason") {
      const rawResponse = await fetch(runReasonEndpoint, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        method: "POST",
        body: JSON.stringify({
          code: code,
          solution: solution,
          tests: tests,
          isTesting: true,
        }),
      });
      const res = await rawResponse.json();
      setResults(res.results);
      setRightPane("results");
      if (res.error) {
        setErrors(res.error.message);
        setRightPane("error");
      } else {
        setResults(res.results);
      }
    } else {
      const res = await testCode({
        code: code,
        solution: solution,
        testsStrings: tests,
        bundledExercises: bundledExercises,
      });
      console.log({ res });
      setResults(res.results);
      setRightPane("results");
      if (res.message) {
        if (res.error !== "implementation") {
          setRightPane("error");
          setErrors(res.message);
        } else {
          setErrors("");
        }
      } else {
        setErrors("");
      }
    }
  };

  return {
    rightPane,
    setRightPane,
    results,
    error,
    evalCode,
  };
}
