import React, { useState } from "react";
import { Alert, Card, Space } from "@arco-design/web-react";
import { DynamicCardProps } from "@/components/type";
import { IconBulb } from "@arco-design/web-react/icon";

function DynamicOuterCard(props: DynamicCardProps) {
  const { title, children, headerStyle, bodyStyle } = props;
  const headerSelfStyle = {
    border: "none",
    height: "auto",
    paddingTop: "20px",
    padding: "1rem",
    paddingBottom: 0,
    ...headerStyle
  };
  const bodySelfStyle = {
    padding: "1.2rem",
    ...bodyStyle
  };
  const style = {
    marginBottom: "1rem",
    boxShadow:
      "0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02)"
  };
  const [open, setOpen] = useState(false);


  return (
    <Card
      {...props}
      title={title &&
        <Space size={4}>
          <b> {title}</b>
          {props.help && <div onClick={() => {
            setOpen(!open);
          }}><IconBulb style={{ fontSize: 20, color: "#FADC19" }} /></div>}
          {open && <Alert type="warning" content={props.help} />}
        </Space>}
      style={style}
      headerStyle={headerSelfStyle}
      bodyStyle={bodySelfStyle}
    >
      {children}
    </Card>
  );
}

export default DynamicOuterCard;
