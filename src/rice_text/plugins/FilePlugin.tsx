import {
  $createRangeSelection,
  $getSelection,
  $isNodeSelection,
  $isRangeSelection,
  $isRootNode,
  $setSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  createCommand,
  DRAGOVER_COMMAND,
  DRAGSTART_COMMAND,
  DROP_COMMAND,
  LexicalCommand,
  LexicalEditor
} from "lexical";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { useEffect } from "react";
import { $createFileNode, $isFileNode, FileNode, FilePayload } from "@/rice_text/components/FileNode";
import { ImageNode } from "@/rice_text/components/ImageNode";
import { canDrop, getDragSelection } from "@/rice_text/utils/drag-utils";

export type InsertFilePayload = Readonly<FilePayload>;

export const INSERT_FILE_COMMAND: LexicalCommand<InsertFilePayload> =
  createCommand();

export default function FilePlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("FilePlugin: FileNode not registered on editor");
    }

    return mergeRegister(
      editor.registerCommand<InsertFilePayload>(
        INSERT_FILE_COMMAND,
        (payload) => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            if ($isRootNode(selection.anchor.getNode())) {
              selection.insertParagraph();
            }
            const imageNode = $createFileNode(payload);
            selection.insertNodes([imageNode]);
          }
          return true;
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerCommand<DragEvent>(
        DRAGSTART_COMMAND,
        (event) => {
          return onDragStart(event);
        },
        COMMAND_PRIORITY_HIGH
      ),
      editor.registerCommand<DragEvent>(
        DRAGOVER_COMMAND,
        (event) => {
          return onDragover(event);
        },
        COMMAND_PRIORITY_HIGH
      ),
      editor.registerCommand<DragEvent>(
        DROP_COMMAND,
        (event) => {
          return onDrop(event, editor);
        },
        COMMAND_PRIORITY_HIGH
      )
    );
  }, [editor]);

  return null;
}

function onDragStart(event: DragEvent): boolean {
  const node = getFileNodeInSelection();
  if (!node) {
    return false;
  }
  const dataTransfer = event.dataTransfer;
  if (!dataTransfer) {
    return false;
  }
  dataTransfer.setData("text/plain", "_");
  // dataTransfer.setDragImage(img, 0, 0);
  dataTransfer.setData(
    "application/x-lexical-drag",
    JSON.stringify({
      data: {
        key: node.getKey(),
        src: node.__src,
        name: node.__name
      },
      type: "file"
    })
  );

  return true;
}

function onDragover(event: DragEvent): boolean {
  const node = getFileNodeInSelection();
  if (!node) {
    return false;
  }
  if (!canDrop(event, "code, span.editor-file")) {
    event.preventDefault();
  }
  return true;
}

function onDrop(event: DragEvent, editor: LexicalEditor): boolean {
  const node = getFileNodeInSelection();
  if (!node) {
    return false;
  }
  const data = getDragFileData(event);
  if (!data) {
    return false;
  }
  event.preventDefault();
  if (canDrop(event, "code, span.editor-file")) {
    const range = getDragSelection(event);
    node.remove();
    const rangeSelection = $createRangeSelection();
    if (range !== null && range !== undefined) {
      rangeSelection.applyDOMRange(range);
    }
    $setSelection(rangeSelection);
    editor.dispatchCommand(INSERT_FILE_COMMAND, data);
  }
  return true;
}

function getFileNodeInSelection(): FileNode | null {
  const selection = $getSelection();
  if (!$isNodeSelection(selection)) {
    return null;
  }
  const nodes = selection.getNodes();
  const node = nodes[0];
  // @ts-ignore
  return $isFileNode(node) ? node : null;
}

function getDragFileData(event: DragEvent): null | InsertFilePayload {
  const dragData = event.dataTransfer?.getData("application/x-lexical-drag");
  if (!dragData) {
    return null;
  }
  const { type, data } = JSON.parse(dragData);
  if (type !== "file") {
    return null;
  }
  return data;
}
