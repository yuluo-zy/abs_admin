import React, { CSSProperties } from "react";
import { Descriptions, Image, List, Space, Typography } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import DynamicDivider from "@/components/Dynamic/Divider";

interface StepProps {
  descriptionData: any,
  style?: CSSProperties
}

export const OrderDescriptions: React.FC<StepProps> = (props: React.PropsWithChildren<StepProps>) => {
  const { descriptionData, style } = props;
  const t = useLocale(locale);
  const getStep = (value) => {
    if (value === "1") {
      return t["workplace.add.custom.product.stage.a"];
    }
    if (value === "2") {
      return t["workplace.add.custom.product.stage.b"];
    }
    if (value === "3") {
      return t["workplace.add.custom.product.stage.c"];
    }
    if (value === "4") {
      return t["workplace.add.custom.product.stage.d"];
    }
  };
  // const getImg = value => {
  //   if(value && value.length > 0) {
  //     const imgTemp = value.split(",")
  //
  //   }
  // }
  const customData = [
    {
      label: t["workplace.add.custom.quality"] + " - " + t["workplace.add.custom.phone"],
      value: descriptionData?.[0]?.customerQcPhone
    },
    {
      label: t["workplace.add.custom.quality"] + " - " + t["workplace.add.custom.email"],
      value: descriptionData?.[0]?.customerQcEmail
    },
    {
      label: t["workplace.add.custom.purchase"] + " - " + t["workplace.add.custom.phone"],
      value: descriptionData?.[0]?.customerBuyerPhone
    },
    {
      label: t["workplace.add.custom.purchase"] + " - " + t["workplace.add.custom.email"],
      value: descriptionData?.[0]?.customerBuyerEmail
    },
    {
      label: t["workplace.add.custom.espressif"] + " - " + t["workplace.add.custom.name"],
      value: descriptionData?.[0]?.espBusinessName
    },
    {
      label: t["workplace.add.custom.espressif"] + " - " + t["workplace.add.custom.email"],
      value: descriptionData?.[0]?.espBusinessEmail
    }
  ];
  const productData = [
    {
      label: t["workplace.add.custom.module"],
      value: descriptionData?.[0]?.productType
    },
    {
      label: t["workplace.add.custom.product.number.actual"],
      value: descriptionData?.[0]?.productionNum
    },
    {
      label: t["workplace.add.custom.product.number.defective"],
      value: descriptionData?.[0]?.failNum
    },
    {
      label: t["workplace.add.custom.product.date"],
      value: descriptionData?.[0]?.occurDate
    },
    {
      label: t["workplace.add.custom.product.stage"],
      value: getStep(descriptionData?.[0]?.problemStage)
    },
    {
      label: t["workplace.add.custom.product.description"],
      value: <Typography.Paragraph ellipsis={{ showTooltip: true }} style={{ maxWidth: 400 }}>
        {descriptionData?.[0]?.productionUsedNote}
      </Typography.Paragraph>
    }
  ];

  const srcList = [
    "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp",
    "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp",
    "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp",
    "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp"
  ];
  const issueData = [
    {
      label: t["workplace.add.custom.product.issue.description"],
      value: descriptionData?.[0]?.productionFailState
    },
    {
      label: t["workplace.add.custom.product.issue.picture"],
      value: <Space direction="vertical">
        <Image.PreviewGroup infinite>
          <Space>
            {srcList.map((src, index) => (
              <Image key={index} src={src} width={200} alt={`lamp${index + 1}`} />
            ))}
          </Space>
        </Image.PreviewGroup>
      </Space>
    },
    {
      label: t["workplace.add.custom.product.issue.appendix"],
      value:
        <List
          style={{ margin: "1rem" }}
          size="small"
          header={null}
          dataSource={[
            ...descriptionData?.[0]?.fileObjs
          ]}
          render={(item, index) => <List.Item key={index}>{item?.fileName}</List.Item>}
        />
    }
  ];

  return <div style={{ ...style }}>
    <Descriptions
      border
      title={t["workplace.add.custom"]}
      data={customData}
    />
    <DynamicDivider />
    <Descriptions
      column={2}
      labelStyle={{ textAlign: "right", paddingRight: 36 }}
      title={t["workplace.add.custom.product"]}
      data={productData}
    />
    <DynamicDivider />
    <Descriptions
      column={1}
      labelStyle={{ textAlign: "right", paddingRight: 36 }}
      title={t["workplace.add.custom.product.issue"]}
      data={issueData}
    />
    <DynamicDivider />
  </div>;
};
