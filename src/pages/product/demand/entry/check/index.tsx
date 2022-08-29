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
import EmptyStatus from "@/pages/product/demand/entry/check/empty";
import axios from "axios";
import { postEfuseCheckFile, postSerialCheckFile } from "@/api/file";
import LogTable from "@/pages/product/demand/entry/check/log-table";
import EFuseTable from "@/pages/product/demand/entry/check/eFuse-table";

const bodyStyle = {
  paddingTop: "0",
  transition: " 0.5s all ease-in-out",
  overflow: "auto"
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
    }
    // 开始对 已提交的数据进行重新验证
    if (checkData?.efuseFileId) {
      const formData = new FormData();
      formData.append("fileId", checkData?.efuseFileId);
      formData.append("demandId", demandId);
      postEfuseCheckFile(formData).then(r => {
        const { success, result } = r.data;
        if (success) {
          setCheckData(
            { "efuseRsp": result?.result }
          );
        }
      }).catch(error => {
        Message.error(t["self.check.boot.upload.file.error"]);
      });
    }
    if (checkData?.serialFileId) {
      const formData = new FormData();
      formData.append("fileId", checkData?.serialFileId);
      formData.append("demandId", demandId);
      postSerialCheckFile(formData).then(r => {
        const { success, result } = r.data;
        if (success) {
          setCheckData(
            { "serialRsp": result?.result }
          );
        }
      }).catch(_ => {
        Message.error(t["self.check.boot.upload.file.error"]);
      });
    }
  }, []);

  const postCheck = () => {
    if (!checkData?.serialFileId || !checkData?.efuseFileId) {
      Message.error(t["self.check.boot.upload.file.empty"]);
      return;
    }
    postCheckCustomDemand({
      "demandId": demandId,
      "serialFileId": checkData?.serialFileId,
      "efuseFileId": checkData?.efuseFileId,
      "id": checkData?.id
    }).then(res => {
      // 唤起model
      if (res.data.success) {
        // Message.success(t["self.check.boot.log.check.sum"]);
        setCheckData({
          id: res.data.result?.selAutoCheckId,
          result: res.data.result
        });
        setVisible(true);
      }
    });
  };

  const getPassSerialFile = (option) => {
    const { onProgress, file, onSuccess, onError } = option;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("demandId", demandId);
    const source = axios.CancelToken.source();
    const onprogress = progressEvent => {
      const complete = progressEvent.loaded / progressEvent.total * 100 | 0;
      onProgress(parseInt(String(complete), 10), progressEvent);
    };
    postSerialCheckFile(formData, onprogress, source.token).then(r => {
      const { success, result } = r.data;
      if (success) {
        Message.success(t["self.check.boot.upload.file.success"]);
        onSuccess(result?.fileId);
        // 设置 上传结果验证内容
        setCheckData(
          { "serialRsp": result?.result }
        );
      }
    }).catch(error => {
      Message.error(t["self.check.boot.upload.file.error"]);
      onError(t["self.check.boot.upload.file.error"]);
    });
    return {
      abort() {
        source.cancel("cancel");
      }
    };
  };

  const getPassEfuseFile = (option) => {
    const { onProgress, file, onSuccess, onError } = option;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("demandId", demandId);
    const source = axios.CancelToken.source();
    const onprogress = progressEvent => {
      const complete = progressEvent.loaded / progressEvent.total * 100 | 0;
      onProgress(parseInt(String(complete), 10), progressEvent);
    };
    postEfuseCheckFile(formData, onprogress, source.token).then(r => {
      const { success, result } = r.data;
      if (success) {
        Message.success(t["self.check.boot.upload.file.success"]);
        onSuccess(result?.fileId);
        // 设置 上传结果验证内容
        setCheckData(
          { "efuseRsp": result?.result }
        );
      }
    }).catch(error => {
      Message.error(t["self.check.boot.upload.file.error"]);
      onError(t["self.check.boot.upload.file.error"]);
    });
    return {
      abort() {
        source.cancel("cancel");
      }
    };
  };

  const nextStep = () => {
    setVisible(false);
    history.push(`/product`);
  };

  const serialFileNode = (data) => {
    if (data && data.length > 0) {
      return <LogTable data={data} />;
    }
    return <EmptyStatus />;
  };

  const eFuseNode = (data) => {
    if (data && data.length > 0) {
      return <EFuseTable data={data} />;
    }
    return <EmptyStatus />;
  };

  const isFail = () => {
    return checkData?.result?.result === "FAIL";
  };

  return <DynamicOuterCard title={t["hardware.production.info.title"]} bodyStyle={bodyStyle}>
    <table cellPadding="1" cellSpacing="1" className={styles["table-style"]}>
      <colgroup>
        <col className={styles["table-style-mini"]} />
        <col className={styles["table-style-mid"]} />
        <col className={styles["table-style-last"]} />
      </colgroup>
      <tbody>

      <tr key={0}>
        <th>Items</th>
        <th>{t["self.check.boot.upload.file"]}</th>
        <th>{t["self.check.boot.upload.file.info"]}</th>
      </tr>
      <tr key={1}>
        <td>{t["self.check.boot.log"]}</td>
        <td>
          <DynamicUpload limit={1}
                         fileList={checkData?.serialFileId}
                         onChange={(fileList: UploadItem[], file: UploadItem) => {
                           if (fileList.length > 0) {
                             setCheckData({ "serialFileId": file?.response });
                           } else {
                             setCheckData({ "serialFileId": null });
                           }
                         }}
                         customRequest={getPassSerialFile}
          /></td>

        <td>{serialFileNode(checkData?.serialRsp)}</td>
      </tr>

      <tr key={2}>
        <td>eFuse summary</td>
        <td>
          <DynamicUpload limit={1} fileList={checkData?.efuseFileId}
                         onChange={(fileList: UploadItem[], file: UploadItem) => {
                           if (fileList.length > 0) {
                             setCheckData({ "efuseFileId": file?.response });
                           } else {
                             setCheckData({ "efuseFileId": null });
                           }
                         }}
                         customRequest={getPassEfuseFile}
          />
        </td>
        <td>{eFuseNode(checkData?.efuseRsp)}</td>
      </tr>
      </tbody>
    </table>
    <br />
    <br />
    <br />
    <div className={styles["context-next"]}>
      <Button
        type="primary"
        size={"large"}
        icon={<IconArrowRight />}
        onClick={postCheck}>
        {t["self.check.button"]}
      </Button>
    </div>

    <Modal
      title={t["self.check.result"]}
      visible={visible}
      className={styles["modal"]}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      autoFocus={false}
      focusLock={true}
      footer={
        <Button disabled={isFail()} type={isFail() ? "secondary" : "primary"} onClick={nextStep}>
          {isFail() ? t["self.check.boot.log.check.file"] : "Ok"}
        </Button>
      }
    >
      <CheckTable data={checkData?.result} />
    </Modal>
  </DynamicOuterCard>;
}
