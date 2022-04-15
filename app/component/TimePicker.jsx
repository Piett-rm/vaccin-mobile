import * as React from 'react'
import { Picker } from '@react-native-picker/picker'

export default function TimePicker({
  navigation,
  day,
  hour,
  setHour,
  setMinute,
  creneauAttribue,
}) {
  const pickerRef = React.useRef()

  const hoursAray = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
  ]

  const valideMinutes = () => {
    const minutesToDisplay = ['00', '15', '30', '45']
    creneauAttribue.forEach((creneau) => {
      const creneauDay = creneau.date_vaccin.substring(0, 10)
      const creneauHour = creneau.date_vaccin.substring(11, 13)
      const creneauMinute = creneau.date_vaccin.substring(14, 16)
      minutesToDisplay.forEach((minute) => {
        if (
          day === creneauDay &&
          hour === creneauHour &&
          minute === creneauMinute
        ) {
          const indexToDelete = minutesToDisplay.indexOf(minute)
          if (indexToDelete !== -1) {
            minutesToDisplay.splice(indexToDelete, 1)
          }
        }
      })
    })
    return minutesToDisplay
  }

  return (
    <>
      <Picker ref={pickerRef} onValueChange={(itemValue) => setHour(itemValue)}>
        {hoursAray.map((hour) => (
          <Picker.Item label={hour} value={hour} />
        ))}
      </Picker>
      H
      <Picker
        ref={pickerRef}
        onValueChange={(itemValue) => setMinute(itemValue)}
      >
        {valideMinutes().map((minute) => (
          <Picker.Item label={minute} value={minute} />
        ))}
      </Picker>
    </>
  )
}
