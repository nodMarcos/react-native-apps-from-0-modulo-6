import { useEffect, useMemo, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {

  const [name, setName] = useState('')
  const [input, setInput] = useState('')
  const inputName = useRef(null)

  useEffect(() => {

    async function getStorage() {
      const storagedName = await AsyncStorage.getItem('nomes');
      if(storagedName !== null) {
        setName(storagedName)
      }
    }

    getStorage()

    // return() => {

    // }

  }, [])

  useEffect(() => {
    
    async function saveStorage() {
      await AsyncStorage.setItem('nomes', name)
    }

    saveStorage();

  }, [name])

  function changeName() {
    setName(input)
    setInput('')
  }

  function newName() {
    inputName.current.focus();
  }

  const nameLength = useMemo(() => {
    console.log('a')
    return name.length;
  }, [name]);
  console.log(nameLength)

  return (
    <View style={styles.container}>

      <TextInput 
        placeholder="Seu nome..."
        value={input}
        onChangeText={(text) => setInput(text)}
        ref={inputName}
      />

      <TouchableOpacity onPress={changeName} style={styles.btn}>
        <Text style={styles.btnText}>
          Change Name
        </Text>
      </TouchableOpacity>

      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>Tem {nameLength} letras.</Text>

      <TouchableOpacity onPress={newName}>
        <Text>New Name</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
  },
  text: {
    color: '#FF0000',
    fontSize:35,
    marginLeft: 20
  },
  btn: {
    backgroundColor: '#222',
    alignItems: 'center'
  },
  btnText: {
    color: '#FFF'
  }
});
