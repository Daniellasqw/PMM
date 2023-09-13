import React, { createContext, useState } from 'react';

import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const AuthContext = createContext({})




function AuthProvider({ children }) {
  const navigation = useNavigation()
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)

  async function cadastro(nome, email, password) {
    console.log(nome, email, password)
    setLoadingAuth(true)
    try {
      const response = await fetch('http://192.168.1.3:3333/users', {
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


  async function login(email, password) {
    setLoadingAuth(true)

    try {
      const response = await fetch('http://192.168.1.3:3333/login', {
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
      if(response.status == 200){
        const dados = await response.json();
        console.log(dados)
        const data = {
          id:dados.id,
          name:dados.name,
          token:dados.token,
          email:email
        }
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
        console.log('Erro ao fazer a solicitação:', err.message);
      }
      setLoadingAuth(false)
    }

  }



  return (
    <AuthContext.Provider value={{ signed: !!user, user, cadastro, loadingAuth, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider