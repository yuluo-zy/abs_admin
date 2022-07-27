import React from "react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import DynamicCard from "@/components/Dynamic/Card";
import { Button, Form, Grid, Input, InputNumber, Notification, Select } from "@arco-design/web-react";
import DynamicRadioGroup from "@/components/Dynamic/Radio";
import { IconArrowFall, IconArrowRise, IconDelete } from "@arco-design/web-react/icon";
import style from "./style/index.module.less";

const Row = Grid.Row;
const Col = Grid.Col;
export default function SerialCheck(props: { initialValues? }) {
  const { initialValues } = props;
  const t = useLocale();
  const [form] = Form.useForm();

  initialValues.serial_check_str = [""];
  if (initialValues?.serialCheckStr1 && initialValues?.serialCheckStr1.length > 0) {
    initialValues.serial_check_str[0] = initialValues?.serialCheckStr1;
  }
  if (initialValues?.serialCheckStr2 && initialValues?.serialCheckStr2.length > 0) {
    initialValues.serial_check_str[1] = initialValues?.serialCheckStr2;
  }
  if (initialValues?.serialCheckStr3 && initialValues?.serialCheckStr3.length > 0) {
    initialValues.serial_check_str[2] = initialValues?.serialCheckStr3;
  }

  return (
    <DynamicCard title={t["firmware.serial.check.title"]}>
      <Row>
        <Col xs={24} sm={22} lg={20} xxl={14}>
          <Form
            form={form}
            id={"firmware.serial.check.title"}
            scrollToFirstError
            labelAlign="left"
            labelCol={{ span: 4, offset: 0 }}
            initialValues={initialValues}
          >
            <Form.Item field="serialType" label={t["demand.service.firmware.serial.check.type"]}

                       required={true} rules={[{
              required: true,
              message: t["demand.service.firmware.serial.check.error"]
            }]}>
              <DynamicRadioGroup
                defaultValue={initialValues?.serialType}
                options={[
                  { label: t["demand.service.firmware.serial.check.universal"], value: 0 },
                  { label: t["demand.service.firmware.serial.check.self"], value: 1 }
                ]}></DynamicRadioGroup>
            </Form.Item>
            <Form.Item
              shouldUpdate
              noStyle>
              {(values) => {
                return values?.serialType === 0 ? (
                  <Form.Item field="generalSerial"
                             label={t["firmware.serial.universal.serial.port"]}
                             rules={[
                               {
                                 required: true,
                                 message: t["firmware.serial.universal.serial.port.error"]
                               }]}
                  >
                    <Select options={[
                      { label: "UART0", value: 0 },
                      { label: "UART1", value: 1 }]}
                            allowClear
                    />

                  </Form.Item>
                ) : (
                  values?.serialType === 1 && (
                    <Form.Item key={1} label={t["firmware.serial.self.serial.port"]} required
                               style={{ marginBottom: 0 }}>
                      <Grid.Row gutter={8}>
                        <Grid.Col span={12}>
                          <Form.Item field="customSerialTx"
                                     rules={[{ required: true, message: "TX: GPIO() is required" }]}>
                            <InputNumber min={0} placeholder="TX: GPIO()" />
                          </Form.Item>
                        </Grid.Col>
                        <Grid.Col span={12}>
                          <Form.Item field="customSerialRx"
                                     rules={[{ required: true, message: "RX: GPIO() is required" }]}>
                            <InputNumber min={0} placeholder="RX: GPIO()" />
                          </Form.Item>
                        </Grid.Col>
                      </Grid.Row>
                    </Form.Item>
                  )
                );
              }}
            </Form.Item>
            <Form.Item field="serialBaud" required={true} label={t["firmware.serial.self.serial.baud.rate"]} rules={[
              {
                required: true,
                message: t["firmware.serial.self.serial.baud.rate.error"],
                minLength: 1
              }
            ]}>
              <Input allowClear />
            </Form.Item>
            <Form.List field="serial_check_str" initialValue={initialValues?.serial_check_str}>
              {(fields, { add, remove, move }) => {
                return (
                  <div>
                    {fields.map((item, index) => {
                      return (
                        <Grid.Row key={item.key}>
                          <Form.Item
                            field={item.field}
                            labelCol={{ span: 4, offset: 0 }}
                            label={t["demand.service.firmware.serial.check.str"] + (index + 1)}
                            rules={[
                              {
                                required: true
                              }
                            ]}
                          >
                            <Input allowClear placeholder={t["demand.service.firmware.serial.check.str.help"]} />
                          </Form.Item>

                          <div className={style["button_group"]}>
                            <Button
                              icon={<IconDelete />}
                              shape="circle"
                              status="danger"
                              style={{
                                margin: "0 20px"
                              }}
                              onClick={() => remove(index)}
                            ></Button>
                            <Button
                              shape="circle"
                              onClick={() => move(index, index > 0 ? index - 1 : index + 1)}
                            >
                              {index > 0 ? <IconArrowRise /> : <IconArrowFall />}
                            </Button>
                          </div>


                        </Grid.Row>
                      );
                    })}
                    <div>
                      <Button
                        type={"primary"}
                        style={{ marginRight: 20 }}
                        onClick={() => {
                          if (fields.length >= 3) {
                            Notification.warning({
                              content: t["demand.service.firmware.serial.check.str.size"],
                              position: "bottomRight"
                            });
                          } else {
                            add();
                          }

                        }}
                      >{t["demand.service.firmware.serial.check.add"]}
                      </Button>
                    </div>
                  </div>
                );
              }}
            </Form.List>

          </Form>
        </Col>
        <Col />
      </Row>

    </DynamicCard>
  );
}
