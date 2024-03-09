import React, { createContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Movie_ from "./pages/Movie_";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TabRoutes from "./Routes/TabRoutes";
import Login from "./pages/Login";
import { enableScreens } from "react-native-screens";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
enableScreens();

const Stack = createStackNavigator();
export const UserContext = createContext();

export default function Navigation() {
  const [userInfo, setUserInfo] = useState(false);
  GoogleSignin.configure({
    webClientId:
      "994559826199-16t8lvepp4256u8j9vnub7gp94bn72rf.apps.googleusercontent.com",
  });
  const googleSignIn = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    auth()
      .signInWithCredential(googleCredential)
      .then(async (user) => {
        console.log(user);
        setUserInfo(user);
        await AsyncStorage.setItem("userInfo", JSON.stringify(user)); // Storing user info
      })
      .catch((error) => console.log(error));
  };
  const googleSignout = async () => {
    try {
      await GoogleSignin.signOut();
      await auth().signOut();
      await AsyncStorage.removeItem("userInfo");
      setUserInfo(null);
    } catch (error) {
      console.log(error);
    }
  };
  const checkLoginStatus = async () => {
    const userInfo = await AsyncStorage.getItem("userInfo");
    if (userInfo) {
      setUserInfo(JSON.parse(userInfo));
    } else {
      const subscriber = auth().onAuthStateChanged(async (user) => {
        if (user) {
          await AsyncStorage.setItem("userInfo", JSON.stringify(user)); // Storing user info
        }
        setUserInfo(user);
      });
      return subscriber; // unsubscribe on unmount
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, googleSignIn, googleSignout }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="/Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="/Login" component={Login} />
            <Stack.Screen name="/Tabs" component={TabRoutes} />
            <Stack.Screen name="/Movie" component={Movie_} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </UserContext.Provider>
  );
}
