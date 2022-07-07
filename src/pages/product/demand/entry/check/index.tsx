import React, { useEffect, useState } from "react";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";
import useLocale from "@/pages/product/demand/locale/useLocale";
import { Button, Message, Modal } from "@arco-design/web-react";
import DynamicUpload from "@/components/Dynamic/Upload";
import { UploadItem } from "@arco-design/web-react/es/Upload";
import styles from "./style/index.module.less";
import { ProductStore } from "@/store/product";
import shallow from "zustand/shallow";
import { IconArrowRight } from "@arco-design/web-react/icon";
import { useHistory } from "react-router";
import { postCheckCustomDemand } from "@/api/demand";
import CheckTable from "@/pages/product/demand/entry/check/check-table";
import LogTable from "@/pages/product/demand/entry/check/log-table";

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
    postCheckCustomDemand({
      'demandId': demandId,
      'serialFileId': checkData?.serialFileId[0]?.response,
      'efuseFileId': checkData?.efuseFileId[0]?.response,
      'id': checkData?.id
    }).then(res => {
      if(res.data.success) {
        Message.success(t["submit.hardware.success"]);
        setCheckData({
          id: res.data.result?.selAutoCheckId,
          result: res.data.result
        })
      }
    })
  }

  const nextStep = () => {
    setVisible(false)
    history.push(`/product/demand/hardware`);
  }



  return <DynamicOuterCard title={t['hardware.production.info.title']} bodyStyle={bodyStyle}>
      <table cellPadding='1' cellSpacing='1' className={styles['table-style']}>
        <tbody>
        <tr>
          <th className={styles['medium']}>Items</th>
          <th className={styles['max']}>{t['self.check.boot.upload.file']}</th>
          <th>{t['self.check.boot.upload.file.info']}</th>
        </tr>
        <tr>
          <td>{t['self.check.boot.log']}</td>
          <td>
              <DynamicUpload limit={1}
                             styles={{width: '5rem'}}
                             defaultFileList={checkData?.serialFileId}
                             onChange={(fileList: UploadItem, file: UploadItem) => {
                               setCheckData({ 'serialFileId': fileList });
                             }} /></td>
          {/*<td><p>{t['self.check.boot.file.context']}</p></td>*/}
          <td><LogTable/></td>
        </tr>

        <tr>
          <td>eFuse summary</td>
          <td>
              <DynamicUpload limit={1} defaultFileList={checkData?.efuseFileId} onChange={(fileList: UploadItem, file: UploadItem) => {
                setCheckData({ 'efuseFileId': fileList });
              }} />
          </td>
          <td><p>{t['self.check.boot.efuse.context']}</p></td>
        </tr>
        </tbody>
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
      <CheckTable data={checkData?.result}/>
    </Modal>
  </DynamicOuterCard>;
}
