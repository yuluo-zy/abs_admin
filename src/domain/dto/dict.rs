use rbatis::rbdc::datetime::FastDateTime;
use rbatis::sql::PageRequest;
use serde::{Deserialize, Serialize};
use crate::domain::table::SysDict;

/// 字典分页DTO
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct DictPageDTO {
    pub page_no: Option<u64>,
    pub page_size: Option<u64>,
    pub name: Option<String>,
    pub code: Option<String>,
    pub state: Option<i32>,
}

impl From<DictPageDTO> for PageRequest {
    fn from(arg: DictPageDTO) -> Self {
        PageRequest::new(arg.page_no.unwrap_or(1), arg.page_size.unwrap_or(10))
    }
}

impl From<&DictPageDTO> for PageRequest {
    fn from(arg: &DictPageDTO) -> Self {
        PageRequest::new(arg.page_no.unwrap_or(1), arg.page_size.unwrap_or(10))
    }
}

/// 字典分添加DTO
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct DictAddDTO {
    pub name: Option<String>,
    pub code: Option<String>,
    pub state: Option<i32>,
}

impl From<DictAddDTO> for  SysDict{
    fn from(arg: DictAddDTO) -> Self {
        SysDict {
            id: arg.name.clone().into(),
            name: arg.name.clone(),
            code: arg.code.clone(),
            state: arg.state.clone(),
            create_date: FastDateTime::now().set_micro(0).into(),
        }
    }
}

/// 字典修改
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct DictEditDTO {
    pub id: Option<String>,
    pub name: Option<String>,
    pub code: Option<String>,
    pub state: Option<i32>,
}

impl From<&DictEditDTO> for SysDict{
    fn from(arg: &DictEditDTO) -> Self {
        SysDict {
            id: arg.id.clone(),
            name: arg.name.clone(),
            code: arg.code.clone(),
            state: arg.state.clone(),
            create_date: None,
        }
    }
}


