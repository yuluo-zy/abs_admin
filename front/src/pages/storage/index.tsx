import SearchList from "@/components/Dynamic/List";
import {CallBackHandle, SearchItem} from "@/components/type";
import React, {useRef, useState} from "react";
import {fileInfoAdd, filePage} from "@/api/file";
import DynamicForm from "@/components/Dynamic/Form";
import {Button, Message, Space, Tooltip} from "@arco-design/web-react";
import {code_success} from "@/utils/httpRequest";
import {IconEdit} from "@arco-design/web-react/icon";
import DynamicModal from "@/components/Dynamic/Modal";


function OrderStorage() {
    const searchListRef = useRef<any>()
    const [data, setData] = useState({})
    const [open, setOpen] = useState(false)
    const getColumns = (callback: () => void) => {
        return [
            {
                title: "用户名",
                dataIndex: "user_name"
            },
            {
                title: "邮箱",
                dataIndex: "user_email"
            },
            {
                title: "邮件通知",
                dataIndex: "user_send"
            },
            {
                title: "创建时间",
                dataIndex: "create_date"
            },
            {
                title: "操作",
                dataIndex: "operations",
                render: (_, record) => (
                    <Space>
                        <Tooltip content={"查看内容"}>
                            <Button icon={<IconEdit/>} onClick={() => {
                                setData({...record})
                                setOpen(true)
                            }}/>
                        </Tooltip>
                    </Space>
                )
            }
        ]
    }


    const CreateUserHOC = (props: CallBackHandle) => {
        return <DynamicForm
            title={"实验结果上传"}
            formItem={[
                {
                    label: "用户名称",
                    type: "input",
                    field: "user_name",
                    required: true,
                },
                {
                    label: '用户邮箱',
                    field: "user_email",
                    type: "input",
                    required: true,
                },
                {
                    label: "实验文件",
                    field: "file_id",
                    type: "upload",
                    limit: 1,
                    required: true,
                }
            ]}
            data={props.data}
            onSubmit={async (value) => {
                await fileInfoAdd(value).then((res) => {
                    if (res.data.code === code_success) {
                        Message.success("实验记录上传成功");
                        props.confirmCallback();
                    }
                });
            }}
        />;
    }

    return <>
        <SearchList
            name={"实验存储"}
            download={false}
            upload={false}
            ref={searchListRef}
            fetchRemoteData={filePage}
            getColumns={getColumns}
            select={false}
            add={CreateUserHOC}
            addName="实验记录上传"
        />
        <DynamicModal title={"实验记录"}
                      visible={open}
                      onCancel={() => setOpen(value => !value)}
        >
            <DynamicForm
                title={"实验结果上传"}
                formItem={[
                    {
                        label: "用户名称",
                        type: "input",
                        field: "user_name",
                        required: true,
                    },
                    {
                        label: '用户邮箱',
                        field: "user_email",
                        type: "input",
                        required: true,
                    },
                    {
                        label: "实验文件",
                        field: "file_id",
                        type: "upload",
                        limit: 1,
                        required: true,
                    }
                ]}
                data={data}
                onSubmit={async (value) => {
                    await fileInfoAdd({
                        ...data,
                        ...value}).then((res) => {
                        if (res.data.code === code_success) {
                            Message.success("实验记录上传成功");
                            // props.confirmCallback();
                            setOpen(value => !value)
                            searchListRef.current?.callBack()
                        }
                    });
                }}
            />
        </DynamicModal>
    </>
}

export default OrderStorage
