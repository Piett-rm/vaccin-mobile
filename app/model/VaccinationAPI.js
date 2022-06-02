import axios from 'axios'
import { server_address, server_port } from '@env'
import VaccinAPI from './VaccinAPI'

async function PostVaccination(
  vaccinType,
  patient,
  infirmier,
  dateVaccination
) {
  //on commence par créer un vaccin et grâce à son id on ajoute la vaccination
  return VaccinAPI.PostVaccin(vaccinType).then((vaccinId) => {
    return axios
      .post(`${server_address}:${server_port}/api/vaccinations`, {
        vaccin: `/api/vaccins/${vaccinId}`,
        patient,
        infirmier,
        dateVaccination,
      })
      .then((response) => response)
      .catch((err) => {
        console.error(err)
      })
  })

}
export default {
  PostVaccination,
}
