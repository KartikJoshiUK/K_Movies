import { View, Text, StyleSheet, Image } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../Layout";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({ navigation }) {
  const { userInfo, googleSignout } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>User Profile</Text>
      {userInfo?.user?._user?.photoURL && (
        <Image
          source={{ uri: userInfo?.user?._user?.photoURL }}
          style={styles.userImage}
        />
      )}

      <Text style={styles.userName}>{userInfo?.user?._user?.displayName}</Text>
      <Text style={styles.userName}>{userInfo?.user?._user?.email}</Text>
      <TouchableOpacity
        onPress={() => {
          googleSignout();
          navigation.navigate("/Login");
        }}
        style={styles.signout}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000014",
    gap: 10,
  },
  userName: {
    color: "white",
  },
  userImage: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  pageTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  signout: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
  },
});
