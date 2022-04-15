import axios from 'axios'
import { server_address, server_port } from '@env'

async function GetInfirmiers() {
  //return Patients
  return await axios
    .get(`${server_address}:${server_port}/api/infirmiers`)
    .then((response) => response.data)
    .catch((err) => {
      console.error(err)
    })
}

async function GetInfirmier(infirmierID) {
  return await axios
    .get(`${server_address}:${server_port}/api/infirmiers/${infirmierID}`)
    .then((response) => response.data)
    .catch((err) => {
      console.error(err)
    })
}
export default {
  GetInfirmiers,
  GetInfirmier,
}
