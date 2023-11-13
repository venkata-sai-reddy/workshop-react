import axios from "axios";
import { APP_BASE_URL } from "../../api/GlobalUrls";
import { WorkshopApis } from "../../api/Workshop";
import { convertTimetoLocalDateTime } from "../../utils/Common";

export const createWorkshop = async (data) => {
    const response = await axios.post(APP_BASE_URL + WorkshopApis.createWorkshopEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        },
    })
    return response;
}

export const getAllWorkshops = async () => {
    const response = await axios.get(APP_BASE_URL + WorkshopApis.getAllWorkshopEndPoint, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        },
    })
    return response;
}


export const getCreatedWorkshops = async () => {
    const response = await axios.get(APP_BASE_URL + WorkshopApis.createdWorkshopsEndPoint, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        },
    })
    return response;
}


export const getRegisteredWorkshops = async () => {
    const response = await axios.get(APP_BASE_URL + WorkshopApis.registeredWorkshopsEndPoint, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        },
    })
    return response;
}

export const getRequestedWorkshops = async () => {
    const response = await axios.get(APP_BASE_URL + WorkshopApis.requestedWorkshopsEndPoint, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        },
    })
    return response;
}

export const getWorkshop = async (data) => {
    const response = await axios.get(APP_BASE_URL + WorkshopApis.getWorkshopByIdEndPoint, {
        params: {
            workshopId: data
        },
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        },
    })
    return response;
}

export const updateWorkshop = async (data) => {
    data.startTime = convertTimetoLocalDateTime(data.workshopDate, data.startTime);
    data.endTime = convertTimetoLocalDateTime(data.workshopDate, data.endTime);
    const response = await axios.put(APP_BASE_URL + WorkshopApis.updateWorkshopEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        },
    })
    return response;
}

export const deleteWorkshop = async (data) => {
    const response = await axios.post(APP_BASE_URL + WorkshopApis.deleteWorkshopEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        },
    })
    return response;
}

export const requestWorkshop = async (data) => {
    const response = await axios.post(APP_BASE_URL + WorkshopApis.requestWorkshopEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        },
    })
    return response;
}

export const enrollWorkshop = async (data) => {
    const response = await axios.post(APP_BASE_URL + WorkshopApis.enrollWorkshopEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        },
    })
    return response;
}

export const unEnrollWorkshop = async (data) => {
    const response = await axios.post(APP_BASE_URL + WorkshopApis.unEnrollWorkshopEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        },
    })
    return response;
}