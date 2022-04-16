import axios from 'axios'
import { server_address, server_port } from '@env'

function authentificate(credentials) {
  //renvoie un bearer token
  return axios
    .post(`${server_address}:${server_port}/api/login_check`, credentials)
    .then((response) => response.data.token)
}

export default {
  authentificate,
}
