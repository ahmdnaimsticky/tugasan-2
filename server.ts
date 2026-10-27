import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google GenAI client per skill guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const REMEDIAL_SYSTEM_INSTRUCTION = `Anda ialah "Cikgu Kancil", pembimbing pemulihan peribadi yang sangat bijaksana, penyayang, lemah lembut dan mesra murid Sekolah Rendah Tahun 4 (KSSR Semakan Bahasa Melayu).
Watak anda diilhamkan daripada animasi 3D cerita rakyat tersohor "Pada Zaman Dahulu".
Peranan utama anda: Membimbing murid dalam aktiviti Pemulihan (Konsep 5P: Pemulihan) untuk karya sastera tradisional "Kisah Sang Kancil, Sang Kerbau dan Sang Buaya".

Panduan Pedagogi Pemulihan:
1. Gunakan Bahasa Melayu baku yang mudah, mesra kanak-kanak, berirama dan penuh kata-kata perangsang (contoh: "Wah, bagus sekali soalan adik!", "Bagus usahamu, mari Cikgu Kancil bantu satu demi satu!").
2. Kaedah Scaffolding & Sokratik: Jangan terus memberi jawapan akhir. Berikan klu logik, petunjuk visual, atau bayangan aksi watak Sang Kancil, Sang Kerbau atau Sang Buaya agar murid berfikir sendiri.
3. Terangkan kosa kata mencabar dengan perumpamaan rimba (cth: "terhimpit", "keluh-kesah", "mungkir janji", "helah", simpulan bahasa "kacang lupakan kulit").
4. Beri panduan intonasi suara apabila murid perlu membaca atau melakonkan dialog (cth: "Sang Buaya perlu bernada merayu dahulu, kemudian garang!").
5. Terapkan nilai sivik integriti: balas budi dengan kebaikan, tepati janji, bantu jiran, dan jangan sesekali menganiaya sahabat.
6. Formatkan jawapan pendek, kemas (2–3 perenggan padat), gunakan senarai bernombor atau poin jika memberi langkah, dan selitkan emoji bertemakan rimba 🌿🪵🦌⚖️.`;

// Remedial Multi-turn Chat API
app.post('/api/chat/remedial', async (req, res) => {
  try {
    const { messages, stageContext } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Mesej perbualan diperlukan.' });
    }

    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.text || '';

    // If GEMINI_API_KEY is present, attempt live Gemini API call
    if (process.env.GEMINI_API_KEY) {
      try {
        const contents = messages.map((m: { role: string; text: string }) => ({
          role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
          parts: [{ text: m.text }],
        }));

        let activeSystemInstruction = REMEDIAL_SYSTEM_INSTRUCTION;
        if (stageContext) {
          activeSystemInstruction += `\n\nKonteks Pembelajaran Murid: Murid sedang berada di ${stageContext}.`;
        }

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: contents,
          config: {
            systemInstruction: activeSystemInstruction,
            temperature: 0.7,
          },
        });

        if (response.text) {
          return res.json({ reply: response.text });
        }
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, deploying pedagogical fallback:', geminiError?.message || geminiError);
      }
    }

    // Contextual Pedagogical Remedial Engine for Cikgu Kancil
    const q = lastUserMessage.toLowerCase();
    let reply = '';

    if (q.includes('kacang') || q.includes('kulit') || q.includes('simpulan bahasa') || q.includes('maksud')) {
      reply = `Wahai anak didik yang pintar! 🌿\n\nSimpulan bahasa **"Kacang Lupakan Kulit"** bermaksud **orang yang tidak tahu mengenang jasa atau melupakan pertolongan orang yang telah membantunya**.\n\nDalam kisah ini, **Sang Buaya** merayu meminta tolong semasa ditimpa batang pokok. Namun setelah diselamatkan oleh **Sang Kerbau**, Sang Buaya bukannya berterima kasih, malah menggigit kaki Sang Kerbau! Itulah contoh sikap yang tidak berintegriti dan wajar dijauhi. Ingat, *hutang emas boleh dibayar, hutang budi dibawa mati*! 🥜✨`;
    } else if (q.includes('gigit') || q.includes('kaki') || q.includes('buaya') && q.includes('kerbau')) {
      reply = `Soalan yang sangat bernas! 🐊\n\nSang Buaya bertindak menggigit kaki Sang Kerbau kerana sikap **tamak, tidak amanah, dan menurut hawa nafsunya yang lapar**. Walaupun Sang Kerbau telah bersusah payah mengangkat batang kayu yang menghimpitnya, Sang Buaya melupakan perjanjian dan janji asalnya.\n\nSebab itulah Sang Kancil bertindak sebagai hakim yang adil untuk membela Sang Kerbau yang ikhlas berbuat baik! 🦌⚖️`;
    } else if (q.includes('intonasi') || q.includes('suara') || q.includes('baca') || q.includes('lakon')) {
      reply = `Mari Cikgu Kancil latih adik melafazkan intonasi watak yang memikat hati juri! 🎭\n\n1. **Sang Kerbau (Cemas & Ikhlas):** Nada suara mendalam, sedikit bergetar dan cemas:\n*"Aduh, tolonglah aku, Sang Kancil! Bukankah aku yang membantunya tadi?"*\n\n2. **Sang Buaya (Garang & Menuntut):** Nada garau, tegas dan berniat jahat:\n*"Aku sangat lapar! Kaki engkau ini memang rezekiku hari ini!"*\n\n3. **Sang Kancil (Tenang & Penuh Muslihat):** Nada bersahaja, lembut dan meyakinkan:\n*"Bertenang sahabat-sahabatku. Biar aku teliti duduk perkaranya dari awal dahulu."*\n\nCuba adik tiru gaya ini sekarang! 🌟`;
    } else if (q.includes('helah') || q.includes('hakim') || q.includes('kancil') || q.includes('mahkamah') || q.includes('selesai')) {
      reply = `Kebijaksanaan Sang Kancil adalah melalui **rekonstruksi logik tanpa kekerasan**! ⚖️🪵\n\nSang Kancil berpura-pura tidak percaya cerita Sang Kerbau dan Sang Buaya. Dia meminta kedua-duanya melakonkan semula keadaan asal kejadian. Apabila Sang Buaya baring semula dan Sang Kerbau meletakkan batang kayu ke belakang badannya, Sang Buaya terhimpit seperti sedia kala.\n\nSaat itulah Sang Kancil menasihati Sang Kerbau agar terus berlalu pergi. Akhirnya keadilan tertegak dan Sang Buaya mendapat pengajaran setimpal!`;
    } else if (q.includes('tolong') || q.includes('kenapa') && q.includes('pokok') || q.includes('kayu')) {
      reply = `Sang Kerbau menolong Sang Buaya kerana dia mempunyai sifat **belas kasihan dan suka membantu** sesama makhluk rimba. 🐂❤️\n\nNamun, pengajaran penting di sini ialah: **berbuat baik hendaklah sentiasa berwaspada**. Jangan biarkan kebaikan dan kejujuran kita dimanfaatkan oleh golongan yang berniat serong!`;
    } else if (q.includes('uji') || q.includes('soalan') || q.includes('kuiz')) {
      reply = `Wah, bersemangat sungguh adik! Mari Cikgu Kancil uji kefahaman adik dengan 1 soalan pemulihan mudah: ⭐\n\n**Soalan:**\n*Apakah sifat murni yang ditunjukkan oleh Sang Kerbau pada permulaan cerita, dan apakah simpulan bahasa bagi sikap Sang Buaya?*\n\nCuba adik jawab di ruang perbualan ini! Cikgu Kancil akan semak jawapan adik. 🌿📝`;
    } else {
      reply = `Wahai sahabat cilik yang baik hati! 🌿 Cikgu Kancil mendengar soalan adik dengan teliti.\n\nDalam kisah rimba ini, tiga perkara utama yang perlu adik kuasai ialah:\n1. **Kronologi Cerita:** Buaya terhimpit ➔ Kerbau tolong angkat kayu ➔ Buaya gigit kaki ➔ Kancil jadi hakim lakonan semula ➔ Kerbau selamat.\n2. **Kosa Kata & Simpulan Bahasa:** "Kacang lupakan kulit", "terhimpit", "mungkir janji".\n3. **Nilai Murni:** Menghargai budi, tolong-menolong sesama jiran, dan menggunakan akal fikiran yang tenang menyelesaikan masalah.\n\nApakah bahagian khusus yang adik perlukan bantuan pemulihan lagi? 🦌✨`;
    }

    return res.json({ reply });
  } catch (error: any) {
    console.error('Error in /api/chat/remedial:', error);
    return res.status(500).json({
      error: error?.message || 'Ralat perkhidmatan Cikgu Kancil AI.',
      fallbackReply: 'Sahabat cilikku, Cikgu Kancil sedang meneliti jejak di rimba. Jangan putus asa! Ingatlah peribahasa: "Di mana ada kemahuan, di situ ada jalan". Cuba tanyakan soalan adik sekali lagi ya! 🌿'
    });
  }
});

// Server setup for dev and production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, () => {
    console.log(`Cikgu Kancil Server is running at http://localhost:${port}`);
  });
}

startServer();
