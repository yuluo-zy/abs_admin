import React, { useEffect } from "react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";
import { Button, Checkbox, Divider, Form, Input, Link, Message, Space, Tag, Tooltip } from "@arco-design/web-react";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";
import style from "./style/index.module.less";
import { IconArrowRight, IconLaunch } from "@arco-design/web-react/icon";
import ProductStore from "@/store/product";
import shallow from "zustand/shallow";
import { DynamicImgUpload } from "@/components/Dynamic/Upload/img-upload";
import { UploadItem } from "@arco-design/web-react/es/Upload";
import { postLabelCustomDemand, postMacCustomDemand } from "@/api/demand";

const FormItem = Form.Item;
const bodyStyle = {
  padding: "3rem"
}
export default function CustomLabel() {
  const t = useLocale();
  const [form] = Form.useForm();
  const [labelData, setLabelData] = ProductStore(state => [state.labelData, state.setLabelData], shallow);
  const demandId = ProductStore(state => state.demandId);

  const postLabelCustom = () => {
    try {
      form.validate();
    } catch (error) {
      return;
    }
    setLabelData({
      ...form.getFieldsValue()
    });
    postLabelCustomDemand({
      ...labelData,
      demandId: demandId
    }).then(res => {
      if (res.data.success) {
        Message.success(t["submit.hardware.success"]);
      }
    });
  };

  const setValue = (key, value) => {
    form.setFieldValue(key, value);
    const temp = {};
    temp[key] = value;
    setLabelData({
      ...temp
    });
  };

  //重新创建的时候， 需要将上传的文件删除掉
  useEffect(() => {
    setLabelData({
      laserFileId: undefined,
      outboxFileId: undefined
    });
  }, []);


  return (<DynamicOuterCard title={t["firmware.label.title"]}  bodyStyle={bodyStyle}>
    <DynamicSkeleton animation text={{ rows: 10, width: ["100%", 600, 400] }}>
      <Form
        scrollToFirstError
        form={form}
        initialValues={{ ...labelData }}
        onSubmit={postLabelCustom}
        labelAlign={"left"}
        className={style["label"]}
      >
        <Space size={40}>
          <Space size={10} direction={"vertical"}>
            <FormItem field="cusLaserLabel">
              <Checkbox checked={labelData?.cusLaserLabel} onChange={(checked) => {
                if (checked) {
                  setValue("cusLaserLabel", 1);
                } else {
                  setValue("cusLaserLabel", 0);
                }
              }}>
                <Tag color={"arcoblue"}>{t["firmware.label.model"]}</Tag></Checkbox>
            </FormItem>
            <FormItem field="cusOutboxLabel">
              <Checkbox checked={labelData?.cusOutboxLabel} onChange={(checked) => {
                if (checked) {
                  setValue("cusOutboxLabel", 1);
                } else {
                  setValue("cusOutboxLabel", 0);
                }

              }}> <Tag color={"purple"}>{t["firmware.label.box"]}</Tag></Checkbox>
            </FormItem>
          </Space>
          <Tooltip color={"#0E42D2"} position={"rt"}
                   defaultPopupVisible={true}
                   content={t["firmware.label.help"]}>
            <Link target={"_blank"}
                  href="https://www.espressif.com/sites/default/files/documentation/Espressif_Module_Packing_Information_CN.pdf">
              <IconLaunch style={
                { color: "#0E42D2", fontSize: 15 }
              } />
            </Link>
          </Tooltip>
        </Space>
        <div className={style["label-img"]}>
          {labelData?.cusLaserLabel === 1 && <div className={style["label-img-context"]}>
            <div className={style["label-item"]}>
              <FormItem field="laserFileId"
                        rules={[
                          {
                            required: true,
                            message: t["firmware.label.model.error"],
                            validator: (value, callback) => {
                              if ((value === undefined || value === "") && labelData?.cusLaserLabel === 1) {
                                callback(t["firmware.label.model.error"]);
                              }
                            }
                          }
                        ]}
              >
                <DynamicImgUpload
                  limit={1}
                  title={t["firmware.label.model"]}
                  onChange={(fileList: UploadItem[], file: UploadItem) => {
                    let res = null;
                    fileList.forEach(r => {
                      res = r.response;
                    });
                    setValue("laserFileId", res);
                  }} />
              </FormItem>
            </div>
            <div className={style["label-item"]}>
              <Tag color={"arcoblue"}> {t["firmware.label.model"]}</Tag>
            </div>
          </div>}

          {labelData?.cusOutboxLabel === 1 && <div className={style["label-img-context"]}>
            <div className={style["label-item"]}>
              <FormItem field="outboxFileId"
                        rules={[
                          {
                            required: true,
                            message: t["firmware.label.box.error"],
                            validator: (value, callback) => {
                              if ((value === undefined || value === "") && labelData?.cusOutboxLabel === 1) {
                                callback(t["firmware.label.box.error"]);
                              }
                            }
                          }
                        ]}
              >
                <DynamicImgUpload
                  limit={1}
                  title={t["firmware.label.box"]}
                  onChange={(fileList: UploadItem[], file: UploadItem) => {
                    let res = null;
                    fileList.forEach(r => {
                      res = r.response;
                    });
                    setValue("outboxFileId", res);
                  }} />
              </FormItem>
            </div>
            <div className={style["label-item"]}>
              <Tag color={"purple"}>{t["firmware.label.box"]}</Tag>
            </div>
          </div>}
        </div>

        <Divider style={{ borderBottomStyle: "dashed" }} />
        <div className={style["remark"]}>
          <FormItem label={t["firmware.label.remark"]} field={"notes"}>
            <Input.TextArea
              maxLength={{ length: 400, errorOnly: true }}
              autoSize={{ minRows: 3 }}
              showWordLimit
              placeholder="More than 400 letters will be error"
            />
          </FormItem>
        </div>
        <Divider style={{ borderBottomStyle: "dashed" }} />
        <div className={style["context-next"]}>
          <Button type="primary"
                  size={"large"}
                  htmlType="submit"
                  icon={<IconArrowRight />}
          >
            {t["hardware.production.info.next"]}
          </Button>
        </div>
      </Form>
    </DynamicSkeleton>

  </DynamicOuterCard>);
}
