import api from './api';

async function list(){
  const balance = await api.get('admin/balance')
  console.log(balance)
  return balance
}

export { list }