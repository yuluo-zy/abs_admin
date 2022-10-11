use rbatis::object_id::ObjectId;
use rbatis::rbdc::datetime::FastDateTime;
use crate::domain::table::{LoginCheck, StorageInfo, SysUser, SysUserRole};
use rbatis::sql::PageRequest;
use serde::{Deserialize, Serialize};
use crate::util::password_encoder::PasswordEncoder;

/// 实验文件添加
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct FileAddDTO {
    pub id: Option<String>,
    pub file_id: Option<String>,
    pub user_name: Option<String>,
    pub user_email: Option<String>,
}

impl From<FileAddDTO> for StorageInfo {
    fn from(arg: FileAddDTO) -> Self {
        StorageInfo {
            id: match arg.id {
                Some(value) => {
                    Some(value)
                }
                None => { ObjectId::new().to_string().into() }
            },
            file_id: arg.file_id,
            user_name: arg.user_name,
            user_email: arg.user_email,
            user_send: Some(0),
            create_date: FastDateTime::now().set_micro(0).into(),
        }
    }
}

/// 实验文件更新
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct FileEditDTO {
    pub id: Option<String>,
    pub file_id: Option<String>,
    pub user_name: Option<String>,
    pub user_email: Option<String>,
}

impl From<FileEditDTO> for StorageInfo {
    fn from(arg: FileEditDTO) -> Self {
        StorageInfo {
            id: arg.id,
            file_id: arg.file_id,
            user_name: arg.user_name,
            user_email: arg.user_email,
            user_send: Some(0),
            create_date: FastDateTime::now().set_micro(0).into(),
        }
    }
}

/// 用户分页
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct FilePageDTO {
    pub page_no: Option<u64>,
    pub page_size: Option<u64>,
}

impl From<&FilePageDTO> for PageRequest {
    fn from(arg: &FilePageDTO) -> Self {
        PageRequest::new(arg.page_no.unwrap_or(1), arg.page_size.unwrap_or(10))
    }
}
