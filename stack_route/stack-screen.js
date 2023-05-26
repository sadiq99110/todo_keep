import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TempScreen from '../screens/components/home';
import InnerScreen from '../screens/components/main';
import EditDetail from '../screens/components/innerScreen/editDetail';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, View } from 'react-native';
import styles from '../screens/components/css/styles';

const Stack = createNativeStackNavigator();

const StackScreen = () => {
    return(
        <NavigationContainer>
      <Stack.Navigator screenOptions={({ route }) => ({
               headerStyle: {
                backgroundColor: '#C5FF75',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              }, 
               headerShown: route.name === 'editDetail' // Show header only for 'editDetail' screen
       })} initialRouteName='innerScreen'>
        <Stack.Screen name="newHome" component={TempScreen} />
        <Stack.Screen name='innerScreen' component={InnerScreen} />
        <Stack.Screen name='editDetail' component={EditDetail} options={{headerTintColor: '#1a1a1a', title : null,headerRight: () => (
         <View style={styles.header_icons}>    
          <TouchableOpacity>
              <Icon name="circle-o-notch" size={30} color="#1a1a1a" />
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <Icon name="rocket" size={30} color="#1a1a1a" />
            </TouchableOpacity> */}
         </View> 
    )
   }}/>
      </Stack.Navigator>
    </NavigationContainer>
    )
}

export default StackScreen