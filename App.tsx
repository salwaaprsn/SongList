import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

// import semua screen
import MovieListScreen from './src/screens/MovieListScreen';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import SongListScreen from './src/screens/SongListScreen';
import SongDetailScreen from './src/screens/SongDetailScreen';

// definisi tipe untuk navigasi utama
export type RootStackParamList = {
  MovieList: undefined;
  MovieDetail: { id: string; title: string };
  SongList: undefined;
  SongDetail: { id: string; title: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Stack untuk Movie
function MovieStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MovieList"
        component={MovieListScreen}
        options={{ title: 'Movies' }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
}

// Stack untuk Song
function SongStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SongList"
        component={SongListScreen}
        options={{ title: 'Songs' }}
      />
      <Stack.Screen
        name="SongDetail"
        component={SongDetailScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
}

// Navigasi utama
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName: string = 'help-circle-outline'; // default aman

            if (route.name === 'Movies') {
              iconName = 'film-outline'; // 🎬 icon film
            } else if (route.name === 'Songs') {
              iconName = 'musical-notes-outline'; // 🎵 icon lagu
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#000', // biru aktif
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#f9fafb',
            borderTopWidth: 0.3,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        })}
      >
        <Tab.Screen
          name="Movies"
          component={MovieStack}
          options={{ tabBarLabel: 'Movies' }}
        />
        <Tab.Screen
          name="Songs"
          component={SongStack}
          options={{ tabBarLabel: 'Songs' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
