import {
  Badge,
  Button,
  Color,
  Container,
  Icon,
  Select,
  Typography,
  type ChipOptionProps,
  type ChipSelectedProps,
} from '@herca/rn-kit';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const DATA = [
  {
    value: 1,
    label: 2,
    description: 'wkwkwkwkwkwkkw',
  },
  {
    value: 2,
    label: 'tes',
    description: 'wkwkwk',
  },
  {
    value: 3,
    label: 'tes',
    description: 'wkowowkowkwowo',
  },
  {
    value: 4,
    label: 'tes',
  },
  {
    value: 5,
    label: 'tes',
  },
  {
    value: 6,
    label: 'tes',
  },
  {
    value: 7,
    label: 'tes',
  },
  {
    value: 8,
    label: 'tes',
  },
  {
    value: 9,
    label: 'tes',
  },
  {
    value: 10,
    label: 'tes',
  },
  {
    value: 11,
    label: 'tes11',
  },
  {
    value: 12,
    label: 'tes',
  },
  {
    value: 13,
    label: 'tes',
  },
  {
    value: 14,
    label: 'tes',
  },
];

export default function SelectScreen() {
  const [isOpenSelectDefault, setIsOpenSelectDefault] =
    useState<boolean>(false);
  const [isOpenSelectCustom, setIsOpenSelectCustom] = useState<boolean>(false);
  const [isOpenSelectHeaderFooter, setIsOpenSelectHeaderFooter] =
    useState<boolean>(false);
  const [loadingSelect, setLoadingSelect] = useState<boolean>(true);
  const [submitValue, setSubmitValue] = useState<ChipSelectedProps>();
  const [onEndReached, setOnEndReach] = useState<boolean>(false);
  const [isRequiredSelectOpen, setIsRequiredSelectOpen] =
    useState<boolean>(false);
  const [isProductFetching, setIsProductFetching] = useState<boolean>(false);
  const [products, setProducts] = useState<any[]>([]);

  const handleSubmitSelectCustom = (val: ChipSelectedProps) => {
    setSubmitValue(val);
    setIsOpenSelectCustom(false);
  };

  const renderItem = (item: ChipOptionProps) => {
    return (
      <View>
        <View style={styles.containerItem}>
          <Typography variant="t3" weight="medium" color={Color.gray[900]}>
            {item.label}
          </Typography>
          <Badge value="New" size="small" color="danger" />
        </View>
        <Typography color={Color.gray[600]} variant="t3" weight="regular">
          {item?.description}
        </Typography>
      </View>
    );
  };

  const handleOnPressSelectDefault = () => {
    setLoadingSelect(true);
    setIsOpenSelectDefault(true);
    setTimeout(() => {
      setLoadingSelect(false);
    }, 1500);
  };

  const handleOnRefresh = () => {
    setLoadingSelect(true);
    setTimeout(() => {
      setLoadingSelect(false);
    }, 1000);
  };

  const handleOnEndReach = () => {
    setOnEndReach(true);
    setTimeout(() => {
      setOnEndReach(false);
    }, 1500);
  };

  const handleSubmitSelectHeaderFooter = (val: ChipSelectedProps) => {
    setSubmitValue(val);
    setIsOpenSelectHeaderFooter(false);
  };

  const renderHeader = () => {
    return (
      <View>
        <Typography variant="t2" weight="semibold" color={Color.gray[900]}>
          Pilih Serial Number / Barcode
        </Typography>
        <Typography variant="t3" weight="medium" color={Color.gray[600]}>
          Pilih Serial Number / Barcode
        </Typography>
      </View>
    );
  };

  async function fetchProducts(query: string = '') {
    setIsProductFetching(true);
    try {
      const url = query
        ? `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
        : `https://dummyjson.com/products`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    } finally {
      setIsProductFetching(false);
    }
  }

  const mappedProducts = products.map((prod) => ({
    label: prod.title,
    value: prod.id,
  }));

  function handleSubmitSelectRequired(val: any) {
    setIsRequiredSelectOpen(false);
    setSubmitValue(val);
  }

  useEffect(() => {
    if (isRequiredSelectOpen) {
      fetchProducts();
    }
  }, [isRequiredSelectOpen]);

  return (
    <View>
      <Container style={styles.containerButton}>
        <Button
          color="primary"
          onPress={() => handleOnPressSelectDefault()}
          title="Select Default"
        />
        <Button
          color="primary"
          onPress={() => setIsOpenSelectCustom(true)}
          title="Custom Item"
        />
        <Button
          color="primary"
          onPress={() => setIsOpenSelectHeaderFooter(true)}
          title="Header & Footer"
        />
        <Button
          color="primary"
          onPress={() => setIsRequiredSelectOpen(true)}
          title="Required Select"
        />
        <Typography>submitValue: {submitValue}</Typography>
      </Container>
      <Select
        isOpen={isOpenSelectDefault}
        height="100%"
        onClose={() => setIsOpenSelectDefault(false)}
        data={DATA}
        loading={loadingSelect}
        onSearch={(_val) => handleOnPressSelectDefault()}
        onSubmit={handleSubmitSelectCustom}
        onEndReached={handleOnEndReach}
        delaySearch={500}
        onRefresh={handleOnRefresh}
        refreshing={loadingSelect}
        footer={onEndReached ? <ActivityIndicator /> : <></>}
      />
      <Select
        isOpen={isOpenSelectCustom}
        onClose={() => setIsOpenSelectCustom(false)}
        data={DATA}
        multiple
        renderItem={renderItem}
        onSubmit={handleSubmitSelectCustom}
      />
      <Select
        required
        data={mappedProducts}
        loading={isProductFetching}
        isOpen={isRequiredSelectOpen}
        onClose={() => setIsRequiredSelectOpen(false)}
        onSubmit={handleSubmitSelectRequired}
        onSearch={fetchProducts}
        renderItem={({ label }) => (
          <View style={styles.containerItem}>
            <Icon name="box-outline" />
            <Typography variant="t1">{label}</Typography>
          </View>
        )}
      />
      <Select
        isOpen={isOpenSelectHeaderFooter}
        onClose={() => setIsOpenSelectHeaderFooter(false)}
        data={DATA}
        multiple
        header={renderHeader}
        renderItem={renderItem}
        onSubmit={handleSubmitSelectHeaderFooter}
        required={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerItem: {
    flexDirection: 'row',
    gap: 4,
  },
  containerButton: {
    gap: 8,
  },
});
