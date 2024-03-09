import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { MediaType } from "./Dashboard";

export default function Movie_({ navigation, route }) {
  const [movieData, setMovieData] = useState(null);
  const fetchData = (id, mediaType) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODFjNDIwNzRhMzg1ZjUwZWQ2MDNhOWUwMWFkNzQ2MiIsInN1YiI6IjY1ZTlkYjljM2Q3NDU0MDE3ZGI5ZTUxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lqi541zBsDvUdLGTY1hht3-TJHrho2Or3DSFo_WJhUc",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/" +
        mediaType +
        "/" +
        id +
        "?language=en-US",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovieData(response);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    if (route.params?.id && route.params?.mediaType) {
      fetchData(route.params.id, route.params.mediaType);
    }
  }, [route.params?.id, route.params?.mediaType]);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: "https://image.tmdb.org/t/p/w1280" + movieData?.poster_path,
        }}
        style={styles.image}
      />
      <View style={styles.contentView}>
        <Text style={styles.typeText}>{movieData?.tagline}</Text>
        <Text style={styles.titleText}>
          {route?.params?.mediaType === MediaType.MOVIE
            ? movieData?.title
            : movieData?.name}
        </Text>
        <Text style={styles.typeText}>{movieData?.status}</Text>
        <Text style={styles.plotText}>
          <Text style={styles.boldText}>Vote: </Text>
          {movieData?.vote_average}/{movieData?.vote_count}
        </Text>
        <Text style={styles.releaseText}>
          {route?.params?.mediaType === MediaType.MOVIE
            ? "Release: "
            : "First Air: "}{" "}
          :{" "}
          {route?.params?.mediaType === MediaType.MOVIE
            ? movieData?.release_date
            : movieData?.first_air_date}
        </Text>
        <Text style={styles.genreText}>
          GENRE: {movieData?.genres?.map((gen) => gen?.name).join(", ")}
        </Text>
        <Text style={styles.movieLengthText}>
          {route?.params?.mediaType === MediaType.MOVIE
            ? `Movie Length : ${movieData?.runtime} mins`
            : `Seasons : ${movieData?.number_of_seasons}`}
        </Text>

        <Text style={styles.topicsText}>
          <Text style={styles.boldText}>Production companies: </Text>
          {movieData?.production_companies
            ?.map((company) => company?.name)
            .join(", ")}
        </Text>
        <Text style={styles.descriptionText}>
          <Text style={styles.boldText}>DESCRIPTION: </Text>
          {movieData?.overview}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.pop()}
        style={styles.backButton}
      >
        <FontAwesome name="chevron-left" size={20} color="#000" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2937",
  },
  image: {
    width: "100%",
    height: 384, // Tailwind's h-96 in pixels
  },
  contentView: {
    padding: 16, // Tailwind's p-4 in pixels
    spaceY: 8,
    gap: 8, // This is not directly translatable. Adjust `marginBottom` in individual styles or use a wrapping View.
  },
  typeText: {
    color: "#9CA3AF",
    textTransform: "capitalize",
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 24, // Tailwind's text-2xl in pixels
    fontWeight: "bold",
  },
  yearRatingText: {
    color: "#9CA3AF",
  },
  ratedText: {
    color: "#FFFFFF",
  },
  releaseText: {
    color: "#9CA3AF",
  },
  genreText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  movieLengthText: {
    color: "#9CA3AF",
  },
  plotText: {
    color: "#FFFFFF",
  },
  topicsText: {
    color: "#FFFFFF",
    fontWeight: "300",
  },
  descriptionText: {
    color: "#FFFFFF",
  },
  boldText: {
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: 24,
    left: 8,
    backgroundColor: "#FFFFFF",
    width: 32, // Tailwind's w-8 in pixels
    height: 32, // Tailwind's h-8 in pixels
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999, // Tailwind's rounded-full
  },
});
