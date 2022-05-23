import React, { useState } from "react";
import { Editor, Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
// todo i18 支持
import zhHans from 'bytemd/locales/zh_Hans.json'
// 引入基础css
import 'bytemd/dist/index.min.css';


const plugins = [gfm()];

export function MakeDown() {
  const [value, setValue] = useState('');
  return (
    <div className="page-wrap">
      <Editor
        // 语言
        locale={zhHans}
        // 内部的值
        value={value}
        // 插件
        plugins={plugins}
        // 动态修改值
        onChange={v => setValue(v)}
      />
    </div>
  )
}
