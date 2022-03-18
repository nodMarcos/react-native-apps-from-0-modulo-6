import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';
import api from './src/services/api'

export default function App() {

  const [cep, setCep] = useState('')
  const [cepUser, setCepUser] = useState(null)
  const inputRef = useRef(null)

  function clear() {
    setCep('')
    inputRef.current.focus()
    setCepUser(null)
  }

  async function search() {
    if(cep === '') {
      alert('Digite um CEP válido');
      setCep('')
      return ;
    }

    try {
      const response = await api.get(`/${cep}/json`)
      console.log(response.data)
      setCepUser(response.data)
      Keyboard.dismiss()
      
    } catch (error) {
      console.log('ERROR: ' + error)
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>Digite o CEP desejado</Text>
        <TextInput 
          style={styles.input}
          placeholder='Ex: 79003241'
          value={cep}
          onChangeText={(text) => setCep(text)}
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity style={[styles.btn, {
          backgroundColor: '#1d75cd'
        }]}
          onPress={search}
        >
          <Text style={styles.textButton}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, {
          backgroundColor: '#ff0000'
        }]}
          onPress={clear}
        >

          <Text style={styles.textButton}>Limpar</Text>
        </TouchableOpacity>
      </View>

     { cepUser &&
      <View style={styles.results}>
          <Text style={styles.itemText}>CEP:{cepUser.cep}</Text>
          <Text style={styles.itemText}>Logradouro:{cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Bairro:{cepUser.bairro}</Text>
          <Text style={styles.itemText}>Cidade:{cepUser.localidade}</Text>
          <Text style={styles.itemText}>Estado:{cepUser.uf}</Text>
          
        </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: "bold",
  },
  input: {
    backgroundColor:'#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  btn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5, backgroundColor: '#ff0000'
  },
  textButton: {
    color: '#fff',
  },
  results: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 22
  }
  
});
