import api from './api-token';

async function profile(id){
    const profile = await api.get(`profile/${id}`)
    return profile
};

async function listCards(){
    const cards = await api.get('my-cards')
    return cards
};

async function deleted(){
    const account = await api.post('delete-account')
    return account
};

export { profile, listCards, deleted}