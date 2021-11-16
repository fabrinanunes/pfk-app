import api from './api';

async function create(obj){
    const charge = await api.post('charges/', obj);
    return charge;
};

async function listAll(number){
    const charges = await api.get(`admin/charges?page=${number}`);
    return charges;
};

async function check(id){
    const charge = await api.get(`charges/${id}`);
    return charge;
};

export { create, listAll, check };