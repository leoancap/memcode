import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror";

import { javascript } from "@codemirror/lang-javascript";
import { rust } from "@codemirror/lang-rust";
import { useMantineColorScheme } from "@mantine/core";

import { vim } from "@replit/codemirror-vim";
import React from "react";
import { ConfigContext } from "src/utils/ConfigContext";

export default function CodeMirrorEditor({ height, code, onChange }) {
  const { colorScheme } = useMantineColorScheme();

  const editorRef = React.useRef<ReactCodeMirrorRef>();

  const { configState } = React.useContext(ConfigContext);
  // useHotkeys([
  //   [
  //     "mod+[",
  //     () => {
  //       const view = editorRef.current.view;
  //       if (view) {
  //         let cm = getCM(view);
  //         // use cm to access the old cm5 api
  //         Vim.exitInsertMode(cm);
  //         console.log({ Vim });
  //       }
  //     },
  //   ],
  // ]);
  //

  const extensions = React.useMemo(() => {
    const languageExtensions = [
      javascript({ jsx: true, typescript: true }),
      // rust is for reasonml syntax
      rust(),
    ];
    if (configState.editorMode === "vim") return [...languageExtensions, vim()];
    return languageExtensions;
  }, [configState.editorMode]);

  return (
    <CodeMirror
      value={code}
      ref={editorRef}
      height={height}
      style={{ height: "100%", fontSize: 18 }}
      theme={colorScheme ?? "dark"}
      extensions={extensions}
      onChange={(value, _viewUpdate) => {
        // console.log("value:", value);
        onChange(value);
      }}
    />
  );
}
