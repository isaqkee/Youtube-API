import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableOpacity } from 'react-native';
import WelcomeScreen from './WelcomeScreen';
import YoutubeScreen from './YoutubeScreen';
import VimeoScreen from './VimeoScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'YouTube') {
            iconName = require('./assets/youtube.png');
          } else if (route.name === 'Vimeo') {
            iconName = require('./assets/vimeo.png');
          }
          return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#c4302b',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen 
        name="YouTube" 
        component={YoutubeScreen} 
        options={({ navigation }) => ({
          tabBarLabel: 'YouTube',
          headerShown: false,
          tabBarButton: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
              <Image source={require('./assets/back_arrow.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          )
        })}
      />
      <Tab.Screen 
        name="Vimeo" 
        component={VimeoScreen} 
        options={({ navigation }) => ({
          tabBarLabel: 'Vimeo',
          headerShown: false,
          tabBarButton: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
              <Image source={require('./assets/back_arrow.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          )
        })}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ 
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeTabs} 
          options={{ 
            headerShown: false 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
