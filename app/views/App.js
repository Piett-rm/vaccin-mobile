import * as React from 'react'
import { View, Text, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import authAPI from '../model/authAPI'
import PatientsPage from './PatientsPage'

const login = () => {
  const toto = authAPI.authentificate({
    username: 'martine39@auger.com',
    password: 'Epsi.123',
  })
  return toto
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      {/* <Button title="login request" onPress={() => console.log(login())} /> */}
      <Button
        title="Go to Patient"
        onPress={() =>
          navigation.navigate('Patients', { itemId: 16, otherParam: 'Cheese' })
        }
      />
      <Button
        title="test login request"
        onPress={() =>
          console.log(
            authAPI
              .authentificate({
                username: 'martine39@auger.com',
                password: 'Epsi.123',
              })
              .then((result) => console.log(result))
          )
        }
      />
    </View>
  )
}

function DetailsScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
            otherParam: 'Butter',
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  )
}

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
