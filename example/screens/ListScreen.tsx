import { Color, Container, List, Typography } from '@herca/kit';
import { TouchableOpacity, View } from 'react-native';
import ListItem from '../../src/List/ListItem';
import ArrowRight from '../../src/Icon/icons/ArrowRight';

export default function ListScreen() {
  return (
    <Container>
      <Typography variant="h2">Basic</Typography>
      <List>
        <ListItem>
          <Typography variant="t2" color={Color.gray[600]}>
            Nama Lengkap
          </Typography>
          <Typography variant="t2" weight="semibold" color={Color.gray[800]}>
            Mama Alkatiri
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="t2" color={Color.gray[600]}>
            Nama Lengkap
          </Typography>
          <Typography variant="t2" weight="semibold" color={Color.gray[800]}>
            Mama Alkatiri
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="t2" color={Color.gray[600]}>
            Nama Lengkap
          </Typography>
          <Typography variant="t2" weight="semibold" color={Color.gray[800]}>
            Mama Alkatiri
          </Typography>
        </ListItem>
      </List>
      <Typography variant="h2">Custom</Typography>
      <List>
        <ListItem>
          <TouchableOpacity>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View>
                <View>
                  <Typography variant="t2" color={Color.gray[600]}>
                    Nama Lengkap
                  </Typography>
                  <Typography
                    variant="t2"
                    weight="semibold"
                    color={Color.gray[800]}
                  >
                    Mama Alkatiri
                  </Typography>
                </View>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <ArrowRight size={15} />
              </View>
            </View>
          </TouchableOpacity>
        </ListItem>
        <ListItem>
          <Typography variant="t2" color={Color.gray[600]}>
            Nama Lengkap
          </Typography>
          <Typography variant="t2" weight="semibold" color={Color.gray[800]}>
            Mama Alkatiri
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="t2" color={Color.gray[600]}>
            Nama Lengkap
          </Typography>
          <Typography variant="t2" weight="semibold" color={Color.gray[800]}>
            Mama Alkatiri
          </Typography>
        </ListItem>
      </List>
    </Container>
  );
}
