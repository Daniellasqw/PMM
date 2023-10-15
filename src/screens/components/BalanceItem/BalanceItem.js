import React,{useMemo} from 'react';
import { Container,Label,Balance } from './styles'; 
import { Background } from './../../Home/styles';

export default function BalanceItem ({data}){
    function formatarNumeroDecimal(numero) {
        return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
      }
const labelName = useMemo(()=>{
if(data.tag === 'saldo'){
    return{
        label:'Saldo atual',
        color:'3b3dbf'
    }
}else if(data.tag === 'receita'){
    return{
        label:'Entradas de Hoje',
        color:'00b94a'
    }
}else{
    return{
        label:'Saidas de Hoje',
        color:'ef463a'
    }
}
},[data])

    return(
        <Container bg={labelName.color}>
            <Label>{labelName.label}</Label>
            <Balance>R$ {formatarNumeroDecimal(data.saldo)}</Balance>
        </Container>
    )
}