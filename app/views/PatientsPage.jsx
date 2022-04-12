import * as React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import Patients from '../model/PatientAPI'
import { useEffect } from 'react'
import { DataTable } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import axios from 'axios'

export default function PatientsPage({ navigation }) {

  //const optionsPerPage = [2, 3, 4, 5, 6]
  const [page, setPage] = React.useState(0)
  const [perPage, setPerPage] = React.useState(10)
  const [isLoading, setLoading] = React.useState(true)
  const [AllPatients, setAllPatients] = React.useState({})
  const [NbrPage, setNbrPage] = React.useState(0)
  const [search, setSearch] = React.useState('')
  //au chargement de la page
  useEffect(() => {
    console.log(axios.defaults.headers.common)
    getPatients()
  }, [])

  useEffect(() => {
    console.log(search)
  }, [search])
  // useEffect(() => {
  //   console.log('test')

  //   //console.log(perPage)
  //   //setNbrPage(AllPatients.lenght / perPage)
  //   console.log('All Patients')
  //   console.log(AllPatients)

  //   //si il y a changement dans allPatients
  // }, [AllPatients])



  const getPatients = async () => {
    const result = await Patients.GetPatients()
    await setAllPatients(result['hydra:member'])
    await setLoading(false)
  }

  const filtreTexte = (arr, requete) => {
    return arr.filter(
      (el) => el.toLowerCase().indexOf(requete.toLowerCase()) !== -1
    )
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

            {AllPatients.slice(page * perPage, page * perPage + perPage).map(
              (OnePatient) => (
                <DataTable.Row key={OnePatient.id}>
                  <DataTable.Cell>{OnePatient.nom}</DataTable.Cell>
                  <DataTable.Cell>{OnePatient.prenom}</DataTable.Cell>
                  <DataTable.Cell>
                    {OnePatient.numeroSecuriteSociale}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Button
                      title="Prendre rendez vous"
                      onPress= {() => navigation.navigate("Infirmiers", {
                        Patient: OnePatient,
                      })}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              )
            )}
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
