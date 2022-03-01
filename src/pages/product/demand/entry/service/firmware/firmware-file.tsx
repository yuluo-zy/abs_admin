import React, { useRef } from 'react';
import useLocale from '@/pages/product/demand/locale/useLocale';
import DynamicCard from '@/components/Dynamic/Card';
import { Button, Form, Input, Space, Upload } from '@arco-design/web-react';
import { IconDelete } from '@arco-design/web-react/icon';


export default function FirmwareFile() {
  const t = useLocale();
  const formRef = useRef();
  return (
    <DynamicCard title={t['firmware.information.title']}>
      <Form
        ref={formRef}
        style={{ width: 600 }}
        initialValues={{
          users: [{ username: 'aaa', address: 'bbb' }]
        }}
        onValuesChange={(_, v) => {
          console.log(_, v);
        }}
      >
        <Form.List field='users'>
          {(fields, { add, remove, move }) => {
            return (
              <div>
                {fields.map((item, index) => {
                  return (
                    <div key={item.key}>
                      <Form.Item label={'Firmware ' + index}>
                        <Space>
                          <Form.Item
                            field={item.field + '.username'}
                            rules={[{ required: true }]}
                            noStyle
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            field={item.field + '.address'}
                            rules={[{ required: true }]}
                            noStyle
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            field={item.field + '.address'}
                            rules={[{ required: true }]}
                            noStyle
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            field={item.field + '.address'}
                            rules={[{ required: true }]}
                            noStyle
                          >
                            <Upload action='/' />
                          </Form.Item>
                          <Button icon={<IconDelete />} shape='circle' status='danger' onClick={() => remove(index)}>
                          </Button>
                        </Space>
                      </Form.Item>
                    </div>
                  );
                })}
                <Form.Item wrapperCol={{ offset: 5 }}>
                  <Button
                    onClick={() => {
                      add();
                    }}
                  >
                    Add 固件
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </Form>
    </DynamicCard>
  );
}
