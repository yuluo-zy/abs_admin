import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import React, { useEffect, useState } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { Boot, IDomEditor, IEditorConfig } from "@wangeditor/editor";
import attachmentModule from "@wangeditor/plugin-upload-attachment";

Boot.registerModule(attachmentModule);

export function MakeDown() {
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  // 存储 editor 实例
  const [html, setHtml] = useState("");
  // 编辑器内容

  const toolbarConfig = {
    insertKeys: {
      index: 0, // 自定义插入的位置
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
        server: "/api/upload", // 服务端地址
        timeout: 5 * 1000, // 5s

        fieldName: "custom-fileName",
        meta: { token: "xxx", a: 100 }, // 请求时附加的数据
        metaWithUrl: true, // meta 拼接到 url 上
        headers: { Accept: "text/x-json" },

        maxFileSize: 10 * 1024 * 1024, // 10M

        onBeforeUpload(file: File) {
          console.log("onBeforeUpload", file);
          return file; // 上传 file 文件
          // return false // 会阻止上传
        },
        onProgress(progress: number) {
          console.log("onProgress", progress);
        },
        onSuccess(file: File, res: any) {
          console.log("onSuccess", file, res);
        },
        onFailed(file: File, res: any) {
          alert(res.message);
          console.log("onFailed", file, res);
        },
        onError(file: File, err: Error, res: any) {
          alert(err.message);
          console.error("onError", file, err, res);
        },

        // // 上传成功后，用户自定义插入文件
        // customInsert(res: any, file: File, insertFn: Function) {
        //   console.log('customInsert', res)
        //   const { url } = res.data || {}
        //   if (!url) throw new Error(`url is empty`)

        //   // 插入附件到编辑器
        //   insertFn(`customInsert-${file.name}`, url)
        // },

        // // 用户自定义上传
        // customUpload(file: File, insertFn: Function) {
        //   console.log('customUpload', file)

        //   return new Promise(resolve => {
        //     // 插入一个文件，模拟异步
        //     setTimeout(() => {
        //       const src = `https://www.w3school.com.cn/i/movie.ogg`
        //       insertFn(`customUpload-${file.name}`, src)
        //       resolve('ok')
        //     }, 500)
        //   })
        // },

        // // 自定义选择
        // customBrowseAndUpload(insertFn: Function) {
        //   alert('自定义选择文件，如弹出图床')
        //   // 自己上传文件
        //   // 上传之后用 insertFn(fileName, link) 插入到编辑器
        // },

        // 插入到编辑器后的回调
        onInsertedAttachment(elem) {
          console.log("inserted attachment", elem);
        }
      }
    }
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
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
