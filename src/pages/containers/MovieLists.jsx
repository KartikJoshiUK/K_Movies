import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { MediaType } from "../Dashboard";

export default function MovieLists({ navigation, mediaType }) {
  const [moviesData, setMoviesData] = useState();
  const getMovies = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODFjNDIwNzRhMzg1ZjUwZWQ2MDNhOWUwMWFkNzQ2MiIsInN1YiI6IjY1ZTlkYjljM2Q3NDU0MDE3ZGI5ZTUxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lqi541zBsDvUdLGTY1hht3-TJHrho2Or3DSFo_WJhUc",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/discover/" +
        mediaType +
        "?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response?.results);
        setMoviesData(response?.results);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getMovies();
  }, [mediaType]);
  return (
    <View style={styles.container}>
      {moviesData?.map((movie) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("/Movie", {
              id: movie?.id,
              mediaType: mediaType,
            })
          }
          key={movie?.id}
          style={styles.movieContainer}
        >
          <Image
            source={{
              uri: "https://image.tmdb.org/t/p/w300" + movie?.poster_path,
            }}
            style={styles.image}
          />
          <View style={styles.content}>
            <Text style={styles.title}>
              {mediaType === MediaType.MOVIE ? movie?.title : movie?.name}
            </Text>
            <Text style={styles.genre}>
              {mediaType === MediaType.MOVIE
                ? movie?.release_date
                : movie?.first_air_date}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 16, // Not directly available in RN, use marginBottom on children or adjust as needed.
    padding: 16,
  },
  movieContainer: {
    backgroundColor: "#141427",
    flexDirection: "row",
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    height: "100%",
  },
  content: {
    flex: 3, // Adjust based on the image flex to maintain proportion.
    padding: 8,
  },
  title: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 20, // Tailwind's text-xl in pixels.
  },
  infoRow: {
    flexDirection: "row",
    gap: 8, // Not directly available, consider using marginRight on the first item or another approach.
  },
  infoText: {
    color: "#9CA3AF",
  },
  genre: {
    color: "#FFFFFF",
  },
});
