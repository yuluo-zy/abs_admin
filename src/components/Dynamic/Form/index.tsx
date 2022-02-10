import React, { useMemo } from 'react';
import { Button, DatePicker, Form, Grid, Input, InputNumber, Select } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import styles from './style/index.module.less';
import { FormItemProps, FormProps } from '@/components/type';
import locale from './locale';
import dayjs from 'dayjs';
import { IconCheck, IconRefresh } from '@arco-design/web-react/icon';
import useDebounce from '@/utils/useSelf';

const { Row, Col } = Grid;


function DynamicForm(props: FormProps) {
  const [form] = Form.useForm();
  const t = useLocale(locale);
  const FormItem = Form.Item;

  const DynamicFormItem = (props: { item: FormItemProps; index: number }) => {

    const { item, index } = props;
    if (item.type === 'input') {
      return <FormItem key={index} required={item.required} label={item.label} field={item.field}><Input
        allowClear /></FormItem>;
    }
    if (item.type === 'password') {
      return <FormItem key={index} required={item.required} label={item.label} field={item.field}><Input
        type={'password'}
        allowClear /></FormItem>;
    }
    if (item.type === 'number') {
      return <FormItem key={index} required={item.required} label={item.label}
                       field={item.field}><InputNumber /></FormItem>;
    }
    if (item.type === 'select') {
      return <FormItem key={index} required={item.required} label={item.label} field={item.field}>
        <Select
          options={item.options}
          allowClear
        />
      </FormItem>;
    }
    if (item.type === 'multiple') {
      return <FormItem key={index} required={item.required} label={item.label} field={item.field}>
        <Select
          options={item.options}
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

  const DynamicFormNode = useMemo(() => {

    const round = Math.random();
    if (props.col) {
      // const row = Math.floor( props.formItem.length / props.col);
      // const formNode = []
      // for(let i = 0; i < row ; i++){
      //   formNode.push(
      //
      //
      //   )
      // }
      return <Form
        key={round}
        form={form}
        id={props.title}
        {...props.formItemLayout}
        scrollToFirstError
        labelAlign='left'
        initialValues={props.data}
      >
        < Row gutter={24}>
          {props.formItem.map(
            (item, index) => {
              return <Col key={index} span={Math.floor(24 / props.col)}>
                {DynamicFormItem({ item, index })}
              </Col>;
            }
          )}
        </Row>
      </Form>;
    }
    return <Form
      key={round}
      form={form}
      id={props.title}
      {...props.formItemLayout}
      scrollToFirstError
      labelAlign='left'
      initialValues={props.data}
    >
      {props.formItem.map(
        (item, index) => DynamicFormItem({ item, index })
      )}
    </Form>
  },[props.data]);


  return (
    <div style={{ paddingRight: '2rem' }}>
      {
        DynamicFormNode
      }
      <div className={styles['right-button']}>
        <Button type='primary' icon={<IconCheck />} onClick={useDebounce(() => {
          const values = form.getFieldsValue();
          props.onSubmit(values);
        })}>
          {t['form.submit']}
        </Button>

        <Button icon={<IconRefresh />} onClick={useDebounce(() => {
          form.resetFields();
          props.onRest?.();
        }, 100)}>
          {t['form.reset']}
        </Button>
      </div>
    </div>
  );
}

export default DynamicForm;
