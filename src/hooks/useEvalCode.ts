import React from "react";
import { TRightPaneTabs } from "src/components";
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

export function useEvalCode({
  code,
  solution,
  tests,
  language,
  bundledExercises = "",
}: TEvalCode) {
  const [rightPane, setRightPane] =
    React.useState<TRightPaneTabs>("description");
  const [results, setResults] = React.useState<IResults[] | null>();
  const [error, setErrors] = React.useState("");

  const [isExecuting, setIsExecuting] = React.useState(false);

  const evalCode = async () => {
    setIsExecuting(true);
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
        setRightPane("results");
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
          setRightPane("results");
          setErrors(res.message);
        } else {
          setErrors("");
        }
      } else {
        setErrors("");
      }
    }
    setIsExecuting(false);
  };

  return {
    isExecuting,
    rightPane,
    setRightPane,
    results,
    error,
    evalCode,
  };
}
