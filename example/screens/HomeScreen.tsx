import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Typography, Button, Container } from '@herca/rn-kit';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../type/navigation';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <SafeAreaView>
      <ScrollView>
        <Container style={styles.container}>
          <Button
            color="success"
            title="Example"
            onPress={() => navigation.navigate('Example')}
            block
          />
          <Typography variant="h2" weight="bold">
            All Components
          </Typography>

          <Typography variant="h3" weight="bold">
            Layouts
          </Typography>
          <Button
            color="success"
            title="Typography"
            onPress={() => navigation.navigate('Typography')}
            block
          />
          <Button
            color="success"
            title="Container"
            onPress={() => navigation.navigate('Container')}
            block
          />
          <Button
            color="success"
            title="Card"
            onPress={() => navigation.navigate('Card')}
            block
          />
          <Button
            color="success"
            title="List"
            onPress={() => navigation.navigate('List')}
            block
          />
          <Button
            color="success"
            title="Label"
            onPress={() => navigation.navigate('Label')}
            block
          />
          <Button
            color="success"
            title="Footer"
            onPress={() => navigation.navigate('Footer')}
            block
          />
          <Button
            color="success"
            title="Avatar"
            onPress={() => navigation.navigate('Avatar')}
            block
          />
          <Button
            color="success"
            title="Avatar Group"
            onPress={() => navigation.navigate('AvatarGroup')}
            block
          />
          <Button
            color="success"
            title="Badge"
            onPress={() => navigation.navigate('Badge')}
            block
          />
          <Button
            color="success"
            title="Badge Icon"
            onPress={() => navigation.navigate('BadgeIcon')}
            block
          />
          <Button
            color="success"
            title="Alert"
            onPress={() => navigation.navigate('Alert')}
            block
          />
          <Button
            color="success"
            title="Toast"
            onPress={() => navigation.navigate('Toast')}
            block
          />
          <Button
            color="success"
            title="Spinner"
            onPress={() => navigation.navigate('Spinner')}
            block
          />
          <Button
            color="success"
            title="Icons"
            onPress={() => navigation.navigate('Icons')}
            block
          />

          <Typography variant="h3" weight="bold">
            Form Requirment
          </Typography>
          <Button
            color="success"
            title="Button"
            onPress={() => navigation.navigate('Button')}
            block
          />
          <Button
            color="success"
            title="Chip Select"
            onPress={() => navigation.navigate('Chip')}
            block
          />
          <Button
            color="success"
            title="Counter Button"
            onPress={() => navigation.navigate('CounterButton')}
            block
          />
          <Button
            color="success"
            title="Input"
            onPress={() => navigation.navigate('Input')}
            block
          />
          <Button
            color="success"
            title="Input Password"
            onPress={() => navigation.navigate('InputPassword')}
            block
          />
          <Button
            color="success"
            title="Input Otp"
            onPress={() => navigation.navigate('InputOtp')}
            block
          />
          <Button
            color="success"
            title="Input Select"
            onPress={() => navigation.navigate('InputSelect')}
            block
          />
          <Button
            color="success"
            title="Input Date"
            onPress={() => navigation.navigate('InputDate')}
            block
          />
          <Button
            color="success"
            title="Text Area"
            onPress={() => navigation.navigate('TextArea')}
            block
          />
          <Button
            color="success"
            title="Select"
            onPress={() => navigation.navigate('Select')}
            block
          />
          <Button
            color="success"
            title="Checkbox"
            onPress={() => navigation.navigate('CheckBox')}
            block
          />
          <Button
            color="success"
            title="Radio Button"
            onPress={() => navigation.navigate('RadioButton')}
            block
          />
          <Button
            color="success"
            title="Switch"
            onPress={() => navigation.navigate('Switch')}
            block
          />
          <Button
            color="success"
            title="Drawing"
            onPress={() => navigation.navigate('Drawing')}
            block
          />
          <Button
            color="success"
            title="DatePicker"
            onPress={() => navigation.navigate('DatePicker')}
            block
          />
          <Button
            color="success"
            title="Month Picker"
            onPress={() => navigation.navigate('MonthPicker')}
            block
          />
          <Button
            color="success"
            title="Year Picker"
            onPress={() => navigation.navigate('YearPicker')}
            block
          />
          <Button
            color="success"
            title="Time Picker"
            onPress={() => navigation.navigate('TimePicker')}
            block
          />
          <Button
            color="success"
            title="Text Editor"
            onPress={() => navigation.navigate('TextEditor')}
            block
          />
          <Button
            color="success"
            title="Input File"
            onPress={() => navigation.navigate('InputFile')}
            block
          />
          <Typography variant="h3" weight="bold">
            Tool
          </Typography>
          <Button
            color="success"
            title="Bottom Sheet"
            onPress={() => navigation.navigate('BottomSheet')}
            block
          />
          <Button
            color="success"
            title="Tab"
            onPress={() => navigation.navigate('Tab')}
            block
          />
          <Button
            color="success"
            title="Step"
            onPress={() => navigation.navigate('Step')}
            block
          />
          <Button
            color="success"
            title="Modal"
            onPress={() => navigation.navigate('Modal')}
            block
          />
          <Button
            color="success"
            title="Accordion"
            onPress={() => navigation.navigate('Accordion')}
            block
          />
          <Button
            color="success"
            title="DropDown"
            onPress={() => navigation.navigate('DropDown')}
            block
          />
          <Button
            color="success"
            title="TimeLine"
            onPress={() => navigation.navigate('TimeLine')}
            block
          />
          <Button
            color="success"
            title="Skeleton"
            onPress={() => navigation.navigate('Skeleton')}
            block
          />
          <Button
            color="success"
            title="Pdf Viewer"
            onPress={() => navigation.navigate('PdfView')}
            block
          />
          <Button
            color="success"
            title="Calendar"
            onPress={() => navigation.navigate('Calendar')}
            block
          />
          <Typography variant="h3" weight="bold" style={styles.title}>
            Example Screen
          </Typography>
          <Button
            color="success"
            title="Example"
            onPress={() => navigation.navigate('Example')}
            block
          />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 24,
  },
  button: {
    marginBottom: 12,
  },
  container: {
    gap: 2,
  },
});

export default HomeScreen;
