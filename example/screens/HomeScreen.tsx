import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Typography, Button, Container } from '@herca/ui-kit';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../type/navigation';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <ScrollView>
      <Container style={{ gap: 2 }}>
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
          color="primary"
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
          title="Calendar"
          onPress={() => navigation.navigate('Calendar')}
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
          title="Dropdown"
          onPress={() => navigation.navigate('Dropdown')}
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
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 24,
  },
  button: {
    marginBottom: 12,
  },
});

export default HomeScreen;
