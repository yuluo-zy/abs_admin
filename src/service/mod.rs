/// 服务层
///
/// 缓存抽象服务
mod cache_service;
/// 内存缓存服务
mod mem_service;
/// redis服务
mod redis_service;
/// 系统授权服务
mod sys_auth_service;
/// 系统配置服务
mod sys_config_service;
/// 系统字典服务
mod sys_dict_service;
/// 系统权限资源服务
mod sys_res_service;
/// 系统角色-权限资源服务
mod sys_role_res_service;
/// 系统角色服务
mod sys_role_service;
/// 系统短信消息服务
mod sys_sms_service;
/// 垃圾桶服务
mod sys_trash_service;
/// 系统用户/角色服务
mod sys_user_role_service;
/// 系统用户服务
mod sys_user_service;
mod sys_file_service;

pub use crate::config::config::ApplicationConfig;
pub use cache_service::*;
pub use mem_service::*;
use once_cell::sync::Lazy;
use rbatis::rbatis::Rbatis;
use rbdc_mysql::driver::MysqlDriver;
pub use redis_service::*;
pub use sys_auth_service::*;
pub use sys_config_service::*;
pub use sys_dict_service::*;
pub use sys_res_service::*;
pub use sys_role_res_service::*;
pub use sys_role_service::*;
pub use sys_sms_service::*;
pub use sys_trash_service::*;
pub use sys_user_role_service::*;
pub use sys_user_service::*;
pub use sys_file_service::*;

/// CONTEXT is all of the service struct
pub static CONTEXT: Lazy<ServiceContext> = Lazy::new(|| ServiceContext::default());

#[macro_export]
macro_rules! pool {
    () => {
        &mut $crate::service::CONTEXT.rbatis.clone()
    };
}

pub struct ServiceContext {
    pub config: ApplicationConfig,
    pub rbatis: Rbatis,
    pub cache_service: CacheService,
    pub sys_res_service: SysResService,
    pub sys_user_service: SysUserService,
    pub sys_role_service: SysRoleService,
    pub sys_role_res_service: SysRoleResService,
    pub sys_user_role_service: SysUserRoleService,
    pub sys_dict_service: SysDictService,
    pub sys_auth_service: SysAuthService,
    pub sys_trash_service: SysTrashService,
    pub sys_file_service: SysFileService,
    pub sys_file_info: SysInfoService,
}

impl ServiceContext {
    /// init database pool
    pub async fn init_pool(&self) {
        //连接数据库
        println!(
            "[abs_admin] rbatis pool init ({})...",
            self.config.database_url
        );
        self.rbatis
            .init(MysqlDriver {}, &self.config.database_url)
            .expect("[abs_admin] rbatis pool init fail!");
        log::info!(
            "[abs_admin] rbatis pool init success! pool state = {:?}",
            self.rbatis.get_pool().expect("pool not init!").status()
        );
        log::info!(
            " - Local:   http://{}",
            self.config.server_url.replace("0.0.0.0", "127.0.0.1")
        );
    }
}

impl Default for ServiceContext {
    fn default() -> Self {
        let config = ApplicationConfig::default();
        ServiceContext {
            rbatis: crate::domain::init_rbatis(&config),
            cache_service: CacheService::new(&config).unwrap(),
            sys_res_service: SysResService {},
            sys_user_service: SysUserService {},
            sys_role_service: SysRoleService {},
            sys_role_res_service: SysRoleResService {},
            sys_user_role_service: SysUserRoleService {},
            sys_dict_service: SysDictService {},
            sys_auth_service: SysAuthService {},
            sys_trash_service: SysTrashService {},
            sys_file_service: SysFileService {
                file_path: config.file_path.clone()
            },
            sys_file_info: SysInfoService {},
            config,
        }
    }
}
