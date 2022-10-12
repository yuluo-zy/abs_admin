import React, {useEffect, useState} from "react";
import styles from "./style/index.module.less";
import {Button, Result} from "@arco-design/web-react";
import {useHistory, useParams} from "react-router";
import {download, getFileInfo} from "@/api/file";
import {code_success} from "@/utils/httpRequest";

function DownFile() {
    const {id} = useParams();
    const [data, setData] = useState(null)
    useEffect(() => {
        if (id) {
            getFileInfo({id: id}).then(res => {
                if (res.data.code === code_success) {
                    setData(res.data.data)
                }
            })
        }
    }, [id])
    const [loading, setLoading] = useState(false)
    return <div>
        <div className={styles.wrapper}>
            <Result
                className={styles.result}
                status="500"
                subTitle={"实验报告下载"}
                extra={
                    <Button loading={loading} size={'large'} key="back" type="primary" onClick={() => {
                        if (data?.id) {
                            setLoading(true)
                            download({id: data?.id}).then(res => {
                                    if (res.status === 200) {
                                        const url = URL.createObjectURL(new Blob([res.data]));
                                        const link = document.createElement("a");
                                        link.href = url;
                                        console.log(res.headers)
                                        let name = res.headers["content-disposition"]?.match(/filename="(.*)"/)[1]; // 获取filename的值
                                        name = decodeURIComponent(name);
                                        console.log(name)
                                        link.setAttribute("download", name);
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }
                                }
                            ).finally(() => {
                                setLoading(false)
                            })
                        }
                    }}>
                        点击下载
                    </Button>
                }
            />
        </div>
    </div>
}

export default DownFile