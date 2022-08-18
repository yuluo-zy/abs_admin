import React from "react";
import { Descriptions, DescriptionsProps } from "@arco-design/web-react";

export const DemandDescriptions: React.FC<DescriptionsProps> = (props: DescriptionsProps) => {
  const { data } = props;
  return (
    <Descriptions
      column={2}
      data={data}
    />
  );
};

export default DemandDescriptions;
