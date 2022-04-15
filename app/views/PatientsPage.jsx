import * as React from 'react'
import { StyleSheet, View, TextInput, Button } from 'react-native'
import Patients from '../model/PatientAPI'
import { useEffect } from 'react'
import { DataTable } from 'react-native-paper'
import axios from 'axios'
import Loading from '../component/Loading'

export default function PatientsPage({ navigation }) {
  const [page, setPage] = React.useState(0)
  const [perPage, setPerPage] = React.useState(10)
  const [isLoading, setLoading] = React.useState(true)
  const [AllPatients, setAllPatients] = React.useState({})
  const [NbrPage, setNbrPage] = React.useState(0)
  const [search, setSearch] = React.useState('')
  //au chargement de la page
  useEffect(() => {
    getPatients()
  }, [])

  useEffect(() => {
    console.log(search)
  }, [search])

  const getPatients = async () => {
    const result = await Patients.GetPatients()
    await setAllPatients(result['hydra:member'])
    await setLoading(false)
  }

  return (
    <>
      {!isLoading && (
        <View style={styles.container}>
          <div>
            <TextInput
              style={{ height: 40 }}
              placeholder="Recherche patient"
              onChangeText={(newText) => setSearch(newText)}
              defaultValue={search}
            />
          </div>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Nom</DataTable.Title>
              <DataTable.Title>Prenom</DataTable.Title>
              <DataTable.Title>Numero de sécurité social</DataTable.Title>
              <DataTable.Title>Rendez vous</DataTable.Title>
            </DataTable.Header>

            {AllPatients.map((OnePatient) => (
              <>
                {(OnePatient.prenom.startsWith(search) ||
                  OnePatient.nom.startsWith(search) ||
                  OnePatient.numeroSecuriteSociale
                    .toString()
                    .startsWith(search)) && (
                  <DataTable.Row key={OnePatient.id}>
                    <DataTable.Cell>{OnePatient.nom}</DataTable.Cell>
                    <DataTable.Cell>{OnePatient.prenom}</DataTable.Cell>
                    <DataTable.Cell>
                      {OnePatient.numeroSecuriteSociale}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Button
                        title="Prendre rendez vous"
                        onPress={() =>
                          navigation.navigate('Infirmiers', {
                            Patient: OnePatient,
                          })
                        }
                      />
                    </DataTable.Cell>
                  </DataTable.Row>
                )}
              </>
            )).slice(page * perPage, page * perPage + perPage)}
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
