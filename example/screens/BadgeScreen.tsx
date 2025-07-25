import { Badge, Container } from '@herca/rn-kit';
import { ScrollView } from 'react-native';

export default function BadgeScreen() {
  return (
    <ScrollView>
      <Container style={{ gap: 10 }}>
        <Badge color="default" size="small" value="Badge Default small" />
        <Badge color="default" size={'medium'} value="Badge Default medium" />
        <Badge color="primary" size="small" value="Badge primary small" />
        <Badge color="primary" size={'medium'} value="Badge primary medium" />
        <Badge color="success" size="small" value="Badge success small" />
        <Badge color="success" size={'medium'} value="Badge success medium" />
        <Badge color="info" size="small" value="Badge info small" />
        <Badge color="info" size={'medium'} value="Badge info medium" />
        <Badge color="danger" size="small" value="Badge danger small" />
        <Badge color="danger" size={'medium'} value="Badge danger medium" />
        <Badge color="warning" size="small" value="Badge warning small" />
        <Badge color="warning" size={'medium'} value="Badge warning medium" />
        <Badge color="orange" size="small" value="Badge primary small" />
        <Badge color="orange" size={'medium'} value="Badge orange medium" />
        <Badge color="purple" size="small" value="Badge primary small" />
        <Badge color="purple" size={'medium'} value="Badge purple medium" />
        <Badge
          color="#219294"
          size="medium"
          value="Badge With Custom Color Value"
        />
        <Badge
          color="#219294"
          size="small"
          value="Badge With Custom Color Value"
        />
      </Container>
    </ScrollView>
  );
}
