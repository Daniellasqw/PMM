import React, { createContext, useState, useEffect } from 'react';
import {server} from '../services/api'

import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({})




function AuthProvider({ children }) {
  const navigation = useNavigation()
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
   
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('Token')
      console.log(storageUser)
      if (storageUser) {
        try{
          const response = await fetch(`${server}/me`,{
            method: 'GET',
            headers: { 'Authorization':'Bearer ' + storageUser}
          })
          console.log('response',response)
          const dados = await response.json()
          console.log('dados do UseEffect',dados)
          setUser({
            nome: dados.name,
            email: dados.email,
            token:storageUser,
            balance: dados.balance,
            created_at: dados.created_at,
            updated_at: dados.updated_at,
            id: dados.id
  
          })
          //console.log(user)
          setLoading(false)

        }catch(e){
          console.log(e)
          setUser(null);
        }
       
        
       
      }
      setLoading(false)
    }
    loadStorage()
  }, [])

  async function cadastro(nome, email, password) {
    console.log(nome, email, password)
    setLoadingAuth(true)
    try {
      const response = await fetch(`${server}/users`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nome,
          password: password,
          email: email
        }),
      })

      setLoadingAuth(false)
      navigation.goBack();

    }
    catch (err) {

      if (err.response) {
        // O servidor respondeu com um código de erro
        console.log('Erro no servidor:', err.response.data);
      } else if (err.request) {
        // A solicitação foi feita, mas não houve resposta do servidor
        console.log('Sem resposta do servidor', err.request);
      } else {
        // Um erro ocorreu durante a solicitação
        console.log('Erro ao fazer a solicitação:', err.message);
      }
      setLoadingAuth(false)
    }
  }


  async function refrashToken() {
    setLoadingAuth(true)

   console.log('entrei no refrash')
   const user1 = await AsyncStorage.getItem('User');
   const userDados= JSON.parse(user1);
   console.log(userDados)

    try {
      const response = await fetch(`${server}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userDados.email,
          password: userDados.password
        }),
      })
      console.log('response REFRASH',response)
      if (response.status == 200) {
       
          const dados = await response.json();
          console.log(dados)
          const userObject = {
            id: dados.id,
            name: dados.name,
            email: dados.email,
            token: dados.token,
            password: user.password
          };
         
          await AsyncStorage.setItem('User',JSON.stringify(userObject));
         
  
          setUser(userObject)

        
       
      }

      setLoadingAuth(false)
    }
    catch (err) {

      if (err.response) {
        // O servidor respondeu com um código de erro
        console.log('Erro no servidor:', err.response.data);
      } else if (err.request) {
        // A solicitação foi feita, mas não houve resposta do servidor
        console.log('Sem resposta do servidor', err.request);
      } else {
        // Um erro ocorreu durante a solicitação
        console.log('Erro ao fazer a solicitação:', err);
      }
      setLoadingAuth(false)
    }

  }


  async function login(email, password) {
    setLoadingAuth(true)

   // console.log(email,password)
   // console.log(server)

    try {
      const response = await fetch(`${server}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      })
     // console.log('response',response)
     if (response.status == 200) {
      const dados = await response.json();
      console.log('dados login',dados)
      const data = {
        id: dados.id,
        nome: dados.name,
        token: dados.token,
        email: email
      }

      await AsyncStorage.setItem('Token', dados.token)

      setUser({
        id: dados.id,
        name: dados.name,
        email: dados.email,
        token: dados.token
      })
    }


    setLoadingAuth(false)


  }
    catch (err) {

      if (err.response) {
        // O servidor respondeu com um código de erro
        console.log('Erro no servidor:', err.response.data);
      } else if (err.request) {
        // A solicitação foi feita, mas não houve resposta do servidor
        console.log('Sem resposta do servidor', err.request);
      } else {
        // Um erro ocorreu durante a solicitação
        console.log('Erro ao fazer a solicitação:', err);
      }
      setLoadingAuth(false)
    }

  }



  async function logout(){
    await AsyncStorage.clear()
    .then(()=>{
      setUser(null)
    })
  }



  return (
    <AuthContext.Provider value={{ signed: !!user, user,setUser, cadastro, loadingAuth, login,logout,loading,refrashToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider