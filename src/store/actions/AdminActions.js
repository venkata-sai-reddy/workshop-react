import axios from "axios";
import { AdminApis } from "../../api/Admin";
import { APP_BASE_URL } from "../../api/GlobalUrls";

export const getVenues = async () => {
    const response = await axios.get(APP_BASE_URL + AdminApis.venuesEndPoint, {headers: {
        'sessionid': localStorage.getItem('sessionid')
    }});
    return response;
}

export const getSkills = async () => {
    const response = await axios.get(APP_BASE_URL + AdminApis.skillsEndPoint);
    return response;
}

export const sendCustomNotifyMessage = async (data) => {
    const response = await axios.post(APP_BASE_URL + AdminApis.sendCustomMessageEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        }
    });
    return response;
}

export const getAllUsers = async () => {
    const response = await axios.get(APP_BASE_URL + AdminApis.allUsersEndPoint, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        }
    });
    return response;
}

export const getUserDetails = async (userId) => {
    const response = await axios.get(APP_BASE_URL + AdminApis.userDetailsEndPoint, {
        params: {
            'userId': userId
        },
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        }
    });
    return response;
}

export const getNewSkills = async () => {
    const response = await axios.get(APP_BASE_URL + AdminApis.requestedSkillsEndPoint, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        }
    });
    return response;
}

export const updateApprovedSkill = async (data) => {
    const response = await axios.put(APP_BASE_URL + AdminApis.updateSkillsEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        }
    });
    return response;
}

export const createUserProfile = async (data) => {
    const response = await axios.post(APP_BASE_URL + AdminApis.createUserEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        }
    });
    return response;
}

export const updateUserProfile = async (data) => {
    const response = await axios.put(APP_BASE_URL + AdminApis.updateUserEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        }
    });
    return response;
}

export const deleteUserProfile = async (data) => {
    const response = await axios.delete(APP_BASE_URL + AdminApis.deleteUserEndPoint, {
        params: {
            userId: data.userId
        },
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        }
    });
    return response;
}

export const generateTemporaryPassword = async (data) => {
    const response = await axios.post(APP_BASE_URL + AdminApis.tempPasswordEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        }
    });
    return response;
}

export const addNewSkills = async (data) => {
    const response = await axios.post(APP_BASE_URL + AdminApis.addNewSkillsEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        }
    });
    return response;
}

export const getAllSkills = async () => {
    const response = await axios.get(APP_BASE_URL + AdminApis.allSkillsEndPoint, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        }
    });
    return response;
}
