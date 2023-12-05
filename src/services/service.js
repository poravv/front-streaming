import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL+'/service';

export const getService = async () => {
    const { data } = await axios.get(`${baseURL}/get`)
    return data;
};

export const getAllService = async () => {
    const { data } = await axios.get(`${baseURL}/getall`)
    return data;
};


export const getServiceOne = async () => {
    const { data } = await axios.get(`${baseURL}/getone`)
    return data;
};


export const deleteService  = async ({token,param}) => {
    //CONFIGURACION DE TOKEN
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const { data } = await axios.delete(`${baseURL}/del/${param}`, config)
    return data;
};

export const updateService  = async ({token,param,json}) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const { data } = await axios.put(baseURL + "/put/" + param, json, config)
    return data;
};

export const createService  = async ({token,json}) => {
    //console.log(json)
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };

    await axios.post(baseURL + "/post/", json, config)
    return true;
};