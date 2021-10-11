import api from './api';

async function list(){
  const flights = await api.get('/flights')
  return flights
}

export { list }