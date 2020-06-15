import 'react-native-gesture-handler';
import React from 'react';
import Acceuil from "./components/acceuil";
import VueFrigo from "./components/vueFrigo";
import Inscription from "./components/inscription";
import VueDetail from './components/vueDetail';
import VueAjoutFood from './components/vueAjoutFood';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Acceuil"
          component={Acceuil}
        />
        <Stack.Screen
          name="Inscription"
          component={Inscription}
        />
        <Stack.Screen
          name="Mon Frigo"
          component={VueFrigo}
        />
        <Stack.Screen
          name="Détail d'une denrée"
          component={VueDetail}
        />
        <Stack.Screen
          name="Ajout d'une denrée"
          component={VueAjoutFood}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

}



