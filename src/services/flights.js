import api from './api';

async function list(){
  const flights = await api.get('/flights')
  console.log(flights)
  return flights
}

async function create(obj){
  const flights = await api.post('/flights', obj)
  console.log(flights)
  return flights
}

export { list, create }