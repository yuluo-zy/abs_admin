import React from "react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import { ProductStore } from "@/store/product";
import shallow from "zustand/shallow";


export default function LogTable() {
  const t = useLocale();
  const [info, macData, burnData] =
    ProductStore(state => [state.info, state.macData, state.burnData], shallow);

  return <div>
    <p>{t["self.check.boot.upload.port.hit"]}</p>
    <div>
      <div>
        <b>{t["self.check.boot.upload.port.hit.firmware"]}</b>
        {info?.serial_check_str.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </div>
      <div>
        <b>{t["self.check.boot.upload.port.hit.mac"]}</b>
        <p>{macData?.serialPort}</p>
      </div>
      <div>
        <b>{t["self.check.boot.upload.port.hit.burn"]}</b>
        <p>{burnData?.flashOkSerialLabel}</p>
        <p>{burnData?.efuseOkSerialLabel}</p>
      </div>
    </div>
  </div>;
}
