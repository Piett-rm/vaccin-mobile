import axios from 'axios'
import { server_address, server_port } from '@env'


async function GetPatients(config) {
  //return Patients
  return await axios.get(
    `${server_address}:${server_port}/api/patients`,
    config).then((response) => response.data)
          .catch(err => {console.error(err)})
}
export default {
    GetPatients,
  }

