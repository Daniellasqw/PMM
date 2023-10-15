import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, Alert, TouchableWithoutFeedback, Modal } from 'react-native';
import { server } from '../../services/api'
import { AuthContext } from '../../contexts/context';
import { Background, ListBalance, Area, Title, List } from './styles';
import Header from '../components/Header/Header';
import { format } from 'date-fns';
import { useIsFocused } from '@react-navigation/native';
import BalanceItem from '../components/BalanceItem/BalanceItem';
import Icon from 'react-native-vector-icons/Feather';
import CalendarModal from '../components/CalendarModal';


export default function Home() {
    const isFocused = useIsFocused();
    const [listBalance, setListBalance] = useState([])
    const { logout, user, refrashToken, setUser } = useContext(AuthContext);
    const [dateMovements, setDateMovements] = useState(new Date())
    const [moviments, setMoviments] = useState([])
    const [modalVisible, setModalVisible] = useState(true)



    useEffect(() => {
        let isActive = true;

        console.log('HOME USER', user)
        // let dateFormat = format(dateMovements, 'dd/MM/yyyy')
        let date = new Date(dateMovements);
        let onLyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
        let dateDormate = format(onLyDate, 'dd/MM/yyyy')
        console.log(dateDormate)
        async function receives() {
            try {
                const receives = await fetch(`${server}/receives?date=${dateDormate}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + user.token
                    }
                })
                console.log('status', receives)
                if (receives.status == 200) {
                    if (isActive) {
                        const dados = await receives.json()

                        console.log('DADOS', dados)
                        setMoviments(dados)

                    }

                }
                if (balance.status == 401) {
                    setUser(null)
                }

            } catch (err) {
                console.log(err);
            }


        }

        async function balance() {
            const balance = await fetch(`${server}/balance?date=${dateDormate}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            })
            console.log('status', balance.status)
            if (balance.status == 200) {
                if (isActive) {
                    const dados = await balance.json()
                    console.log('balance', dados)
                    setListBalance(dados)
                }

            }
            if (balance.status == 401) {
                setUser(null)

            }

        }



        balance();
        receives();


        return () => isActive = false;

    }, [isFocused, dateMovements])

    function formatarNumeroDecimal(numero) {
        return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    }


    async function Delete(id) {
        try {
            const res = await fetch(`${server}/receives/delete?item_id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            if (res.status == 200) {
                setDateMovements(new Date)
            }
            if (res.status == 401) {

            }
            if (res.status == 400) {

            }
        } catch (e) {
            console.log(e)
        }
    }

    function deleteItem(item) {
        Alert.alert('Atenção',
            "Você tem certeza que deseja deletar esse registro?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Continuar",
                    onPress: () => Delete(item.id)
                }
            ])
    }

    function filterDate(dateSelected) {
        setDateMovements(dateSelected)

    }

    return (
        <Background>
            <Header title='Minhas Movimentações' />
            <ListBalance
                data={listBalance}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.tag}
                renderItem={({ item }) => (<BalanceItem data={item} />)}
            />
            <Area>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Icon name='calendar' size={20} color='#000' />
                </TouchableOpacity>
                <Title>Ultimas movimentações </Title>
            </Area>
            <List
                data={moviments}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onLongPress={() => deleteItem(item)} activeOpacity={0.3}>


                            <View style={{
                                backgroundColor: "#f0f3ff",
                                borderRadius: 4,
                                marginHorizontal: 10,
                                marginBottom: 14,
                                padding: 12,

                            }} onLongPress={() => deleteItem(item)}>
                                <View stle={{ flexDirection: 'row' }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        backgroundColor: item.type == 'despesa' ? "#c62c36" : "green",
                                        width: "30%",
                                        paddingBottom: 4,
                                        paddingTop: 4,
                                        paddingLeft: 7,
                                        paddingRight: 7,
                                        borderRadius: 4, marginBottom: 8

                                    }}>
                                        <Icon name={item.type == 'despesa' ? "arrow-down" : "arrow-up"} size={28} color="#fff" />
                                        <Text style={{ color: "#fff", fontSize: 16, fontStyle: 'italic' }}>
                                            {item.type}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={{ color: "#000", fontSize: 22 }}>

                                    R$ {formatarNumeroDecimal(item.value)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )

                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            <Modal
                visible={modalVisible} animationType='fade' transparent={true}>
                <CalendarModal
                    setVisible={() => setModalVisible(false)}
                    filter={filterDate}
                />

            </Modal>

        </Background>
    )
}