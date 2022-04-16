import * as React from 'react'
import { useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import authAPI from '../model/authAPI'
import PatientsPage from './PatientsPage'
import InfirmiersPage from './InfirmiersPage'
import axios from 'axios'

const Stack = createNativeStackNavigator()

const App = () => {
  const [jwt, setJwt] = React.useState(null)

  function HomeScreen({ navigation }) {
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

    return (
      <View style={stylesHomePage.container}>
        <View style={stylesHomePage.headers}>
          <Text style={stylesHomePage.titre}>Gestion des vaccins</Text>
        </View>
        <View style={stylesHomePage.text}>
          <Button
            title="Go to Patient"
            onPress={() => navigation.navigate('Patients')}
          />
          <Button title="Deconnexion" onPress={() => setJwt(null)} />
          <Button title="Show Jwt" onPress={() => console.log(jwt)} />
        </View>
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
    headers: {
      flex: 1,
      height: 15,
    },
    titre: {
      fontSize: 100,
    },
    text: {
      flex: 2,
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
