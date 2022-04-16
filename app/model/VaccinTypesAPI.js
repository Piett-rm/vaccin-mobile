import axios from 'axios'
import { server_address, server_port } from '@env'

async function GetVaccinTypes() {
  return await axios
    .get(`${server_address}:${server_port}/api/vaccin_types`)
    .then((response) => response.data['hydra:member'])
}
export default {
  GetVaccinTypes,
}
