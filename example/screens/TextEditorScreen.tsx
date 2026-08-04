import { useRef, useState } from 'react';
import {
  Button,
  Color,
  Switch,
  TextEditor,
  Typography,
  type TextEditorRef,
} from '@herca/rn-kit';
import { StyleSheet, View } from 'react-native';
import { DemoScreen, DemoSection, DemoSurface } from '../components/demo';

const MAX_LENGTH = 500;
const EDITOR_HEIGHT = 220;

const SAMPLE_HTML =
  '<h2>Judul bagian</h2><p>Paragraf dengan <strong>tebal</strong>, ' +
  '<em>miring</em>, dan <a href="https://herca.id">tautan</a>.</p>' +
  '<ul><li>Poin pertama</li><li>Poin kedua</li></ul>';

function truncate(text: string, limit: number) {
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

export default function TextEditorScreen() {
  const [html, setHtml] = useState('');
  const [showToolbar, setShowToolbar] = useState(true);
  const [readBack, setReadBack] = useState('');

  const editorRef = useRef<TextEditorRef>(null);

  const plainTextLength = html.replace(/<[^>]*>/g, '').trim().length;

  return (
    <DemoScreen
      title="Text Editor"
      description="Editor rich text berbasis WebView dengan toolbar format yang muncul otomatis saat fokus."
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
          keyboard: bold, italic, underline, coret, link, daftar, perataan,
          heading H1–H3, hapus format, serta undo dan redo.
        </Typography>
      </DemoSection>

      <DemoSection
        title="Heading & hapus format"
        note="H1–H3 memakai label teks karena Icon tidak punya glyph heading. Tombol hapus format membersihkan format inline sekaligus mengembalikan heading ke paragraf — removeFormat sendiri tidak menyentuh elemen blok."
      >
        <Typography variant="t3" color={Color.gray[700]}>
          Ketik satu baris, tekan H1, lalu tekan tombol hapus format. Barisnya
          harus kembali jadi paragraf biasa.
        </Typography>
      </DemoSection>

      <DemoSection
        title="Menyembunyikan toolbar"
        note="showToolbar menggerbangi toolbar, bukan memaksanya. false menahannya tetap tersembunyi; true mengembalikan perilaku bawaan. Layar ini berisi empat editor, jadi ia sekaligus memperagakan bahwa toolbar mengikuti editor yang sedang dipakai — mengetik di editor lain tidak memunculkan toolbar milik editor ini."
      >
        <Switch
          label="Tampilkan toolbar"
          value={showToolbar}
          onChange={setShowToolbar}
        />
        <DemoSurface>
          <TextEditor
            label="Catatan singkat"
            placeholder="Editor tanpa toolbar bila dimatikan..."
            height={140}
            showToolbar={showToolbar}
          />
        </DemoSurface>
      </DemoSection>

      <DemoSection
        title="Kontrol lewat ref"
        note="getContent melaporkan HTML lewat onChange; setContent dan clearContent mengubah isi editor dari luar."
      >
        <DemoSurface>
          <TextEditor
            ref={editorRef}
            label="Isi terkontrol"
            placeholder="Pakai tombol di bawah..."
            height={160}
            onChange={setReadBack}
          />
        </DemoSurface>
        <View style={styles.actions}>
          <Button
            title="Isi contoh"
            size="small"
            onPress={() => editorRef.current?.setContent(SAMPLE_HTML)}
          />
          <Button
            title="Baca isi"
            size="small"
            variant="outline"
            onPress={() => editorRef.current?.getContent()}
          />
          <Button
            title="Kosongkan"
            size="small"
            variant="tertiary"
            color="danger"
            onPress={() => editorRef.current?.clearContent()}
          />
        </View>
        <Typography variant="t3" color={Color.gray[700]}>
          {`Terbaca: ${truncate(readBack, 80) || '-'}`}
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

const styles = StyleSheet.create({
  actions: {
    gap: 8,
  },
});
