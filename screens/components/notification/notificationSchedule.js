import React, { useState } from 'react';
import { View, Button, Platform, TouchableOpacity, Text } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { pushNotificationManager } from './notificationService';
import styles from '../css/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const NotificationScheduler = ({ isNotificationSchedule, setIsNotificationSchedule }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const scheduleNotification = () => {
    const title = 'Scheduled Notifica';
    const message = 'This notification is scheduled from date picker';
    pushNotificationManager.scheduleNotification(title, message, date);
    setShowDatePicker(false)
    setIsNotificationSchedule(true)
  };

  const showDatepicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <>
       <TouchableOpacity style={styles.bell_icon}>
          <Icon name="bell" size={30} color="#C5FF75" onPress={showDatepicker}/>
        </TouchableOpacity>
        {
            showDatePicker == false ? 
            null
        :
        <View style={styles.date_picker_style}>
        {/* <Button title="Select Date and Time" onPress={showDatepicker} /> */}
        {/* <TouchableOpacity>
            <Icon name="bell" size={30} color="#C5FF75" />
          </TouchableOpacity> */}
        {showDatePicker && (
          <DatePicker
            date={date}
            mode="datetime"
            onDateChange={setDate}
            is24hour={true}
          />
        )}
        <TouchableOpacity style={styles.schedule_button} onPress={scheduleNotification} >
            <Text style={styles.schedule_button_text} >Schedule</Text>
        </TouchableOpacity>
      </View>
        }
    </>

  );
};

export default NotificationScheduler;
