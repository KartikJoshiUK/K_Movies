import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { MediaType } from "../Dashboard";
export default function SearchList({ movies, navigation }) {
  return (
    <View style={styles.container}>
      {movies?.map((movie) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("/Movie", {
              id: movie?.id,
              mediaType: movie?.media_type,
            })
          }
          key={movie?.imdb_id}
          style={styles.item}
        >
          <Image
            source={{
              uri: "https://image.tmdb.org/t/p/w300" + movie?.poster_path,
            }}
            style={styles.image}
          />
          <Text style={styles.title}>
            {movie?.media_type === MediaType.MOVIE ? movie?.title : movie?.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F1F",
  },
  item: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#333333",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 12,
  },
  image: {
    width: 50,
    height: 50,
  },
});
