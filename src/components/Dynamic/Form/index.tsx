import React from 'react';
import { Button, DatePicker, Form, Input, Select } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import styles from './style/index.module.less';
import { FormItemProps, FormProps } from '@/components/type';
import locale from './locale';
import dayjs from 'dayjs';
import { IconCheck, IconRefresh } from '@arco-design/web-react/icon';


function DynamicForm(props: FormProps) {
  const [form] = Form.useForm();
  const t = useLocale(locale);
  const FormItem = Form.Item;
  const { formItemLayout } = props;

  const DynamicFormItem = (props: {item: FormItemProps, index: number}) => {
    const {item, index} = props
    if (item.type === 'input') {
      return <FormItem key={index} required={item.required} label={item.label}  field={item.field}><Input allowClear /></FormItem>;
    }
    if (item.type === 'select') {
      return <FormItem key={index} required={item.required} label={item.label} field={item.field}>
        <Select
          options={item.options.map((item, index) => ({
            label: item,
            value: index
          }))}
          allowClear
        />
      </FormItem>;
    }
    if (item.type === 'multiple') {
      return <FormItem key={index} required={item.required} label={item.label} field={item.field}>
        <Select
          options={item.options.map((item, index) => ({
            label: item,
            value: index
          }))}
          mode={'multiple'}
          allowClear
        />
      </FormItem>;
    }
    if (item.type === 'date') {
      return <FormItem key={index} required={item.required} label={item.label} field={item.field}>
        <DatePicker.RangePicker allowClear style={{ width: '100%' }}
                                disabledDate={(date) => dayjs(date).isAfter(dayjs())} />
      </FormItem>;
    }
    return <Input key={index} allowClear />;
  };

  return (
    <div style={{ paddingRight: '2rem' }}>
      <Form
        form={form}
        {...formItemLayout}
        scrollToFirstError
        labelAlign='left'
      >
          {props.formItem.map(
            (item, index) => DynamicFormItem({ item, index})
          )}
      </Form>
      <div className={styles['right-button']}>
        <Button type='primary' icon={<IconCheck />} onClick={() => {
          const values = form.getFieldsValue();
          props.onSubmit(values);
        }}>
          {t['form.submit']}
        </Button>

        <Button icon={<IconRefresh />} onClick={() => {
          form.resetFields();
          props.onRest?.();
        }}>
          {t['form.reset']}
        </Button>
      </div>
    </div>
  );
}

export default DynamicForm;
