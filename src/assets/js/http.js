import axios from 'axios';
import {createError} from './util'
import {baseUrl} from '../../assets/js/env';

axios.defaults.timeout = 10000;
axios.defaults.baseURL = baseUrl;


//http request 拦截器
axios.interceptors.request.use(
    config => {
        $dialog.loading.open('很快加载好了');
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type':'application/json'
        }
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        $dialog.loading.close();
        if(response.data.errCode ==2){
            console.log('错误特殊处理');
        }
        return response;
    },
    error => {
        $dialog.loading.close();
        return Promise.reject(error)
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={}){
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.post(url,data)
            .then(response => {
                const data = response.data;
                if(!data) {
                    return reject(createError(400, 'no data'))
                }
                if(data.code!== '200') {
                    return reject(createError(400, data.message))
                }
                resolve(data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.patch(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.put(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}