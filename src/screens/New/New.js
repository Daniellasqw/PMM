import React,{useState,useContext} from 'react';
import { Background, Input, SubmitButton, SubmitText } from './styles';
import Header from '../components/Header/Header';
import { SafeAreaView, TouchableWithoutFeedback,Keyboard, Alert } from 'react-native';
import RegisterTypes from '../components/RegisterTypes';
import { AuthContext } from '../../contexts/context';
import {format} from 'date-fns'
import {server} from '../../services/api'
import {useNavigation} from '@react-navigation/native'




export default function New() {
    const navigation = useNavigation()
    const {user } = useContext(AuthContext);
    const [labelInput,setLabelInput]=useState('');
    const [valueInput,setValueInput]=useState('');
    const [type,setType]=useState('receita');

    function submit(){
        Keyboard.dismiss();
        if(isNaN(parseFloat(valueInput)) || type === null){
            Alert.alert('Preencha todos os campos')
            return;
        }

        Alert.alert(
            'Confirmando dados',
            `Tipo:${type} - Valor: ${parseFloat(valueInput)}`,
            [
                {
                    text: 'Cancelar',
                    style:'cancel'
                },
                {
                    text: 'Continuar',
                    onPress:()=>add()
                }
            ]
        )

    }

    async function add(){
        Keyboard.dismiss();
       try{
            const res = await fetch(`${server}/receive`,{
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                  },
                  body: JSON.stringify({
                    description: labelInput,
                    value: Number(valueInput),
                    type:type,
                    date: format(new Date,'dd/MM/yyy')
                  })
            })
            if(res.status == 200){
                navigation.navigate("Home")
                setLabelInput('');
                setValueInput('');

            }

          

       }catch(e){
        console.log(e)
       }
    }

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <Background>
                <Header title='Registrando' />
                <SafeAreaView style={{ marginTop: 14, alignItems: 'center' }}>
                    <Input
                        placeholder="Descrição desse Registro"
                        placeholderTextColor="#cdcdcd"
                        value={labelInput}
                        onChangeText={(value) =>setLabelInput(value)}
                    />
                    <Input
                        placeholder="Valor desejado"
                        placeholderTextColor="#cdcdcd"
                        keyboardType='numeric'
                        value={valueInput}
                        onChangeText={(value) =>setValueInput(value)}
                    />

                    <RegisterTypes
                    type={type}
                    sendTypeChanged={(item)=>setType(item)}
                    />

                    <SubmitButton onPress={submit}>
                        <SubmitText>
                            Registrar
                        </SubmitText>
                    </SubmitButton>

                </SafeAreaView>
            </Background>
        </TouchableWithoutFeedback>

    )
}