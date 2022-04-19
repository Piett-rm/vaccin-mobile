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

const Stack = createNativeStackNavigator()

const App = () => {
  // const [jwt, setJwt] = React.useState(null)
  const [jwt, setJwt] = React.useState(
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTAzNzkzNzcsImV4cCI6MTY1MDM4Mjk3Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoibWFydGluZTM5QGF1Z2VyLmNvbSJ9.Vx6JYUHV1jsDbX8kKcr1Ai6_vH6TE_u8ZtFqc-fkHha6oVfszF_Lv8-MQMuMbCUbfCd76fpw6F_oDs-oQE_ByjC_5aqdUYfIcr83uz9F2KSsI2g8la6Dyg3_Bg0rvluTcFGKKcA78ebIr-mOTK9RIpuj0y46iddSUFbVBndYV4pC_F6tWRqhD79S6gaPwL7HOkQ2j87qmYJIvKoiVhInhCJ7N2yAK57awjqyKqu6eeqNa5yA5eW1oUofz-M-40qt6-uyJSn1LSqRaQVT1Vj5-yof8Vn0ivGSKR-9x6ANa_mzSqspXowN2lhNcXn8ATK1Lvib-oN1zwXcDiHnF3j6c3KjLhjogaFQm9ySCVoBevHB7_y0_WfG2oVkUUKeMwHLVz_weSyvd4LzYdGVEnIaVeP52hrlFHL5W5inCxFUnzcW5muQs35HowRJLQF195eL4kd9HXbqxQ81GY8MmmOwQjKzZNi2BdWF9xAwxkr_7XFYBgsnDkGsHgW_8LGwdSGozchGc4ersVI4c_h6vM4Q5_Loqwgva7nAwakSq5kIAj5-2wUbDuoxWEqpp4gnYuDp6_jd3FjiRdgh5Yo1RkNwMx7it4bC93RiNbliBrqbV2TBoDW67XcGT1taxZjuwNUivxASoy3k4hX6RG4fsx06k8mys6ipJl4TPmiEVxj5rFU'
  )

  function HomeScreen({ navigation }) {
    const [isLoading, setLoading] = React.useState(true)
    const [vaccinType, setVaccinType] = React.useState()

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

    useEffect(() => {
      if (vaccinType != undefined) {
        setLoading(false)
      }
    }, [vaccinType])

    useEffect(() => {
      if (isLoading) {
        if (jwt) {
          setInterval(() => getVaccinType(), 10000)
        }
      }
      console.log(vaccinType)
    })

    return (
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
            <Button style={stylesHomePage.buttonForReservation}
              title="Reservation vaccin"
              onPress={() => navigation.navigate('Patients')}
            />
          </View>
          
        </View>
        <View></View>
      </View>
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
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  )
}
export default App
