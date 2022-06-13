import React, { useEffect, useState } from 'react';
import DynamicOuterCard from '@/components/Dynamic/Card/outer-frame';
import useLocale from '@/pages/product/demand/locale/useLocale';
import { Button, Form, Modal } from '@arco-design/web-react';
import DynamicUpload from '@/components/Dynamic/Upload';
import { UploadItem } from '@arco-design/web-react/es/Upload';
import styles from './style/index.module.less';
import { ProductStore } from '@/store/product';
import shallow from 'zustand/shallow';
import { IconArrowRight } from '@arco-design/web-react/icon';
import { useHistory } from 'react-router';

const FormItem = Form.Item;

const bodyStyle = {
  paddingTop: '0',
  transition: ' 0.5s all ease-in-out'
};
export default function CheckSelection() {
  const t = useLocale();
  const history = useHistory();
  const [checkData, setCheckData, moduleInfo, demandId] =
    ProductStore(state => [state.checkData, state.setCheckData, state.moduleInfo, state.demandId], shallow);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (moduleInfo.mpn == null) {
      Modal.confirm({
        title: "ERROR",
        content: t["message.hardware.notfound"],
        okButtonProps: { status: "danger" },
        mask: true,
        maskClosable: false,
        cancelButtonProps: { disabled: true },
        onOk: () => {
          history.push(`/product/demand/hardware`);
        }
      });
    }}, [])

  const postCheck = () => {
    setVisible(!visible)
    // postCheckCustomDemand({
    //   'demandId': demandId,
    //   ...checkData
    // }).then(res => {
    //
    // })
  }

  const nextStep = () => {
    setVisible(false)
    history.push(`/product/demand/hardware`);
  }



  return <DynamicOuterCard title={t['hardware.production.info.title']} bodyStyle={bodyStyle}>
      <table cellPadding='1' cellSpacing='1' className={styles['table-style']}>
        <tr>
          <th className={styles['medium']}>Items</th>
          <th className={styles['max']}>提供示例文件</th>
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
        icon={<IconArrowRight />}
      onClick={postCheck}>
        {t['self.check.button']}
      </Button>
    </div>

    <Modal
      title={t['self.check.result']}
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      autoFocus={false}
      focusLock={true}
      footer={
        <Button onClick={nextStep}>OK</Button>
      }
    >
      <p>
        You can customize modal body text by the current situation. This modal will be closed
        immediately once you press the OK button.
      </p>
    </Modal>
  </DynamicOuterCard>;
}
