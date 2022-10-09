use actix_multipart::Multipart;
use actix_web::Responder;
use crate::domain::vo::RespVO;
use crate::service::CONTEXT;

pub async fn saveFile(mut payload: Multipart) -> impl Responder {
    let data = CONTEXT.sys_file_service.save().await;
    RespVO::from_result(&data).resp_json()
}