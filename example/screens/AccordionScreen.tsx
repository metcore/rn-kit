import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Accordion,
  AccordionItem,
  Color,
  Icon,
  Typography,
} from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

const Header = ({ label, isOpen }: { label: string; isOpen?: boolean }) => (
  <View style={styles.header}>
    <Typography variant="t2" weight="semibold" color={Color.gray[900]}>
      {label}
    </Typography>
    <Icon
      name={isOpen ? 'ArrowUp' : 'ArrowDown'}
      size={16}
      color={Color.gray[600]}
    />
  </View>
);

export default function AccordionScreen() {
  const [isOpenDefault, setIsOpenDefault] = useState(true);
  const [isOpenBorderless, setIsOpenBorderless] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <DemoScreen
      title="Accordion"
      description="Accordion menyembunyikan atau menampilkan AccordionItem secara dinamis, cocok untuk FAQ atau daftar konten bertingkat."
    >
      <DemoSection
        title="Default vs borderless"
        note="variant='borderless' menghapus border List pembungkus; setiap accordion di sini mengatur status buka/tutupnya sendiri lewat onCollapse agar ikon panah selalu sesuai keadaan asli."
      >
        <DemoLabel text='variant="default"' />
        <Accordion
          renderHeader={
            <Header label="Ketentuan pengiriman" isOpen={isOpenDefault} />
          }
          isOpen={isOpenDefault}
          onCollapse={setIsOpenDefault}
        >
          <AccordionItem>
            <Typography variant="t2" color={Color.gray[700]}>
              Pesanan dikirim maksimal 1x24 jam setelah pembayaran dikonfirmasi.
            </Typography>
          </AccordionItem>
        </Accordion>
        <DemoLabel text='variant="borderless"' />
        <Accordion
          variant="borderless"
          renderHeader={
            <Header label="Kebijakan pengembalian" isOpen={isOpenBorderless} />
          }
          isOpen={isOpenBorderless}
          onCollapse={setIsOpenBorderless}
        >
          <AccordionItem>
            <Typography variant="t2" color={Color.gray[700]}>
              Barang dapat dikembalikan dalam 7 hari selama kemasan masih utuh.
            </Typography>
          </AccordionItem>
        </Accordion>
      </DemoSection>

      <DemoSection
        title="Terkontrol & onCollapse"
        note="isOpen dari state luar mengendalikan buka/tutup; onCollapse dipanggil setiap status berubah, dipakai untuk readout dan ikon panah."
      >
        <DemoLabel text="isOpen onCollapse" />
        <Accordion
          renderHeader={<Header label="Metode pembayaran" isOpen={isOpen} />}
          isOpen={isOpen}
          onCollapse={setIsOpen}
        >
          <AccordionItem>
            <Typography variant="t2" color={Color.gray[700]}>
              Mendukung transfer bank, kartu kredit, dan e-wallet.
            </Typography>
          </AccordionItem>
        </Accordion>
        <Typography variant="t3" color={Color.gray[700]}>
          {`Status: ${isOpen ? 'terbuka' : 'tertutup'}`}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Bersarang"
        note="Accordion dapat diletakkan di dalam AccordionItem lain untuk struktur konten bertingkat."
      >
        <Accordion renderHeader={<Header label="Pertanyaan umum" />} isOpen>
          <AccordionItem>
            <Accordion
              renderHeader={<Header label="Berapa lama pengiriman?" />}
              isOpen
            >
              <AccordionItem>
                <Typography variant="t2" color={Color.gray[700]}>
                  Rata-rata 2-3 hari kerja untuk area Jabodetabek.
                </Typography>
              </AccordionItem>
            </Accordion>
          </AccordionItem>
        </Accordion>
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
