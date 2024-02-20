import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigation = useNavigation();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleReturnToPharmacyList = () => {
    navigation.goBack();
  };

  const getWeekDays = () => {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return days.map((day) => (
      <View style={styles.dayHeader} key={day}>
        <Text>{day}</Text>
      </View>
    ));
  };

  const getMonthDays = () => {
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const startingDay = firstDayOfMonth.getDay();

    const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    const numberOfDays = lastDayOfMonth.getDate();

    let days = [];

    for (let i = 0; i < startingDay; i++) {
      days.push(<View style={styles.emptyDay} key={`empty-${i}`} />);
    }

    for (let i = 1; i <= numberOfDays; i++) {
      const day = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
      days.push(
        <TouchableOpacity
          style={[styles.day, day.getDate() === selectedDate.getDate() && styles.selectedDay]}
          onPress={() => handleDateChange(day)}
          key={i}
        >
          <Text>{i}</Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, selectedDate.getDate()))}>
          <Text style={styles.prevNextButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>{selectedDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</Text>
        <TouchableOpacity onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, selectedDate.getDate()))}>
          <Text style={styles.prevNextButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.weekDaysContainer}>{getWeekDays()}</View>
      <View style={styles.daysContainer}>{getMonthDays()}</View>
      <TouchableOpacity style={styles.returnButton} onPress={handleReturnToPharmacyList}>
        <Text style={styles.returnButtonText}>Volver a Farmacias</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 20,
  },
  prevNextButton: {
    fontSize: 20,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingBottom: 10,
    marginBottom: 10,
  },
  dayHeader: {
    width: 30,
    alignItems: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    margin: 1,
  },
  emptyDay: {
    width: 30,
    height: 30,
    margin: 1,
  },
  selectedDay: {
    backgroundColor: 'lightblue',
  },
  returnButton: {
    backgroundColor: '#1976D2',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  returnButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Calendar;
