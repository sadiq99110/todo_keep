/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import StackScreen from './stack_route/stack-screen';
import {pushNotificationManager} from './screens/components/notification/notificationService.js'


const App = () => {

  useEffect(()=>{
    pushNotificationManager.configure();
  },[])

  return (
     <StackScreen />
  );
};


export default App;
