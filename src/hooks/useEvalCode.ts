import React from "react";
import { TRightPaneTabs } from "src/components";
import { api } from "src/utils/api";
import { evalTS } from "src/utils/evalTS";

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
      const res = await api.runReason({
        code: code,
        solution: solution,
        tests: tests,
        bundledExercises,
        isTesting: true,
      });
      setResults(res.results);
      setRightPane("results");
      if (res.error) {
        setErrors(res.error.message);
        setRightPane("results");
      } else {
        setErrors("");
        setResults(res.results);
      }
    } else {
      const res = await evalTS({
        code: code,
        solution: solution,
        testsStrings: tests,
        bundledExercises: bundledExercises,
      });
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
