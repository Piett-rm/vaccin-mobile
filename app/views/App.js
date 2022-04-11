import * as React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import authAPI from '../model/authAPI'
import PatientsPage from './PatientsPage'

const Stack = createNativeStackNavigator()

const App = () => {
  const [jwt, setJwt] = React.useState(null)

  function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Patient"
          onPress={() =>
            navigation.navigate('Patients', {
              itemId: 16,
              otherParam: 'Cheese',
            })
          }
        />
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate('Login')}
        />
        <Button title="Show Jwt" onPress={() => console.log(jwt)} />
      </View>
    )
  }

  const LoginPage = ({ navigation }) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const login = () => {
      try {
        return authAPI
          .authentificate({
            username: 'martine39@auger.com',
            password: 'Epsi.123',
          })
          .then((result) => setJwt(result))
          .then((result) => console.log(result))
          .then((axios.defaults.headers['Authorization'] = 'Bearer ' + jwt))
          .catch((Error) => Error)
      } catch {
        return `error`
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
        width: '80%',
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
            placeholder="Email."
            placeholderTextColor="#000000"
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password."
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
        <Button title="Show Jwt" onPress={() => console.log(jwt)} />
      </View>
    )
  }
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App
