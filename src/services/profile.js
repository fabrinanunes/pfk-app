import api from './api';

async function profile(){
    const profile = await api.get('profile')
    return profile
};

async function listCards(){
    const cards = await api.get('my-cards')
    return cards
};

export { profile, listCards}