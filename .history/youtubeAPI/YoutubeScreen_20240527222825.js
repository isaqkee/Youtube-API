import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Animated } from 'react-native';

const videos = [
  { id: 1, title: 'Vídeo 1', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' },
  { id: 2, title: 'Vídeo 2', thumbnail: 'https://i.ytimg.com/vi/hHW1oY26kxQ/maxresdefault.jpg' },
  { id: 3, title: 'Vídeo 3', thumbnail: 'https://i.ytimg.com/vi/mWRsgZuwf_8/maxresdefault.jpg' },
  { id: 4, title: 'Vídeo 4', thumbnail: 'https://i.ytimg.com/vi/FgigZzoHf0E/maxresdefault.jpg' },
];

export default function VideoListScreen({ navigation }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [animation] = useState(new Animated.Value(0));

  const handlePress = (video) => {
    setSelectedVideo(video);
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleClose = () => {
    setSelectedVideo(null);
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.videoItem} onPress={() => handlePress(item)}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <Text style={styles.videoTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        numColumns={2}
      />
      {selectedVideo && (
        <Animated.View style={[styles.videoPreview, { transform: [{ translateY }], opacity }]}>
          <Image source={{ uri: selectedVideo.thumbnail }} style={styles.previewThumbnail} />
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  videoItem: {
    flex: 1,
    margin: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 150,
  },
  videoTitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  videoPreview: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  previewThumbnail: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#c4302b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
