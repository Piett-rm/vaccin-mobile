import * as React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import Patients from '../model/PatientAPI'
import { useEffect } from 'react'
import { DataTable } from 'react-native-paper'

export default function PatientsPage() {
  let config = {
    headers: {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NDg3MzUwNTQsImV4cCI6MTY0ODczODY1NCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoibWFydGluZTM5QGF1Z2VyLmNvbSJ9.GQqJMXmmlvD3tf49fezKFjFJnK5ZueqOw1_iwLZ_hTiwJ0MAHNn-NJvOs2eBNyDNANvPjcQ6ncq6XirLJueeyoKfPGcNaDoQYVabu1W7J4aPeSOSKzkS-hdXaakMV6PWpftgpGetUD1MgXAka01ZWlPzA-VjX07BUZYFDXRl_Z-0AWmgALvkWM1GzAZV1cP_JKeWQDgxHjFB4-k7JSew_oDYlQJQXZXFWuXMaLjA6ALD0YprpJqtaG6N1_m3XMctyAuZIgQgcbRv7xSDQLSIcpwzefiGhXApI49z_lL0DZRtfzYkSln9Go2Yu8QSfEQbtojy7filLG7u__InnvhQyiKEaxT9kwJ5FZwOFP36DnEUT3VG2Cf5e6cNhWNRQ7KiiU56AzVFjTqOfymuGClWJdO_TgoMNepj12R-RPYn1KX0b6s7bgWs-YDYxy-Ffl06EPSuoxukGBNNg5ZrATpxyDP0eujIf9NXAUgenmmvqFrI99RLwOQXXLj4XksDSZb32qlO11DJcR2oSw_uXfMia52CXeYmhLeupXf3V3uVl_1qQQsGk5SDFsm2Q7_8ykdNQCQCQyYRB1R4K3eSAEpy914u8FQ3mCadV9tdVycT_OWxR-ZEceWoSViqMhFTt3lFaOGy0veztM3lfOJOobx9hzRQrQq4Ju6Q5v-oVW_Uzvk',
    },
  }

  //const optionsPerPage = [2, 3, 4, 5, 6]
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
  // useEffect(() => {
  //   console.log('test')

  //   //console.log(perPage)
  //   //setNbrPage(AllPatients.lenght / perPage)
  //   console.log('All Patients')
  //   console.log(AllPatients)

  //   //si il y a changement dans allPatients
  // }, [AllPatients])

  const getPatients = async () => {
    const result = await Patients.GetPatients(config)
    await setAllPatients(result['hydra:member'])
    await setLoading(false)
  }

  const filtreTexte = (arr, requete) => {
    return arr.filter(el =>  el.toLowerCase().indexOf(requete.toLowerCase()) !== -1);
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
            </DataTable.Header>

            {filtreTexte(AllPatients,  search)
              .slice(page * perPage, page * perPage + perPage)
              .map((OnePatient) => (
                <DataTable.Row key={OnePatient.id}>
                  <DataTable.Cell>{OnePatient.nom.toLowerCase()}</DataTable.Cell>
                  <DataTable.Cell>{OnePatient.prenom}</DataTable.Cell>
                  <DataTable.Cell>
                    {OnePatient.numeroSecuriteSociale}
                  </DataTable.Cell>
                </DataTable.Row>
              ))            
              }
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
