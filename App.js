import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CandidateListScreen from "./Screen1";
import CandidateDetailScreen from "./CandidateDetailScreen";
import AddCandidateScreen from "./AddCandidateScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CandidateList">
        <Stack.Screen
          name="CandidateList"
          component={CandidateListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CandidateDetail"
          component={CandidateDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddCandidate"
          component={AddCandidateScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
