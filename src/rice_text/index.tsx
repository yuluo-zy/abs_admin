import * as React from "react";
import "./index.less";
import { SettingsContext, useSettings } from "@/rice_text/context/SettingsContext";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { SharedHistoryContext } from "@/rice_text/context/SharedHistoryContext";
import { SharedAutocompleteContext } from "@/rice_text/context/SharedAutocompleteContext";
import Editor from "@/rice_text/Editor";
import InitTheme from "@/rice_text/themes/InitTheme";
import { TextNodes } from "@/rice_text/components/Node";

export default function RiceText({readOnly, onChange}: {
  readOnly : boolean,
  onChange: any
}): JSX.Element {
  const {
    settings: { emptyEditor }
  } = useSettings();

  const initialConfig = {
    editorState: undefined,
    namespace: "espressif" +  Math.random(),
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
              <Editor onChange={onChange} />
            </div>
          </SharedAutocompleteContext>
        </SharedHistoryContext>
      </LexicalComposer>
    </SettingsContext>
  );
}
