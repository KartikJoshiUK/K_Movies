import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import MovieCardList from "./containers/MovieCardList";
import { trendingMovies } from "../assets/content/trending.json";
import { popularMovies } from "../assets/content/popular.json";
import MovieLists from "./containers/MovieLists";

export const MediaType = {
  MOVIE: "movie",
  SERIES: "tv",
};

export default function Dashboard({ navigation }) {
  const [mediaType, setMediaType] = useState(MediaType.MOVIE);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() =>
            setMediaType((prev) => {
              if (prev !== MediaType.MOVIE) return MediaType.MOVIE;
              return null;
            })
          }
          style={[
            styles.tabButton,
            mediaType === MediaType.MOVIE && styles.activeTab,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              mediaType === MediaType.MOVIE && styles.activeTabText,
            ]}
          >
            MOVIE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setMediaType((prev) => {
              if (prev !== MediaType.SERIES) return MediaType.SERIES;
              return null;
            })
          }
          style={[
            styles.tabButton,
            mediaType === MediaType.SERIES && styles.activeTab,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              mediaType === MediaType.SERIES && styles.activeTabText,
            ]}
          >
            SERIES
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>FEATURED</Text>
      <MovieCardList
        movies={popularMovies}
        navigation={navigation}
        mediaType={mediaType}
      />
      <Text style={styles.sectionTitle}>TRENDING</Text>
      <MovieLists
        movies={trendingMovies}
        navigation={navigation}
        mediaType={mediaType}
      />
      <View style={styles.footerPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2937",
    paddingVertical: 16,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  tabButton: {
    backgroundColor: "#111827",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 4,
  },
  tabText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 18,
  },
  activeTab: {
    backgroundColor: "#F3F4F6",
  },
  activeTabText: {
    color: "#000000",
    fontWeight: "bold",
  },
  sectionTitle: {
    color: "#FFFFFF",
    paddingHorizontal: 24,
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
  },
  footerPadding: {
    paddingVertical: 16,
  },
});
