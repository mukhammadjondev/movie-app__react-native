import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import Detailed from "../screens/detailed";
import Home from '../screens/home';

const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if(route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'
          } else if(route.name === 'Detailed') {
            iconName = focused ? 'settings' : 'settings-outline'
          }

          return (
            <Ionicons name={iconName} color={color} size={size} />
          )
        },
        tabBarActiveTintColor: 'crimson',
        tabBarInactiveTintColor: 'black',
      })}>
        <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Tab.Screen name="Detailed" component={Detailed} options={{headerShown: false, tabBarBadge: 5}} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}