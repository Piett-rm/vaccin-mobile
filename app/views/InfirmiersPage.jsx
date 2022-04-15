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

export default function InfirmiersPage({ navigation, route }) {
  const patient = route.params.Patient
  // const [patient, setPatient] = React.useState({})
  const [page, setPage] = React.useState(0)
  const [perPage, setPerPage] = React.useState(10)
  const [isLoading, setLoading] = React.useState(true)
  const [AllInfirmiers, setAllInfirmiers] = React.useState({})
  const [search, setSearch] = React.useState('')
  const [day, setDay] = React.useState()
  const [hour, setHour] = React.useState('0')
  const [minute, setMinute] = React.useState('0')
  const [vaccinType, setVaccinType] = React.useState('1')

  const pickerRef = React.useRef()

  useEffect(() => {
    getInfirmiers()
  }, [])

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
                      <DataTable.Cell style={{ margin: 10 }}>
                        <Datetime
                          timeFormat={false}
                          onChange={(itemValue) =>
                            setDay(itemValue.format('YYYY-MM-DD'))
                          }
                          dateFormat={'DD MM YYYY'}
                        />
                        <TimePicker
                          day={day}
                          setDay={setDay}
                          hour={hour}
                          setHour={setHour}
                          minute={minute}
                          setMinute={setMinute}
                          creneauAttribue={OneInfirmier.creneauinfirmiers}
                        />
                      </DataTable.Cell>
                      <DataTable.Cell>
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
