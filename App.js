/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  TextInput,
  Button
} from 'react-native';


import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import auth from '@react-native-firebase/auth';


const Test = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // Handle login
  function onAuthStateChanged(user) {
    console.log("user:", user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log("confirmation: ", confirmation);
    console.log(">>>>>>>>>>>>>>>>",phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+84378811195')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Test;