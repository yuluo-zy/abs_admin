use actix_multipart::Multipart;
use actix_web::{HttpRequest, Responder, web};

use crate::domain::dto::{FileAddDTO, FilePageDTO, IdDTO};
use crate::domain::vo::RespVO;
use crate::service::CONTEXT;

pub async fn save_file(payload: Multipart) -> impl Responder {
    let data = CONTEXT.sys_file_service.save(payload).await;
    RespVO::from_result(&data).resp_json()
}

pub async fn get_file(arg: web::Json<IdDTO>) -> impl Responder {
    let data = CONTEXT.sys_file_service.get_info(arg.id.as_deref()).await;
    RespVO::from_result(&data).resp_json()
}

pub async fn down_load_file(    request: HttpRequest,arg: web::Json<IdDTO>) -> impl Responder{
    CONTEXT.sys_file_service.down_file(request, arg.id.as_deref()).await
}

pub async fn add(arg: web::Json<FileAddDTO>) -> impl Responder {
    let data = CONTEXT.sys_file_info.add_info(arg.0).await;
    RespVO::from_result(&data).resp_json()
}

// pub async fn update(arg: web::Json<>) -> impl Responder {
//
// }

pub async fn page(arg: web::Json<FilePageDTO>) -> impl Responder {
    let data = CONTEXT.sys_file_info.page_info(&arg.0).await;
    RespVO::from_result(&data).resp_json()
}