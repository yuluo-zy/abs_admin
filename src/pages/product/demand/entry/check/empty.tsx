import React from "react";
import { Empty } from "@arco-design/web-react";
import useLocale from "@/pages/product/demand/locale/useLocale";

const EmptyStatus = () => {
  const t = useLocale();
  return (
    <Empty
      description={t['self.check.boot.upload.file.empty']}
    />
  );
};

export default EmptyStatus;
