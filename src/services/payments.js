import api from './api';

async function create(obj){
    const payment = await api.post('/payment', obj);
    console.log(payment)
    return payment;
};

async function refund(id, obj){
    const payment = await api.post(`/admin/payment/refund/${id}`, obj);
    console.log(payment)
    return payment;
};

async function saveCard(obj){
    const hash = await api.post('/payments/credit-cards/tokenization', obj);
    return hash;
};

async function reqRefund(obj){
    const refund = await api.post('payments/refund', obj);
    console.log(refund)
    return refund;
};

async function listUserReq(){
    const list = await api.get('profile/payments')
    console.log(list)
    return list
}

async function listReq(){
    const list = await api.get('admin/solicitation')
    console.log(list)
    return list
};

export { create, refund, saveCard, reqRefund, listUserReq, listReq }