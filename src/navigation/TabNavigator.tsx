import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import SongDetailScreen from '../screens/SongDetailScreen';
import TabsNavigator from './TabNavigator'; // pastikan file ini ada

// Definisi tipe parameter navigasi utama
export type RootStackParamList = {
  Tabs: undefined;
  MovieDetail: { id: string; title: string };
  SongDetail: { song: { id: string; title: string } };
};

// Inisialisasi stack
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      {/* Tab utama (berisi Movies & Songs) */}
      <Stack.Screen
        name="Tabs"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />

      {/* Halaman detail film */}
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={({ route }) => ({
          title: route.params?.title ?? 'Movie Detail',
        })}
      />

      {/* Halaman detail lagu */}
      <Stack.Screen
        name="SongDetail"
        component={SongDetailScreen}
        options={({ route }) => ({
          title: route.params?.song?.title ?? 'Song Detail',
        })}
      />
    </Stack.Navigator>
  );
}
