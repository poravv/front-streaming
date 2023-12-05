import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL+'/product';

export const getProduct = async () => {
    const { data } = await axios.get(`${baseURL}/get`)
    return data;
};

export const getAllProduct = async () => {
    const { data } = await axios.get(`${baseURL}/getall`)
    return data;
};


export const getProductOne = async () => {
    const { data } = await axios.get(`${baseURL}/getone`)
    return data;
};


export const deleteProduct  = async ({token,param}) => {
    //CONFIGURACION DE TOKEN
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const { data } = await axios.delete(`${baseURL}/del/${param}`, config)
    return data;
};

export const updateProduct  = async ({token,param,json}) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const { data } = await axios.put(baseURL + "/put/" + param, json, config)
    return data;
};

export const createProduct  = async ({token,json}) => {
    //console.log(json)
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };

    await axios.post(baseURL + "/post/", json, config)
    return true;
};