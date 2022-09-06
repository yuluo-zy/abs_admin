import React, { CSSProperties, useState } from "react";
import { Button, Descriptions, Image, List, Space, Typography } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import locale from "./locale/index";
import DynamicDivider from "@/components/Dynamic/Divider";
import DynamicPreviewImg from "@/open/work_order/preview";
import { IconCloudDownload } from "@arco-design/web-react/icon";
import { getSalesInfo } from "@/api/file";
import DynamicCard from "@/components/Dynamic/Card";
import RiceText from "@/rice_text";

interface StepProps {
  descriptionData: any,
  style?: CSSProperties;
  encryption: boolean;
  download: boolean;
  feedback: boolean;
  copy?: boolean;
}

const DownloadButton = (props) => {
  const { id, orderId } = props;
  const [loading, setLoading] = useState(false);
  const downFile = (event) => {
    setLoading(true);
    event.stopPropagation();
    if (id) {
      getSalesInfo({
        id: id,
        orderId: orderId
      }).then(res => {
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
  const { descriptionData, encryption, download, feedback, copy, style } = props;
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
      if (value && value.length > 5) {
        return value.substring(0, 2) + "******" + value.substring(value.length - 2);
      }
    }

    return value;
  };
  const getCopy = (value) => {
    if (copy) {
      return <Typography.Paragraph copyable style={{ margin: 2 }}>{value}</Typography.Paragraph>;
    }
    return value;
  };
  const roleOptions = [
    {
      label: t["workplace.add.custom.role.a"],
      key: "1"
    },
    {
      label: t["workplace.add.custom.role.b"],
      key: "2"
    },
    {
      label: t["workplace.add.custom.role.c"],
      key: "3"
    },
    {
      label: t["workplace.add.custom.role.d"],
      key: "4"
    }
  ];
  const getRoleName = (value) => {
    for (const i of roleOptions) {
      if (i.key === value) {
        return i.label;
      }
    }
    return "other";
  };
  const customData = [
    {
      label: t["workplace.add.custom.custom.name"],
      value: getEncryption(data?.customerName)
    },
    {
      label: t["workplace.add.custom.custom.company"],
      value: getCopy(getEncryption(data?.customerCompanyName))
    },
    {
      label: t["workplace.add.custom.role"],
      value: getRoleName(data?.customerRole)
    },
    {
      label: t["workplace.add.custom.quality"] + " - " + t["workplace.add.custom.name"],
      value: getEncryption(data?.customerQcName)
    },
    {
      label: t["workplace.add.custom.quality"] + " - " + t["workplace.add.custom.phone"],
      value: getCopy(getEncryption(data?.customerQcPhone))
    },
    {
      label: t["workplace.add.custom.quality"] + " - " + t["workplace.add.custom.email"],
      value: getCopy(getEncryption(data?.customerQcEmail))
    },
    {
      label: t["workplace.add.custom.purchase"] + " - " + t["workplace.add.custom.name"],
      value: getEncryption(data?.customerBuyerName)
    },
    {
      label: t["workplace.add.custom.purchase"] + " - " + t["workplace.add.custom.phone"],
      value: getCopy(getEncryption(data?.customerBuyerPhone))
    },
    {
      label: t["workplace.add.custom.purchase"] + " - " + t["workplace.add.custom.email"],
      value: getCopy(getEncryption(data?.customerBuyerEmail))
    },
    {
      label: t["workplace.add.custom.espressif"] + " - " + t["workplace.add.custom.name"],
      value: data?.espBusinessName
    },
    {
      label: t["workplace.add.custom.espressif"] + " - " + t["workplace.add.custom.email"],
      value: getCopy(data?.espBusinessEmail)
    }
  ];
  const productData = [
    {
      label: t["workplace.add.custom.module"],
      value: data?.productType
    },
    {
      label: t["workplace.add.custom.product.description"],
      value: data?.productionUsedNote
    }
  ];


  const issueData = [

    {
      label: t["workplace.add.custom.product.stage"],
      value: getStep(data?.problemStage)
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
      label: t["workplace.add.custom.product.issue.description"],
      value: data?.productionFailState
    },
    {
      label: t["workplace.add.custom.product.issue.picture"],
      value: <Space direction="vertical">
        <Image.PreviewGroup infinite>
          <Space>
            {data?.imgObjs && data?.imgObjs.map((src, index) => (
              <DynamicPreviewImg data={{
                id: src?.id,
                orderId: data?.id
              }} key={index} width={200} height={200} loader={true} />
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
              {download && <DownloadButton id={item?.id} orderId={data?.id} />}
            </Space>
          </List.Item>}
        />
    }
  ];

  const getSalesInfoById = (value) => {
    return getSalesInfo({
      ...value,
      orderId: data?.id
    });
  };

  const getSalesImgById = (value) => {
    return getSalesInfo({
      id: value,
      orderId: data?.id
    });
  };
  return <div style={{ ...style }}>
    <Descriptions
      colon={" : "}
      // column={2}
      title={t["workplace.add.custom"]}
      data={customData}
    />
    <DynamicDivider />
    <Descriptions
      column={1}
      colon={" : "}
      labelStyle={{ textAlign: "right", paddingRight: 36 }}
      title={t["workplace.add.custom.product"]}
      data={productData}
    />
    <DynamicDivider />
    <Descriptions
      column={1}
      colon={" : "}
      labelStyle={{ textAlign: "right", paddingRight: 36 }}
      title={t["workplace.add.custom.product.issue"]}
      data={issueData}
    />
    <DynamicDivider />
    {feedback && <DynamicCard title={t["workplace.drawer.details.feedback"]}>
      <RiceText readOnly={true} initValue={data?.remark}
                fileDownload={getSalesInfoById}
                imgDownload={getSalesImgById} />
    </DynamicCard>}
  </div>;
};
