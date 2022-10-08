import React, { useState } from "react";
import { Alert, Card, Space } from "@arco-design/web-react";
import { DynamicCardProps } from "@/components/type";
import { IconBulb } from "@arco-design/web-react/icon";

function DynamicCard(props: DynamicCardProps) {
  const { title, children } = props;
  const headerStyle = {
    border: "none",
    height: "auto",
    paddingTop: "20px",
    padding: "1rem",
    paddingBottom: 0
  };
  const bodyStyle = {
    paddingLeft: "2rem",
    paddingRight: "2rem",
    overflow: "auto"
  };
  const [open, setOpen] = useState(false);

  return (
    <Card title={
      <Space size={4}>
        <b style={{ fontSize: 500 }}> {title && title.length > 0 && title}</b>
        {props.help && <div onClick={() => {
          setOpen(!open);
        }}><IconBulb style={{ fontSize: 20, color: "#FADC19" }} /></div>}
        {open && <Alert type="warning" content={props.help} />}
      </Space>
    }
          headerStyle={headerStyle}
          bodyStyle={bodyStyle}
          {...props}
    >

      {children}
    </Card>
  );
}

export default DynamicCard;
