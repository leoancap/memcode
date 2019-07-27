import brace from "brace"
import "brace/mode/typescript"
import "brace/mode/python"
import "brace/theme/monokai"
import "brace/theme/solarized_light"
import "brace/keybinding/vim"
import AceEditor from "react-ace"
import React from "react"
import { observer } from "mobx-react-lite"
import { useStore } from "../../store"
import styled from "../../styled"

const Editor = observer(({ height, code, onChange, language }) => {
  const store = useStore()
  return (
    <EditorWrapper>
      <AceEditor
        mode={language ? language.toLowerCase() : "typescript"}
        theme={store.dark ? "monokai" : "solarized_light"}
        onChange={onChange}
        value={code}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{
          $blockScrolling: true,
        }}
        setOptions={{
          fontFamily: "monospace",
          tabSize: 2,
        }}
        keyboardHandler={store.vim ? "vim" : ""}
        fontSize={21}
        height={height}
        width="100%"
      />
    </EditorWrapper>
  )
})

const EditorWrapper = styled.div`
  * {
    font-family: monospace;
  }
`

export default Editor
