import api from './api-token';

async function postCode(cep){
    const postCode = await api.post('postCode', cep)
    return postCode
}

export { postCode }