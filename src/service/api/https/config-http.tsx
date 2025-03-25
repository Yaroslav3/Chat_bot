import axios from 'axios';
const URL = '';

export const get = async (endpoint: string, confHeaders?:any) => {
    const result = await buildHttpClient(confHeaders);
    return result.get(endpoint);
};

export const post = async (endpoint: string, body: any, confHeaders?:any) => {
  const result = await (await buildHttpClient(confHeaders)).post(endpoint, body);
  return result.data;
};

const buildHttpClient  = async(confHeaders?:any) => {
    const axiosInstance = axios.create(await getConfig1CForAuth(confHeaders));
        axiosInstance.interceptors.request.use((config) => {
        return config;
    },(error) => {
        console.log('request error',  error);
        return Promise.reject({status: false});
    });

    axiosInstance.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        console.log('response error',  error);
        return Promise.reject({status: false});
    });
    return axiosInstance;
};

const getConfig1CForAuth = async (confHeaders?:any) => {
    return {
        baseURL: URL,
        timeout: 60000,
        headers: {
            'Content-Type':'application/json',
            ...confHeaders},
    };
};

