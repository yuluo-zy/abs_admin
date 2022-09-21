import { INSERT_IMAGE_COMMAND } from "./ImagesPlugin";
import {
  $createParagraphNode,
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  LexicalEditor,
  NodeKey,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND
} from "lexical";

import { $createCodeNode, $isCodeNode } from "@lexical/code";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isDecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode";
import { $createHeadingNode, $createQuoteNode, $isHeadingNode, HeadingTagType } from "@lexical/rich-text";
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
  $selectAll,
  $wrapLeafNodesInElements
} from "@lexical/selection";
import "./styles/ToolbarPlugin.less";
import { $getNearestBlockElementAncestorOrThrow, $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Divider,
  Dropdown,
  InputNumber,
  Menu,
  Modal,
  Notification,
  Select,
  Space,
  Tooltip
} from "@arco-design/web-react";
import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
  IconBold,
  IconCaretDown,
  IconCaretUp,
  IconCode,
  IconDelete,
  IconDown,
  IconExport,
  IconFileImage,
  IconFontColors,
  IconH1,
  IconH2,
  IconH3,
  IconHighlight,
  IconImport,
  IconItalic,
  IconLink,
  IconMore,
  IconNav,
  IconObliqueLine,
  IconOrderedList,
  IconPlusCircle,
  IconQuote,
  IconRedo,
  IconSelectAll,
  IconStrikethrough,
  IconUnderline,
  IconUndo,
  IconUnorderedList
} from "@arco-design/web-react/icon";
import { createPortal } from "react-dom";
import { getSelectedNode } from "@/rice_text/utils/nodeUtils";
import { FloatingLinkEditor } from "@/rice_text/components/ui/FloatingLinkEditor";
import ColorPicker from "@/rice_text/components/ui/ColorPicker";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import { DynamicImgUpload } from "@/components/Dynamic/Upload/img-upload";
import { UploadItem } from "@arco-design/web-react/es/Upload";
import { INSERT_TABLE_COMMAND } from "@lexical/table";
import { useFunctions } from "@/rice_text/context/SettingsContext";

const blockTypeToBlockName = {
  bullet: "Bulleted List",
  check: "Check List",
  code: "Code Block",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  number: "Numbered List",
  paragraph: "Normal",
  quote: "Quote"
};

const CODE_LANGUAGE_OPTIONS: [string, string][] = [
  ["", "- Select language -"],
  ["c", "C"],
  ["clike", "C-like"],
  ["css", "CSS"],
  ["html", "HTML"],
  ["js", "JavaScript"],
  ["markdown", "Markdown"],
  ["objc", "Objective-C"],
  ["plain", "Plain Text"],
  ["py", "Python"],
  ["rust", "Rust"],
  ["sql", "SQL"],
  ["swift", "Swift"],
  ["xml", "XML"]
];


const CODE_LANGUAGE_MAP = {
  javascript: "js",
  md: "markdown",
  plaintext: "plain",
  python: "py",
  text: "plain"
};

function BlockFormatDropDown({
                               editor,
                               blockType
                             }: {
  blockType: keyof typeof blockTypeToBlockName;
  editor: LexicalEditor;
}): JSX.Element {
  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createParagraphNode());
        }
      });
    }
  };

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () =>
            $createHeadingNode(headingSize)
          );
        }
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatCheckList = () => {
    if (blockType !== "check") {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createQuoteNode());
        }
      });
    }
  };

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          if (selection.isCollapsed()) {
            $wrapLeafNodesInElements(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            selection.insertRawText(textContent);
          }
        }
      });
    }
  };

  const dropList = (
    <Menu className={"menu-round"}>
      <Menu.Item key="1" onClick={() => formatHeading("h1")}><IconH1 /> Heading 1</Menu.Item>
      <Menu.Item key="2" onClick={() => formatHeading("h2")}><IconH2 /> Heading 2</Menu.Item>
      <Menu.Item key="3" onClick={() => formatHeading("h3")}><IconH3 /> Heading 3</Menu.Item>
      <Menu.Item key="4" onClick={formatBulletList}><IconUnorderedList /> Bullet List</Menu.Item>
      <Menu.Item key="5" onClick={formatNumberedList}><IconOrderedList /> Numbered List</Menu.Item>
      <Menu.Item key="6" onClick={formatCheckList}><IconSelectAll /> Check List</Menu.Item>
      <Menu.Item key="7" onClick={formatQuote}><IconQuote /> Quote</Menu.Item>
      <Menu.Item key="8" onClick={formatCode}><IconCode /> Code Block</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown.Button type="secondary" style={{ minWidth: 142 }} droplist={dropList} onClick={formatParagraph}
                     icon={<IconDown />}>
      <IconAlignCenter /> Normal
    </Dropdown.Button>
  );
}

export default function ToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>("paragraph");
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(
    null
  );
  const {
    functions: {
      imgUpload
    }
  } = useFunctions();
  const [fontSize, setFontSize] = useState<string>("15px");
  const [fontColor, setFontColor] = useState<string>("#000");
  const [bgColor, setBgColor] = useState<string>("#fff");
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState<string>("");
  const [rows, setRows] = useState(5);
  const [columns, setColumns] = useState(5);


  const [imgSrc, setImgSrc] = useState();

  const updateToolbar = useCallback(() => {
    // 根据 选中的内容来更新 工具栏的显示
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // 获取 顶级元素
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      // Update text format 传递函数
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsSubscript(selection.hasFormat("subscript"));
      setIsSuperscript(selection.hasFormat("superscript"));
      setIsCode(selection.hasFormat("code"));
      setIsRTL($isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          );
          const type = parentList ? parentList.getListType() : element.getListType();
          // 设置块类型
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element) ? element.getTag() : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName);
          }
          if ($isCodeNode(element)) {
            const language =
              element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
            setCodeLanguage(
              language ? CODE_LANGUAGE_MAP[language] || language : ""
            );
            return;
          }
        }
      }
      // Handle buttons
      setFontSize(
        $getSelectionStyleValueForProperty(selection, "font-size", "15px")
      );
      setFontColor(
        $getSelectionStyleValueForProperty(selection, "color", "#000")
      );
      setBgColor(
        $getSelectionStyleValueForProperty(
          selection,
          "background-color",
          "#fff"
        )
      );
    }
  }, [activeEditor]);

  useEffect(() => {
    // 设置 监听器 来动态更新 工具栏 然后导致 活动editor 进行更新
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, updateToolbar]);

  useEffect(() => {
    // func.forEach((f) => f());
    // 每一个执行
    return mergeRegister(
      // 当 Lexical 向 DOM 提交更新时收到通知。
      activeEditor.registerUpdateListener(({ editorState }) => {
        // 最新更新的编辑器状态
        editorState.read(() => {
          updateToolbar();
        });
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [activeEditor, updateToolbar]);

  const applyStyleText = useCallback(
    // 更新样式函数
    (styles: Record<string, string>) => {
      activeEditor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, styles);
        }
      });
    },
    [activeEditor]
  );

  const clearFormatting = useCallback(() => {
    activeEditor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $selectAll(selection);
        selection.getNodes().forEach((node) => {
          if ($isTextNode(node)) {
            node.setFormat(0);
            node.setStyle("");
            $getNearestBlockElementAncestorOrThrow(node).setFormat("");
          }
          if ($isDecoratorBlockNode(node)) {
            node.setFormat("");
          }
        });
      }
    });
  }, [activeEditor]);

  const onFontSizeSelect = useCallback(
    (e) => {
      applyStyleText({ "font-size": e });
    },
    [applyStyleText]
  );

  const onFontColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ color: value });
    },
    [applyStyleText]
  );

  const onBgColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ "background-color": value });
    },
    [applyStyleText]
  );


  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const onCodeLanguageSelect = useCallback(
    (value: string) => {
      activeEditor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(value);
          }
        }
      });
    },
    [activeEditor, selectedElementKey]
  );


  const [imgModal, setImgModal] = useState(false);
  const [tableModal, setTableModal] = useState(false);
  return (<>
      <div className="toolbar">
        <Tooltip color={"#165DFF"} content="Undo (⌘Z) / (Ctrl+Z)">
          <Button
            icon={<IconUndo />}
            disabled={!canUndo}
            onClick={() => {
              activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
            }}
            aria-label="Undo" />
        </Tooltip>
        <Tooltip color={"#165DFF"} content="Redo (⌘Y) / (Ctrl+Y)">
          <Button
            disabled={!canRedo}
            icon={<IconRedo />}
            onClick={() => {
              activeEditor.dispatchCommand(REDO_COMMAND, undefined);
            }}
            aria-label="Redo" />
        </Tooltip>
        <Divider type="vertical" />
        {blockType in blockTypeToBlockName && activeEditor === editor && (
          <>
            <BlockFormatDropDown blockType={blockType} editor={editor} />
            <Divider type="vertical" />
          </>
        )}

        {blockType === "code" ? (
          <>
            <Select
              placeholder="Please select language"
              onChange={onCodeLanguageSelect}
              style={{ width: "150px" }}
            >
              {CODE_LANGUAGE_OPTIONS.map(([option, text], index) => (
                <Select.Option key={index} value={option}>
                  {text}
                </Select.Option>
              ))}
            </Select>
          </>
        ) : (
          <>
            <Select
              onChange={onFontSizeSelect}
              placeholder="Size"
              style={{ width: "80px" }}
            >
              {
                [
                  "10px",
                  "11px",
                  "12px",
                  "13px",
                  "14px",
                  "15px",
                  "16px",
                  "17px",
                  "18px",
                  "19px",
                  "20px"
                ].map((option, index) => (
                  <Select.Option key={index} value={option}>
                    {option}
                  </Select.Option>
                ))
              }
            </Select>
            <Divider type="vertical" />
            <Tooltip color={"#165DFF"} content="Bold (⌘B) / (Ctrl+B)">
              <Button
                icon={<IconBold />}
                onClick={() => {
                  activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
                }}>
              </Button>
            </Tooltip>
            <Tooltip color={"#165DFF"} content="Italic (⌘I) / (Ctrl+I)">
              <Button
                onClick={() => {
                  activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
                }}
                icon={<IconItalic />}
              >
              </Button>
            </Tooltip>
            <Tooltip color={"#165DFF"} content="Underline (⌘U) / (Ctrl+U)">
              <Button
                onClick={() => {
                  activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
                }}
                icon={<IconUnderline />}
              >
              </Button>
            </Tooltip>
            <Tooltip color={"#165DFF"} content="Insert code block">
              <Button
                onClick={() => {
                  activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
                }}
                icon={<IconCode />}
              >
              </Button>
            </Tooltip>
            <Tooltip color={"#165DFF"} content="Insert link">
              <Button
                onClick={insertLink}
                icon={<IconLink />}
                aria-label="Insert link"
              >
              </Button>
            </Tooltip>
            {isLink &&
              createPortal(
                <FloatingLinkEditor editor={activeEditor} />,
                document.body
              )}
            <Tooltip color={"#165DFF"} content="text color">
              <ColorPicker
                color={fontColor}
                onChange={onFontColorSelect}>
                <IconFontColors />
              </ColorPicker>
            </Tooltip>
            <Tooltip color={"#165DFF"} content="bg color">
              <ColorPicker
                color={bgColor}
                onChange={onBgColorSelect}>
                <IconHighlight />
              </ColorPicker>
            </Tooltip>

            <Tooltip color={"#165DFF"} content="more">
              <Dropdown unmountOnExit trigger={"click"} position={"bottom"} droplist={
                <Menu className={"menu-round"}>
                  <Menu.Item key="1"
                             onClick={() => activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")}><IconStrikethrough /> Strikethrough</Menu.Item>
                  <Menu.Item key="2"
                             onClick={() => activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")}><IconCaretDown /> Subscript</Menu.Item>
                  <Menu.Item key="3"
                             onClick={() => activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")}><IconCaretUp /> Superscript</Menu.Item>
                  <Menu.Item key="4" onClick={clearFormatting}><IconDelete /> Clear Formatting</Menu.Item>
                </Menu>
              }>
                <Button type="secondary"><IconMore /></Button>
              </Dropdown>
            </Tooltip>

            <Divider type="vertical" />
            <Dropdown unmountOnExit position={"bottom"} droplist={
              <Menu className={"menu-round"}>
                <Menu.Item key="1"
                           onClick={() => activeEditor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)}><IconObliqueLine /> Horizontal
                  Rule</Menu.Item>
                <Menu.Item key="2"
                           onClick={() => setImgModal(true)}><IconFileImage /> Image</Menu.Item>
                <Menu.Item key="3"
                           onClick={() => setTableModal(true)}><IconNav /> Table</Menu.Item>
              </Menu>}>
              <Button type="secondary"><IconPlusCircle />insert <IconDown /></Button>
            </Dropdown>


            {/*//     <DropDownItem*/}
            {/*//       onClick={() => {*/}
            {/*//         showModal('Insert Table', (onClose) => (*/}
            {/*//           <InsertTableDialog*/}
            {/*//             activeEditor={activeEditor}*/}
            {/*//             onClose={onClose}*/}
            {/*//           />*/}
            {/*//         ));*/}
            {/*//       }}*/}
            {/*//       className="item">*/}
            {/*//       <i className="icon table" />*/}
            {/*//       <span className="text">Table</span>*/}
            {/*//     </DropDownItem>*/}

            {/*//     <DropDownItem*/}
            {/*//       onClick={() => {*/}
            {/*//         editor.update(() => {*/}
            {/*//           const root = $getRoot();*/}
            {/*//           const stickyNode = $createStickyNode(0, 0);*/}
            {/*//           root.append(stickyNode);*/}
            {/*//         });*/}
            {/*//       }}*/}
            {/*//       className="item">*/}
            {/*//       <i className="icon sticky" />*/}
            {/*//       <span className="text">Sticky Note</span>*/}
            {/*//     </DropDownItem>*/}
            {/*//   </DropDown>*/}
          </>
        )}
        <Divider type="vertical" />
        <Dropdown
          droplist={
            <Menu>
              <Menu.Item key="1" onClick={() => {
                activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
              }}><IconAlignLeft /> Left Align</Menu.Item>
              <Menu.Item key="2" onClick={() => {
                activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
              }}><IconAlignCenter /> Center Align</Menu.Item>
              <Menu.Item key="3" onClick={() => {
                activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
              }}><IconAlignRight /> Right Align</Menu.Item>
              <Menu.Item key="4" onClick={() => {
                activeEditor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
              }}><IconImport /> Outdent</Menu.Item>
              <Menu.Item key="5" onClick={() => {
                activeEditor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
              }}><IconExport /> Indent</Menu.Item>
            </Menu>
          }
        >
          <Button type="secondary"><IconAlignLeft /> Align</Button>
        </Dropdown>

      </div>
      <Modal
        visible={imgModal}
        title="Add Img"
        unmountOnExit={true}
        className={"ToolbarPlugin_image_model"}
        onOk={() => {
          activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, { fileId: imgSrc });
          setImgModal(false);
        }}
        onCancel={() => setImgModal(false)}
      >
        <DynamicImgUpload
          customRequest={imgUpload}
          onChange={(fileList: UploadItem[], file: UploadItem) => {
            let res = null;
            if (fileList.length > 0) {
              res = file.response;
            }
            if (res !== null || res > 0) {
              setImgSrc(res?.id || res);
            }
          }} limit={1} />
      </Modal>

      <Modal
        visible={tableModal}
        title="Add Table"
        unmountOnExit={true}
        onOk={() => {
          if (rows > 0 && columns > 0) {
            activeEditor.dispatchCommand(INSERT_TABLE_COMMAND, { columns, rows });
            setTableModal(false);
          } else {
            Notification.error({
              title: "Error",
              content: "Please enter a legal value!"
            });
          }
        }}
        onCancel={() => setTableModal(false)}
      >
        <Space>
          <p style={{ width: "10rem" }}>No of rows</p>
          <InputNumber style={{ margin: "1rem", width: "12rem" }} min={1} max={10} placeholder={"No of rows"}
                       value={rows}
                       onChange={(value) => {
                         setRows(value);
                       }} />
        </Space>
        <Space>
          <p style={{ width: "10rem" }}>No of columns</p>
          <InputNumber style={{ margin: "1rem", width: "12rem" }} min={1} max={10} placeholder={"No of columns"}
                       value={columns} onChange={(value) => {
            setColumns(value);
          }} />
        </Space>


      </Modal>
    </>

  );
}
