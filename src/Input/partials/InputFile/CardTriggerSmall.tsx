import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Card from '../../../Ui/Card';
import Color from '../../../Color/Color';
import Typography from '../../../Typography/Typography';
import Button from '../../../Button/Button';
import { layouting } from '../../../styles/layouting';
import ItemPreview from './ItemPreview';
import { spacing } from '../../../styles/spacing';

interface Props {
  title?: string;
  textButton?: string;
  files: any[];
  onChooseFile?: () => void;
  onPreview?: (file: any) => void;
  onReplace?: (index: number) => void;
  onDelete?: (index: number) => void;
}

export default function CardTriggerSmall({
  title = 'Upload File',
  textButton = 'Choose File',
  onChooseFile,
  files,
  onDelete,
  onPreview,
  onReplace,
}: Props) {
  const Component = files?.length === 0 ? View : TouchableOpacity;

  return (
    <View style={[layouting.flex.row, spacing.gap[8]]}>
      <Card
        style={[styles.card, files.length === 0 ? layouting.flex.grow : {}]}
        backgroundColor={Color?.gray[50]}
        borderColor={Color?.gray[200]}
      >
        <Component
          style={[
            styles.titleWrapper,
            files.length > 0 ? layouting.flex.col : {},
            files.length > 0 ? spacing.gap[6] : {},
          ]}
          {...(files?.length > 0 && { onPress: onChooseFile })}
        >
          <Image
            source={require('../../assets/input-file.png')}
            style={files?.length === 0 ? styles.image : styles.imageSmall}
          />
          <Typography
            variant={files?.length === 0 ? 't1' : 't3'}
            weight={files?.length === 0 ? 'semibold' : 'regular'}
            color={Color.gray[600]}
          >
            {title}
          </Typography>
        </Component>

        {files.length === 0 && (
          <Button
            title={textButton}
            color="primary"
            size="small"
            onPress={onChooseFile}
          />
        )}
      </Card>

      {files.length > 0 && (
        <ScrollView
          style={[layouting.flex[1]]}
          contentContainerStyle={[spacing.gap[8], layouting.align.center]}
          horizontal
        >
          {files.map((file, index) => (
            <ItemPreview
              variant="small"
              key={index}
              index={index}
              file={file}
              onPress={() => onPreview?.(file)}
              onDelete={() => onDelete?.(index)}
              onReplace={() => onReplace?.(index)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
  },
  image: {
    width: 48,
    height: 48,
  },
  imageSmall: {
    width: 28,
    height: 28,
  },
});
