import React from "react";
import { TResult } from "src/types/Domain";
import { api } from "src/utils/api";
import { evalTS } from "src/utils/evalTS";

export function useEvalCode({
  currentCode,
  currentExercise = null,
  language,
  bundledExercises = "",
}) {
  const [results, setResults] = React.useState<TResult[] | null>();
  const [error, setErrors] = React.useState("");
  const [isExecuting, setIsExecuting] = React.useState(false);

  const handleEvalCode = async () => {
    if (currentExercise) {
      const { solution, tests } = currentExercise;
      setIsExecuting(true);
      if (language === "Reason") {
        const res = await api.runReason({
          code: currentCode,
          solution: solution,
          tests: tests.join("  "),
          bundledExercises,
          isTesting: true,
        });
        setResults(res.results);
        if (res.error?.message) {
          setErrors(res.error.message);
          // @ts-ignore
        } else if (res.message) {
          // @ts-ignore
          setErrors(res.message);
        } else {
          setErrors("");
        }
      } else {
        const res = await evalTS({
          code: currentCode,
          solution: solution,
          tests: tests,
          bundledExercises: bundledExercises,
        });
        setResults(res.results);
        if (res.message) {
          if (res.error !== "implementation") {
            setErrors(res.message);
          } else {
            setErrors("");
          }
        } else {
          setErrors("");
        }
      }
      setIsExecuting(false);
    }
  };

  return {
    isExecuting,
    results,
    error,
    handleEvalCode,
  };
}
