import {httpPost} from "@/utils/httpRequest";

export const filePage = (data) => {
    return httpPost("/admin/info/page", data);
};