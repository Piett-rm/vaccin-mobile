import axios from 'axios'
import { server_address, server_port } from '@env'

//create a vaccin in DB and returns the id created
function PostVaccin(vaccinType) {
  const vaccinID = axios
    .post(`${server_address}:${server_port}/api/vaccins`, {
      vaccinType,
    })
    .then((response) => response.data.id)
  return vaccinID
}
export default {
  PostVaccin,
}
