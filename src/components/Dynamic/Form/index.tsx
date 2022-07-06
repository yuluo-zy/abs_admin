import React, { useMemo } from "react";
import { Button, DatePicker, Form, Grid, Input, InputNumber, Select } from "@arco-design/web-react";
import useLocale from "@/utils/useHook/useLocale";
import styles from "./style/index.module.less";
import { FormItemProps, FormList, FormProps, Recordable } from "@/components/type";
import locale from "./locale";
import dayjs from "dayjs";
import { IconCheck, IconDelete, IconPlus, IconRefresh } from "@arco-design/web-react/icon";
import cs from "classnames";
import useDebounce from "@/utils/useHook/useDebounce";
import DynamicUpload from "@/components/Dynamic/Upload";
import { UploadItem } from "@arco-design/web-react/es/Upload";

const { Row, Col } = Grid;
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const { RangePicker } = DatePicker;

function DynamicForm(props: FormProps) {
  let form = null
  if(props.formData){
    form = props.formData
  }else {
    [form] = Form.useForm();
  }
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
          rules={item.rules}
          style={item.style}
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
          rules={item.rules}
          style={item.style}
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
          rules={item.rules}
          style={item.style}
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
          rules={item.rules}
          style={item.style}
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
          rules={item.rules}
          style={item.style}
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
          rules={item.rules}
          style={item.style}
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
          style={item.style}
          rules={item.rules}
        >
          <RangePicker
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
          rules={item.rules}
          style={item.style}
          triggerPropName='fileList'
          help={item.placeholder}
        >
          <DynamicUpload limit={item.limit} onChange={(fileList: UploadItem[], file: UploadItem) => {
            if(item.limit > 1){
              const res = []
              fileList.forEach( r => {
                res.push(r.response)
              })
              form.setFieldValue(item.field, res)
            }else {
              if(fileList.length > 0){
                form.setFieldValue(item.field, file.response)
              }else {
                form.setFieldValue(item.field, undefined)
              }

            }

          }}  />
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
          form={form}
          id={props.title}
          {...props.formItemLayout}
          scrollToFirstError
          labelAlign='left'
          initialValues={props.data}
          layout={props.layout}
          style={props.layout === 'inline' ? { width: '100%' } : { }}
        >
          <Row gutter={24} style={props.layout === 'inline' ? { width: '100%', alignItems: 'center' } : { }}>
            {props.formItem.map((item, index) => {
              if( typeof props.col  === "number"){
                return (
                  <Col key={index} span={Math.floor(24 / props.col)}>
                    {DynamicFormItem({ item, index })}
                  </Col>
                );
              }
              return (
                <Col key={index} span={ props.col[index]}>
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
        style={props.layout === 'inline' ? { width: '100%' } : { maxWidth: 600 }}

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
        (props.formData == undefined && props.onSubmit != undefined) && <div className={styles['right-button']}>
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
