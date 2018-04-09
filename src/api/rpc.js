import axios from 'axios'
import { Loading, Message } from 'element-ui';

const callback = (res, loadingInst) => {
    loadingInst && loadingInst.close()
    if (res.status === 200) {
        if (res.data.result === 200) {
            return res.data.data
        } else {
            Message({
                type: 'error',
                message: res.data.message
            })
            throw Error(res.data.message)
        }
    } else {
        Message({
            type: 'error',
            message: 'something error'
        })
        throw Error('something error')
    }
}

const errorHandle = (error) => {
    console.error(error)
}

const get = (url) => (params) => {
    let loadingInst = Loading.service();
    return axios.get(url, {params}).then((res) => callback(res, loadingInst)).catch((err) => {
        loadingInst && loadingInst.close()
        Message({
            type: 'error',
            message: err
        })
    })
}

const post = (url) => (params) => {
    return axios.post(url, params).then(callback).catch(errorHandle)
}

export default {
    get,
    post,
}