import brace from "brace"
import "brace/mode/typescript"
import "brace/mode/rust"
import "brace/mode/python"
import "brace/theme/terminal"
import "brace/theme/chrome"
import "brace/keybinding/vim"
import AceEditor from "react-ace"
import React from "react"
import { observer } from "mobx-react-lite"
import { useStore } from "../../store"
import styled from "../../styled"
import { GlobalHotKeys } from "react-hotkeys"

const keyMap = {
  RUN_CODE: "command+enter",
}

const Editor = observer(
  ({ height, code, onChange, language, evalCode = () => {} }) => {
    const store = useStore()
    const handlers = {
      RUN_CODE: evalCode,
    }
    return (
      <EditorWrapper>
        <GlobalHotKeys allowChanges={true} keyMap={keyMap} handlers={handlers}>
          <AceEditor
            mode={
              language === "Reason"
                ? "rust"
                : language
                ? language.toLowerCase()
                : "typescript"
            }
            theme={store.dark ? "terminal" : "chrome"}
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
              highlightActiveLine: true,
              wrap: 80,
            }}
            keyboardHandler={store.vim ? "vim" : ""}
            fontSize={21}
            height={height}
            width="100%"
          />
        </GlobalHotKeys>
      </EditorWrapper>
    )
  },
)
const EditorWrapper = styled.div`
  height: 100%;
  outline: none;
  * {
    font-family: monospace;
  }
`

export default Editor
