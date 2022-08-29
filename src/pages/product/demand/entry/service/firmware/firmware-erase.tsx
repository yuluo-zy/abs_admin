import React from "react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import DynamicCard from "@/components/Dynamic/Card";
import { Form, Grid, InputNumber, Tooltip } from "@arco-design/web-react";

const Row = Grid.Row;
const Col = Grid.Col;
export default function FirmwareErase(props: { initialValues? }) {
  const { initialValues } = props;
  const t = useLocale();
  const [form] = Form.useForm();
  return (
    <DynamicCard title={t["firmware.erase.title"]}>
      <Row>
        <Col xs={24} sm={22} lg={20} xxl={14}>
          <Form
            form={form}
            id={"firmware.erase.title"}
            scrollToFirstError
            labelAlign="left"
            labelCol={{ span: 4, offset: 0 }}
            initialValues={initialValues}
          > <Tooltip color={"#0E42D2"} position={"rt"}
                     defaultPopupVisible
                     content={t["firmware.erase.sector.help"]}>
            <Form.Item key={1} label={t["firmware.erase.sector"]} required
                       style={{ marginBottom: 0 }}>
              <Grid.Row gutter={8}>
                <Grid.Col span={12}>
                  <Form.Item field="sectorStart"
                             label={"start: "}
                             rules={[{ required: true, message: t["firmware.erase.sector.error"] }]}>
                    <InputNumber min={0} placeholder="0x" style={{ width: "100" }} />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Form.Item field="sectorEnd"
                             label={"to: "}
                             rules={[{ required: true, message: t["firmware.erase.sector.error"] }]}>
                    <InputNumber min={0} placeholder="0x" style={{ width: "100" }} />
                  </Form.Item>
                </Grid.Col>
              </Grid.Row>
            </Form.Item>
          </Tooltip>
          </Form>
        </Col>
      </Row>
    </DynamicCard>
  );
}
