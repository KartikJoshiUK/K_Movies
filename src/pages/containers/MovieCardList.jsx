import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { MediaType } from "../Dashboard";

export default function MovieCardList({ navigation, mediaType }) {
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
        "?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
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
      <ScrollView style={styles.scrollView} horizontal>
        {moviesData?.map((movie) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("/Movie", { id: movie?.id, mediaType })
            }
            key={movie?.id}
            style={styles.touchableOpacity}
          >
            <Image
              source={{
                uri: "https://image.tmdb.org/t/p/w300" + movie?.poster_path,
              }}
              style={styles.image}
            />
            <View style={styles.textView}>
              <Text style={styles.titleText}>
                {mediaType === MediaType.MOVIE ? movie?.title : movie?.name}
              </Text>
              <Text style={styles.subtitleText}>
                {mediaType === MediaType.MOVIE
                  ? movie?.release_date
                  : movie?.first_air_date}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: "100%",
    padding: 6,
    paddingHorizontal: 10,
  },
  scrollView: {
    height: "100%",
    flexDirection: "row",
  },
  touchableOpacity: {
    marginHorizontal: 4,
    backgroundColor: "#141427", // bg-gray-900
    borderRadius: 8,
    overflow: "hidden",
    width: 150, // Tailwind w-32, assuming 1 unit is 8pt in React Native
  },
  image: {
    width: "100%", // Tailwind w-32
    height: 100, // h-32
    resizeMode: "cover",
  },
  textView: {
    padding: 10,
  },
  titleText: {
    color: "#fff",
  },
  subtitleText: {
    color: "#9ca3af", // text-gray-300
  },
});
