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

export default function ListeInfirmiersPage({ navigation, route }) {
  // const [patient, setPatient] = React.useState({})
  const [page, setPage] = React.useState(0)
  const [perPage, setPerPage] = React.useState(10)
  const [isLoading, setLoading] = React.useState(true)
  const [AllInfirmiers, setAllInfirmiers] = React.useState([])
  const [search, setSearch] = React.useState('')
  const [day, setDay] = React.useState()
  const [hour, setHour] = React.useState('0')
  const [minute, setMinute] = React.useState('0')
  const [vaccinType, setVaccinType] = React.useState('1')
  const [allVaccinType, setAllVaccinType] = React.useState([])

  const pickerRef = React.useRef()

  const showToast = (text1, text2, type) => {
    Toast.show({
      type,
      text1,
      text2,
    })
  }

  useEffect(() => {
    getInfirmiers()
    GetAllVaccinTypes()
  }, [])

  useEffect(() => {
    if (allVaccinType.length > 0 && AllInfirmiers.length > 0) {
      setLoading(false)
    }
  }, [AllInfirmiers, allVaccinType])


  const getInfirmiers = async () => {
    const result = await Infirmiers.GetInfirmiers()
    await setAllInfirmiers(result['hydra:member'])
  }
  const GetAllVaccinTypes = async () => {
    const result = await VaccinTypesAPI.GetVaccinTypes()
    await setAllVaccinType(result)
  }

  const debug = () => {
    console.log(vaccinType)
    console.log(AllInfirmiers)
  }

  return (
    <>
      {!isLoading && (
        <View style={styles.container}>
          <TextInput
            style={{ height: 40 }}
            placeholder="Recherche infirmier"
            onChangeText={(newText) => setSearch(newText)}
            defaultValue={search}
          />

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Nom</DataTable.Title>
              <DataTable.Title>Prenom</DataTable.Title>
              <DataTable.Title>Service</DataTable.Title>
              <DataTable.Title>Voir creneaux</DataTable.Title>

              <DataTable.Title />
            </DataTable.Header>

            {AllInfirmiers.slice(page * perPage, page * perPage + perPage).map(
              (OneInfirmier) => (
                <>
                  {OneInfirmier.prenom.startsWith(search) && (
                    <DataTable.Row key={OneInfirmier.id}>
                      <DataTable.Cell>{OneInfirmier.nom}</DataTable.Cell>
                      <DataTable.Cell>{OneInfirmier.prenom}</DataTable.Cell>
                      <DataTable.Cell>
                        {OneInfirmier.service.nom}
                      </DataTable.Cell>
                      {OneInfirmier.service.nom === 'Vaccination' && (
                        <Button
                          title="Voir créneaux"
                          onPress={() => navigation.navigate('ListeCreneaux', {
                            Infirmier: OneInfirmier,
                          }) }
                        />
                      )}
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
