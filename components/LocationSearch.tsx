import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

interface LocationResult {
  display_name: string;
  lat: string;
  lon: string;
}

const LocationSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (text: string) => {
    setQuery(text);

    if (text.length < 3) {
      setResults([]); 
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${process.env.API_KEY}&query=${text},Brasil`
      );
      const places = response.data.results;
      const formattedResults = places.map((place: { name: any; geometry: { location: { lat: { toString: () => any; }; lng: { toString: () => any; }; }; }; }) => ({
        display_name: place.name,
        lat: place.geometry.location.lat.toString(),
        lon: place.geometry.location.lng.toString(),
      }));
      setResults(formattedResults);
    } catch (error: any) {
      console.error('Error:', error);      
    } finally {
      setLoading(false);
    }
  };

  const handleSelectResult = (result: LocationResult) => {
    setQuery(result.display_name); 
    setResults([]); 
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite o local..."
        value={query}
        onChangeText={handleSearch}
        style={styles.input}
      />
      {loading && (
        <ActivityIndicator size="small" color="#0000ff" style={styles.loadingIndicator} />
      )}
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectResult(item)}>
            <View style={styles.resultItem}>
              <Text>{item.display_name}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.resultsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loadingIndicator: {
    marginVertical: 10,
  },
  resultsContainer: {
    flexGrow: 1,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default LocationSearch;
