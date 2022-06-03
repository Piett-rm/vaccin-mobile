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

async function VaccinationAuj() {
  const vaccinAuj = await axios
    .get(`${server_address}:${server_port}/api/vaccinations`)
    .then((response) => response.data["hydra:member"])
  
  const listVaccinAuj = []
  vaccinAuj.forEach((vaccin) => {
    const vaccinDate = Date.parse(vaccin.date_vaccination)
    const date = new Date(vaccinDate)
    const dateAuj = Date.now()
    const dateAujObj = new Date(dateAuj)
    if(date.toLocaleDateString("fr") ===dateAujObj.toLocaleDateString("fr") ){
      listVaccinAuj.push(vaccin)
    }
  });

  return listVaccinAuj
}
export default {
  PostVaccination,
  VaccinationAuj,
}
