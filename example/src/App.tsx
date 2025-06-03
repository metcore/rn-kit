import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ButtonScreen from '../screens/ButtonScreen';
import TypographyScreen from '../screens/TypographyScreen';
import BottomSheetScreen from '../screens/BottomSheetSreen';
import SelectScreen from '../screens/SelectScreen';
import ContainerScreen from '../screens/ContainerScreen';
import CardScreen from '../screens/CardScreen';
import InputScreen from '../screens/InputScreen';
import InputPasswordScreen from '../screens/InputPasswordScreen';
import ModalScreen from '../screens/ModalScreen';
import List from '../screens/ListScreen';
import CheckBox from '../screens/CheckBoxScreen';
import FooterScreen from '../screens/FooterScreen';
import ExampleScreen from '../screens/ExampleScreen';
import AvatarScreen from '../screens/AvatarScreen';
import BadgeScreen from '../screens/BadgeScreen';
import AlertScreen from '../screens/AlertScreen';
import { Provider } from '@herca/ui-kit';
import SpSignatureScreen from '../screens/SpSignatureScreen';
import DrawingScreen from '../screens/DrawingScreen';
import SpLatterScreen from '../screens/SpLatterScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            contentStyle: {
              backgroundColor: 'white',
            },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Container" component={ContainerScreen} />
          <Stack.Screen name="Card" component={CardScreen} />
          <Stack.Screen name="Button" component={ButtonScreen} />
          <Stack.Screen name="InputPassword" component={InputPasswordScreen} />
          <Stack.Screen name="Input" component={InputScreen} />
          <Stack.Screen name="Select" component={SelectScreen} />
          <Stack.Screen name="CheckBox" component={CheckBox} />
          <Stack.Screen name="Typography" component={TypographyScreen} />
          <Stack.Screen name="BottomSheet" component={BottomSheetScreen} />
          <Stack.Screen name="Modal" component={ModalScreen} />
          <Stack.Screen name="List" component={List} />
          <Stack.Screen name="Footer" component={FooterScreen} />
          <Stack.Screen name="Avatar" component={AvatarScreen} />
          <Stack.Screen name="Example" component={ExampleScreen} />
          <Stack.Screen name="SpSignature" component={SpSignatureScreen} />
          <Stack.Screen name="SpLatter" component={SpLatterScreen} />
          <Stack.Screen name="Badge" component={BadgeScreen} />
          <Stack.Screen name="Alert" component={AlertScreen} />
          <Stack.Screen name="Drawing" component={DrawingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
