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
import DrawingScreen from '../screens/DrawingScreen';
import SwitchScreen from '../screens/SwitchScreen';
import AvatarGroupScreen from '../screens/AvatarGroupScreen';
import RadioButtonScreen from '../screens/RadioButtonScreen';
import CalendarScreen from '../screens/CalendarScreen';
import DatePickerScreen from '../screens/DatePickerScreen';
import SpScreen from '../screens/example/SP/SpScreen';
import SpDetailScreen from '../screens/example/SP/SpDetailScreen';
import SpSignatureScreen from '../screens/example/SP/SpSignatureScreen';
import SpLatterScreen from '../screens/example/SP/SpLatterScreen';
import LeaveScreen from '../screens/example/Leave/LeaveScreen';
import LeaveFormScreen from '../screens/example/Leave/LeaveForm';
import LeaveDetailScreen from '../screens/example/Leave/LeaveDetailScreen';
import { Linking } from 'react-native';
import { ToastProvider } from '../../src/Toast/ToastContext';
import ToastScreen from '../screens/ToastScreen';
import LeaveApproveScreen from '../screens/example/Leave/LeaveApproveScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider
      requiredUpdated={false}
      updateConfig={{
        title: 'Update terbaru tersedia',
        description:
          'Kami telah menambahkan fitur penting. Silakan update sekarang.',
        onUpdate: () =>
          Linking.openURL(
            'https://play.google.com/store/apps/details?id=com.herca.hris2'
          ),
      }}
    >
      <ToastProvider>
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
            <Stack.Screen
              name="InputPassword"
              component={InputPasswordScreen}
            />
            <Stack.Screen name="Input" component={InputScreen} />
            <Stack.Screen name="Select" component={SelectScreen} />
            <Stack.Screen name="CheckBox" component={CheckBox} />
            <Stack.Screen name="RadioButton" component={RadioButtonScreen} />
            <Stack.Screen name="Typography" component={TypographyScreen} />
            <Stack.Screen name="BottomSheet" component={BottomSheetScreen} />
            <Stack.Screen name="Modal" component={ModalScreen} />
            <Stack.Screen name="List" component={List} />
            <Stack.Screen name="Footer" component={FooterScreen} />
            <Stack.Screen name="Avatar" component={AvatarScreen} />
            <Stack.Screen name="AvatarGroup" component={AvatarGroupScreen} />
            <Stack.Screen name="Example" component={ExampleScreen} />
            <Stack.Screen name="SpSignature" component={SpSignatureScreen} />
            <Stack.Screen name="SpLatter" component={SpLatterScreen} />
            <Stack.Screen name="Badge" component={BadgeScreen} />
            <Stack.Screen name="Alert" component={AlertScreen} />
            <Stack.Screen name="Drawing" component={DrawingScreen} />
            <Stack.Screen name="Calendar" component={CalendarScreen} />
            <Stack.Screen name="Switch" component={SwitchScreen} />
            <Stack.Screen name="DatePicker" component={DatePickerScreen} />
            <Stack.Screen name="Toast" component={ToastScreen} />

            <Stack.Screen name="Sp" component={SpScreen} />
            <Stack.Screen name="SpDetail" component={SpDetailScreen} />

            <Stack.Screen name="Leave" component={LeaveScreen} />
            <Stack.Screen name="LeaveForm" component={LeaveFormScreen} />
            <Stack.Screen name="LeaveDetail" component={LeaveDetailScreen} />
            <Stack.Screen name="LeaveApprove" component={LeaveApproveScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </Provider>
  );
};

export default App;
