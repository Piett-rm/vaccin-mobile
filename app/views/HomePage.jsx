import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TEST } from '@env'

export default function App() {
  const [credentials, setCredentials] = React.useState({
    username: '',
    password: '',
  })

  if (state.isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text>Bienvenue sur notre application de vaccination</Text>
      <Text>{TEST}</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
