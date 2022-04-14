import * as React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import Infirmiers from '../model/InfirmierAPI'
import { useEffect } from 'react'
import { DataTable } from 'react-native-paper'
import axios from 'axios'
import DatePicker from '../component/DatePicker'

export default function InfirmiersPage({ navigation, route }) {

    const patient = route.params.Patient
    // const [patient, setPatient] = React.useState({})
    const [page, setPage] = React.useState(0)
    const [perPage, setPerPage] = React.useState(10)
    const [isLoading, setLoading] = React.useState(true)
    const [AllInfirmiers, setAllInfirmiers] = React.useState({})
    const [NbrPage, setNbrPage] = React.useState(0)
    const [search, setSearch] = React.useState('')

    //au chargement de la page
    useEffect(() => {
      getInfirmiers()
    }, [])
  
    useEffect(() => {
      console.log(search)
    }, [search])
  
    
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
                  Recherche d'un rendez vous vaccin pour : {patient.nom} {patient.prenom}
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
                  <DataTable.Title>Rendez vous</DataTable.Title>
                </DataTable.Header>
    
                {AllInfirmiers.filter(OneInfirmier => OneInfirmier.service.id === 32).slice(page * perPage, page * perPage + perPage).map(
                  
                  (OneInfirmier) => (
                    <>
                    {OneInfirmier.prenom.startsWith(search) &&

                    <DataTable.Row key={OneInfirmier.id}>
                      <DataTable.Cell>{OneInfirmier.nom}</DataTable.Cell>
                      <DataTable.Cell>{OneInfirmier.prenom}</DataTable.Cell>
                      <DataTable.Cell>
                      </DataTable.Cell>
                    </DataTable.Row>}
                    </>
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