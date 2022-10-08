import React from "react";
import { Tag } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale";

export default function DynamicTag({ value }) {
  const t = useLocale(locale);
  if (value === undefined || value === 0 || value === false) {
    return <Tag size={"small"} style={{ margin: 1, padding: 1 }}>{t["tag.no"]}</Tag>;
  }
  return <Tag size={"small"} color="arcoblue" style={{ margin: 1, padding: 1 }}>{t["tag.yes"]}</Tag>;
}
