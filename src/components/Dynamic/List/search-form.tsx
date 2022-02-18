import React, { useContext } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Grid,
  Input,
  Select,
} from '@arco-design/web-react';
import { GlobalContext } from '@/context';
import locale from './locale';
import useLocale from '@/utils/useLocale';
import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';
import styles from './style/index.module.less';
import dayjs from 'dayjs';
import { SearchItem } from '@/components/type';

const { Row, Col } = Grid;

function SearchForm(props: {
  onSearch: (values: Record<string, any>) => void;
  searchItem: Array<SearchItem>;
}) {
  const { lang } = useContext(GlobalContext);
  const [form] = Form.useForm();
  const t = useLocale(locale);
  const FormItem = Form.Item;

  const colSpan = lang === 'zh-CN' ? 8 : 12;

  const SelectFormItem = (item: SearchItem) => {
    if (item.type === 'input') {
      return (
        <FormItem label={item.name} field={item.field}>
          <Input allowClear />
        </FormItem>
      );
    }
    if (item.type === 'select') {
      return (
        <FormItem label={item.name} field={item.field}>
          <Select
            options={item.options.map((item, index) => ({
              label: item,
              value: index,
            }))}
            allowClear
          />
        </FormItem>
      );
    }
    if (item.type === 'multiple') {
      return (
        <FormItem label={item.name} field={item.field}>
          <Select
            options={item.options.map((item, index) => ({
              label: item,
              value: index,
            }))}
            mode={'multiple'}
            allowClear
          />
        </FormItem>
      );
    }
    if (item.type === 'date') {
      return (
        <FormItem label={item.name} field={item.field}>
          <DatePicker.RangePicker
            allowClear
            style={{ width: '100%' }}
            disabledDate={(date) => dayjs(date).isAfter(dayjs())}
          />
        </FormItem>
      );
    }
    return <Input allowClear />;
  };

  return (
    <div className={styles['search-form-wrapper']}>
      <Form
        form={form}
        className={styles['search-form']}
        labelAlign="left"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
      >
        <Row gutter={24}>
          {props.searchItem.map((item, index) => (
            <Col span={colSpan} key={index}>
              <SelectFormItem {...item} />
            </Col>
          ))}
        </Row>
      </Form>
      <div className={styles['right-button']}>
        <Button
          type="primary"
          icon={<IconSearch />}
          onClick={() => {
            const values = form.getFieldsValue();
            props.onSearch(values);
          }}
        >
          {t['searchTable.form.search']}
        </Button>

        <Button
          icon={<IconRefresh />}
          onClick={() => {
            form.resetFields();
            props.onSearch({});
          }}
        >
          {t['searchTable.form.reset']}
        </Button>
      </div>
    </div>
  );
}

export default SearchForm;
