import { Image, StyleSheet, Platform, TextInput, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { btoa, atob } from 'react-native-quick-base64'

export default function HomeScreen() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [workHours, setWorkHours] = useState(0)
  
  function setToMonday( date: Date ) {
    var day = date.getDay() || 7;  
    if( day !== 1 ) 
        date.setHours(-24 * (day - 1)); 
    return date;
}



function getQuery() {

  let mon = new Date()

  let end = mon.toISOString().slice(0, 10)

  setToMonday(mon);

  let start = mon.toISOString().slice(0, 10)

  return `start_date=${start}&end_date=${end}`
}

function callToggl(){
  let encodedAuth = btoa(`${email}:${password}`)

  fetch(`https://api.track.toggl.com/api/v9/me/time_entries?${getQuery()}`, {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    "Authorization": `Basic ${encodedAuth}`
    },
  })
  .then((resp) => resp.json())
  .then((json) => {
    let workId = '172606006'

    let workOnly = json.filter((x: any) => x.project_id == workId)
    let sum = workOnly.reduce((partialSum: number, a: any) => partialSum + a.duration, 0)
    console.log(workOnly);
  })
  .catch(err => console.error(err))

  let current = 'https://api.track.toggl.com/api/v9/me/time_entries/current'

}

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome! Bitchezzzzz</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView>
      <ThemedText type="subtitle">Enter email</ThemedText>
      <TextInput onChangeText={setEmail}  value={email} />
        <ThemedText type="subtitle">Enter password</ThemedText>
        <TextInput secureTextEntry={true} onChangeText={setPassword} value={password} />
        <Button title='Click Me' onPress={callToggl} />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
