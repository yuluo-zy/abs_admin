import React, { useEffect, useState } from "react";
import { InputNumber } from "@arco-design/web-react";

export default function DynamicInputNumber(props) {
  const [stateValue, setValue] = useState(props.value);
  const value = props.value || stateValue || undefined;
  useEffect(() => {
    if (props.value !== stateValue && props.value === undefined) {
      setValue(props.value);
    }
  }, [props.value]);

  const handleChange = (newValue) => {
    if (!("value" in props)) {
      setValue(newValue);
    }

    props.onChange && props.onChange(newValue);
  };
  return <InputNumber {...props} value={value} onChange={(number) => {
    handleChange(number);
  }
  } />;
}
