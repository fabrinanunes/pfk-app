import api from './api';

async function clientLogin(obj){
  const clientLogin = await api.post('login', obj)
  return clientLogin
}

async function newClient(obj){
    const newClient = await api.post('register', obj)
    return newClient
}

async function adminLogin(obj){
    const adminLogin = await api.post('admin/login', obj)
    return adminLogin
}

async function newAdmin(obj){
    const newAdmin = await api.post('admin/register', obj)
    return newAdmin
}

export { clientLogin, adminLogin, newClient, newAdmin }