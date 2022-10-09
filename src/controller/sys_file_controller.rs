use actix_multipart::Multipart;
use actix_web::{HttpRequest, Responder, web};
use crate::domain::dto::IdDTO;
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