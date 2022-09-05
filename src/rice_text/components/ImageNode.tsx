import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  GridSelection,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  NodeSelection,
  RangeSelection,
  SerializedLexicalNode,
  Spread
} from "lexical";
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  DecoratorNode,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND
} from "lexical";

import "./styles/ImageNode.less";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { mergeRegister } from "@lexical/utils";
import * as React from "react";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { getFile } from "@/api/file";
import ImageResizer from "./ui/ImageResizer";
import { Image, Message } from "@arco-design/web-react";
import { useFunctions } from "@/rice_text/context/SettingsContext";

export interface ImagePayload {
  altText: string;
  caption?: LexicalEditor;
  height?: number;
  key?: NodeKey;
  maxWidth?: number;
  showCaption?: boolean;
  src: string,
  fileId?: string;
  width?: number;
}

const imageCache = new Map();

function useSuspenseImage(fileId: string, download): File {
  if (!imageCache.has(fileId)) {
    throw download(fileId).then(res => {
      if (res.status === 200) {
        imageCache.set(fileId, res.data);
      }
    }).finally(() => {
      return {};
    });
  }
  return imageCache.get(fileId);
}

function convertImageElement(domNode: Node): null | DOMConversionOutput {
  // html -> node
  if (domNode instanceof HTMLImageElement) {
    const { alt: altText, src } = domNode;
    const node = $createImageNode({ altText, src });
    return { node };
  }
  return null;
}

function LazyImage({
                     altText,
                     className,
                     imageRef,
                     src,
                     width,
                     height,
                     maxWidth,
                     fileId,
                     customRequest,
                     read_only
                   }: {
  altText: string;
  className: string | null;
  height: "inherit" | number;
  imageRef: { current: null | HTMLImageElement };
  maxWidth: number;
  src: string;
  width: "inherit" | number;
  fileId: string;
  customRequest: any;
  read_only: boolean;
}): JSX.Element {
  const file = useSuspenseImage(fileId, customRequest || getFile);
  if (read_only) {
    return (
      <Image
        className={className || undefined}
        src={URL.createObjectURL(file)}
        alt={altText}
        ref={imageRef}
        style={{
          height,
          maxWidth,
          width
        }}
        draggable="false"
      />
    );
  }
  return (
    <img
      className={className || undefined}
      src={URL.createObjectURL(file)}
      alt={altText}
      ref={imageRef}
      style={{
        height,
        maxWidth,
        width
      }}
      draggable="false"
    />
  );
}

function ImageComponent({
                          fileId,
                          src,
                          altText,
                          nodeKey,
                          width,
                          height,
                          maxWidth,
                          resizable
                        }: {
  altText: string;
  fileId: string;
  height: "inherit" | number;
  maxWidth: number;
  nodeKey: NodeKey;
  resizable: boolean;
  src: string;
  width: "inherit" | number;
}): JSX.Element {
  const ref = useRef(null);
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [editor] = useLexicalComposerContext();
  const [selection, setSelection] = useState<RangeSelection | NodeSelection | GridSelection | null>(null);

  const onDelete = useCallback(
    (payload: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        const event: KeyboardEvent = payload;
        event.preventDefault();
        const node = $getNodeByKey(nodeKey);
        if ($isImageNode(node)) {
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

          if (isResizing) {
            return true;
          }
          if (event.target === ref.current) {
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
    isResizing,
    isSelected,
    nodeKey,
    onDelete,
    setSelected
  ]);


  const onResizeEnd = (
    nextWidth: "inherit" | number,
    nextHeight: "inherit" | number
  ) => {
    // Delay hiding the resize bars for click case
    setTimeout(() => {
      setIsResizing(false);
    }, 200);

    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isImageNode(node)) {
        node.setWidthAndHeight(nextWidth, nextHeight);
      }
    });
  };

  const onResizeStart = () => {
    setIsResizing(true);
  };

  const {
    functions: {
      imgDownload
    }
  } = useFunctions();

  const draggable = isSelected && $isNodeSelection(selection);
  const isFocused = $isNodeSelection(selection) && (isSelected || isResizing);

  return (
    <Suspense fallback={null}>
      <>
        <div draggable={draggable}>
          <LazyImage
            className={isFocused ? "focused" : null}
            src={src}
            altText={altText}
            imageRef={ref}
            width={width}
            height={height}
            maxWidth={maxWidth}
            read_only={editor.isReadOnly()}
            customRequest={imgDownload}
            fileId={fileId} />
        </div>
        {resizable && isFocused && (
          <ImageResizer
            editor={editor}
            imageRef={ref}
            maxWidth={maxWidth}
            onResizeStart={onResizeStart}
            onResizeEnd={onResizeEnd}
          />
        )}
      </>
    </Suspense>
  );
}

export type SerializedImageNode = Spread<{
  altText: string;
  height?: number;
  maxWidth: number;
  src: string;
  fileId: string;
  width?: number;
  type: "image";
  version: 1;
},
  SerializedLexicalNode>;

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __fileId: string;
  __width: "inherit" | number;
  __height: "inherit" | number;
  __maxWidth: number;

  constructor(
    src: string,
    altText: string,
    fileId: string,
    maxWidth: number,
    width?: "inherit" | number,
    height?: "inherit" | number,
    key?: NodeKey
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__maxWidth = maxWidth;
    this.__width = width || "inherit";
    this.__height = height || "inherit";
    this.__fileId = fileId;
  }

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__fileId,
      node.__maxWidth,
      node.__width,
      node.__height,
      node.__key
    );
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { altText, height, width, maxWidth, src, fileId } =
      serializedNode;
    const node = $createImageNode({
      altText,
      height,
      maxWidth,
      src,
      width,
      fileId
    });
    return node;
  }

  static importDOM(): DOMConversionMap | null {
    // HTML -> Lexical
    return {
      img: (node: Node) => ({
        conversion: convertImageElement,
        priority: 0
      })
    };
  }

  exportDOM(): DOMExportOutput {
    // todo 修改
    // 主要是针对 html -> dom的转换指定 , 暂不考虑
    const element = document.createElement("img");
    element.setAttribute("src", this.__src);
    element.setAttribute("alt", this.__altText);
    return { element };
  }

  exportJSON(): SerializedImageNode {
    return {
      altText: this.getAltText(),
      fileId: this.__fileId,
      height: this.__height === "inherit" ? 0 : this.__height,
      maxWidth: this.__maxWidth,
      src: this.getSrc(),
      type: "image",
      version: 1,
      width: this.__width === "inherit" ? 0 : this.__width
    };
  }

  setWidthAndHeight(
    width: "inherit" | number,
    height: "inherit" | number
  ): void {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }

  // View

  createDOM(config: EditorConfig): HTMLElement {
    // 创建挂载位置
    const span = document.createElement("span");
    const theme = config.theme;
    const className = theme.image;
    if (className !== undefined) {
      span.className = className;
    } else {
      span.className = "editor-image";
    }
    return span;
  }

  updateDOM(): false {
    return false;
  }

  getSrc(): string {
    return this.__src;
  }

  getAltText(): string {
    return this.__altText;
  }

  decorate(): JSX.Element {
    return (
      <ImageComponent
        src={this.__src}
        fileId={this.__fileId}
        altText={this.__altText}
        width={this.__width}
        height={this.__height}
        maxWidth={this.__maxWidth}
        nodeKey={this.getKey()}
        resizable={true}
      />
    );
  }
}

export function $createImageNode({
                                   altText,
                                   height,
                                   fileId,
                                   maxWidth = 500,
                                   src,
                                   width,
                                   key
                                 }: ImagePayload): ImageNode {
  try {
    return new ImageNode(
      src,
      altText,
      fileId,
      maxWidth,
      width,
      height,
      key
    );
  } catch (error) {
    Message.error("add failed");
  }

}

export function $isImageNode(
  node: LexicalNode | null | undefined
): node is ImageNode {
  return node instanceof ImageNode;
}
