import * as React from "react";
import "./index.less";
import { SettingsContext, useSettings } from "@/rice_text/context/SettingsContext";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { SharedHistoryContext } from "@/rice_text/context/SharedHistoryContext";
import { SharedAutocompleteContext } from "@/rice_text/context/SharedAutocompleteContext";
import Editor from "@/rice_text/Editor";
import InitTheme from "@/rice_text/themes/InitTheme";
import { TextNodes } from "@/rice_text/components/Node";
import { checkIsJSON } from "@/rice_text/utils/nodeUtils";

export default function RiceText({ readOnly, onChange, initValue }: {
  readOnly: boolean,
  onChange?: any,
  initValue?: string
}): JSX.Element {
  const {
    settings: { emptyEditor }
  } = useSettings();

  let editorState = undefined;


  if (initValue && initValue.length > 0) {
    if (checkIsJSON(initValue)) {
      editorState = initValue;
    }
  }

  const initialConfig = {
    editorState: editorState,
    namespace: "espressif" + Math.random(),
    nodes: [...TextNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: InitTheme,
    readOnly: readOnly || false
  };

  return (
    <SettingsContext>
      <LexicalComposer initialConfig={initialConfig}>
        <SharedHistoryContext>
          <SharedAutocompleteContext>
            <div className="editor-shell">
              <Editor onChange={onChange} initValue={initValue} />
            </div>
          </SharedAutocompleteContext>
        </SharedHistoryContext>
      </LexicalComposer>
    </SettingsContext>
  );
}
