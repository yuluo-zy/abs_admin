import React, { useEffect, useState } from "react";
import { Radio } from '@arco-design/web-react';
import { isArray, isObject } from '@/utils/is';
import { useUpdateEffect } from "react-use";

const RadioGroup = Radio.Group;

export default function DynamicRadioGroup(props) {
  const { options, onChange, defaultValue } = props;
  const [myValue, setMyValue] = useState(defaultValue);
  useUpdateEffect(() => {
    onChange(myValue);
  }, [myValue]);
  // useEffect(() => {
  //   console.warn(defaultValue)
  //   setMyValue(defaultValue)}, [])
  return <RadioGroup value={myValue} direction={props.direction}>
    {options && isArray(options)
      && options.map((option, index) => {
        if (isObject(option)) {
          return (
            <Radio
              key={index}
              disabled={option.disabled}
              value={option.value}
              checked={option.value === myValue}
              onClick={() => {
                if (option.value === myValue) {
                  setMyValue(undefined);
                } else {
                  setMyValue(option.value);
                }
              }}
            >
              {option.label}
            </Radio>
          );
        }
      })
    }
  </RadioGroup>;
}
