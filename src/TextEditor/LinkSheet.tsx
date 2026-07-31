import { forwardRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import BottomSheet from '../BottomSheet/BottomSheet';
import Button from '../Button/Button';
import Input from '../Input/Input';

interface LinkSheetProps {
  isOpen: boolean;
  text: string;
  url: string;
  onChangeText: (value: string) => void;
  onChangeUrl: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
  onClose: () => void;
  labelText: string;
  labelUrl: string;
  placeholderText: string;
  placeholderUrl: string;
  saveText: string;
  cancelText: string;
}

/**
 * The sheet for adding or editing a hyperlink.
 *
 * The url input takes the forwarded ref because the editor focuses it shortly
 * after opening.
 */
const LinkSheet = forwardRef<TextInput, LinkSheetProps>(
  (
    {
      isOpen,
      text,
      url,
      onChangeText,
      onChangeUrl,
      onCancel,
      onSave,
      onClose,
      labelText,
      labelUrl,
      placeholderText,
      placeholderUrl,
      saveText,
      cancelText,
    },
    ref
  ) => (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <View style={styles.body}>
        <Input
          label={labelText}
          value={text}
          onChangeText={onChangeText}
          placeholder={placeholderText}
          autoCapitalize="none"
        />
        <Input
          ref={ref}
          keyboardType="url"
          label={labelUrl}
          value={url}
          onChangeText={onChangeUrl}
          placeholder={placeholderUrl}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.actions}>
        <View style={styles.flex1}>
          <Button
            title={cancelText}
            color="primary"
            onPress={onCancel}
            variant="outline"
          />
        </View>
        <View style={styles.flex1}>
          <Button title={saveText} color="primary" onPress={onSave} />
        </View>
      </View>
    </BottomSheet>
  )
);

export default LinkSheet;

const styles = StyleSheet.create({
  body: {
    gap: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  flex1: {
    flex: 1,
  },
});
