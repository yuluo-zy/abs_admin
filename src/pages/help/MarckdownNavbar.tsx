import React, { useEffect, useState } from "react";
import "./style/markdown.navigation.less";


// 修建空值
const trimArrZero = (arr) => {
  let start, end;
  for (start = 0; start < arr.length; start++) {
    if (arr[start]) {
      break;
    }
  }
  for (end = arr.length - 1; end >= 0; end--) {
    if (arr[end]) {
      break;
    }
  }
  return arr.slice(start, end + 1);
};

// 获取内容结构
const getNavStructure = (source) => {
  const contentWithoutCode = source
    .replace(/^[^#]+\n/g, "")
    .replace(/(?:[^\n#]+)#+\s([^#\n]+)\n*/g, "") // 匹配行内出现 # 号的情况
    .replace(/^#\s[^#\n]*\n+/, "")
    .replace(/```[^`\n]*\n+[^```]+```\n+/g, "")
    .replace(/`([^`\n]+)`/g, "$1")
    .replace(/\*\*?([^*\n]+)\*\*?/g, "$1")
    .replace(/__?([^_\n]+)__?/g, "$1")
    .trim();

  const pattOfTitle = /#+\s([^#\n]+)\n*/g;
  const matchResult = contentWithoutCode.match(pattOfTitle);

  if (!matchResult) {
    return [];
  }

  const navData = matchResult.map((r, i) => ({
    index: i,
    level: r.match(/^#+/g)[0].length,
    text: r.replace(pattOfTitle, "$1")
  }));

  let maxLevel = 0;
  navData.forEach((t) => {
    if (t.level > maxLevel) {
      maxLevel = t.level;
    }
  });
  let matchStack = [];
  // 此部分重构，原有方法会出现次级标题后再次出现高级标题时，listNo重复的bug
  for (let i = 0; i < navData.length; i++) {
    const t = navData[i];
    const { level } = t;
    while (matchStack.length && matchStack[matchStack.length - 1].level > level) {
      matchStack.pop();
    }
    if (matchStack.length === 0) {
      const arr = new Array(maxLevel).fill(0);
      arr[level - 1] += 1;
      matchStack.push({
        level,
        arr
      });
      t.listNo = trimArrZero(arr).join(".");
      continue;
    }
    const { arr } = matchStack[matchStack.length - 1];
    const newArr = arr.slice();
    newArr[level - 1] += 1;
    matchStack.push({
      level,
      arr: newArr
    });
    t.listNo = trimArrZero(newArr).join(".");
  }
  return navData;
};

function MarkdownNavbar(props: {
  declarative?: boolean,
  source: string
}) {
  const [navStructure, setNavStructure] = useState([]);
  const [currentListNo, setCurrentListNo] = useState("");
  const initHeadingsId = (data) => {
    data.forEach((t) => {
      const headings = document.querySelectorAll(`h${t.level}`);
      const curHeading = Array.prototype.slice
        .apply(headings)
        .find(
          (h) =>
            h.innerText.replace(/\s+/g, "") === t.text.replace(/\s+/g, "")
        );

      if (curHeading) {
        // curHeading.dataset.id = props.declarative
        //   ? `${t.listNo}-${t.text}`
        //   : `heading-${t.index}`;
        curHeading.setAttribute("id", props.declarative
          ? `${t.listNo}-${t.text}`
          : `heading-${t.index}`);

        // if (headingId && headingId === curHeading.dataset.id) {
        //   // scrollToTarget(headingId);
        //   setCurrentListNo(t.listNo);
        // }
      }
    });
  };

  // const scrollToTarget = (dataId) => {
  //   if (this.scrollTimeout) {
  //     clearTimeout(this.scrollTimeout);
  //   }
  //   // 防抖
  //
  //   this.scrollTimeout = setTimeout(() => {
  //     const target = document.querySelector(`[data-id="${dataId}"]`);
  //     if (target && typeof target?.offsetTop === "number") {
  //       this.safeScrollTo(window, target?.offsetTop - this.props.headingTopOffset, 0);
  //     }
  //   }, 1);
  // };

  useEffect(() => {
    setNavStructure(getNavStructure(props.source));
  }, [props.source]);
  useEffect(() => {
    initHeadingsId(navStructure);
  }, [navStructure]);
  return <div>ppp</div>;

}

export default MarkdownNavbar;
