import api from './api';

async function postCode(cep){
    const postCode = await api.post('postCode', cep)
    return postCode
}

export { postCode }