import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import SearchList from "./containers/SearchLists";
import axios from "axios";

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#18181B",
    paddingTop: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#18181B",
    height: 60,
    gap: 2,
  },
  searchInput: {
    height: "100%",
    flex: 1,
    padding: 8,
    color: "#fff",
    backgroundColor: "#000014",
  },
  searchButton: {
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000014",
    height: "100%",
  },
  searchText: {
    color: "#fff",
    fontWeight: "bold",
  },
};

export default function Search({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (searchText?.length === 0) {
      setSearchResults([]);
      return;
    }
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODFjNDIwNzRhMzg1ZjUwZWQ2MDNhOWUwMWFkNzQ2MiIsInN1YiI6IjY1ZTlkYjljM2Q3NDU0MDE3ZGI5ZTUxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lqi541zBsDvUdLGTY1hht3-TJHrho2Or3DSFo_WJhUc",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/search/multi?query=" +
        searchText +
        "&include_adult=false&language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.results);
        setSearchResults(response.results);
      })
      .catch((err) => console.error(err));
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search movie..."
          placeholderTextColor="#666"
          value={searchText}
          onEndEditing={() => handleSearch()}
          onChangeText={(newText) => setSearchText(newText)}
        />
        <Pressable style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchText}>Search</Text>
        </Pressable>
      </View>
      <SearchList movies={searchResults} navigation={navigation} />
    </ScrollView>
  );
}
