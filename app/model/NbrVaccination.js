import axios from 'axios'
import { server_address, server_port } from '@env'

async function GetNbrVaccination() {
  //return Patients
  return await axios
    .get(`${server_address}:${server_port}/api/creneau_infirmiers?date_vaccin=${Date()}`)
    .then((response) => response.data)
    .then(console.log(Date()))
    .catch((err) => {
      console.error(err)
    })
}

async function getCreneauxVaccination(idinfirmier) {
    //return Patients
    return await axios
      .get(`${server_address}:${server_port}/api/vaccinations?infirmier=${idinfirmier}`)
      .then((response) => response.data)
      .catch((err) => {
        console.error(err)
      })
  }

export default {
    GetNbrVaccination,
    getCreneauxVaccination
}
