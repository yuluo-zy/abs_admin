import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { AutoScrollPlugin } from "@lexical/react/LexicalAutoScrollPlugin";
import { CharacterLimitPlugin } from "@lexical/react/LexicalCharacterLimitPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { useSharedHistoryContext } from "@/rice_text/context/SharedHistoryContext";
import { useSettings } from "@/rice_text/context/SettingsContext";
import Placeholder from "@/rice_text/components/ui/Placeholder";
import ToolbarPlugin from "@/rice_text/plugins/ToolbarPlugin";
import { MaxLengthPlugin } from "@/rice_text/plugins/MaxLengthPlugin";
import EspAutoLinkPlugin from "@/rice_text/plugins/AutoLinkPlugin";
import EspContentEditable from "@/rice_text/components/ui/ContentEditable";
import CodeActionMenuPlugin from "@/rice_text/plugins/CodeActionMenuPlugin";
import CodeHighlightPlugin from "@/rice_text/plugins/CodeHighlightPlugin";
import ListMaxIndentLevelPlugin from "@/rice_text/plugins/ListMaxIndentLevelPlugin";
import TableCellActionMenuPlugin from "@/rice_text/plugins/TableActionMenuPlugin";
import TableCellResizer from "@/rice_text/plugins/TableCellResizer";
import ClickableLinkPlugin from "@/rice_text/plugins/ClickableLinkPlugin";
import HorizontalRulePlugin from "@/rice_text/plugins/HorizontalRulePlugin";
import TextFormatFloatingToolbarPlugin from "./plugins/TextFormatFloatingToolbarPlugin";
import TabFocusPlugin from "./plugins/TabFocusPlugin";
import ActionsPlugin from "@/rice_text/plugins/ActionsPlugin";
import KeywordsPlugin from "./plugins/KeywordsPlugin";
import "./index.less";
import ImagesPlugin from "./plugins/ImagesPlugin";
import FilePlugin from "@/rice_text/plugins/FilePlugin";
import MentionsPlugin from "./plugins/MentionsPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { CLEAR_HISTORY_COMMAND } from "lexical";

export default function Editor({onChange, initValue }: {
  initValue?: string
  onChange: any
}): JSX.Element {
  const { historyState } = useSharedHistoryContext();
  const {
    settings: {
      isMaxLength,
      isCharLimit,
      isCharLimitUtf8,
      isRichText
    }
  } = useSettings();
  const text = isRichText
    ? "Enter some rich text..."
    : "Enter some plain text...";
  const placeholder = <Placeholder>{text}</Placeholder>;
  const scrollRef = useRef(null);
  const [editor] = useLexicalComposerContext();
  const [readOnly, setReadOnly] = useState(true)

  useEffect(() => {
    setReadOnly(editor.isReadOnly())
    editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
  }, [editor])

  return (
    <>
      {/*设置 工具栏*/}
      {isRichText && ! readOnly && <ToolbarPlugin />}
      <div
        className={`editor-container ${
          readOnly ? "read-only" : ""
        }`}
        ref={scrollRef}>
        {isMaxLength && <MaxLengthPlugin maxLength={300} />}
        <AutoFocusPlugin />
        <ClearEditorPlugin />
        <MentionsPlugin />
        <HashtagPlugin />
        <KeywordsPlugin />
        <EspAutoLinkPlugin />
        {
          onChange && !readOnly &&<OnChangePlugin onChange={onChange}/>
        }
        <AutoScrollPlugin scrollRef={scrollRef} />
        {isRichText && <>
          <HistoryPlugin externalHistoryState={historyState} />
          <RichTextPlugin
            contentEditable={<EspContentEditable />}
            placeholder={placeholder}
            initialEditorState={undefined}
          />
          <CodeActionMenuPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <TablePlugin />
          <TableCellActionMenuPlugin />
          <TableCellResizer />
          <ImagesPlugin />
          <LinkPlugin />
          <FilePlugin />
          <ClickableLinkPlugin />
          <HorizontalRulePlugin />
          <TextFormatFloatingToolbarPlugin />
          <TabFocusPlugin />
        </>}
        {(isCharLimit || isCharLimitUtf8) && (
          <CharacterLimitPlugin charset={isCharLimit ? "UTF-16" : "UTF-8"} />
        )}
        {isRichText && !readOnly && <ActionsPlugin />}
      </div>
    </>
  );
}
