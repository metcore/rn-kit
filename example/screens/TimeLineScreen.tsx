import { Color, Timeline, TimelineItem, Typography } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

export default function TimeLineScreen() {
  return (
    <DemoScreen
      title="Timeline"
      description="Timeline menampilkan rangkaian peristiwa vertikal; setiap TimelineItem punya bullet dan garis penghubung otomatis."
    >
      <DemoSection
        title="Default"
        note="isLast pada item terakhir menghilangkan garis penghubung di bawahnya."
      >
        <Timeline>
          <TimelineItem>
            <Typography variant="t2" weight="semibold" color={Color.gray[900]}>
              Pesanan dibuat
            </Typography>
            <Typography variant="t3" color={Color.gray[600]}>
              10 Jan 2025, 09.00
            </Typography>
          </TimelineItem>
          <TimelineItem>
            <Typography variant="t2" weight="semibold" color={Color.gray[900]}>
              Sedang dikemas
            </Typography>
            <Typography variant="t3" color={Color.gray[600]}>
              10 Jan 2025, 14.30
            </Typography>
          </TimelineItem>
          <TimelineItem isLast>
            <Typography variant="t2" weight="semibold" color={Color.gray[900]}>
              Dalam pengiriman
            </Typography>
            <Typography variant="t3" color={Color.gray[600]}>
              11 Jan 2025, 08.15
            </Typography>
          </TimelineItem>
        </Timeline>
      </DemoSection>

      <DemoSection
        title="Warna status"
        note="color mengganti warna bullet & garis: primary (default), success, warning, danger, info, purple, atau orange."
      >
        <DemoLabel text='color="success" | "warning" | "danger"' />
        <Timeline>
          <TimelineItem color="success">
            <Typography variant="t2" color={Color.gray[800]}>
              Pembayaran berhasil dikonfirmasi
            </Typography>
          </TimelineItem>
          <TimelineItem color="warning">
            <Typography variant="t2" color={Color.gray[800]}>
              Menunggu verifikasi kurir
            </Typography>
          </TimelineItem>
          <TimelineItem color="danger" isLast>
            <Typography variant="t2" color={Color.gray[800]}>
              Pengiriman gagal, paket dikembalikan
            </Typography>
          </TimelineItem>
        </Timeline>
      </DemoSection>

      <DemoSection
        title="Konten kustom"
        note="children bebas menampung kombinasi teks berlapis atau elemen lain, tidak terbatas satu baris."
      >
        <Timeline>
          <TimelineItem color="info">
            <Typography variant="t2" weight="semibold" color={Color.gray[900]}>
              Tiket #INV-2025-014 dibuka
            </Typography>
            <Typography variant="t3" color={Color.gray[600]}>
              Dilaporkan oleh Rangga Pratama, prioritas tinggi
            </Typography>
          </TimelineItem>
          <TimelineItem color="purple" isLast>
            <Typography variant="t2" weight="semibold" color={Color.gray[900]}>
              Tiket ditutup
            </Typography>
            <Typography variant="t3" color={Color.gray[600]}>
              Diselesaikan oleh tim support dalam 2 jam
            </Typography>
          </TimelineItem>
        </Timeline>
      </DemoSection>
    </DemoScreen>
  );
}
