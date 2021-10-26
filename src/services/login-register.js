import api from './api';

async function clientLogin(obj){
  const clientLogin = await api.post('login', obj)
  console.log(clientLogin)
  return clientLogin
}

async function newClient(obj){
    const newClient = await api.post('register', obj)
    console.log(newClient)
    return newClient
}

async function adminLogin(obj){
    const adminLogin = await api.post('admin/login', obj)
    console.log(adminLogin)
    return adminLogin
}

async function newAdmin(obj){
    const newAdmin = await api.post('admin/register', obj)
    console.log(newAdmin)
    return newAdmin
}

export { clientLogin, adminLogin, newClient, newAdmin }