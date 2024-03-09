import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import React from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  containerInner: {
    marginTop: 140,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  linkText: {
    color: "white",
  },
});

export default function About() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerInner}>
        <Text style={[styles.text, { fontSize: 20, marginBottom: 16 }]}>
          Made with ❤️ by
        </Text>
        <Image
          style={styles.img}
          source={{
            uri: "https://media.licdn.com/dms/image/C5603AQFN07ChPEYGMg/profile-displayphoto-shrink_400_400/0/1641306776836?e=1715212800&v=beta&t=6C4uyWQ7rOfz_7CcPH53uJWRma0OjlgJ_vH1WHC7XLM",
          }}
        />
        <Text style={[styles.text, { fontSize: 24, marginTop: 16 }]}>
          Kartik Joshi
        </Text>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://kartikjoshi.netlify.app").catch((err) =>
              console.error("An error occurred", err)
            )
          }
        >
          <Text style={styles.linkText}>View Portfolio</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
