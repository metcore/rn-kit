import { Color, Container } from '@herca/rn-kit';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { InputSelect, type ChipValue } from '@herca/rn-kit';

const options = [
  { label: 'Apple', value: 1 },
  { label: 'Samsung', value: 2 },
  { label: 'Xiaomi', value: 3 },
  { label: 'Oppo', value: 4 },
  { label: 'Vivo', value: 5 },
  { label: 'Realme', value: 6 },
  { label: 'Asus', value: 7 },
  { label: 'OnePlus', value: 8 },
  { label: 'Huawei', value: 9 },
  { label: 'Honor', value: 10 },
  { label: 'Google', value: 11 },
  { label: 'Motorola', value: 12 },
  { label: 'Nokia', value: 13 },
  { label: 'Infinix', value: 14 },
  { label: 'Tecno', value: 15 },
  { label: 'Sony', value: 16 },
  { label: 'ZTE', value: 17 },
  { label: 'Lenovo', value: 18 },
  { label: 'Meizu', value: 19 },
  { label: 'Nothing', value: 20 },
  {
    label:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, possimus.',
    value: 21,
  },
];

export default function InputSelectScreen() {
  const [selectedProduct, setSelectedProduct] = useState<ChipValue>(null);
  const [filteredOptions, setFilteredOptions] = useState(options);

  return (
    <Container style={styles.container}>
      <InputSelect
        label="Basic"
        options={filteredOptions}
        value={options?.find((opt) => opt.value === selectedProduct)?.label}
        selectProps={{
          delaySearch: 500,
          value: [selectedProduct],
          onSubmit: (value) => {
            setSelectedProduct(value[0]);
          },
          onSearch: (value) => {
            const result = options.filter((opt) =>
              opt.label.toLowerCase().includes(value.toLowerCase())
            );

            setFilteredOptions(result);
          },
        }}
      />

      <InputSelect
        label="Icon"
        options={filteredOptions}
        icon="User"
        iconColor={Color.primary[1000]}
        value={options?.find((opt) => opt.value === selectedProduct)?.label}
        selectProps={{
          delaySearch: 500,
          value: [selectedProduct],
          onSubmit: (value) => {
            setSelectedProduct(value[0]);
          },
          onSearch: (value) => {
            const result = options.filter((opt) =>
              opt.label.toLowerCase().includes(value.toLowerCase())
            );

            setFilteredOptions(result);
          },
        }}
      />

      <InputSelect
        label="Hint"
        hint="Select your favorite product"
        options={filteredOptions}
        iconColor={Color.primary[1000]}
        value={options?.find((opt) => opt.value === selectedProduct)?.label}
        selectProps={{
          delaySearch: 500,
          value: [selectedProduct],
          onSubmit: (value) => {
            setSelectedProduct(value[0]);
          },
          onSearch: (value) => {
            const result = options.filter((opt) =>
              opt.label.toLowerCase().includes(value.toLowerCase())
            );

            setFilteredOptions(result);
          },
        }}
      />

      <InputSelect
        hasError
        label="Validation Failed"
        hint="Oops.. Something went wrong"
        options={filteredOptions}
        iconColor={Color.primary[1000]}
        value={options?.find((opt) => opt.value === selectedProduct)?.label}
        selectProps={{
          delaySearch: 500,
          value: [selectedProduct],
          onSubmit: (value) => {
            setSelectedProduct(value[0]);
          },
          onSearch: (value) => {
            const result = options.filter((opt) =>
              opt.label.toLowerCase().includes(value.toLowerCase())
            );

            setFilteredOptions(result);
          },
        }}
      />

      <InputSelect
        label="Use Clear"
        options={filteredOptions}
        value={options?.find((opt) => opt.value === selectedProduct)?.label}
        onClear={() => setSelectedProduct(null)}
        selectProps={{
          delaySearch: 500,
          value: [selectedProduct],
          onSubmit: (value) => {
            setSelectedProduct(value[0]);
          },
          onSearch: (value) => {
            const result = options.filter((opt) =>
              opt.label.toLowerCase().includes(value.toLowerCase())
            );

            setFilteredOptions(result);
          },
        }}
      />

      <InputSelect
        label="Use Subtitle & Badge"
        subtitle="Subtitle here"
        badge={{
          value: 'New',
          color: 'success',
        }}
        options={filteredOptions}
        value={options?.find((opt) => opt.value === selectedProduct)?.label}
        onClear={() => setSelectedProduct(null)}
        selectProps={{
          delaySearch: 500,
          value: [selectedProduct],
          onSubmit: (value) => {
            setSelectedProduct(value[0]);
          },
          onSearch: (value) => {
            const result = options.filter((opt) =>
              opt.label.toLowerCase().includes(value.toLowerCase())
            );

            setFilteredOptions(result);
          },
        }}
      />

      <InputSelect label="Use Subtitle & Badge" useModal={false} />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
});
