import { PdfView } from '@herca/rn-kit';

export default function PdfViewScreen() {
  return (
    <PdfView
      trustAllCerts={false}
      source={{
        uri: 'https://stg.cdn.herca.id/erp-stg-1/upload_attachment/tickets/supporting/47-dokumen-pendukung-68cd2d5424ac8.pdf',
      }}
    />
  );
}
