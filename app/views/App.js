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
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTQyMDEwOTEsImV4cCI6MTY1NDIwNDY5MSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoibWFydGluZTM5QGF1Z2VyLmNvbSJ9.tBrY2mJGTW863OpHl5MZTt4xBf10z3EGI21mW4hKPQUYFn913MCcH1IRqZ3jwgUGhGro5D1EoqbfK2Z5RUviGJ00IulOup5qvcJkvqzk-jP3RQDG0gaqPY57KdZsvzXVGoblXxArhxRpk596I2yBnJ3rMMrnwLymGIxIO67ZVJkwFF0sPR5SEDgVZbv4C1qRkamoe4vkN0lqDCEF-KzqRdleLjE_ZTNVBhFr29OjyF5N1KATHJ4o1VZ-FA68kPH3G91TohVNUVUm8M2rRlp5FBDZuYbNJvOqDJ0CD389KlyNpcqHRnX-LeBaB0xS6xvXNf8YptS_y0m9ZtL_oSKB12-24m7hVZJP3kmwjocFL9QZwhsxAF_PZ7rTHKTlPHw2zkMIeFZNQbUZ_PyoJ9baTscjiugPyjdwA30wdSmCQb_wzrwi8t61vazPfevgyarUW4FExqzZT_6kl4vXsRDsfepSkblpQnP6z4C6mKMfa4t-073AKsYuQ5ObpZV-9kdf4LC_POlR9vprahJr1-UU-90zewmnijwxQH4X3zxUjCMqCefJYFshk-Z3eExi-Dsyn1YDRA5fU-s5Bgml4fmllju5FLoNCshDVzLys9GN2_YXi-aahOfvaw62XYIh7gbzo7JB0E1_0RwQoGp_iTxYHOZvYN1VjrhNSm1JEnaR8Uk'
  )

  function HomeScreen({ navigation }) {
    const [isLoading, setLoading] = React.useState(true)
    const [vaccinType, setVaccinType] = React.useState()
    const [test, setTest] = React.useState('test')

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

    const getVaccinAuj = async () => {
      const result = await VaccinationAPI.VaccinationAuj()
      console.log(VaccinationAPI.VaccinationAuj())
      setTest(result)
    }

    useEffect(() => {
      if (vaccinType != undefined) {
        setLoading(false)
      }
    }, [vaccinType])

    useEffect(() => {
      
      if (test != undefined) {
        console.log(test)
      }
    }, [test])

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
            <Button
              style={stylesHomePage.buttonDeconnexion}
              title="debug"
              onPress={() => getVaccinAuj()}
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
