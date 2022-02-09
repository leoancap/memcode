import brace from "brace";
import "brace/mode/typescript";
import "brace/mode/rust";
import "brace/mode/python";
import "brace/theme/terminal";
import "brace/theme/chrome";
import "brace/keybinding/vim";
import AceEditor from "react-ace";
import styled from "../../styled";

const Editor = ({ height, code, onChange, language }) => {
  const isDark = false;
  const isVim = false;

  return (
    <EditorWrapper>
      <AceEditor
        mode={
          language === "Reason"
            ? "rust"
            : language
            ? language.toLowerCase()
            : "typescript"
        }
        theme={isDark ? "terminal" : "chrome"}
        onChange={onChange}
        value={code}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{
          $blockScrolling: true,
        }}
        setOptions={{
          fontFamily: "monospace",
          tabSize: 2,
          showGutter: false,
        }}
        keyboardHandler={isVim ? "vim" : ""}
        fontSize={21}
        height={height}
        width="100%"
      />
    </EditorWrapper>
  );
};

export default Editor;

const EditorWrapper = styled.div`
  * {
    font-family: monospace;
  }
`;
