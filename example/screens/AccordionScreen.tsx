import {
  Accordion,
  AccordionItem,
  Badge,
  Color,
  Container,
  Icon,
  Typography,
} from '@herca/rn-kit';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function AccordionScreen() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isOpenBorderless, setIsOpenBorderless] = useState<boolean>(true);
  const [isOpenSub, setIsOpenSub] = useState<boolean>(true);
  const renderHeader = () => (
    <View style={styles.containerHeaderAccordion}>
      <Typography variant="t2" weight="semibold" color={Color.gray[900]}>
        Ini Header Accordion
      </Typography>
      <Icon
        name={isOpen ? 'ArrowDown' : 'ArrowUp'}
        color={Color.gray[600]}
        size={15}
      />
    </View>
  );

  const renderHeaderBorderless = () => (
    <View style={styles.containerHeaderAccordion}>
      <Typography variant="t2" weight="semibold" color={Color.gray[900]}>
        Ini Header Accordion Borderless
      </Typography>
      <Icon
        name={isOpenBorderless ? 'ArrowDown' : 'ArrowUp'}
        color={Color.gray[600]}
        size={15}
      />
    </View>
  );

  const handleCollapseAccordion = (collapse: boolean) => {
    setIsOpen(collapse);
  };
  const handleCollapseAccordionBorderless = (collapse: boolean) => {
    setIsOpenBorderless(collapse);
  };
  return (
    <Container>
      <Accordion
        isOpen={isOpen}
        renderHeader={renderHeader()}
        onCollapse={handleCollapseAccordion}
      >
        <AccordionItem>
          <View style={{ gap: 12 }}>
            <View style={styles.containerAccordionItem}>
              <View>
                <Typography
                  weight="semibold"
                  variant="t2"
                  color={Color.gray[900]}
                >
                  Ban Bocor
                </Typography>
                <Typography
                  weight="medium"
                  variant="t3"
                  color={Color.gray[700]}
                >
                  Ban Bocor
                </Typography>
              </View>
              <View>
                <Typography
                  weight="regular"
                  variant="t3"
                  color={Color.gray[700]}
                >
                  2.00x
                </Typography>
              </View>
            </View>
            <View style={styles.containerAccordionItem}>
              <View>
                <Badge value="0.00%" size="small" color="danger" />
              </View>
              <View>
                <Typography
                  weight="semibold"
                  variant="t2"
                  color={Color.gray[900]}
                >
                  2.00x
                </Typography>
              </View>
            </View>
          </View>
        </AccordionItem>
        <AccordionItem>
          <TouchableOpacity onPress={() => setIsOpenSub(!isOpenSub)}>
            <Typography variant="t1">Show more</Typography>
          </TouchableOpacity>
          <Accordion isOpen={isOpenSub}>
            <AccordionItem>
              <Typography variant="t2">Item</Typography>
            </AccordionItem>
            <AccordionItem>
              <Typography variant="t2">Quantity</Typography>
            </AccordionItem>
          </Accordion>
        </AccordionItem>
      </Accordion>

      <Accordion
        variant="borderless"
        renderHeader={renderHeaderBorderless()}
        isOpen={isOpenBorderless}
        onCollapse={handleCollapseAccordionBorderless}
      >
        <AccordionItem>
          <View style={{ gap: 12 }}>
            <View style={styles.containerAccordionItem}>
              <View>
                <Typography
                  weight="semibold"
                  variant="t2"
                  color={Color.gray[900]}
                >
                  Ban Bocor
                </Typography>
                <Typography
                  weight="medium"
                  variant="t3"
                  color={Color.gray[700]}
                >
                  Ban Bocor
                </Typography>
              </View>
              <View>
                <Typography
                  weight="regular"
                  variant="t3"
                  color={Color.gray[700]}
                >
                  2.00x
                </Typography>
              </View>
            </View>
            <View style={styles.containerAccordionItem}>
              <View>
                <Badge value="0.00%" size="small" color="danger" />
              </View>
              <View>
                <Typography
                  weight="semibold"
                  variant="t2"
                  color={Color.gray[900]}
                >
                  2.00x
                </Typography>
              </View>
            </View>
          </View>
        </AccordionItem>
        <AccordionItem>
          <TouchableOpacity onPress={() => setIsOpenSub(!isOpenSub)}>
            <Typography variant="t1">Show more</Typography>
          </TouchableOpacity>
          <Accordion isOpen={isOpenSub}>
            <AccordionItem>
              <Typography variant="t2">Item</Typography>
            </AccordionItem>
            <AccordionItem>
              <Typography variant="t2">Quantity</Typography>
            </AccordionItem>
          </Accordion>
        </AccordionItem>
      </Accordion>
    </Container>
  );
}

const styles = StyleSheet.create({
  containerHeaderAccordion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerAccordionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 1,
  },
  itemGrid: {
    gap: 0,
  },
  productTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    gap: 12,
  },
  productTitle: {
    flexShrink: 1,
    flex: 1,
  },
  productInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    gap: 8,
  },
  borderBottomNone: {
    borderBottomColor: 'transparent',
  },
  productGrandTotal: {
    alignItems: 'flex-end',
    flex: 1,
  },
  paddingNone: { paddingHorizontal: 0, paddingVertical: 0 },
  borderNone: { borderWidth: 0 },
  list: {
    borderWidth: 0,
    paddingVertical: 12,
  },
  accordionItem: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: Color.gray[100],
    gap: 5,
  },
  productArrowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
