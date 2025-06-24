import { Alert, Container } from '@herca/rn-kit';

export default function AlertScreen() {
  return (
    <Container>
      <Alert
        title="Berhasil!"
        message="Data Anda telah disimpan."
        color="success"
      />
      <Alert
        title="Berhasil!"
        message="Data Anda telah disimpan."
        color="info"
      />

      <Alert
        title="Peringatan"
        message="Ada sesuatu yang perlu diperhatikan."
        color="warning"
      />

      <Alert
        title="Peringatan"
        message="Ada sesuatu yang perlu diperhatikan."
        color="danger"
      />
    </Container>
  );
}
