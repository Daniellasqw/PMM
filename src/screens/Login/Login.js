import React,{useContext} from 'react';
import {Platform } from 'react-native'
import { 
    Background,
    Container, 
    Logo, 
    AreaInput, 
    Input, 
    SubmitButton, 
    SubmitText,
    Link, 
    LinkText 
} from './styles'

import {useNavigation} from '@react-navigation/native';


export default function Login() {
    const navigation = useNavigation();

    return (
        <Background>
            <Container
            behavior={Platform.OS === 'ios'?'padding':''}
            enabled
            >
                <Logo
                    source={require('../../assets/Logo.png')}
                />

                <AreaInput>
                    <Input
                        placeholder="Seu Email"
                        placeholderTextColor="grey"
                    />

                </AreaInput>
                <AreaInput>
                    <Input
                        placeholder="Sua Senha"
                        placeholderTextColor="grey"
                    />

                </AreaInput>
                <SubmitButton activeOpacity={0.8}>
                    <SubmitText>
                        Acessar
                    </SubmitText>
                </SubmitButton>

                <Link onPress={()=>navigation.navigate('Register')}>
                    <LinkText >
                        Criar uma Conta!
                    </LinkText>
                </Link>
            </Container>
        </Background>
    )
}


