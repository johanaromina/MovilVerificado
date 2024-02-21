import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Calendar = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const changeMonth = (value) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + value);
    setSelectedDate(newDate);
  };

  const changeYear = (value) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(selectedDate.getFullYear() + value);
    setSelectedDate(newDate);
  };

  const getDayName = (dayIndex) => {
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    return days[dayIndex];
  };

  const getMonthCalendar = () => {
    const monthCalendar = [];
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const startingDay = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1; // Ajuste para que Lunes sea 0 y Domingo 6
    const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    const numberOfDays = lastDayOfMonth.getDate();
    let week = [];

    // Fill empty days at the start of the month
    for (let i = 0; i < startingDay; i++) {
      week.push(<View style={styles.emptyDay} key={`empty-${i}`} />);
    }

    // Fill days of the month
    for (let i = 1; i <= numberOfDays; i++) {
      const day = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
      const dayOfWeek = day.getDay();

      week.push(
        <TouchableOpacity
          style={[styles.day, day.getDate() === selectedDate.getDate() && styles.selectedDay]}
          onPress={() => handleDateChange(day)}
          key={i}
        >
          <Text style={styles.dayText}>{i}</Text>
          <Text style={styles.dayOfWeekText}>{getDayName(dayOfWeek)}</Text>
        </TouchableOpacity>
      );

      // Start new row (week) when it's a Sunday or it's the last day of the month
      if (dayOfWeek === 6 || i === numberOfDays) {
        monthCalendar.push(<View style={styles.week} key={i}>{week}</View>);
        week = [];
      }
    }

    return monthCalendar;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Text style={styles.prevNextButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>{selectedDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Text style={styles.prevNextButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.monthCalendar}>{getMonthCalendar()}</View>
      <TouchableOpacity style={styles.returnButton} onPress={() => navigation.navigate('Farmacia')}>
        <Text style={styles.returnButtonText}>Volver a Farmacia</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  prevNextButton: {
    fontSize: 20,
  },
  monthCalendar: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  week: {
    flexDirection: 'row',
  },
  day: {
    width: 70, // Aumento de ancho
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    margin: 1,
  },
  emptyDay: {
    width: 70, // Aumento de ancho
    height: 100,
    margin: 1,
  },
  selectedDay: {
    backgroundColor: 'lightblue',
  },
  dayText: {
    fontSize: 16,
  },
  dayOfWeekText: {
    fontSize: 12,
    color: 'gray',
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


