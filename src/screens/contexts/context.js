import React, { createContext, useState } from 'react';
import api from '../../services/api'
import { useNavigation } from '@react-navigation/native'

export const AuthContext = createContext({})




function AuthProvider({ children }) {
    const navigation = useNavigation()

    async function login(nome, email, password) {
        console.log(nome,email,password)
        try {
            const response = await fetch('http://192.168.1.3:3333/users',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name:nome,
                    password:password,
                    email:email
                  }),
            })
            navigation.goBack();
            
        }
        catch (err) {
            if (err.response) {
              // O servidor respondeu com um código de erro
              console.log('Erro no servidor:', err.response.data);
            } else if (err.request) {
              // A solicitação foi feita, mas não houve resposta do servidor
              console.log('Sem resposta do servidor',err.request);
            } else {
              // Um erro ocorreu durante a solicitação
              console.log('Erro ao fazer a solicitação:', err.message);
            }
          }
    }

    const [user, setUser] = useState({
        nome: 'Matheus Teste'
    })

    return (
        <AuthContext.Provider value={{ user, login }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider