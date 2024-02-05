import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Calculator from "./pages/Calculator";
import TabelaHorarios from "./pages/Horario";
import HomeScreen from "./pages/HomeScreen";
import SemestersScreen from "./pages/SemesterScreen";
import DisciplinesScreen from "./pages/DisciplineScreen";

function Home() {
  return <HomeScreen></HomeScreen>;
}

function Table() {
  return <TabelaHorarios></TabelaHorarios>;
}

function CalculatorScreen() {
  return <Calculator></Calculator>;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Perfil") {
              iconName = focused ? "newspaper" : "newspaper-outline";
            } else if (route.name === "Calculadora") {
              iconName = focused ? "calculator" : "calculator-outline";
            } else if (route.name === "Horários") {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (route.name === "Semestres") {
              iconName = focused ? "reader" : "reader-outline";
            } else if (route.name === "Disciplinas") {
              iconName = focused ? "checkmark-done" : "checkmark-done-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerTitle: "Minha Home",
            headerStyle: {
              backgroundColor: "white",
            },
            headerTintColor: "black",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          })}
        />

        <Tab.Screen
          name="Horários"
          component={Table}
          options={({ navigation }) => ({
            headerTitle: "Meus Horários",
            headerStyle: {
              backgroundColor: "white",
            },
            headerTintColor: "black",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            tabBarStyle: { display: "none" },
            headerLeft: () => (
              <Ionicons
                name="arrow-back"
                size={30}
                color="#000"
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate("Home")}
              />
            ),
          })}
        />

        <Tab.Screen
          name="Semestres"
          component={SemestersScreen}
          listeners={{
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();
            },
          }}
          options={({ navigation }) => ({
            headerTitle: "Meu Semestre",
            headerStyle: {
              backgroundColor: "white",
            },
            headerTintColor: "black",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerLeft: () => (
              <Ionicons
                name="arrow-back"
                size={30}
                color="#000"
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate("Home")}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Disciplinas"
          component={DisciplinesScreen}
          listeners={{
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();
            },
          }}
          options={({ navigation }) => ({
            headerTitle: "Minhas Disciplinas",
            headerStyle: {
              backgroundColor: "white",
            },
            headerTintColor: "black",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerLeft: () => (
              <Ionicons
                name="arrow-back"
                size={30}
                color="#000"
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate("Home")}
              />
            ),
          })}
        />

        <Tab.Screen
          name="Calculadora"
          component={CalculatorScreen}
          options={({ navigation }) => ({
            headerTitle: "Minha Calculadora",
            headerStyle: {
              backgroundColor: "white",
            },
            headerTintColor: "black",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerLeft: () => (
              <Ionicons
                name="arrow-back"
                size={30}
                color="#000"
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate("Home")}
              />
            ),
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
