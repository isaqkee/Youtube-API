import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Animated, StyleSheet } from 'react-native';

const videos = [
  { id: 1, title: 'Vídeo 1', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' },
  { id: 2, title: 'Vídeo 2', thumbnail: 'https://i.ytimg.com/vi/hHW1oY26kxQ/maxresdefault.jpg' },
  { id: 3, title: 'Vídeo 3', thumbnail: 'https://i.ytimg.com/vi/mWRsgZuwf_8/maxresdefault.jpg' },
  { id: 4, title: 'Vídeo 4', thumbnail: 'https://i.ytimg.com/vi/FgigZzoHf0E/maxresdefault.jpg' },
];

export default function VideoListScreen({ navigation }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handlePress = (video) => {
    setSelectedVideo(video);
  };

  const handleClose = () => {
    setSelectedVideo(null);
  };

  const handleSearch = () => {
    // Simulate search by filtering videos with titles containing the search term
    const results = videos.filter(video => video.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(results);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar vídeos..."
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
        onSubmitEditing={handleSearch}
        onKeyPress={handleKeyPress}
      />
      <View style={styles.videoList}>
        {searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.videoItem} onPress={() => handlePress(item)}>
                <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
                <Text style={styles.videoTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
            numColumns={2}
          />
        ) : (
          <Text style={styles.noResults}>Nenhum resultado encontrado</Text>
        )}
      </View>
      {selectedVideo && (
        <View style={styles.videoPreview}>
          <Image source={{ uri: selectedVideo.thumbnail }} style={styles.previewThumbnail} />
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  videoList: {
    flex: 1,
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
  noResults: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
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
