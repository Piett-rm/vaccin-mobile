import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
  const [credentials, setCredentials] = React.useState({
    username: '',
    password: '',
  })
  return (
    <View style={styles.container}>
      <Text>Sign In</Text>
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
