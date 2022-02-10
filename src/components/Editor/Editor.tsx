import dynamic from "next/dynamic";

const CodeMirror: any = dynamic(import("./CodeMirror"), {
  ssr: false,
});

export const Editor = CodeMirror;
