import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL+'/theme';

export const getTheme = async () => {
    const { data } = await axios.get(`${baseURL}/get`)
    return data;
};

export const getThemeOne = async () => {
    const { data } = await axios.get(`${baseURL}/getone`)
    return data;
};


export const deleteTheme  = async ({token,param}) => {
    //CONFIGURACION DE TOKEN
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const { data } = await axios.delete(`${baseURL}/del/${param}`, config)
    return data;
};

export const updateTheme  = async ({token,param,json}) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const { data } = await axios.put(baseURL + "/put/" + param, json, config)
    return data;
};

export const createTheme  = async ({token,json}) => {
    //console.log(json)
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };

    const {data} = await axios.post(baseURL + "/post/", json, config)
    return data;
};