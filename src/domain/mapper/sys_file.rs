use crate::domain::table::*;
crud!(StorageFile{});
crud!(StorageInfo{});
impl_select_page!(StorageInfo{select_page()=>
    "`where del = 0 order by create_date desc`"});