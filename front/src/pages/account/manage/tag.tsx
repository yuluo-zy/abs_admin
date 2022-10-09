import { Tag } from "@arco-design/web-react";
import React from "react";

const COLORS = [
  "red",
  "orangered",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "arcoblue",
  "purple",
  "pinkpurple",
  "magenta",
  "gray"
];

const RoleTag = (props: { roleName, roleId }) => {
  const { roleName, roleId } = props;
  return (
    <div>
      {roleId && roleId.map((item, i) => (
        roleName?.[i] && <Tag key={i} color={COLORS[item % COLORS.length]} style={{ margin: "0 10px 10px 0 " }}>
          {roleName?.[i]}
        </Tag>
      ))}
    </div>
  );
};

export default RoleTag;
