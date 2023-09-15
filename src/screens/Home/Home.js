import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../../contexts/context';
import { Background,ListBalance } from './styles';
import Header from '../components/Header/Header';
import { format } from 'date-fns';
import { useIsFocused } from '@react-navigation/native';


export default function Home() {
    const isFocused = useIsFocused();
    const [listBalance, setListBalance] = useState([])
    const { logout, user } = useContext(AuthContext);
    const [dateMovements, setDateMovements] = useState(new Date())

    useEffect(() => {
        let isActive = true;

        async function getMovements() {
            let dateFormat = format(dateMovements, 'dd/MM/yyyy')

            const balance = await fetch(`http://192.168.1.3:3333/balance?date=${dateFormat}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            })
            console.log(balance.status)
            if (balance.status == 200) {
                if (isActive) {
                    const dados = await balance.json()
                    setListBalance(dados)
                }

            }
        }


        //getMovements();

        return()=>isActive = false;

    }, [isFocused])

    return (
        <Background>
            <Header title='Minhas Movimentações' />
            <ListBalance
            data={listBalance}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item=>item.tag}
            renderItem={({item})=>{
                
            }}
            />
        </Background>
    )
}