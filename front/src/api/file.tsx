import {httpPost} from "@/utils/httpRequest";
import {getAxios} from "@/utils/axios";

export const filePage = (data) => {
    return httpPost("/admin/info/page", data);
};

export const fileInfoAdd = (data) => {
    return httpPost("/admin/info/add", data);
};

export const postFile = (data, onUploadProgress, source) => {
    return getAxios().post(
        "/admin/file/add",
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data;charset=UTF-8"
            },
            onUploadProgress: onUploadProgress,
            cancelToken: source
        }
    );
};

export const getFileInfo = (data) => {
    return httpPost("/admin/file/info", data)
}

export const download = (data) => {
    return getAxios().post(
        "admin/file/down",
        data,
        { responseType: "blob" });
}