import React, { useContext, useState } from 'react';
import { Platform, ActivityIndicator } from 'react-native'
import { Background, Container, AreaInput, Input, SubmitButton, SubmitText, Olho } from '../../screens/Login/styles';
import { AuthContext } from '../../contexts/context';

export default function Register() {
    const { cadastro, loadingAuth } = useContext(AuthContext)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visiblePassword, setVisiblePassword] = useState(true)



    function handerRegister() {
        if(nome ==''|| email ==''|| password =='') return;
        cadastro(nome, email, password);
    }
    return (
        <Background>
            <Container
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled
            >
                <AreaInput>
                    <Input
                        placeholder='Nome'
                        placeholderTextColor={'grey'}
                        value={nome}
                        onChangeText={(value) => setNome(value)}
                    />

                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder='Seu Email'
                        placeholderTextColor={'grey'}
                        value={email}
                        onChangeText={(value) => setEmail(value)}

                    />

                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder='Sua Senha'
                        placeholderTextColor={'grey'}
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        secureTextEntry={true}
                    />
                    {/* <Olho onPress={()=>setVisiblePassword(!visiblePassword)}/> */}
                </AreaInput>

                <SubmitButton onPress={handerRegister}>
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color="#fff"/>
                        ) : <SubmitText>Cadastrar </SubmitText>
                    }

                </SubmitButton>

            </Container>
        </Background>
    )
}