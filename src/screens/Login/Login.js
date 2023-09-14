import React, { useState, useContext } from 'react';
import { Platform, ActivityIndicator } from 'react-native'
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
} from './styles';
import { AuthContext } from '../../contexts/context';

import { useNavigation } from '@react-navigation/native';


export default function Login() {
    const { login, loadingAuth } = useContext(AuthContext);
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    function hendeLogin() {
        login(email, password);
    }

    return (
        <Background>
            <Container
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled
            >
                <Logo
                    source={require('../../assets/Logo.png')}
                />

                <AreaInput>
                    <Input
                        placeholder="Seu Email"
                        placeholderTextColor="grey"
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                    />

                </AreaInput>
                <AreaInput>
                    <Input
                        placeholder="Sua Senha"
                        placeholderTextColor="grey"
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                    />

                </AreaInput>
                <SubmitButton activeOpacity={0.8} onPress={hendeLogin}>
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color='#fff' />
                        ) : (
                            <SubmitText> Acessar </SubmitText>
                        )
                    }

                </SubmitButton>

                <Link onPress={() => navigation.navigate('Register')}>
                    <LinkText >
                        Criar uma Conta!
                    </LinkText>
                </Link>
            </Container>
        </Background>
    )
}


