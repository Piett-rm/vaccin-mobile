import * as React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import Infirmiers from '../model/InfirmierAPI'
import { useEffect } from 'react'
import { DataTable } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
import Datetime from 'react-datetime'
import VaccinationAPI from '../model/VaccinationAPI'
import TimePicker from '../component/TimePicker'
import Loading from '../component/Loading'
import VaccinTypesAPI from '../model/VaccinTypesAPI'
import Toast from 'react-native-toast-message'
import NbrVaccination from '../model/NbrVaccination'

export default function ListeCreneaux({ navigation, route }) {
  const infirmier = route.params.Infirmier
  // const [patient, setPatient] = React.useState({})
  const [page, setPage] = React.useState(0)
  const [perPage, setPerPage] = React.useState(10)
  const [isLoading, setLoading] = React.useState(true)
  const [AllInfirmiers, setAllInfirmiers] = React.useState([])
  const [Creneaux, setCreneaux] = React.useState([])
  const [search, setSearch] = React.useState('')
  const [vaccinType, setVaccinType] = React.useState('1')
  const [allVaccinType, setAllVaccinType] = React.useState([])

  useEffect(() => {
    console.log(infirmier.id)
    getCreneaux()
  }, [])

  useEffect(() => {
    if (Creneaux.length > 0 && Creneaux.length > 0) {
      console.log(Creneaux)
      setLoading(false)
    }
  }, [Creneaux])

  const getCreneaux = async () => {
    const result = await NbrVaccination.getCreneauxVaccination(infirmier.id)
    setCreneaux(result['hydra:member'])
  }

  const debug = () => {
    console.log(vaccinType)
    console.log(AllInfirmiers)
  }

  return (
    <>
      {!isLoading && (
        <View style={styles.container}>
          <div>
            <Text style={{ fontSize: 40 }}>
              Liste des créneaux de {infirmier.prenom} {infirmier.nom}
            </Text>
          </div>
          <TextInput
            style={{ height: 40 }}
            placeholder="Recherche infirmier"
            onChangeText={(newText) => setSearch(newText)}
            defaultValue={search}
          />

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Nom du patient</DataTable.Title>
              <DataTable.Title>Prenom du patient</DataTable.Title>
              <DataTable.Title>Date dez vaccination</DataTable.Title>
              <DataTable.Title>Type de vaccin</DataTable.Title>

              <DataTable.Title />
            </DataTable.Header>

            {Creneaux.slice(page * perPage, page * perPage + perPage).map(
              (Creneau) => (
                <>
                  {Creneau.patient.prenom.startsWith(search) && (
                    <DataTable.Row key={Creneau.id}>
                      <DataTable.Cell>{Creneau.patient.nom}</DataTable.Cell>
                      <DataTable.Cell>{Creneau.patient.prenom}</DataTable.Cell>
                      <DataTable.Cell>{Creneau.date_vaccination}</DataTable.Cell>
                    </DataTable.Row>
                  )}
                </>
              )
            )}
            <DataTable.Pagination
              page={page}
              perPage={perPage}
              onPageChange={(page) => setPage(page)}
              label={page + 1}
              showFastPagination
              optionsLabel={'Rows per page'}
            />
          </DataTable>
        </View>
      )}
      {isLoading && <Loading />}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
  },
})
