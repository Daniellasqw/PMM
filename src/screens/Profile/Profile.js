import React,{useContext} from "react";
import { Container,LogoutButton,LogoutText,Message,Name,NewLink,NewText } from "./styles";
import Header from './../components/Header/Header';
import {AuthContext} from "../../contexts/context";
import { useNavigation } from "@react-navigation/native";


export default function Profile(){
    const {user,logout} = useContext(AuthContext);
    const navigation = useNavigation()
    return(
        <Container>
            <Header title='Meu Perfil'/>
            <Message>
               Hey, bem vindo de volta!
            </Message>
            <Name numberOfLines={1}>
               {user && user.nome}
            </Name>
            <NewLink onPress={()=>navigation.navigate("Registrar")}>
                <NewText>
                Fazer Registro
                </NewText>
            </NewLink>

            <LogoutButton onPress={()=>logout()}>
                <LogoutText>
                    Sair
                </LogoutText>
            </LogoutButton>
        </Container>
    )
}