import { useLocalStorageValue } from "@mantine/hooks";
import React from "react";
import { TEditorMode } from "./contants";

type TConfigState = {
  editorMode: TEditorMode;
};

type TConfigAction = "toggleEditorMode";

type TConfigContext = {
  configState: TConfigState;
  dispatch: (action: TConfigAction) => void;
};

const initialState: TConfigContext = {
  configState: {
    editorMode: "default",
  },
  dispatch: (_) => {},
};
export const ConfigContext = React.createContext<TConfigContext>(initialState);

export const ConfigProvider = ({ children }) => {
  const [editorMode, setEditorMode] = useLocalStorageValue<TEditorMode>({
    key: "editor-mode",
    defaultValue: "default",
  });

  const dispatch = React.useCallback(
    (action: TConfigAction) => {
      if (action === "toggleEditorMode") {
        setEditorMode(editorMode === "default" ? "vim" : "default");
      }
    },
    [editorMode]
  );

  const value = { configState: { editorMode }, dispatch };
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};
