import dynamic from "next/dynamic";

const CodeMirror = dynamic(import("./CodeMirror"), {
  ssr: false,
});

export const Editor = CodeMirror;
