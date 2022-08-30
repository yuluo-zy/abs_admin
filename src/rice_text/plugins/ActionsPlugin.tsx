import { $getRoot, $isParagraphNode, CLEAR_EDITOR_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Modal, Notification, Tooltip } from "@arco-design/web-react";
import { IconDelete, IconUpload } from "@arco-design/web-react/icon";
import DynamicUpload from "@/components/Dynamic/Upload";
import { UploadItem } from "@arco-design/web-react/es/Upload";
import { INSERT_FILE_COMMAND } from "./FilePlugin";


export default function ActionsPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [isEditorEmpty, setIsEditorEmpty] = useState(true);
  const [visible, setVisible] = useState(false);
  const [file, setFile] = useState(false);
  const [fileSrc, setFileSrc] = useState(undefined);
  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.getEditorState().read(() => {
        const root = $getRoot();
        const children = root.getChildren();

        if (children.length > 1) {
          setIsEditorEmpty(false);
        } else {
          if ($isParagraphNode(children[0])) {
            const paragraphChildren = children[0].getChildren();
            setIsEditorEmpty(paragraphChildren.length === 0);
          } else {
            setIsEditorEmpty(false);
          }
        }
      });
    });
  }, [editor]);
  //
  // const uploadFile = () => {
  //   activeEditor.dispatchCommand(INSERT_FILE_COMMAND, { src: "jkjjj", name: "kljlkjlkjjk" });
  // };


  return (
    <>
      <hr style={{
        border: 0,
        borderTop: "1px dashed var(--color-neutral-4)"
      }} />
      <div className="actions">
        <Tooltip color={"#165DFF"} content="Import File">
          <Button
            className="action-button import"
            onClick={() => {
              setFileSrc(undefined);
              setFile(true);
            }}
            icon={<IconUpload />}
          >
          </Button>
        </Tooltip>
        <Tooltip color={"#165DFF"} content="Clear editor contents">
          <Button
            className="action-button clear"
            disabled={isEditorEmpty}
            onClick={() => {
              setVisible(true);
            }}
            icon={<IconDelete />}
          >
          </Button>
        </Tooltip>
      </div>
      <Modal
        title="Clear Editor"
        visible={visible}
        simple={true}
        onOk={() => {
          setVisible(false);
          editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
          editor.focus();
        }}
        onCancel={() => {
          editor.focus();
          setVisible(false);
        }}
        autoFocus={true}
        unmountOnExit={true}
        focusLock={true}
      >
        <p>
          Are you sure you want to clear the editor?
        </p>
      </Modal>
      <Modal
        title="Upload Files"
        visible={file}
        onOk={() => {
          if (fileSrc) {
            editor.dispatchCommand(INSERT_FILE_COMMAND, { ...fileSrc });
            editor.focus();
            setFile(false);
          } else {
            Notification.error({
              title: "Error",
              content: "Please enter a legal File!"
            });
          }

        }}
        simple={true}
        onCancel={() => {
          editor.focus();
          setFile(false);
        }}
        autoFocus={true}
        unmountOnExit={true}
        focusLock={true}
      >
        <DynamicUpload limit={1}
                       onChange={(fileList: UploadItem[], file: UploadItem) => {
                         if (fileList.length > 0) {
                           setFileSrc({
                             src: file?.response,
                             name: file.name
                           });
                         } else {
                           setFileSrc(null);
                         }

                       }}
        />
      </Modal>
    </>
  );
}
