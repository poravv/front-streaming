import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL + '/perfil_has_cliente';

export const getPerfilHasCliente = async ({ token, param }) => {
    //CONFIGURACION DE TOKEN
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    //const { data } = await axios.get(baseURL, credentials);
    const { data } = await axios.get(`${baseURL}/get`, config)
    return data;
};

export const getDetalleClientes = async ({ token, param }) => {
    //CONFIGURACION DE TOKEN
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    //const { data } = await axios.get(baseURL, credentials);
    const { data } = await axios.get(`${baseURL}/getDC`, config)
    return data;
};

export const getProductoVenta = async ({ token, param }) => {
    //CONFIGURACION DE TOKEN
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    //const { data } = await axios.get(baseURL, credentials);
    const { data } = await axios.get(`${baseURL}/perfil_has_clienteventa`, config)
    return data;
};




export const inactivaPerfilHasCliente = async ({ token, param, json }) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const { data } = await axios.put(baseURL + "/inactiva/" + param, json, config)
    return data;
};


export const getVwPerfilHasCliente = async ({ token, param }) => {
    //CONFIGURACION DE TOKEN
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    //const { data } = await axios.get(baseURL, credentials);
    const { data } = await axios.get(`${baseURL}/getsql`, config);
    //console.log(data);
    return data;
};


export const deletePerfilHasCliente = async ({ token, param }) => {
    //CONFIGURACION DE TOKEN
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const { data } = await axios.delete(`${baseURL}/del/${param}`, config)
    return data;
};

export const updatePerfilHasCliente = async ({ token, param, json }) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const { data } = await axios.put(baseURL + "/put/" + param, json, config)
    return data;
};


export const updatePcc = async ({ token, param, json }) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
    const { data } = await axios.put(baseURL + "/putpcc/" + param, json, config)
    return data;
};

export const createPerfilHasCliente = async ({ token, json }) => {
    //console.log(json)
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };

    const { data } = await axios.post(baseURL + "/post/", json, config)
    return data;
};