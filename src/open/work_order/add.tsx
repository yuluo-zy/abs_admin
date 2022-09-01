import useLocale from "@/utils/useHook/useLocale";
import locale from "@/open/work_order/locale";
import React from "react";
import { useHistory } from "react-router";
import styles from "./style/add.module.less";
import DynamicCard from "@/components/Dynamic/Card";
import {
  Button,
  DatePicker,
  Form,
  Grid,
  Input,
  InputNumber,
  Modal,
  Select,
  Tooltip,
  Typography,
  Upload
} from "@arco-design/web-react";
import DynamicDivider from "@/components/Dynamic/Divider";
import { IconArrowRise, IconExclamationCircle } from "@arco-design/web-react/icon";

const FormItem = Form.Item;
export default function WorkOrderAdd() {
  const t = useLocale(locale);
  const history = useHistory();
  const to_return = () => {
    history.push("/open/work_order");
  };
  const options = [
    {
      label: t["workplace.add.custom.product.stage.a"],
      key: 1
    },
    {
      label: t["workplace.add.custom.product.stage.b"],
      key: 2
    },
    {
      label: t["workplace.add.custom.product.stage.c"],
      key: 3
    },
    {
      label: t["workplace.add.custom.product.stage.d"],
      key: 4
    }
  ];
  return <div className={styles["main"]}>
    <div>
      <Button onClick={to_return}>{t["workplace.add.return"]}</Button>
    </div>
    <div className={styles["content"]}>
      <DynamicCard title={t["workplace.content.work_order.quality"]}>
        <Typography.Title heading={2}
                          className={styles["content-title"]}>{t["workplace.content.work_order.add"]}</Typography.Title>
        <Form autoComplete="off" labelAlign={"left"}>
          <DynamicCard title={t["workplace.add.custom"]}>
            <FormItem label={t["workplace.add.custom.quality"]} required>
              <Grid.Row gutter={8}>
                <Grid.Col span={12}>
                  <Form.Item field="name" label={t["workplace.add.custom.phone"]} rules={[{ required: true }]}>
                    <Input placeholder="please enter you phone" maxLength={30} style={{ width: 400 }} />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Form.Item field="age" rules={[{ required: true }]} label={t["workplace.add.custom.email"]}>
                    <Input placeholder="please enter your email" maxLength={30} style={{ width: 400 }} />
                  </Form.Item>
                </Grid.Col>
              </Grid.Row>
            </FormItem>
            <FormItem label={t["workplace.add.custom.purchase"]} required>
              <Grid.Row gutter={8}>
                <Grid.Col span={12}>
                  <Form.Item field="name" label={t["workplace.add.custom.phone"]} rules={[{ required: true }]}>
                    <Input placeholder="please enter you phone" maxLength={30} style={{ width: 400 }} />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Form.Item field="age" rules={[{ required: true }]} label={t["workplace.add.custom.email"]}>
                    <Input placeholder="please enter your email" maxLength={30} style={{ width: 400 }} />
                  </Form.Item>
                </Grid.Col>
              </Grid.Row>
            </FormItem>
            <FormItem label={t["workplace.add.custom.espressif"]} required>
              <Grid.Row gutter={8}>
                <Grid.Col span={12}>
                  <Form.Item field="name" label={t["workplace.add.custom.name"]} rules={[{ required: true }]}>
                    <Input placeholder="please enter espressif name" maxLength={30} style={{ width: 400 }} />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Form.Item field="age" rules={[{ required: true }]} label={t["workplace.add.custom.email"]}>
                    <Input placeholder="please enter espressif email" maxLength={30} style={{ width: 400 }} />
                  </Form.Item>
                </Grid.Col>
              </Grid.Row>
            </FormItem>
          </DynamicCard>
          <DynamicDivider />
          <DynamicCard title={t["workplace.add.custom.product"]}>
            <FormItem label={t["workplace.add.custom.module"]} required>
              <Grid.Row align="center">
                <FormItem field="age" noStyle={{ showErrorTip: true }} rules={[{ required: true }]}>
                  <Input placeholder="please enter espressif email" maxLength={30} style={{ width: 400 }} />
                </FormItem>
                <Tooltip content={t["workplace.add.custom.module.help"]}>
                  <IconExclamationCircle style={{ margin: "0 8px", color: "rgb(var(--arcoblue-6))" }} />
                </Tooltip>
              </Grid.Row>
            </FormItem>
            <FormItem label={t["workplace.add.custom.product.number"]} required>
              <Grid.Row gutter={8}>
                <Grid.Col span={12}>
                  <Form.Item field="name" label={t["workplace.add.custom.product.number.actual"]}
                             rules={[{ required: true }]}>
                    <InputNumber placeholder="please enter espressif name" max={1000000} min={1}
                                 style={{ width: 400 }} />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Form.Item field="age" rules={[{ required: true }]}
                             label={t["workplace.add.custom.product.number.defective"]}>
                    <InputNumber placeholder="please enter espressif email" max={100000} min={1}
                                 style={{ width: 400 }} />
                  </Form.Item>
                </Grid.Col>
              </Grid.Row>
            </FormItem>
            <Form.Item field="name" label={t["workplace.add.custom.product.date"]} rules={[{ required: true }]}>
              <DatePicker showTime style={{ width: 400 }} />
            </Form.Item>
            <Form.Item field="name" label={t["workplace.add.custom.product.stage"]} rules={[{ required: true }]}>
              <Select
                style={{ width: 400 }}
                placeholder="Please select">
                {options.map((option, index) => (
                  <Select.Option key={index} value={option.key}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item field="name" label={t["workplace.add.custom.product.stage"]}>
              <Input.TextArea showWordLimit placeholder={t["workplace.add.custom.product.description.help"]}
                              minLength={30} maxLength={200} style={{ minHeight: 64, width: 600 }} />
            </Form.Item>
          </DynamicCard>
          <DynamicDivider />
          <DynamicCard title={t["workplace.add.custom.product.issue"]}>
            <Form.Item field="name" label={t["workplace.add.custom.product.issue.description"]} required>
              <Input.TextArea showWordLimit placeholder={t["workplace.add.custom.product.description.help"]}
                              minLength={50} maxLength={500} style={{ minHeight: 64, width: 600 }} />
            </Form.Item>
            <Form.Item field="name" triggerPropName="fileList" label={t["workplace.add.custom.product.issue.picture"]}>
              <Upload
                multiple
                defaultFileList={[]}
                action="/"
                listType="picture-card"
                onPreview={(file) => {
                  Modal.info({
                    title: "preview",
                    content: (
                      <div
                        style={{
                          textAlign: "center"
                        }}
                      >
                        <img
                          style={{
                            maxWidth: "100%"
                          }}
                          src={file.url || URL.createObjectURL(file.originFile)}
                          alt={"preview"} />
                      </div>
                    )
                  });
                }}
              />
            </Form.Item>
            <Form.Item field="name" label={t["workplace.add.custom.product.issue.appendix"]}>
              <Upload />
            </Form.Item>
          </DynamicCard>
          <DynamicDivider />
          <Button type="primary"
                  size={"large"}
                  htmlType="submit"
                  icon={<IconArrowRise />}
          >
            {t["workplace.add.custom.upload"]}
          </Button>
        </Form>
      </DynamicCard>

    </div>
  </div>;
}
