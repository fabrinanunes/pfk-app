import api from './api';
import apiToken from './api-token';

async function list(){
  const flights = await api.get('flights')
  return flights
}

async function create(obj){
  const flights = await apiToken.post('flights', obj)
  return flights
}

export { list, create }