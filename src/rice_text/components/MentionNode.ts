import type { Spread } from "lexical";
import { EditorConfig, LexicalNode, NodeKey, SerializedTextNode, TextNode } from "lexical";

export type SerializedMentionNode = Spread<{
  mentionName: string;
  userId: string;
  type: "mention";
  version: 1;
},
  SerializedTextNode>;


export interface MentionPayload {
  mentionName: string;
  userId: string;
  key?: NodeKey;
}

export class MentionNode extends TextNode {
  __mention: string;
  __userId: string;

  constructor(mentionName: string, userId: string, text?: string, key?: NodeKey) {
    super(text ?? mentionName, key);
    this.__mention = mentionName;
    this.__userId = userId;
  }

  static getType(): string {
    return "mention";
  }

  static clone(node: MentionNode): MentionNode {
    return new MentionNode(node.__mention, node.__userId, node.__text, node.__key);
  }

  static importJSON(serializedNode: SerializedMentionNode): MentionNode {
    const node = $createMentionNode({ ...serializedNode });
    node.setTextContent(serializedNode.text);
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }

  exportJSON(): SerializedMentionNode {
    return {
      ...super.exportJSON(),
      mentionName: this.__mention,
      userId: this.__userId,
      type: "mention",
      version: 1
    };
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config);
    dom.className = "mention";
    return dom;
  }

  isTextEntity(): true {
    return true;
  }
}

export function $createMentionNode({ mentionName, userId }: MentionPayload): MentionNode {
  const mentionNode = new MentionNode(mentionName, userId);
  mentionNode.setMode("segmented").toggleDirectionless();
  return mentionNode;
}

export function $isMentionNode(
  node: LexicalNode | null | undefined
): node is MentionNode {
  return node instanceof MentionNode;
}
