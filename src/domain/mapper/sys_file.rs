use crate::domain::table::*;
crud!(StorageFile{});
crud!(StorageInfo{});
impl_select_page!(StorageInfo{select_page()=>
    "order by create_date desc"});