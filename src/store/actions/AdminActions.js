import axios from "axios";
import { AdminApis } from "../../api/Admin";
import { APP_BASE_URL } from "../../api/GlobalUrls";

export const getVenues = async () => {
    const response = await axios.get(APP_BASE_URL + AdminApis.venuesEndPoint, {headers: {
        'sessionid': localStorage.getItem('sessionid')
    }});
    return response;
}