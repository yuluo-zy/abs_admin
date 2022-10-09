import { ElementNode, RangeSelection, TextNode } from "lexical";
import { $isAtNodeEnd } from "@lexical/selection";

export function getSelectedNode(selection: RangeSelection): TextNode | ElementNode {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  // 如果存在 空格 返回空格外的节点内容
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}


export function positionEditorElement(
  editor: HTMLElement,
  rect: ClientRect | null,
  rootElement: HTMLElement
): void {
  if (rect === null) {
    editor.style.opacity = "0";
    editor.style.top = "-1000px";
    editor.style.left = "-1000px";
  } else {
    editor.style.opacity = "1";
    editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
    const left = rect.left - editor.offsetWidth / 2 + rect.width / 2;
    const rootElementRect = rootElement.getBoundingClientRect();
    if (rootElementRect.left > left) {
      editor.style.left = `${rect.left + window.pageXOffset}px`;
    } else if (left + editor.offsetWidth > rootElementRect.right) {
      editor.style.left = `${
        rect.right + window.pageXOffset - editor.offsetWidth
      }px`;
    }
  }
}

export const getSelection = (): Selection | null => window.getSelection();

export const checkIsJSON = (str): boolean => {
  if (typeof str == "string") {
    try {
      const obj = JSON.parse(str);
      return !!(typeof obj == "object" && obj);
    } catch (e) {
      return false;
    }
  }
  return false;
};
