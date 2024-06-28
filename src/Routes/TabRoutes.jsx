import { Image, Text } from "react-native";
import About from "../pages/About";
import Search from "../pages/Search";
import Dashboard from "../pages/Dashboard";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../pages/Profile";
import { UserContext } from "../Layout";
import { useContext } from "react";
const Tab = createBottomTabNavigator();
export default function TabRoutes() {
  const { userInfo } = useContext(UserContext);
  return (
    <Tab.Navigator
      initialRouteName="/Tabs/Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#000014",
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="/Tabs/Home"
        component={Dashboard}
        options={{
          tabBarLabel: "Home",
          headerTitle: "K-Movies",
          headerStyle: {
            backgroundColor: "#000014",
          },
          headerTitleStyle: {
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
          },
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              color={focused ? "white" : "#e2e5e9"}
              size={focused ? 20 : 16}
            />
          ),
        }}
      />
      <Tab.Screen
        name="/Tabs/Search"
        component={Search}
        options={{
          tabBarLabel: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="search"
              color={focused ? "white" : "#e2e5e9"}
              size={focused ? 20 : 16}
            />
          ),
        }}
      />
      <Tab.Screen
        name="/Tabs/About"
        component={About}
        options={{
          tabBarLabel: "About",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="question"
              color={focused ? "white" : "#e2e5e9"}
              size={focused ? 20 : 16}
            />
          ),
        }}
      />
      <Tab.Screen
        name="/Tabs/Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={{
                uri:
                  userInfo?.user?._user?.photoURL ??
                  "https://cdn.britannica.com/60/182360-050-CD8878D6/Avengers-Age-of-Ultron-Joss-Whedon.jpg",
              }}
              style={{
                width: 26,
                height: 26,
                objectFit: "cover",
                borderRadius: 50,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
