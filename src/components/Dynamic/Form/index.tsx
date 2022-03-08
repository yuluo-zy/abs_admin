import React, { useMemo } from 'react';
import { Button, DatePicker, Form, Grid, Input, InputNumber, Select, Upload } from '@arco-design/web-react';
import useLocale from '@/utils/useHook/useLocale';
import styles from './style/index.module.less';
import { FormItemProps, FormList, FormProps, Recordable } from '@/components/type';
import locale from './locale';
import dayjs from 'dayjs';
import { IconCheck, IconDelete, IconPlus, IconRefresh } from '@arco-design/web-react/icon';
import cs from 'classnames';
import useDebounce from '@/utils/useHook/useDebounce';

const { Row, Col } = Grid;
const FormItem = Form.Item;
const TextArea = Input.TextArea;


function DynamicForm(props: FormProps) {
  const [form] = Form.useForm();
  const t = useLocale(locale);
  const { className } = props;

  const DynamicFormItem = (props: { item: FormItemProps; index: number }) => {
    const { item, index } = props;
    if (item.type === 'input') {
      return (
        <FormItem
          key={index}
          labelCol={item.labelCol as Recordable}
          required={item.required}
          label={item.label}
          field={item.field}
        >
          <Input allowClear placeholder={item.placeholder} />
        </FormItem>
      );
    }
    if (item.type === 'password') {
      return (
        <FormItem
          key={index}
          labelCol={item.labelCol as Recordable}
          required={item.required}
          label={item.label}
          field={item.field}
        >
          <Input type={'password'} allowClear placeholder={item.placeholder} />
        </FormItem>
      );
    }
    if (item.type === 'number') {
      return (
        <FormItem
          key={index}
          labelCol={item.labelCol as Recordable}
          required={item.required}
          label={item.label}
          field={item.field}
        >
          <InputNumber placeholder={item.placeholder} />
        </FormItem>
      );
    }
    if (item.type === 'select') {
      return (
        <FormItem
          key={index}
          labelCol={item.labelCol as Recordable}
          required={item.required}
          label={item.label}
          field={item.field}
        >
          <Select options={item.options} allowClear placeholder={item.placeholder} />
        </FormItem>
      );
    }
    if (item.type === 'text') {
      return (
        <FormItem
          key={index}
          labelCol={item.labelCol as Recordable}
          required={item.required}
          label={item.label}
          field={item.field}
        >
          <TextArea allowClear autoSize placeholder={item.placeholder} />
        </FormItem>
      );
    }
    if (item.type === 'multiple') {
      return (
        <FormItem
          key={index}
          labelCol={item.labelCol as Recordable}
          required={item.required}
          label={item.label}
          field={item.field}
        >
          <Select options={item.options} mode={'multiple'} allowClear placeholder={item.placeholder} />
        </FormItem>
      );
    }
    if (item.type === 'date') {
      return (
        <FormItem
          key={index}
          labelCol={item.labelCol as Recordable}
          required={item.required}
          label={item.label}
          field={item.field}
        >
          <DatePicker.RangePicker
            allowClear
            style={{ width: '100%' }}
            disabledDate={(date) => dayjs(date).isAfter(dayjs())}
          />
        </FormItem>
      );

    }
    if (item.type === 'self') {
      return item.node;
    }
    if (item.type === 'upload') {
      return (
        <FormItem
          key={index}
          labelCol={item.labelCol as Recordable}
          required={item.required}
          label={item.label}
          field={item.field}
        >
          <Upload action='/' />
        </FormItem>
      );
    }
    return <Input key={index} allowClear />;
  };

  function DynamicFormList(props: FormList) {

    const { field, fieldList } = props;
    return (
      <Form.List field={field}>

        {(fields, { add, remove }) => {
          return (
            <div style={{ width: '100%' }}>
              <div className={styles['list-button']}>
                <Button
                  style={{ marginRight: 20 }}
                  status={'default'}
                  type='primary'
                  icon={<IconPlus />}
                  onClick={() => {
                    add();
                  }}
                >{t['list.add']}</Button>
                <Button icon={<IconDelete />} status='danger'
                        onClick={() => {
                          remove(fields.length - 1);
                        }}>{t['list.remove']}</Button>
              </div>
              {fields.map((item, index) => {
                return (
                  <div key={item.key} className={props.styles}>

                    {/*<Form.Item colon>*/}
                    <Row gutter={10} justify='start' align='start'>
                      <Col span={props.fieldLabel}>{field}</Col>
                      {fieldList.map((item, index) => <Col key={index} span={item.labelCol as any}>{DynamicFormItem({
                        item,
                        index
                      })}</Col>)}
                    </Row>
                    {/*</Form.Item>*/}
                  </div>
                );
              })}
            </div>
          );
        }}
      </Form.List>);
  }

  const DynamicFormNode = useMemo(() => {
    const round = Math.random();
    if (props.formList) {

      return (
        <Form
          key={round}
          form={form}
          id={props.title}
          {...props.formItemLayout}
          scrollToFirstError
          labelAlign='left'
          initialValues={props.data}
        >
          {DynamicFormList(props.formList)}
        </Form>
      );
    }
    if (props.col) {
      return (
        <Form
          key={round}
          form={props.formData ? props.formData : form}
          id={props.title}
          {...props.formItemLayout}
          scrollToFirstError
          labelAlign='left'
          initialValues={props.data}
          layout={props.layout}
        >
          <Row gutter={24}>
            {props.formItem.map((item, index) => {
              return (
                <Col key={index} span={Math.floor(24 / props.col)}>
                  {DynamicFormItem({ item, index })}
                </Col>
              );
            })}
          </Row>
        </Form>
      );
    }
    return (
      <Form
        key={round}
        form={form}
        id={props.title}
        {...props.formItemLayout}
        scrollToFirstError
        labelAlign='left'
        initialValues={props.data}
      >
        {props.formItem.map((item, index) => DynamicFormItem({ item, index }))}
      </Form>
    );
  }, [props.data]);

  const submitData = useDebounce(() => {
    const values = form.getFieldsValue();
    props.onSubmit(values);
  });

  const resetData = useDebounce(() => {
    form.resetFields();
    props.onRest?.();
  }, 100);

  return (
    <div style={{ paddingRight: '2rem' }} className={cs(className)}>
      <div>{DynamicFormNode}</div>
      <div>{props.children}</div>
      {
        props.formData == undefined && <div className={styles['right-button']}>
          <Button
            type='primary'
            icon={<IconCheck />}
            onClick={submitData}
          >
            {t['form.submit']}
          </Button>

          <Button
            icon={<IconRefresh />}
            onClick={resetData}
          >
            {t['form.reset']}
          </Button>
        </div>
      }
    </div>
  );
}

export default DynamicForm;
