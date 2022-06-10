import React from 'react';
import DynamicOuterCard from '@/components/Dynamic/Card/outer-frame';
import useLocale from '@/pages/product/demand/locale/useLocale';
import { Button, Form } from '@arco-design/web-react';
import DynamicUpload from '@/components/Dynamic/Upload';
import { UploadItem } from '@arco-design/web-react/es/Upload';
import styles from './style/index.module.less';
import { ProductStore } from '@/store/product';
import shallow from 'zustand/shallow';
import { IconArrowRight } from '@arco-design/web-react/icon';

const FormItem = Form.Item;

const bodyStyle = {
  paddingTop: '0',
  transition: ' 0.5s all ease-in-out'
};
export default function CheckSelection() {
  const t = useLocale();
  const [checkData, setCheckData] =
    ProductStore(state => [state.checkData, state.setCheckData], shallow);

  return <DynamicOuterCard title={t['hardware.production.info.title']} bodyStyle={bodyStyle}>
      <table cellPadding='1' cellSpacing='1' className={styles['table-style']}>
        <tr>
          <th className={styles['medium']}>Items</th>
          <th className={styles['medium']}>提供示例文件</th>
          <th colSpan={2}>备注</th>
        </tr>
        <tr>
          <td>{t['self.check.boot.log']}</td>
          <td align='center'>
              <DynamicUpload limit={1}
                             onChange={(fileList: UploadItem, file: UploadItem) => {
                               setCheckData({ 'serialFileId': fileList });
                             }} /></td>
          <td><p>{t['self.check.boot.file.context']}</p></td>
          <td><p>{}</p></td>
        </tr>

        <tr>
          <td>eFuse summary</td>
          <td>
              <DynamicUpload limit={1} onChange={(fileList: UploadItem, file: UploadItem) => {
                setCheckData({ 'efuseFileId': fileList });
              }} />
          </td>
          <td><p>{t['self.check.boot.efuse.context']}</p></td>
          <td><p>{}</p></td>
        </tr>
      </table>
    <div className={styles['context-next']}>
      <Button
        type="primary"
        size={"large"}
        icon={<IconArrowRight />}>
        {t['self.check.button']}
      </Button>
    </div>
  </DynamicOuterCard>;
}
