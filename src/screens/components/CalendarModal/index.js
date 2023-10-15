import React, { useState } from 'react';
import { Container, ButtonFilterText, ModalContent, ButtonFilter } from './styles';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { ptBR } from './localeCalendar';


LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';


export default function CalendarModal({ setVisible, filter }) {

    const [dateNow, setDateNow] = useState(new Date());
    const [dateMark, setDateMark] = useState({});

    function handleOnDayPress(date) {
        // console.log(date.dateString);
        setDateNow(new Date(date.dateString));
        let markDay = {};
        markDay[date.dateString] = {
            selected: true,
            selectedColor: "#3b3bbf",
            textColor: "#fff"
        }

        setDateMark(markDay);

    }

    function filterDate() {
        filter(dateNow)
        setVisible();
    }
    return (
        <Container>
            <TouchableWithoutFeedback onPress={setVisible}>
                <View style={{ flex: 1 }}></View>
            </TouchableWithoutFeedback>

            <ModalContent>
                <Calendar
                    onDayPress={handleOnDayPress}
                    markedDates={dateMark}
                    enableSwipeMonths={true}
                    theme={{
                        todayTextColor: "#ff0000",
                        selectedDayBackgroundColor: "#00adf5",
                        selectedDayTextColor: '#fff'
                    }}
                />

                <ButtonFilter onPress={filterDate}>
                    <ButtonFilterText>Filtrar</ButtonFilterText>
                </ButtonFilter>

            </ModalContent>
        </Container>
    )
}