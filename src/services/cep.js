import api from './api';

async function postCode(obj){
    const postCode = await api.post('/postCode', obj)
    return postCode
}

export { postCode }