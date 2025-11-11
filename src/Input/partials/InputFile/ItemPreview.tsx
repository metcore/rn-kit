import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Card from '../../../Ui/Card';
import Color from '../../../Color/Color';
import Typography from '../../../Typography/Typography';
import Icon from '../../../Icon';

interface Props {
  file: any;
  onPress: () => void;
  index: number;
  onReplace: (index: number) => void;
  onDelete: (index: number) => void;
}

export default function ItemPreview({
  file,
  onPress,
  index,
  onDelete,
  onReplace,
}: Props) {
  console.log(file?.type);
  return (
    <Card>
      <TouchableOpacity onPress={onPress} style={styles.containerPreview}>
        <View style={styles.containerListItem}>
          {file.type.startsWith('image') && (
            <Image
              source={
                file.uri?.endsWith('.pdf')
                  ? require('../../../Input/assets/input-file.png')
                  : { uri: file.uri }
              }
              style={styles.previewImage}
            />
          )}

          {!file.type.startsWith('image') && (
            <View style={styles.previewImage}>
              <Icon
                name={file.type === 'application/pdf' ? 'pdf-file' : 'Document'}
                size={file.type === 'application/pdf' ? 30 : 24}
                color={Color.primary[1000]}
              />
            </View>
          )}

          <View style={styles.fileDetails}>
            <Typography
              variant="t1"
              weight="semibold"
              color={Color.gray[600]}
              numberOfLines={1}
            >
              {file.name || `Image_${index + 1}`}
            </Typography>

            <Typography variant="t2" weight="regular" color={Color.gray[600]}>
              {((file?.size ?? file?.fileSize ?? 0) / (1024 * 1024)).toFixed(2)}
              MB
            </Typography>
          </View>
        </View>

        <View style={styles.action}>
          {file.error && (
            <Icon
              name="exclamation-triangle"
              color={Color.danger[500]}
              size={20}
            />
          )}
          <TouchableOpacity onPress={() => onReplace(index)}>
            <Icon name="rotate-right" size={18} color={Color.gray[700]} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onDelete(index)}>
            <Icon name="Times" size={12} color={Color.gray[700]} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  containerListItem: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    flex: 1,
  },
  previewImage: {
    width: 44,
    height: 44,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  fileDetails: {
    justifyContent: 'center',
    gap: 4,
    flex: 1,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexShrink: 0,
  },
});
