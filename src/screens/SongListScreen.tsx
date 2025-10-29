import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/TabNavigator';

type MusicScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SongDetail'
>;

export default function MusicScreen() {
  const navigation = useNavigation<MusicScreenNavigationProp>();
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const targetUrl = 'https://openwhyd.org/hot/electro?format=json';
        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
        const result = await response.json();

        // Kadang result.contents diawali teks aneh, jadi bersihkan
        const clean = result.contents.replace(/^[^{\[]+/, '');
        const data = JSON.parse(clean);

        if (Array.isArray(data)) {
          setSongs(data);
        } else if (Array.isArray(data.tracks)) {
          setSongs(data.tracks);
        } else {
          setSongs([]);
        }
      } catch (err) {
        console.error('Error fetching music:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 10, color: '#555' }}>Loading music...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>Hot Electro Songs</Text>

      {/* Daftar Lagu */}
      {songs.length === 0 ? (
        <Text style={styles.emptyText}>Tidak ada data musik</Text>
      ) : (
        <FlatList
          data={songs}
          keyExtractor={(item, index) => item._id || index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('SongDetail', { song: item })}
            >
              <Image
                source={{ uri: item.img || 'https://via.placeholder.com/100' }}
                style={styles.cover}
              />

              <View style={styles.infoContainer}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.name || 'Unknown Title'}
                </Text>
                <Text style={styles.artist}>{item.uNm || 'Unknown Artist'}</Text>
                <Text style={styles.playlist}>
                  {item.pl?.name || 'Unknown Playlist'}
                </Text>

                {/* ✅ FIXED: Score dari API */}
                <View style={styles.scoreRow}>
                  <Text style={styles.scoreText}>Score {item?.score ?? 0}</Text>
                </View>
              </View>

              <View style={styles.playButton}>
                <Icon name="play" size={17} color="#fff" />
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '800',
    marginVertical: 10,
    color: '#111827',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cover: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  artist: {
    color: '#6b7280',
    fontSize: 13,
    marginTop: 2,
  },
  playlist: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 1,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    gap: 4,
  },
  scoreText: {
    color: '#16a34a',
    fontSize: 13,
    fontWeight: '600',
  },
  playButton: {
    backgroundColor: '#111827',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
