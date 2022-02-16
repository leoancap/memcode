import { useLocalStorageValue } from "@mantine/hooks";
import React from "react";
import { TBool, TEditorMode } from "src/types/Domain";

type TConfigState = {
  editorMode: TEditorMode;
  includePreviousExercises: TBool;
};

type TConfigAction = "toggleEditorMode" | "toggleIncludePreviousExercises";

type TConfigContext = {
  configState: TConfigState;
  dispatch: (action: TConfigAction) => void;
};

const initialState: TConfigContext = {
  configState: {
    editorMode: "default",
    includePreviousExercises: "true",
  },
  dispatch: (_) => {},
};
export const ConfigContext = React.createContext<TConfigContext>(initialState);

export const ConfigProvider = ({ children }) => {
  const [editorMode, setEditorMode] = useLocalStorageValue<TEditorMode>({
    key: "editor-mode",
    defaultValue: "default",
  });
  const [includePreviousExercises, setIncludePreviousExercises] =
    useLocalStorageValue<TBool>({
      key: "include-previous-exercises",
      defaultValue: "true",
    });

  const dispatch = React.useCallback(
    (action: TConfigAction) => {
      if (action === "toggleEditorMode") {
        setEditorMode((olValue) => (olValue === "default" ? "vim" : "default"));
      }
      if (action === "toggleIncludePreviousExercises") {
        setIncludePreviousExercises((oldValue) =>
          oldValue === "true" ? "false" : "true"
        );
      }
    },
    [editorMode]
  );

  const value = {
    configState: { editorMode, includePreviousExercises },
    dispatch,
  };
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};
