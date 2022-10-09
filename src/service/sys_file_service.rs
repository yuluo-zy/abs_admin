use std::io::Write;
use actix_multipart::Multipart;
use actix_web::web;
use futures_util::TryStreamExt;
use rbatis::rbdc::uuid::Uuid;
use crate::error::Result;

pub struct SysFileService {}

impl SysFileService {

    pub async fn save(&self, mut payload: Multipart) -> Result<String> {
        while let Some(mut field) = payload.try_next().await? {
            // A multipart/form-data stream has to contain `content_disposition`
            let content_disposition = field.content_disposition();

            let filename = content_disposition
                .get_filename()
                .map_or_else(|| Uuid::new_v4().to_string(), sanitize_filename::sanitize);
            let filepath = format!("./tmp/{filename}");

            // File::create is blocking operation, use threadpool
            let mut f = web::block(|| std::fs::File::create(filepath)).await??;

            // Field in turn is stream of *Bytes* object
            while let Some(chunk) = field.try_next().await? {
                // filesystem operations are blocking, we have to use threadpool
                f = web::block(move || f.write_all(&chunk).map(|_| f)).await??;
            }
        }
         Ok("jjj".to_string())
    }

    pub async fn get_info() {}

    pub async fn update_invalid() {}
}