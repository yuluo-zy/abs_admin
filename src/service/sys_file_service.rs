use std::io::Write;
use actix_files::{file_extension_to_mime, NamedFile};
use actix_http::header::{Charset, ExtendedValue};
use actix_multipart::Multipart;
use actix_web::{HttpRequest, HttpResponse, web};
use actix_web::http::header::{ContentDisposition, DispositionParam, DispositionType};
use actix_web::http::header::DispositionParam::{Filename, FilenameExt};
use futures_util::TryStreamExt;
use log::{Level, log};
use rbatis::object_id::ObjectId;
use rbatis::rbdc::datetime::FastDateTime;
use rbatis::rbdc::uuid::Uuid;
use rbatis::sql::{Page, PageRequest};
use crate::domain::dto::{FileAddDTO, FilePageDTO};
use crate::domain::table::{StorageFile, StorageInfo};
use crate::error::{Error, Result};
use crate::pool;

pub struct SysFileService {
    pub(crate) file_path: String,
}

impl SysFileService {
    pub async fn save(&self, mut payload: Multipart) -> Result<Vec<String>> {
        let mut res_list = vec![];
        while let Some(mut field) = payload.try_next().await? {
            // A multipart/form-data stream has to contain `content_disposition`
            let content_disposition = field.content_disposition();
            let old_file = field.content_disposition().get_filename().unwrap();
            log!(Level::Info, "{}",old_file);
            let filename = content_disposition
                .get_filename()
                .map(|_| Uuid::new().0).unwrap();
            let filepath = format!("{}/{}", self.file_path, filename);
            log!(Level::Info, "{}",filepath);
            let filepath_copy = filepath.clone();
            // File::create is blocking operation, use threadpool
            let mut f = web::block(|| std::fs::File::create(filepath_copy)).await??;
            let arg = StorageFile {
                id: ObjectId::new().to_string().into(),
                old_name: old_file.to_string().clone().into(),
                file_name: filename.into(),
                file_path: filepath.into(),
                del: 0.into(),
                create_date: FastDateTime::now().set_micro(0).into(),
            };
            // Field in turn is stream of *Bytes* object
            while let Some(chunk) = field.try_next().await? {
                // filesystem operations are blocking, we have to use threadpool
                f = web::block(move || f.write_all(&chunk).map(|_| f)).await??;
            }


            StorageFile::insert(pool!(), &arg).await?;
            res_list.push(arg.id.unwrap());
        }
        Ok(res_list)
    }

    pub async fn get_info(&self, id: Option<&str>) -> Result<Option<StorageFile>> {
        Ok(
            StorageFile::select_by_column(pool!(), field_name!(StorageFile.id), id)
                .await?
                .into_iter()
                .next()
                .map(|mut value| {
                    value.file_path = None;
                    value
                }),
        )
    }

    pub async fn down_file(&self, request: HttpRequest, id: Option<&str>) -> std::result::Result<HttpResponse, actix_web::Error> {
        let res = StorageFile::select_by_column(pool!(), field_name!(StorageFile.id), id)
            .await.unwrap_or_default()
            .into_iter()
            .next();
        match res {
            None => {
                Err(actix_web::error::ErrorNotFound("file not found"))
            }
            Some(value) => {
                let response = NamedFile::open(value.file_path.unwrap())?
                    .set_content_disposition(ContentDisposition {
                        disposition: DispositionType::Inline,
                        parameters: vec![
                            // FilenameExt(ExtendedValue {
                            //     charset: Charset::Ext(String::from("UTF-8")),
                            //     language_tag: None,
                            //     value: value.old_name.clone().unwrap().into_bytes(),
                            // }),
                            Filename(value.old_name.clone().unwrap())
                        ],
                    })
                    .set_content_type(
                        file_extension_to_mime(value.old_name.unwrap().as_str())
                    )
                    .prefer_utf8(true)
                    .into_response(&request);
                Ok(response)
            }
        }
    }

    pub async fn update_invalid() {}
}

pub struct SysInfoService {}

impl SysInfoService {
    pub async fn add_info(&self, mut arg: FileAddDTO) -> Result<u64> {
        match arg.id {
            None => {
                Ok(
                    StorageInfo::insert(pool!(), &StorageInfo::from(arg)).await?.rows_affected
                )
            }
            Some(_) => {
                Ok(
                    StorageInfo::update_by_column(pool!(), &StorageInfo::from(arg), "id").await?.rows_affected
                )
            }
        }
    }

    pub async fn page_info(&self, arg: &FilePageDTO) -> Result<Page<StorageInfo>> {
        let sys_info_page: Page<StorageInfo> = StorageInfo::select_page(
            pool!(),
            &PageRequest::from(arg),
        )
            .await?;
        return Ok(sys_info_page);
    }
}