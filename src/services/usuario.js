import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL+'/usuario';

export const getUsuario = async ({token}) => {
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };
    const { data } = await axios.get(`${baseURL}/get`, config)
    return data;
};

export const getUsuarioId = async ({token,idusuario}) => {
    const config = { headers: { "Authorization": `Bearer ${token}` } };
    const { data } = await axios.get(`${baseURL}/get/${idusuario}`, config)
    return data;
};

export const deleteUsuario  = async ({token,param}) => {
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };
    const { data } = await axios.delete(`${baseURL}/del/${param}`, config)
    return data;
};

export const updateUsuario  = async ({token,idpersona,idusuario,json}) => {
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };
    const { data } = await axios.put(`${baseURL}/put/${idpersona}/${idusuario}`,json, config)
    return data;
};

export const createUsuario  = async ({token,json}) => {
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };
    await axios.post(`${baseURL}/post`, json,config)
    return true;
};