import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL+'/destacado_header';

export const getDestacadoHeader = async () => {
    const { data } = await axios.get(`${baseURL}/get`)
    return data;
};

export const getAllDestacadoHeader = async () => {
    const { data } = await axios.get(`${baseURL}/getall`)
    return data;
};

export const getDestacadoHeaderServ = async () => {
    const { data } = await axios.get(`${baseURL}/getoneserv`)
    return data;
};

export const getDestacadoHeaderProd = async () => {
    const { data } = await axios.get(`${baseURL}/getoneprod`)
    return data;
};


export const deleteDestacadoHeader  = async ({token,param}) => {
    //CONFIGURACION DE TOKEN
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const { data } = await axios.delete(`${baseURL}/del/${param}`, config)
    return data;
};

export const updateDestacadoHeader  = async ({token,param,json}) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const { data } = await axios.put(baseURL + "/put/" + param, json, config)
    return data;
};

export const createDestacadoHeader  = async ({token,json}) => {
    //console.log(json)
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };

    await axios.post(baseURL + "/post/", json, config)
    return true;
};