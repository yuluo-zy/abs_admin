import React, { useEffect, useState } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { Boot, IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import attachmentModule from "@wangeditor/plugin-upload-attachment";
import mentionModule, { MentionElement } from "@wangeditor/plugin-mention";
import styles from "./style/index.module.less";
import cs from "classnames";
import { AutoComplete, Message } from "@arco-design/web-react";
import { postFile } from "@/api/file";
import axios from "axios";
import { UserSelect } from "@/components/Dynamic/Makedown/user-select";

const { OptGroup, Option } = AutoComplete;

Boot.registerModule(attachmentModule);
Boot.registerModule(mentionModule);

function showModal(editor: IDomEditor) {
  UserSelect.showInstance(editor);

  // 当触发某事件（如点击一个按钮）时，插入 mention 节点
  function insertMention() {
    const mentionNode: MentionElement = {
      type: "mention", // 必须是 'mention'
      value: "张三", // 文本
      info: { x: 1, y: 2 }, // 其他信息，自定义
      children: [{ text: "" }] // 必须有一个空 text 作为 children
    };

    editor.restoreSelection(); // 恢复选区
    editor.deleteBackward("character"); // 删除 '@'
    editor.insertNode(mentionNode); // 插入 mention
    editor.move(1); // 移动光标
  }
}

// 隐藏弹框
function hideModal(editor: IDomEditor) {
  UserSelect.removeInstance();
}

/**
 * 绑定 modal elem 事件
 * @param editor editor
 */
export function bindModalEvent(editor: IDomEditor) {
  const modalElem = document.getElementById("mention-modal");
  if (modalElem == null) return;

  // 点击 li 插入 mention
  modalElem.addEventListener("click", (event: MouseEvent) => {
    // @ts-ignore
    if (event.target?.nodeName === "LI") {
      editor.restoreSelection();
      // @ts-ignore
      const text = event.target.textContent;
      if (text == null) return;

      // 删除 '@'
      editor.deleteBackward("character");
      // 插入 mention 节点
      const mentionNode: MentionElement = {
        type: "mention",
        value: text,
        info: { x: 1, y: 2 }, // 其他信息
        children: [{ text: "" }]
      };
      editor.insertNode(mentionNode);
      // 光标移动一位
      editor.move(1);
      // 隐藏 modal elem
      modalElem.style.display = "none";
    }
  });
}

/**
 * 绑定 input 事件
 * @param editor editor
 */
export function bindInputEvent(editor: IDomEditor) {
  const inputElem = document.getElementById("mention-input");
  const listElem = document.getElementById("mention-list");
  if (inputElem == null || listElem == null) return;

  // input 输入文字，筛选 list
  inputElem.addEventListener("input", event => {
    // @ts-ignore
    const inputValue = (event.target.value || "").trim();
    const listChildren = Array.from(listElem.children);
    if (inputValue) {
      // input 有值，则筛选 list
      for (const li of listChildren) {
        const liText = (li.textContent || "").toLowerCase();
        if (liText.includes(inputValue)) {
          // @ts-ignore
          li.style.display = "list-item"; // 显示
        } else {
          // @ts-ignore
          li.style.display = "none"; // 隐藏
        }
      }
    } else {
      // input 无值，则显示所有 list
      for (const li of listChildren) {
        // @ts-ignore
        li.style.display = "list-item";
      }
    }
  });

  // input 回车，插入 li
  inputElem.addEventListener("keyup", event => {
    if (event.key === "Enter") {
      const listChildren = Array.from(listElem.children);
      for (const li of listChildren) {
        // @ts-ignore
        if (li.style.display !== "none") {
          // @ts-ignore
          li.click();
          break;
        }
      }
    }
  });

  // esc ，退出
  inputElem.addEventListener("keyup", event => {
    if (event.key === "Escape") {
      // hideModalElem(editor)
      editor.restoreSelection();
    }
  });
}





export function MakeDown(props: { theme: boolean }) {
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
      "fullScreen"
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
        maxFileSize: 10 * 1024 * 1024, // 10M
        onBeforeUpload(file: File) {
          // todo 针对文件大小和类型进行验证
          return file;
          // return false // 会阻止上传
        },
        onProgress(progress: number) {
          Message.info("OnProgress: " + progress);
        },
        onSuccess(file: File, res: any) {
          Message.success("Upload Success");
        },
        onFailed(file: File, res: any) {
          Message.error("Upload Error");
        },
        onError(file: File, err: Error, res: any) {
          Message.error(err.message);
        },

        // // 上传成功后，用户自定义插入文件
        customInsert(res: any, file: File, insertFn: Function) {
          console.log("customInsert", res);
          const { url } = res.data || {};
          if (!url) throw new Error(`url is empty`);

          // 插入附件到编辑器
          insertFn(`customInsert-${file.name}`, url);
        },

        // // 用户自定义上传
        customUpload(file: File, insertFn: Function) {

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
            // todo
          });

        }
        // // 自定义选择
        // customBrowseAndUpload(insertFn: Function) {
        //   alert('自定义选择文件，如弹出图床')
        //   // 自己上传文件
        //   // 上传之后用 insertFn(fileName, link) 插入到编辑器
        // },

        // 插入到编辑器后的回调
        // onInsertedAttachment(elem) {
        //   console.log("inserted attachment", elem);
        // }
      },
      uploadImage: {
        maxFileSize: 10 * 1024 * 1024, // 10M
        onBeforeUpload(file: File) {
          // todo 针对文件大小和类型进行验证
          return file;
          // return false // 会阻止上传
        },
        onProgress(progress: number) {
          Message.info("OnProgress: " + progress);
        },
        onSuccess(file: File, res: any) {
          Message.success("Upload Success");
        },
        onFailed(file: File, res: any) {
          Message.error("Upload Error");
        },
        onError(file: File, err: Error, res: any) {
          Message.error(err.message);
        },
        // // 上传成功后，用户自定义插入文件
        customInsert(res: any, file: File, insertFn: Function) {
          const { url, alt, href } = res.data || {};
          if (!url) throw new Error(`url is empty`);

          // 插入附件到编辑器
          insertFn(url, alt, href);
        },
        async customUpload(file: File, insertFn: Function) {
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
        style={{ height: "500px", overflowY: "hidden" }}
      />
    </div>
  );
}
