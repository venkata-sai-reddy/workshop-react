import axios from "axios";
import { APP_BASE_URL } from "../../api/GlobalUrls";
import { WorkshopApis } from "../../api/Workshop";

export const createWorkshop = async (data) => {
    const response = await axios.post(APP_BASE_URL + WorkshopApis.createWorkshopEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        },
    })
    return response;
}