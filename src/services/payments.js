import api from './api-token';

async function create(obj){
    const payment = await api.post('/payment', obj);
    return payment;
};

async function refund(id, obj){
    const payment = await api.post(`/admin/payment/refund/${id}`, obj);
    return payment;
};

async function saveCard(obj){
    const hash = await api.post('/payments/credit-cards/tokenization', obj);
    return hash;
};

async function reqRefund(obj){
    const refund = await api.post('payments/refund', obj);
    return refund;
};

async function listUserReq(){
    const list = await api.get('profile/payments')
    return list
}

async function listReq(){
    const list = await api.get('admin/solicitation')
    return list
};

export { create, refund, saveCard, reqRefund, listUserReq, listReq }