import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../Layout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.4,
  },
  header: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    backgroundColor: "#4285f4",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});

export default function Login({ navigation }) {
  const { googleSignIn } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn.britannica.com/60/182360-050-CD8878D6/Avengers-Age-of-Ultron-Joss-Whedon.jpg",
        }}
        style={styles.image}
      />
      <View style={styles.header}>
        <Text style={styles.text}>K-Movies</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            googleSignIn();
            navigation.navigate("/Tabs");
          }}
        >
          <Image
            source={{
              uri: "https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png",
            }}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
