import React, { CSSProperties, useState } from "react";
import { Button, Descriptions, Image, List, Space, Typography } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import DynamicDivider from "@/components/Dynamic/Divider";
import DynamicPreviewImg from "@/components/Dynamic/img/preview";
import { IconCloudDownload } from "@arco-design/web-react/icon";
import { getSalesInfo } from "@/api/file";
import RiceText from "@/rice_text";
import DynamicCard from "@/components/Dynamic/Card";

interface StepProps {
  descriptionData: any,
  style?: CSSProperties;
  encryption: boolean;
  download: boolean;
  feedback: boolean;
}

const DownloadButton = (props) => {
  const { id } = props;
  const [loading, setLoading] = useState(false);
  const downFile = (event) => {
    setLoading(true);
    event.stopPropagation();
    if (id) {
      getSalesInfo(id).then(res => {
          if (res.status === 200) {
            const url = URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            let name = res.headers["content-disposition"]?.match(/fileName=(.*)/)[1]; // 获取filename的值
            name = decodeURIComponent(name);
            link.setAttribute("download", name);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
      ).finally(() => {
        setLoading(false);
      });
    }
  };
  return <Button
    size={"mini"}
    icon={<IconCloudDownload />}
    type="outline"
    status="success"
    loading={loading}
    onClick={downFile}
  />;
};
export const OrderDescriptions: React.FC<StepProps> = (props: React.PropsWithChildren<StepProps>) => {
  const { descriptionData, encryption, download, feedback, style } = props;
  const data = descriptionData?.[0] || {};

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
  const getEncryption = (value) => {
    if (encryption) {
      if (value && value.length > 6) {
        return value.substring(0, 3) + "******" + value.substring(value.length - 2);
      }
    }
    return value;
  };
  const customData = [
    {
      label: t["workplace.add.custom.quality"] + " - " + t["workplace.add.custom.phone"],
      value: getEncryption(data?.customerQcPhone)
    },
    {
      label: t["workplace.add.custom.quality"] + " - " + t["workplace.add.custom.email"],
      value: getEncryption(data?.customerQcEmail)
    },
    {
      label: t["workplace.add.custom.purchase"] + " - " + t["workplace.add.custom.phone"],
      value: getEncryption(data?.customerBuyerPhone)
    },
    {
      label: t["workplace.add.custom.purchase"] + " - " + t["workplace.add.custom.email"],
      value: getEncryption(data?.customerBuyerEmail)
    },
    {
      label: t["workplace.add.custom.espressif"] + " - " + t["workplace.add.custom.name"],
      value: data?.espBusinessName
    },
    {
      label: t["workplace.add.custom.espressif"] + " - " + t["workplace.add.custom.email"],
      value: data?.espBusinessEmail
    }
  ];
  const productData = [
    {
      label: t["workplace.add.custom.module"],
      value: data?.productType
    },
    {
      label: t["workplace.add.custom.product.number.actual"],
      value: data?.productionNum
    },
    {
      label: t["workplace.add.custom.product.number.defective"],
      value: data?.failNum
    },
    {
      label: t["workplace.add.custom.product.date"],
      value: data?.occurDate
    },
    {
      label: t["workplace.add.custom.product.stage"],
      value: getStep(data?.problemStage)
    },
    {
      label: t["workplace.add.custom.product.description"],
      value: <Typography.Paragraph ellipsis={{ showTooltip: true }} style={{ maxWidth: 400 }}>
        {data?.productionUsedNote}
      </Typography.Paragraph>
    }
  ];


  const issueData = [
    {
      label: t["workplace.add.custom.product.issue.description"],
      value: data?.productionFailState
    },
    {
      label: t["workplace.add.custom.product.issue.picture"],
      value: <Space direction="vertical">
        <Image.PreviewGroup infinite>
          <Space>
            {data?.imgObjs && data?.imgObjs.map((src, index) => (
              <DynamicPreviewImg data={src} key={index} width={200} height={200} loader={true} />
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
          dataSource={data?.fileObjs}
          render={(item, index) => <List.Item key={index}>
            <Space size={"large"}>
              {item?.fileName}
              {download && <DownloadButton id={item?.id} />}
            </Space>
          </List.Item>}
        />
    }
  ];

  return <div style={{ ...style }}>
    <Descriptions
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
    {feedback && <DynamicCard title={t["workplace.drawer.details.feedback"]}>
      <RiceText readOnly={true} initValue={data?.remarks} />
    </DynamicCard>}

  </div>;
};
