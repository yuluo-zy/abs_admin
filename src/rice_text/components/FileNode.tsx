import { Button, Tag, Trigger } from "@arco-design/web-react";
import { IconArchive, IconDownload } from "@arco-design/web-react/icon";
import type { EditorConfig, LexicalNode, Spread } from "lexical";
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  DecoratorNode,
  GridSelection,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  NodeKey,
  NodeSelection,
  RangeSelection,
  SerializedLexicalNode
} from "lexical";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import "./styles/FileNode.less";
import { getFile } from "@/api/file";
import { useFunctions } from "@/rice_text/context/SettingsContext";

export interface FilePayload {
  name: string;
  src: string;
  key?: NodeKey;
}

export type SerializedFileNode = Spread<{
  name: string;
  src: string;
  type: "fileNode";
  version: 1;
},
  SerializedLexicalNode>;

function DownLoad({ src, fileDownload, closeTag }: { src: string, fileDownload: any, closeTag: any }): JSX.Element {
  const [loading, setLoading] = useState(false);
  const downFile = (event) => {
    event.stopPropagation();
    if (src) {
      setLoading(true);
      fileDownload(src).then(res => {
          if (res.status === 200) {
            const url = URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            let name = res.headers["content-disposition"]?.match(/fileName=(.*)/)[1]; // 获取filename的值
            name = decodeURIComponent(name);
            link.setAttribute("download", name);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
      ).finally(() => {
        setLoading(false);
        closeTag(value => !value);
      });
    }
  };
  return <Button type="primary" icon={<IconDownload />} onClick={downFile} loading={loading}>
    Download
  </Button>;
}

function FileComponent({ src, name, nodeKey }: {
  src: string,
  name: string
  nodeKey?: NodeKey
}): JSX.Element {
  const ref = useRef(null);
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);
  const [editor] = useLexicalComposerContext();
  const [selection, setSelection] = useState<RangeSelection | NodeSelection | GridSelection | null>(null);
  const draggable = isSelected && $isNodeSelection(selection);
  const isFocused = $isNodeSelection(selection) && isSelected;


  const onDelete = useCallback(
    (payload: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        payload.preventDefault();
        const node = $getNodeByKey(nodeKey);
        if ($isFileNode(node)) {
          node.remove();
        }
        setSelected(false);
      }
      return false;
    },
    [isSelected, nodeKey, setSelected]
  );

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        setSelection(editorState.read(() => $getSelection()));
      }),
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        (payload) => {
          const event = payload;

          if (ref.current.contains(event.target)) {
            if (!event.shiftKey) {
              clearSelection();
            }
            setSelected(!isSelected);
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      )
    );
  }, [
    clearSelection,
    editor,
    isSelected,
    nodeKey,
    onDelete,
    setSelected
  ]);
  const {
    functions: {
      fileDownload
    }
  } = useFunctions();

  const [visible, setVisible] = useState(false);
  return <div draggable={draggable} className={"FileNode_tag"} ref={ref}>
    <Trigger
      popup={() => <DownLoad src={src} fileDownload={fileDownload || getFile} closeTag={setVisible} />}
      autoFitPosition
      popupVisible={visible}
      onVisibleChange={(visible) => {
        setVisible(visible);
      }}
      clickToClose
      mouseLeaveToClose
      unmountOnExit
      blurToHide
      alignPoint
      position="bl"
      popupAlign={{
        bottom: 8,
        left: 8
      }}
      trigger={"contextMenu"}
    >
      <Tag color="arcoblue" icon={<IconArchive />} bordered={isFocused}>
        <p>{name}</p>
      </Tag>
    </Trigger>
  </div>;
}

export class FileNode extends DecoratorNode<JSX.Element> {

  __src: string;
  __name: string;

  constructor(
    src: string,
    name: string,
    key?: NodeKey
  ) {
    super(key);
    this.__src = src;
    this.__name = name;
  }

  static getType(): string {
    return "fileNode";
  }

  static clone(node: FileNode): FileNode {
    return new FileNode(node.__src, node.__name, node.__key);
  }

  static importJSON(serializedNode: SerializedFileNode): FileNode {
    return $createFileNode({ src: serializedNode.src, name: serializedNode.name });
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement("span");
    span.className = "editor-file";
    return span;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): JSX.Element {
    return (
      <FileComponent nodeKey={this.getKey()} name={this.__name} src={this.__src} />
    );
  }

  getSrc(): string {
    return this.__src;
  }

  getName(): string {
    return this.__name;
  }

  setNameAndSrc(
    src: string,
    name: string
  ): void {
    const writable = this.getWritable();
    writable.__name = name;
    writable.__src = src;
  }

  exportJSON(): SerializedFileNode {
    return {
      // ...super.exportJSON(),
      src: this.__src,
      name: this.__name,
      type: "fileNode",
      version: 1
    };
  }


}

export function $createFileNode({
                                  src, name, key
                                }: FilePayload): FileNode {
  return new FileNode(src, name, key);
}

export function $isFileNode(
  node: LexicalNode | null | undefined | undefined
): boolean {
  return node instanceof FileNode;
}
