import * as React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import Infirmiers from '../model/InfirmierAPI'
import { useEffect } from 'react'
import { DataTable } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
import Datetime from 'react-datetime'
import VaccinationAPI from '../model/VaccinationAPI'

export default function InfirmiersPage({ navigation, route }) {
  const patient = route.params.Patient
  // const [patient, setPatient] = React.useState({})
  const [page, setPage] = React.useState(0)
  const [perPage, setPerPage] = React.useState(10)
  const [isLoading, setLoading] = React.useState(true)
  const [AllInfirmiers, setAllInfirmiers] = React.useState({})
  const [NbrPage, setNbrPage] = React.useState(0)
  const [search, setSearch] = React.useState('')
  const [day, setDay] = React.useState(new Date())
  const [hour, setHour] = React.useState('0')
  const [minute, setMinute] = React.useState('0')
  const [vaccinType, setVaccinType] = React.useState('1')

  const pickerRef = React.useRef()

  useEffect(() => {
    getInfirmiers()
  }, [])

  useEffect(() => {
    console.log(search)
  }, [search])

  const debug = async () => {
    console.log('vaccinType')
    console.log(vaccinType)
  }
  const takeRDV = async (infirmierId) => {
    const formatedDate = `${day}T${hour}:${minute}`

    await VaccinationAPI.PostVaccination(
      `/api/vaccin_types/${vaccinType}`,
      `/api/patients/${patient.id}`,
      `/api/infirmiers/${infirmierId}`,
      formatedDate
    )
  }

  const getInfirmiers = async () => {
    const result = await Infirmiers.GetInfirmiers()
    await setAllInfirmiers(result['hydra:member'])
    await setLoading(false)
  }

  return (
    <>
      {!isLoading && (
        <View style={styles.container}>
          <div>
            <Text style={{ fontSize: 40 }}>
              Recherche d'un rendez vous vaccin pour : {patient.nom}{' '}
              {patient.prenom}
            </Text>
            <Button title="DEBUG" onPress={() => debug()} />
          </div>
          <div>
            <TextInput
              style={{ height: 40 }}
              placeholder="Recherche infirmier"
              onChangeText={(newText) => setSearch(newText)}
              defaultValue={search}
            />
          </div>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Nom</DataTable.Title>
              <DataTable.Title>Prenom</DataTable.Title>
              <DataTable.Title>Vaccin</DataTable.Title>
              <DataTable.Title>Rendez vous</DataTable.Title>
              <DataTable.Title />
            </DataTable.Header>

            {AllInfirmiers.filter(
              (OneInfirmier) => OneInfirmier.service.id === 32
            )
              .slice(page * perPage, page * perPage + perPage)
              .map((OneInfirmier) => (
                <>
                  {OneInfirmier.prenom.startsWith(search) && (
                    <DataTable.Row key={OneInfirmier.id}>
                      <DataTable.Cell>{OneInfirmier.nom}</DataTable.Cell>
                      <DataTable.Cell>{OneInfirmier.prenom}</DataTable.Cell>
                      <DataTable.Cell>
                        <Picker
                          ref={pickerRef}
                          onValueChange={(itemValue) =>
                            setVaccinType(itemValue)
                          }
                        >
                          <Picker.Item label="Pfizer" value="1" />
                          <Picker.Item label="Moderna" value="2" />
                          <Picker.Item label="Astra Zeneca" value="3" />
                        </Picker>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Datetime
                          timeFormat={false}
                          onChange={(itemValue) =>
                            setDay(itemValue.format('YYYY-MM-DD'))
                          }
                          dateFormat={'DD MM YYYY'}
                        />
                        <Picker
                          ref={pickerRef}
                          onValueChange={(itemValue) => setHour(itemValue)}
                        >
                          <Picker.Item label="00" value="0" />
                          <Picker.Item label="01" value="1" />
                          <Picker.Item label="02" value="2" />
                          <Picker.Item label="03" value="3" />
                          <Picker.Item label="04" value="4" />
                          <Picker.Item label="05" value="5" />
                          <Picker.Item label="06" value="6" />
                          <Picker.Item label="07" value="7" />
                          <Picker.Item label="08" value="8" />
                          <Picker.Item label="09" value="9" />
                          <Picker.Item label="10" value="10" />
                          <Picker.Item label="11" value="11" />
                          <Picker.Item label="12" value="12" />
                          <Picker.Item label="13" value="13" />
                          <Picker.Item label="14" value="14" />
                          <Picker.Item label="15" value="15" />
                          <Picker.Item label="16" value="16" />
                          <Picker.Item label="17" value="17" />
                          <Picker.Item label="18" value="18" />
                          <Picker.Item label="19" value="19" />
                          <Picker.Item label="20" value="20" />
                          <Picker.Item label="21" value="21" />
                          <Picker.Item label="22" value="22" />
                          <Picker.Item label="23" value="23" />
                        </Picker>
                        H
                        <Picker
                          ref={pickerRef}
                          onValueChange={(itemValue) => setMinute(itemValue)}
                        >
                          <Picker.Item label="00" value="00" />
                          <Picker.Item label="15" value="15" />
                          <Picker.Item label="30" value="30" />
                          <Picker.Item label="45" value="45" />
                        </Picker>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        {' '}
                        <Button
                          title="Prendre RDV"
                          onPress={() => takeRDV(OneInfirmier.id)}
                        />
                      </DataTable.Cell>
                    </DataTable.Row>
                  )}
                </>
              ))}
            <DataTable.Pagination
              page={page}
              //
              //numberOfRows={AllPatients.length}
              perPage={perPage}
              onPageChange={(page) => setPage(page)}
              label={page + 1}
              showFastPagination
              optionsLabel={'Rows per page'}
            />
          </DataTable>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
  },
})
