import React from 'react';
import { Container, TipoText, IconView, Tipo,ValorText } from './styles';
import { Icon } from 'react-native-vector-icons/Feather';


export default function ListH({ data }) {

    return (
        <Container>
            <Tipo>
                <IconView>
                    <Icon name="arrow-down" size={28} color="#fff" />
                    <TipoText>
                        {data.type}
                    </TipoText>
                </IconView>
            </Tipo>
            <ValorText>
                {data.description}
            </ValorText>
        </Container>
    )
}