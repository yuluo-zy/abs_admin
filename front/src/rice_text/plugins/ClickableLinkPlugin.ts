import type { LinkNode } from "@lexical/link";
import { $isLinkNode } from "@lexical/link";
import type { LexicalEditor } from "lexical";
import { $getNearestNodeFromDOMNode, $getSelection, $isRangeSelection } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

type LinkFilter = (event: MouseEvent, linkNode: LinkNode) => boolean;

export default function ClickableLinkPlugin({
                                              filter,
                                              newTab = true
                                            }: {
  filter?: LinkFilter;
  newTab?: boolean;
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    function onClick(e: Event) {
      const event = e as MouseEvent;
      const linkDomNode = getLinkDomNode(event, editor);

      if (linkDomNode === null) {
        return;
      }

      const href = linkDomNode.getAttribute("href");

      if (
        linkDomNode.getAttribute("contenteditable") === "false" ||
        href === undefined
      ) {
        return;
      }

      // Allow user to select link text without follwing url
      const selection = editor.getEditorState().read($getSelection);
      if ($isRangeSelection(selection) && !selection.isCollapsed()) {
        return;
      }

      let linkNode = null;
      editor.update(() => {
        const maybeLinkNode = $getNearestNodeFromDOMNode(linkDomNode);

        if ($isLinkNode(maybeLinkNode)) {
          linkNode = maybeLinkNode;
        }
      });

      if (
        linkNode === null ||
        (filter !== undefined && !filter(event, linkNode))
      ) {
        return;
      }

      try {
        if (href !== null) {
          window.open(
            href,
            newTab || event.metaKey || event.ctrlKey ? "_blank" : "_self"
          );
        }
      } catch {
        // It didn't work, which is better than throwing an exception!
      }
    }

    return editor.registerRootListener(
      (
        rootElement: null | HTMLElement,
        prevRootElement: null | HTMLElement
      ) => {
        if (prevRootElement !== null) {
          prevRootElement.removeEventListener("click", onClick);
        }

        if (rootElement !== null) {
          rootElement.addEventListener("click", onClick);
        }
      }
    );
  }, [editor, filter, newTab]);
  return null;
}

function isLinkDomNode(domNode: Node): boolean {
  return domNode.nodeName.toLowerCase() === "a";
}

function getLinkDomNode(
  event: MouseEvent,
  editor: LexicalEditor
): HTMLAnchorElement | null {
  return editor.getEditorState().read(() => {
    const domNode = event.target as Node;

    if (isLinkDomNode(domNode)) {
      return domNode as HTMLAnchorElement;
    }

    if (domNode.parentNode && isLinkDomNode(domNode.parentNode)) {
      return domNode.parentNode as HTMLAnchorElement;
    }

    return null;
  });
}
