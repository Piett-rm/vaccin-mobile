import * as React from 'react'
import { useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import authAPI from '../model/authAPI'
import PatientsPage from './PatientsPage'
import InfirmiersPage from './InfirmiersPage'
import VaccinationAPI from '../model/VaccinationAPI'
import axios from 'axios'
import VaccinTypesAPI from '../model/VaccinTypesAPI'
import Loading from '../component/Loading'
import NbrVaccination from '../model/NbrVaccination'
import ListeInfirmiersPage from './ListeInfirmiersPage'
import ListeCreneaux from './ListeCreneaux'

const Stack = createNativeStackNavigator()

const App = () => {
  // const [jwt, setJwt] = React.useState(null)
  const [jwt, setJwt] = React.useState(
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTQwMDEwMzMsImV4cCI6MTY1NDAwNDYzMywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoibWFydGluZTM5QGF1Z2VyLmNvbSJ9.qCpH-bDFPRXPKnX8P-UZF2kTbKmdmMxJ6wILMDggj9Y6FXi2DKRRJiU6B3pYb8G7FKo8QFLACoAQulPQvGWt5DuJCgS0Upvz4xkD8zm77vOa4MH99X4Semt83ujhex2P-AWNFW-DVW3yUlC9qYP0sLtAlt8XOzw5i6NCICCCad_IO5jryIZpHa833bqTbs52xH1hJ9w7TH9C3MhFjZI4U5XX0aRHX1P7SOeGX53Hw1kaca2kapnyTyFgM6u72gz_1u3F2gfrHo_ntD2lpEKoJI4VO0YLQBjjz9PPFMdYMQ6DfZ0EPEGtrezge_tfBL3BL9ERams0iKg_js54uXcwbKYdlk5z0qw9jEzbYPNkwpadIZ6H3hJLwUuTiMNges2nkzTrpK5OMopLo8Lo3lweHbn9thlPBBzo27yXiyZqwD65A9L6tvy8UD9_XaK5JTyulUSDo_BK8Jy5iuFlasV8obxOX6stsUFujlCSsxV4oNFn1Dd2198RMxYLaQDZT7mRtnh5MvzUr1VyjtRVLlIRUQpH2x0NYaXhx5vgOyf7szfmkym8irbSYVjqAC0oH1Hcz3_uyzZiJTUlwePPQCynsSTwlpHYVehWyJoRxb7oQYq42XwC6qZ5llc5CeSn_Rn-NmjJda_x0l8K0j5BTRG7plEM4WtzRY1UxpTV9TvJNNY'
  )

  function HomeScreen({ navigation }) {
    const [isLoading, setLoading] = React.useState(true)
    const [vaccinType, setVaccinType] = React.useState()
    const  [nbrVaccination, setNbrVaccination] = React.useState()
    const [isLoadingNbrVaccin, setisLoadingNbrVaccin] = React.useState(true)

    useEffect(() => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
      if (!jwt) {
        delete axios.defaults.headers.common['Authorization']
        navigation.navigate('Login')
      }
      //si il y a changement dans jwt
      showToast('Succès', 'Connexion réussie')
    }, [jwt])

    const showToast = (text1, text2) => {
      Toast.show({
        type: 'success',
        text1,
        text2,
      })
    }

    const getVaccinType = async () => {
      const result = await VaccinTypesAPI.GetVaccinTypes()
      setVaccinType(result)
    }

    const getNbrVaccin = async () => {
      const result = await NbrVaccination.GetNbrVaccination() 
      setNbrVaccination(result)
      
    }

    useEffect(() => {
      if (vaccinType != undefined) {
        setLoading(false)
      }
    }, [vaccinType])

    useEffect(() => {
      if (nbrVaccination != undefined) {
        setisLoadingNbrVaccin(false)
        console.log(nbrVaccination)
      }
    }, [nbrVaccination])

    useEffect(() => {
      if (isLoading) {
        if (jwt) {
          setInterval(() => getVaccinType(), 10000)
          setInterval(() => getNbrVaccin(), 10000) 
        }
        
      }
      console.log(vaccinType)
    })

    return (
      <>
        <View style={stylesHomePage.container}>
          <View style={stylesHomePage.header}>
            <View style={stylesHomePage.title}>
              <Text style={stylesHomePage.textTitle}>Gestion des vaccins</Text>
            </View>
            <View style={stylesHomePage.deconnexion}>
              <Button
                style={stylesHomePage.buttonDeconnexion}
                title="Deconnexion"
                onPress={() => setJwt(null)}
              />
            </View>
          </View>
          <View style={stylesHomePage.body}>
            <View style={stylesHomePage.line}>
              {!isLoading && (
                <>
                  {vaccinType.map((vaccinType) => (
                    <View key={vaccinType.id} style={stylesHomePage.bodyCase}>
                      <Text style={stylesHomePage.vaccinStock}>
                        {vaccinType.stock}
                      </Text>
                      <Text style={stylesHomePage.vaccinNom}>
                        {vaccinType.nom}
                      </Text>
                    </View>
                  ))}
                </>
              )}
              {isLoading && <Text>Loading</Text>}
            </View>
          </View>
          <View style={stylesHomePage.text}>
            <View style={stylesHomePage.buttonReservation}>
              <Button
                style={stylesHomePage.buttonForReservation}
                title="Reservation vaccin"
                onPress={() => navigation.navigate('Patients')}
              />
            </View>
          </View>
          <View style={stylesHomePage.text}>
            <View style={stylesHomePage.buttonReservation}>
              <Button
                style={stylesHomePage.buttonForReservation}
                title="Infirmiers"
                onPress={() => navigation.navigate('ListeInfirmiers')}
              />
            </View>
          </View>
          <View></View>
          {! isLoadingNbrVaccin &&
          <View>
            <Text>Nombre de vaccination aujourd'hui : {nbrVaccination['hydra:totalItems']}</Text>
          </View>
          }
        </View>
      </>
    )
  }

  const stylesHomePage = StyleSheet.create({
    container: {
      height: 100,
      padding: 20,
      flex: 1,
      flexDirection: 'column',
    },
    header: {
      flex: 1,
      flexDirection: 'row',
    },
    deconnexion: {
      flex: 1,
      margin: 5,
    },
    buttonDeconnexion: {
      height: 50,
      width: 50,
    },
    title: {
      flex: 4,
      fontSize: 100,
      alignItems: 'center',
    },
    textTitle: {
      fontSize: 100,
    },
    body: {
      flex: 6,
      justifyContent: 'center',
    },
    line: {
      justifyContent: 'space-around',
      flexDirection: 'row',
    },
    bodyCase: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    vaccinStock: {
      fontSize: 60,
      fontWeight: 'bold',
    },
    vaccinNom: {
      fontSize: 25,
    },
    text: {
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    buttonReservation: {
      flex: 5,
      alignItems: 'center',
    },
  })

  const LoginPage = ({ navigation }) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const login = () => {
      try {
        return authAPI
          .authentificate({
            username: email,
            password: password,
          })
          .then((result) => setJwt(result))
      } catch (error) {
        showToast('Erreur', 'Une erreur est survenue')
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log(error.request)
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log('Error', error.message)
        }
        console.log(error)
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },

      image: {
        marginBottom: 40,
      },

      inputView: {
        backgroundColor: '#A4C5F3',
        borderRadius: 30,
        width: '70%',
        height: 45,
        marginBottom: 20,

        alignItems: 'center',
      },

      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
      },

      forgot_button: {
        height: 30,
        marginBottom: 30,
      },

      loginBtn: {
        width: '20%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#0762D7',
      },
    })

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#000000"
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#000000"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => console.log(login())}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {!jwt && <Stack.Screen name="Login" component={LoginPage} />}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'My home',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen name="Patients" component={PatientsPage} />
          <Stack.Screen name="Infirmiers" component={InfirmiersPage} />
          <Stack.Screen name="ListeInfirmiers" component={ListeInfirmiersPage} />
          <Stack.Screen name="ListeCreneaux" component={ListeCreneaux} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  )
}
export default App
