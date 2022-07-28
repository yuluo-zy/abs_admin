import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import { EN, ZH } from "./doc";

function HelpInfo() {
  const { lang } = useContext(GlobalContext);
  const [state, setState] = useState("");

  useEffect(() => {
    if (lang === "zh-CN") {
      setState(ZH);
    }
    if (lang === "en-US") {
      setState(EN);
    }
  }, [lang]);

}

export default HelpInfo;
