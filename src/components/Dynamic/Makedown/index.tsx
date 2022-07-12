import React, { useEffect, useImperativeHandle, useState } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { Boot, DomEditor, IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import attachmentModule from "@wangeditor/plugin-upload-attachment";
import mentionModule from "@wangeditor/plugin-mention";
import styles from "./style/index.module.less";
import cs from "classnames";
import { Message } from "@arco-design/web-react";
import { postFile } from "@/api/file";
import axios from "axios";
import { UserSelect } from "@/components/Dynamic/Makedown/user-select";

Boot.registerModule(attachmentModule);
Boot.registerModule(mentionModule);

function showModal(editor: IDomEditor) {
  UserSelect.showInstance(editor);
}

// 隐藏弹框
function hideModal(editor: IDomEditor) {
  UserSelect.removeInstance();
}

export function MakeDown(props: { theme: boolean, onRef? }) {

  useImperativeHandle(props.onRef, () => {
    // 需要将暴露的接口返回出去
    return {
      getContext: getContext,
      clear: clear
    };
  });

  const [editor, setEditor] = useState<IDomEditor | null>(null);
  // 存储 editor 实例
  const [html, setHtml] = useState("");
  // 如果是 true 则设置为 深夜模式
  const [theme, setTheme] = useState(false);
  useEffect(() => {
    setTheme(props.theme);
  }, [props.theme]);
  // 编辑器内容

  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: [
      "fullScreen",
      "insertVideo",
      "insertTable",
      "insertImage"
    ],
    insertKeys: {
      index: 4, // 自定义插入的位置
      keys: ["uploadAttachment"] // “上传附件”菜单
    }
  };

  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "...",
    hoverbarKeys: {
      attachment: {
        menuKeys: ["downloadAttachment"] // “下载附件”菜单
      }
    },
    MENU_CONF: {
      // “上传附件”菜单的配置
      uploadAttachment: {
        // 用户自定义上传
        customUpload(file: File, insertFn: Function) {
          if(file.size>  10 * 1024 * 1024){
            Message.error("Upload file is too large, The maximum file size is 10M.");
            return false;
          }
          let formData = new FormData();
          formData.append("file", file);
          const source = axios.CancelToken.source();
          const onprogress = progressEvent => {
            const complete = progressEvent.loaded / progressEvent.total * 100 | 0;
            // onProgress(parseInt(String(complete), 10), progressEvent);
            Message.info({
              content: "OnProgress: " + parseInt(String(complete), 10),
              duration: 500,
              position: "bottom"
            });
          };

          postFile(formData, onprogress, source.token).then(r => {
            const { success, result } = r.data;
            if (success) {
              Message.success("Upload Success");
              insertFn(`${file.name}`, result);
            }
          }).catch(error => {
            Message.error(error?.message);
          });

        }

      },
      uploadImage: {
        async customUpload(file: File, insertFn: Function) {
          if(file.size>  10 * 1024 * 1024){
            Message.error("Upload file is too large, The maximum file size is 10M.");
            return false;
          }
          let formData = new FormData();
          formData.append("file", file);
          const source = axios.CancelToken.source();
          const onprogress = progressEvent => {
            const complete = progressEvent.loaded / progressEvent.total * 100 | 0;
            // onProgress(parseInt(String(complete), 10), progressEvent);
            Message.info({
              content: "OnProgress: " + parseInt(String(complete), 10),
              duration: 500,
              position: "bottom"
            });
          };
          postFile(formData, onprogress, source.token).then(r => {
            const { success, result } = r.data;
            if (success) {
              const { url, alt, href } = result;
              Message.success("Upload Success");
              insertFn(url, alt, href);
            }
          }).catch(error => {
            Message.error(error?.message);
          });

        }
      }
    },
    EXTEND_CONF: {
      mentionConfig: {
        showModal, // 必须
        hideModal // 必须
      }
    }
  };

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  const getContext = () => {
    const toolbar = DomEditor.getToolbar(editor)
    console.log(toolbar.getConfig().toolbarKeys)
    return html
  }

  const clear = () => {
    setHtml("")
  }



  return (
    <div className={cs([theme ? styles["makedown"] : "none", styles["context"]])}>
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="simple"
        style={{ borderBottom: "1px solid #ccc" }}
      />
      <Editor
        defaultConfig={editorConfig}
        value={html}
        onCreated={setEditor}
        onChange={editor => setHtml(editor.getHtml())}
        mode="simple"
        style={{ height: "300px", overflowY: "hidden" }}
      />
    </div>
  );
}
