import React from "react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";
import { Alert, Button, Checkbox, Form, Input, Link, Message, Tag } from "@arco-design/web-react";
import DynamicSkeleton from "@/components/Dynamic/Skeleton";
import style from "./style/index.module.less";
import { IconArrowRight, IconLaunch } from "@arco-design/web-react/icon";
import { ProductStore } from "@/store/product";
import shallow from "zustand/shallow";
import { DynamicImgUpload } from "@/components/Dynamic/Upload/img-upload";
import { UploadItem } from "@arco-design/web-react/es/Upload";
import { postLabelCustomDemand } from "@/api/demand";
import { useHistory } from "react-router";
import { getNextRouter } from "@/utils/getNext";
import DynamicDivider from "@/components/Dynamic/Divider";
import ModelInfoZh from "@/assets/model_info_zh.png";
import LabelInfoZh from "@/assets/label_info_zh.png";
import DynamicImg from "@/components/Dynamic/img";

const FormItem = Form.Item;
const bodyStyle = {
  padding: "3rem"
};
export default function CustomLabel() {
  const t = useLocale();
  const history = useHistory();
  const [form] = Form.useForm();
  const [labelData, setLabelData] = ProductStore(state => [state.labelData, state.setLabelData], shallow);
  const [demandId, serviceType] = ProductStore(state => [state.demandId, state.serviceType], shallow);

  const postLabelCustom = () => {
    try {
      form.validate();
    } catch (error) {
      return;
    }
    let temp = {
      ...labelData,
      ...form.getFieldsValue()
    };
    setLabelData({
      ...temp
    });
    postLabelCustomDemand({
      ...temp,
      demandId: demandId
    }).then(res => {
      if (res.data.success) {
        setLabelData({
          id: res.data.result
        });
        history.push(getNextRouter(4, serviceType));
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


  return (<DynamicOuterCard title={t["firmware.label.title"]} bodyStyle={bodyStyle}>
    <DynamicSkeleton animation text={{ rows: 10, width: ["100%", 600, 400] }}>

      <Alert closable
             className={style["alert"]}
             type="info"
             content={<p>
               {t["firmware.label.help"]}
               <Link target={"_blank"}
                     href="https://www.espressif.com/sites/default/files/documentation/Espressif_Module_Packing_Information_CN.pdf">
                 <IconLaunch style={
                   { color: "#0E42D2", fontSize: 15 }
                 } />
               </Link>
             </p>} />
      <Form
        scrollToFirstError
        form={form}
        initialValues={{ ...labelData }}
        onSubmit={postLabelCustom}
        labelAlign={"left"}
        className={style["label"]}
      >
        <FormItem field="cusLaserLabel">
          <Checkbox checked={labelData?.cusLaserLabel} onChange={(checked) => {
            if (checked) {
              setValue("cusLaserLabel", 1);
            } else {
              setValue("cusLaserLabel", 0);
            }
            setValue("laserFileId", undefined);
          }}>
            <Tag color={"arcoblue"}>{t["firmware.label.model"]}</Tag>
          </Checkbox>
        </FormItem>
        {labelData?.cusLaserLabel === 1 && <div className={style["label-img-context"]}>
          <p style={{ width: "10rem" }}> {t["firmware.label.model"]}</p>
          <FormItem field="laserFileId"
                    triggerPropName="fileList"
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

        </div>}
        {((labelData?.cusLaserLabel === undefined) || (labelData?.cusLaserLabel === 0)) &&
          <div className={style["model-img"]}>
            <b>{t["demand.entry.service.label.default.model"]}</b>
            <DynamicImg zh={ModelInfoZh} en={LabelInfoZh} className={style["model_info"]} alt={"model_img"} />
          </div>}
        <br />
        <div className={style["remark"]}>
          <FormItem label={t["firmware.label.remark"]} field={"cusLaserNotes"}>
            <Input.TextArea
              maxLength={{ length: 400, errorOnly: true }}
              autoSize={{ minRows: 3 }}
              showWordLimit
              placeholder="More than 400 letters will be error"
            />
          </FormItem>
        </div>
        {/*设置默认的图片*/}
        <DynamicDivider />

        <FormItem field="cusOutboxLabel">
          <Checkbox checked={labelData?.cusOutboxLabel} onChange={(checked) => {
            if (checked) {
              setValue("cusOutboxLabel", 1);
            } else {
              setValue("cusOutboxLabel", 0);
            }
            setValue("outboxFileId", undefined);
          }}> <Tag color={"purple"}>{t["firmware.label.box"]}</Tag></Checkbox>
        </FormItem>
        {/*<Tooltip color={"#0E42D2"} position={"rt"}*/}
        {/*         defaultPopupVisible={true}*/}
        {/*         content={t["firmware.label.help"]}>*/}
        {/*  <Link target={"_blank"}*/}
        {/*        href="https://www.espressif.com/sites/default/files/documentation/Espressif_Module_Packing_Information_CN.pdf">*/}
        {/*    <IconLaunch style={*/}
        {/*      { color: "#0E42D2", fontSize: 15 }*/}
        {/*    } />*/}
        {/*  </Link>*/}
        {/*</Tooltip>*/}


        {labelData?.cusOutboxLabel === 1 && <div className={style["label-img-context"]}>
          <p style={{ width: "10rem" }}>{t["firmware.label.box"]}</p>
          <FormItem field="outboxFileId"
                    triggerPropName="fileList"
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
        </div>}
        {((labelData?.cusOutboxLabel === undefined) || (labelData?.cusOutboxLabel === 0)) &&
          <div className={style["model-img"]}>
            <b>{t["demand.entry.service.label.default.model"]}</b>
            <DynamicImg zh={LabelInfoZh} en={LabelInfoZh} className={style["model_info"]} alt={"label_img"} />
          </div>}
        <br />
        <div className={style["remark"]}>
          <FormItem label={t["firmware.label.remark"]} field={"cusOutboxNotes"}>
            <Input.TextArea
              maxLength={{ length: 400, errorOnly: true }}
              autoSize={{ minRows: 3 }}
              showWordLimit
              placeholder="More than 400 letters will be error"
            />
          </FormItem>
        </div>
        <DynamicDivider />
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
