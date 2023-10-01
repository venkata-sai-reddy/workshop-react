import axios from "axios";
import { APP_BASE_URL } from "../../api/GlobalUrls";
import { PreLoginApi } from "../../api/PreLoginApis";

export const doLogin = async (data) => {
    const response = await axios.post(APP_BASE_URL + PreLoginApi.LoginEndPoint, data)
    return response;
}

export const doLogout = async (data) => {
    const response = await axios.post(APP_BASE_URL + PreLoginApi.LogoutEndPoint, String(data), {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response;
}