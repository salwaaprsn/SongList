import React, { useState, useCallback, useRef, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Icon from 'react-native-vector-icons/Ionicons';

const SongDetailScreen = ({ route, navigation }: any) => {
  const { song } = route.params;
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<any>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Ubah judul header jadi nama lagu
  useLayoutEffect(() => {
    navigation.setOptions({
      title: song.name || 'Music Detail',
    });
  }, [navigation, song.name]);

  // Ambil ID video YouTube dari eId
  const extractYouTubeId = (eId: string) => {
    if (!eId) return null;
    const parts = eId.split('/');
    return parts.length > 2 ? parts[2] : null;
  };

  const videoId = extractYouTubeId(song.eId);

  // Fungsi toggle play/pause
  const handleTogglePlay = useCallback(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    setPlaying(prev => !prev);
  }, [scaleAnim]);

  return (
    <ScrollView style={styles.container}>
      {/* --- Header Card --- */}
      <View style={styles.headerCard}>
        <Image
          source={{ uri: song.img || 'https://via.placeholder.com/150' }}
          style={styles.cover}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.title}>{song.name || 'Unknown Title'}</Text>
          <Text style={styles.artist}>{song.uNm || 'Unknown Artist'}</Text>
          <Text style={styles.genre}>{song.pl?.name || 'Unknown Genre'}</Text>
          <Text style={styles.score}>Score {song.score || 0}</Text>
        </View>
      </View>

      {/* --- YouTube Player --- */}
      {videoId ? (
        <View style={styles.videoContainer}>
          <YoutubePlayer
            ref={playerRef}
            height={220}
            videoId={videoId}
            play={playing}
            onChangeState={(state: string) => {
              if (state === 'ended') setPlaying(false);
            }}
          />

          {/* === CONTROL BAR (Play/Pause di tengah) === */}
          <Animated.View
            style={[
              styles.controlBar,
            ]}
          >
            <View style={styles.controlSpacer} />
            
            {/* Tombol Play/Pause di tengah */}
            <TouchableOpacity
              onPress={handleTogglePlay}
              activeOpacity={0.8}
              style={styles.playPauseButton}
            >
              <Icon
                name={playing ? 'pause' : 'play'}
                size={22}
                color="#fff"
              />
              <Text style={styles.playPauseText}>
                {playing ? 'Pause' : 'Play'}
              </Text>
            </TouchableOpacity>

            <View style={styles.controlSpacer} />
          </Animated.View>
        </View>
      ) : (
        <Text style={styles.noVideo}>🎧 No playable video available</Text>
      )}

      {/* --- Informasi Lagu --- */}
      <View style={styles.infoCard}>
        <Text style={styles.infoHeader}>Song Information</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Title:</Text>
          <Text style={styles.infoValue}>{song.name || 'Unknown'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Artist:</Text>
          <Text style={styles.infoValue}>{song.uNm || 'Unknown'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Playlist:</Text>
          <Text style={styles.infoValue}>
            {song.pl?.name || 'Unknown Playlist'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Score:</Text>
          <Text style={styles.infoValue}>{song.nbP || 0}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SongDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },

  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  cover: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  artist: {
    color: '#6b7280',
    marginTop: 3,
    fontSize: 14,
  },
  genre: {
    color: '#9ca3af',
    fontSize: 13,
    marginTop: 2,
  },
  score: {
    color: '#16a34a',
    fontWeight: '600',
    marginTop: 4,
  },

  /** === VIDEO CONTAINER === */
  videoContainer: {
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  /** === CONTROL BAR === */
  controlBar: {
    marginTop:-40,
    bottom: 0,
    left: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // tombol di tengah
    backgroundColor: '#000', // warna semi-transparan
    paddingVertical: 12,
    paddingHorizontal: 18,
  },

  controlSpacer: {
    flex: 1,
  },

  playPauseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(31, 41, 55, 0.9)',
    borderRadius: 8,
    paddingVertical: 10,      // tinggi tombol
    paddingHorizontal: 120,    // lebar tombol
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },

  playPauseText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },

  /** === INFO CARD === */
  infoCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  infoHeader: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: '#111827',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  infoLabel: {
    fontWeight: '600',
    width: 80,
    color: '#374151',
  },
  infoValue: {
    flex: 1,
    color: '#1f2937',
  },
  noVideo: {
    color: '#777',
    textAlign: 'center',
    marginVertical: 12,
  },
});
