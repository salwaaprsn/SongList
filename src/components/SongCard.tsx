// src/components/SongCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import type { Song } from '../api/data';

type Props = {
  song: Song; // pakai lowercase biar sesuai konvensi React
  onPress: () => void;
};

export default function SongCard({ song, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      {song.thumbnail ? (
        <Image source={{ uri: song.thumbnail }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.noImage]}>
          <Text style={styles.noImageText}>No Cover</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {song.title || 'Untitled'}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          🎤 {song.artist || 'Unknown Artist'}
        </Text>
        <Text style={styles.playlist} numberOfLines={1}>
          📀 {song.playlist || 'No Playlist'}
        </Text>
        <Text style={styles.score}>Score: {song.score || 'N/A'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    padding: 12,
  },
  thumbnail: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#1f2937',
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  artist: {
    color: '#cbd5e1',
    fontSize: 14,
  },
  playlist: {
    color: '#a1a1aa',
    fontSize: 13,
    marginTop: 2,
  },
  score: {
    color: '#22c55e',
    fontSize: 13,
    marginTop: 6,
  },
});
