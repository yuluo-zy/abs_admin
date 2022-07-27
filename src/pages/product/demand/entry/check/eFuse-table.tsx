import React from "react";
import useLocale from "@/pages/product/demand/locale/useLocale";


export default function EFuseTable() {
  const t = useLocale();

  const getEFuseInfo = () => {
    return [
      {
        title: "Security fuses: ",
        key: "securityFuses",
        child: [
          {
            title: "JTAG_DISABLE",
            key: "JTAG_DISABLE"
          }]
      },
      {
        title: "Security fuses: ",
        key: "securityFuses",
        child: [
          {
            title: "JTAG_DISABLE",
            key: "JTAG_DISABLE"
          }]
      }
    ];
  };
  return <div>

  </div>;
}
