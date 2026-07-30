import { useState } from 'react';
import { Color, TextEditor, Typography } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoSurface } from '../components/demo';

const MAX_LENGTH = 500;
const EDITOR_HEIGHT = 220;

function truncate(text: string, limit: number) {
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

export default function TextEditorScreen() {
  const [html, setHtml] = useState('');

  const plainTextLength = html.replace(/<[^>]*>/g, '').trim().length;

  return (
    <DemoScreen
      title="Text Editor"
      description="Editor rich text berbasis WebView dengan toolbar format (bold, italic, list, link, alignment) yang muncul otomatis saat fokus."
    >
      <DemoSection
        title="Dasar"
        note="height diset tetap sejak awal. Jangan ubah height secara dinamis (mis. mengikuti tinggi keyboard) karena akan membuat WebView reload dan keyboard tertutup."
      >
        <DemoSurface>
          <TextEditor
            label="Deskripsi"
            placeholder="Tulis deskripsi di sini..."
            height={EDITOR_HEIGHT}
            maxLength={MAX_LENGTH}
            onChange={setHtml}
          />
        </DemoSurface>
        <Typography variant="t3" color={Color.gray[700]}>
          Ketuk area editor untuk memunculkan toolbar mengambang di atas
          keyboard: bold, italic, underline, coret, link, daftar, dan perataan
          teks.
        </Typography>
      </DemoSection>

      <DemoSection
        title="Batas karakter & output"
        note="maxLength membatasi jumlah karakter (dihitung tanpa tag HTML); onChange melaporkan konten HTML mentah setiap perubahan."
      >
        <Typography variant="t3" color={Color.gray[700]}>
          {`${plainTextLength}/${MAX_LENGTH} karakter`}
        </Typography>
        <Typography variant="t3" color={Color.gray[700]}>
          {`Output HTML: ${truncate(html, 80) || '-'}`}
        </Typography>
      </DemoSection>
    </DemoScreen>
  );
}
