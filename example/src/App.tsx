import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from '@herca/rn-kit';
import { ToastProvider } from '../../src/Toast/ToastContext';
import HeaderNavigation from '../components/Header/HeaderNavigation';
import AccordionScreen from '../screens/AccordionScreen';
import AlertScreen from '../screens/AlertScreen';
import AvatarGroupScreen from '../screens/AvatarGroupScreen';
import AvatarScreen from '../screens/AvatarScreen';
import BadgeIconScreen from '../screens/BadgeIconScreen';
import BadgeScreen from '../screens/BadgeScreen';
import BottomSheetScreen from '../screens/BottomSheetSreen';
import ButtonScreen from '../screens/ButtonScreen';
import CalendarScreen from '../screens/CalendarScreen';
import CardScreen from '../screens/CardScreen';
import CheckBox from '../screens/CheckBoxScreen';
import ChipScreen from '../screens/ChipScreen';
import ContainerScreen from '../screens/ContainerScreen';
import CounterButtonScreen from '../screens/CounterButtonScreen';
import DatePickerScreen from '../screens/DatePickerScreen';
import DrawingScreen from '../screens/DrawingScreen';
import DropDownScreen from '../screens/DropDownScreen';
import ForgotPasswordScreen from '../screens/example/Auth/ForgotPasswordScreen';
import LoginScreen from '../screens/example/Auth/LoginScreen';
import LeaveApproveScreen from '../screens/example/Leave/LeaveApproveScreen';
import LeaveDetailScreen from '../screens/example/Leave/LeaveDetailScreen';
import LeaveFormScreen from '../screens/example/Leave/LeaveForm';
import LeaveScreen from '../screens/example/Leave/LeaveScreen';
import SpDetailScreen from '../screens/example/SP/SpDetailScreen';
import SpLatterScreen from '../screens/example/SP/SpLatterScreen';
import SpScreen from '../screens/example/SP/SpScreen';
import SpSignatureScreen from '../screens/example/SP/SpSignatureScreen';
import ExampleScreen from '../screens/ExampleScreen';
import FooterScreen from '../screens/FooterScreen';
import HomeScreen from '../screens/HomeScreen';
import IconScreen from '../screens/IconScreen';
import InputDateScreen from '../screens/InputDateScreen';
import InputFileScreen from '../screens/InputFileScreen';
import InputOtpScreen from '../screens/InputOtpScreen';
import InputPasswordScreen from '../screens/InputPasswordScreen';
import InputScreen from '../screens/InputScreen';
import InputSelectScreen from '../screens/InputSelectScreen';
import LabelScreen from '../screens/LabelScreen';
import List from '../screens/ListScreen';
import ModalScreen from '../screens/ModalScreen';
import MonthPickerScreen from '../screens/MonthPickerScreen';
import PdfViewScreen from '../screens/PdfViewScreen';
import RadioButtonScreen from '../screens/RadioButtonScreen';
import SelectScreen from '../screens/SelectScreen';
import SkeletonScreen from '../screens/SkeletonScreen';
import SpinnerScreen from '../screens/SpinnerScreen';
import StepScreen from '../screens/StepScreen';
import SwitchScreen from '../screens/SwitchScreen';
import TabDefaultScreen from '../screens/TabDefaultScreen';
import TabScreen from '../screens/TabScreen';
import TabStickyScreen from '../screens/TabStickyScreen';
import TextAreaScreen from '../screens/TextAreaScreen';
import TextEditorScreen from '../screens/TextEditorScreen';
import TimeLineScreen from '../screens/TimeLineScreen';
import TimePickerScreen from '../screens/TimePickerScreen';
import ToastScreen from '../screens/ToastScreen';
import TypographyScreen from '../screens/TypographyScreen';
import YearPickerScreen from '../screens/YearPickerScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider
      requiredUpdated={true}
      updateConfig={{
        fillScreen: false,
        title: 'Update terbaru tersedia',
        description:
          'Kami telah melakukan beberapa update peningkatan performa dan menambahkan fitur baru yang akan membuat pengalaman-mu semakin lebih baik.',
        onUpdate: () => {},
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
            <Stack.Screen name="InputOtp" component={InputOtpScreen} />
            <Stack.Screen
              name="CounterButton"
              component={CounterButtonScreen}
            />
            <Stack.Screen name="Spinner" component={SpinnerScreen} />
            <Stack.Screen name="Select" component={SelectScreen} />
            <Stack.Screen name="CheckBox" component={CheckBox} />
            <Stack.Screen name="Chip" component={ChipScreen} />
            <Stack.Screen name="RadioButton" component={RadioButtonScreen} />
            <Stack.Screen name="Typography" component={TypographyScreen} />
            <Stack.Screen name="TextArea" component={TextAreaScreen} />
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
            <Stack.Screen name="MonthPicker" component={MonthPickerScreen} />
            <Stack.Screen name="YearPicker" component={YearPickerScreen} />
            <Stack.Screen name="Toast" component={ToastScreen} />
            <Stack.Screen name="Icons" component={IconScreen} />
            <Stack.Screen name="TimeLine" component={TimeLineScreen} />
            <Stack.Screen name="Tab" component={TabScreen} />
            <Stack.Screen name="TabDefault" component={TabDefaultScreen} />
            <Stack.Screen name="TabSticky" component={TabStickyScreen} />
            <Stack.Screen name="Step" component={StepScreen} />
            <Stack.Screen name="TextEditor" component={TextEditorScreen} />
            <Stack.Screen
              name="Sp"
              component={SpScreen}
              options={{
                header: () => (
                  <HeaderNavigation
                    title="Surat Peringatan"
                    showBackButton={true}
                  />
                ),
              }}
            />
            <Stack.Screen name="SpDetail" component={SpDetailScreen} />

            <Stack.Screen
              name="Leave"
              component={LeaveScreen}
              options={{
                header: () => (
                  <HeaderNavigation
                    title="Pengajuan Cuti"
                    showBackButton={true}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="LeaveForm"
              component={LeaveFormScreen}
              options={{
                header: () => (
                  <HeaderNavigation
                    title="Pengajuan Cuti"
                    showBackButton={true}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="LeaveDetail"
              component={LeaveDetailScreen}
              options={{
                header: () => (
                  <HeaderNavigation
                    title="Pengajuan Cuti"
                    showBackButton={true}
                  />
                ),
              }}
            />
            <Stack.Screen name="LeaveApprove" component={LeaveApproveScreen} />
            <Stack.Screen name="Accordion" component={AccordionScreen} />
            <Stack.Screen name="DropDown" component={DropDownScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Label" component={LabelScreen} />
            <Stack.Screen name="TimePicker" component={TimePickerScreen} />
            <Stack.Screen name="BadgeIcon" component={BadgeIconScreen} />
            <Stack.Screen name="InputFile" component={InputFileScreen} />
            <Stack.Screen name="PdfView" component={PdfViewScreen} />
            <Stack.Screen name="InputSelect" component={InputSelectScreen} />
            <Stack.Screen name="InputDate" component={InputDateScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="Skeleton" component={SkeletonScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </Provider>
  );
};

export default App;
