import api from './api';

async function list(){
  const balance = await api.get('/admin/balance')
  return balance
}

export { list }