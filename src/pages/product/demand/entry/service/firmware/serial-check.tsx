import React from 'react';
import { FormItemProps } from '@/components/type';
import useLocale from '@/pages/product/demand/locale/useLocale';
import DynamicForm from '@/components/Dynamic/Form';
import DynamicCard from '@/components/Dynamic/Card';
import { Form, Grid, InputNumber } from '@arco-design/web-react';

const Row = Grid.Row;
const Col = Grid.Col;
export default function SerialCheck() {
  const t = useLocale();
  const informationProps: Array<FormItemProps> = [
    {
      label: t['firmware.serial.universal.serial.port'],
      type: 'select',
      field: 'generalSerial',
      required: true,
      options: [
        { label: 'UART0', value: 0 },
        { label: 'UART1', value: 1 }]
    },
    {
      label: t['firmware.serial.self.serial.port'],
      type: 'self',
      field: '',
      node:
        <Form.Item key={1} label={t['firmware.serial.self.serial.port']} required style={{ marginBottom: 0 }}>
          <Grid.Row gutter={8}>
            <Grid.Col span={12}>
              <Form.Item field='customSerialTx' rules={[{ required: true, message: 'TX: GPIO() is required' }]}>
                <InputNumber min={0} placeholder='TX: GPIO()' />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={12}>
              <Form.Item field='customSerialRx' rules={[{ required: true, message: 'RX: GPIO() is required' }]}>
                <InputNumber min={0} placeholder='RX: GPIO()' />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
        </Form.Item>
    },
    {
      label: t['firmware.serial.self.serial.baud.rate'],
      type: 'input',
      field: 'serialBaud',
      required: true,
      rules: [
        {
          required: true,
          message: t['firmware.information.startAddress.error'],
          minLength: 2
        }
      ]
    },
    {
      label: t['firmware.serial.self.serial.check.character'],
      type: 'text',
      field: 'serial_check_str',
      required: true,
      rules: [
        {
          required: true,
          message: t['firmware.information.upLoad.error'],
          minLength: 2
        }
      ]
    }
  ];

  return (
    <DynamicCard title={t['firmware.serial.check.title']} help={'kjhkjhkjhkjh'}>
      <Row>
        <Col xs={24} sm={20} lg={18} xxl={18}>
          <DynamicForm title={'firmware.serial.check.title'}
                       formItem={informationProps} />
        </Col>
        <Col />
      </Row>

    </DynamicCard>
  );
}
