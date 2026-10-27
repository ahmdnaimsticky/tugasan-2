/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DialogueSegment {
  id: number;
  character: 'Pencerita' | 'Sang Kerbau' | 'Sang Buaya' | 'Sang Kancil';
  characterRole: string;
  timeStart: number; // in seconds
  timeEnd: number;   // in seconds
  stageDirection?: string;
  text: string;
  intonationTip: string;
  focusVocab?: { word: string; meaning: string }[];
}

export const AUTHENTIC_AUDIO_PATH = '/assets/aistudio/WhatsApp_Audio_2026-10-24_at_9.51.05_AM_84fb7cb2.mpeg';

export const STORY_TITLE = 'Kisah Sang Kancil, Sang Kerbau dan Sang Buaya';

export const STORY_SEGMENTS: DialogueSegment[] = [
  {
    id: 1,
    character: 'Pencerita',
    characterRole: 'Pengenalan Latar Hutan & Watak Kerbau',
    timeStart: 0,
    timeEnd: 14,
    stageDirection: 'Nada tenang, lancar dan berirama',
    text: 'Pada suatu hari, di sebuah hutan yang indah dan dekat dengan sebatang sungai, hidup seekor kerbau yang baik hati. Tiba-tiba, Sang Kerbau mendengar suara rintihan meminta tolong.',
    intonationTip: 'Gunakan nada penceritaan yang tenang dan jelas. Naikkan intonasi sedikit pada perkataan "Tiba-tiba" untuk membina rasa ingin tahu.',
    focusVocab: [
      { word: 'Rintihan', meaning: 'Bunyi mengaduh kesakitan atau kesedihan yang perlahan' },
      { word: 'Baik hati', meaning: 'Sifat suka menolong dan bersimpati terhadap kesusahan orang lain' }
    ]
  },
  {
    id: 2,
    character: 'Sang Buaya',
    characterRole: 'Terhimpit di bawah batang kayu besar',
    timeStart: 14,
    timeEnd: 18,
    stageDirection: 'Merayu dalam kesakitan',
    text: 'Tolong aku, Sang Kerbau! Tolong!',
    intonationTip: 'Sebut dengan nada memohon, lesu dan penuh penderitaan agar pendengar bersimpati.',
    focusVocab: [
      { word: 'Merayu', meaning: 'Memohon dengan kata-kata yang lembut dan menyentuh hati' }
    ]
  },
  {
    id: 3,
    character: 'Sang Kerbau',
    characterRole: 'Mencari punca suara rintihan',
    timeStart: 18,
    timeEnd: 24,
    stageDirection: 'Terkejut sambil mencari arah suara',
    text: 'Di mana engkau? Oh, Sang Buaya! Apa yang telah berlaku kepada engkau?',
    intonationTip: 'Intonasi menyoal yang bernada prihatin dan agak terperanjat menemui buaya.',
  },
  {
    id: 4,
    character: 'Sang Buaya',
    characterRole: 'Meminta tolong mengalihkan pokok tumbang',
    timeStart: 24,
    timeEnd: 38,
    stageDirection: 'Menjelaskan keadaan dalam kesakitan',
    text: 'Engkau tidak nampakkah? Aku dihempap oleh batang pokok yang besar ini. Aku tidak dapat bergerak. Tolonglah alihkan batang pokok ini dari badanku!',
    intonationTip: 'Tekankan perkataan "dihempap" dan minta simpati dengan nada merayu.',
    focusVocab: [
      { word: 'Dihempap', meaning: 'Ditindih atau ditimpa oleh sesuatu benda yang berat' },
      { word: 'Alihkan', meaning: 'Pindahkan ke tempat lain' }
    ]
  },
  {
    id: 5,
    character: 'Sang Kerbau',
    characterRole: 'Membantu dengan ikhlas menggunakan tanduknya',
    timeStart: 38,
    timeEnd: 45,
    stageDirection: 'Menunjukkan rasa belas kasihan',
    text: 'Kasihan melihat keadaan engkau. Baiklah, aku akan cuba tolong.',
    intonationTip: 'Gunakan nada jujur, tulus dan sedia berkorban tenaga.',
    focusVocab: [
      { word: 'Kasihan', meaning: 'Rasa belas dan simpati terhadap penderitaan makhluk lain' }
    ]
  },
  {
    id: 6,
    character: 'Sang Buaya',
    characterRole: 'Menerkam kaki kerbau sebaik sahaja bebas',
    timeStart: 45,
    timeEnd: 55,
    stageDirection: 'Setelah bebas, tiba-tiba menerkam dan menggigit kaki Sang Kerbau',
    text: 'Ha! Terima kasih kerana menolong aku, Sang Kerbau. Sekarang aku sangat lapar, aku mahu makan engkau!',
    intonationTip: 'Mulakan dengan gelak sinis yang kasar, kemudian nada bertukar menjadi bengis dan mengugut.',
    focusVocab: [
      { word: 'Menerkam', meaning: 'Melompat untuk menangkap atau menyerang dengan pantas' },
      { word: 'Khianat', meaning: 'Perbuatan membalas kebaikan dengan kejahatan / mungkir janji' }
    ]
  },
  {
    id: 7,
    character: 'Sang Kerbau',
    characterRole: 'Terkejut dan meronta-ronta kesakitan',
    timeStart: 55,
    timeEnd: 62,
    stageDirection: 'Meronta-ronta ketakutan',
    text: 'Mengapa engkau berbuat begini? Bukankah aku telah menyelamatkan engkau?',
    intonationTip: 'Nada tidak percaya, bergetar kerana kecewa ditipu dan kesakitan digigit.',
    focusVocab: [
      { word: 'Meronta-ronta', meaning: 'Bergerak ke sana ke mari dengan kuat untuk melepaskan diri' }
    ]
  },
  {
    id: 8,
    character: 'Sang Buaya',
    characterRole: 'Mementingkan diri sendiri tanpa rasa malu',
    timeStart: 62,
    timeEnd: 68,
    stageDirection: 'Bongkak dan dingin',
    text: 'Peduli apa aku! Aku sudah lama tidak makan!',
    intonationTip: 'Nada kasar, tidak berperikemanusiaan dan tidak tahu malu.',
    focusVocab: [
      { word: 'Peduli apa', meaning: 'Tidak menghiraukan perasaan atau hak orang lain' }
    ]
  },
  {
    id: 9,
    character: 'Sang Kerbau',
    characterRole: 'Menjerit meminta pertolongan haiwan rimba',
    timeStart: 68,
    timeEnd: 73,
    stageDirection: 'Menjerit kuat dalam keputusasaan',
    text: 'Tolong! Tolong selamatkan aku!',
    intonationTip: 'Lontaran suara yang nyaring, cemas dan penuh kecemasan.',
  },
  {
    id: 10,
    character: 'Sang Kancil',
    characterRole: 'Tiba di tempat kejadian dan memerhati situasi',
    timeStart: 73,
    timeEnd: 78,
    stageDirection: 'Tiba-tiba muncul dan melihat keadaan tersebut',
    text: 'Ada apa ini? Mengapa Sang Buaya menangkap kaki Sang Kerbau?',
    intonationTip: 'Nada tenang, bersahaja tetapi penuh dengan perhatian dan akal siasat.',
  },
  {
    id: 11,
    character: 'Sang Kerbau',
    characterRole: 'Menceritakan kronologi kejadian kepada Sang Kancil',
    timeStart: 78,
    timeEnd: 88,
    stageDirection: 'Menceritakan kebenaran dengan sedih',
    text: 'Wahai Sang Kancil, tolonglah aku! Aku telah menyelamatkan Sang Buaya ini dari dihempap batang kayu, tetapi sekarang dia mahu makan aku pula.',
    intonationTip: 'Nada mengadu dan menerangkan perkara sebenar yang dialaminya.',
  },
  {
    id: 12,
    character: 'Sang Kancil',
    characterRole: 'Memulakan strategi cerdik berpura-pura ragu',
    timeStart: 88,
    timeEnd: 99,
    stageDirection: 'Berlagak bijak dan pura-pura tidak percaya',
    text: 'Betulkah begitu? Aku tidak percaya Sang Kerbau yang bongkok ini mampu mengangkat batang kayu yang besar itu. Mana mungkin!',
    intonationTip: 'Nada skeptikal yang dibuat-buat, mengejek sedikit fizikal kerbau untuk memancing ego buaya.',
    focusVocab: [
      { word: 'Bongkok', meaning: 'Badan yang melengkung ke hadapan' },
      { word: 'Mana mungkin', meaning: 'Mustahil atau tidak masuk akal' }
    ]
  },
  {
    id: 13,
    character: 'Sang Buaya',
    characterRole: 'Mempertahankan dakwaannya tanpa sedar helah kancil',
    timeStart: 99,
    timeEnd: 106,
    stageDirection: 'Yakin dan tidak mahu dipersoalkan',
    text: 'Betul, Sang Kancil! Kerbau inilah yang mengangkat batang kayu ini tadi!',
    intonationTip: 'Nada yakin, tegas dan tidak menyangka sedang diperdaya oleh akal kancil.',
  },
  {
    id: 14,
    character: 'Sang Kancil',
    characterRole: 'Mengarahkan rekonstruksi semula tempat kejadian',
    timeStart: 106,
    timeEnd: 121,
    stageDirection: 'Bertindak seperti hakim yang adil',
    text: 'Aku tetap tidak percaya. Sebelum aku buat keputusan siapa yang betul, mari kita buat semula lakonan itu. Letakkan semula batang kayu itu ke atas badan Sang Buaya, baharu aku percaya.',
    intonationTip: 'Nada wibawa, meyakinkan kedua-dua pihak untuk melakukan demonstrasi asal.',
    focusVocab: [
      { word: 'Keputusan', meaning: 'Ketetapan atau penghakiman yang dibuat setelah meneliti fakta' },
      { word: 'Lakonan semula', meaning: 'Melakonkan kembali urutan peristiwa yang telah berlaku' }
    ]
  },
  {
    id: 15,
    character: 'Sang Buaya',
    characterRole: 'Terburu-buru mahu membuktikan kebenaran',
    timeStart: 121,
    timeEnd: 132,
    stageDirection: 'Akur dan mengarahkan kerbau meletakkan kembali kayu',
    text: 'Baiklah! Kerbau, cepat letakkan semula kayu ini di atas badanku supaya Sang Kancil nampak.',
    intonationTip: 'Nada tidak sabar dan sombong kerana merasakan dirinya pasti menang.',
  },
  {
    id: 16,
    character: 'Sang Kancil',
    characterRole: 'Membongkar perangkap kepada Sang Buaya',
    timeStart: 133,
    timeEnd: 139,
    stageDirection: 'Mendedahkan helah kebijaksanaannya',
    text: 'Ha! Sekarang, cuba kamu berdua lepaskan diri atau angkat kayu itu semula!',
    intonationTip: 'Nada gembira, tegas dan penuh kepuasan kerana keadilan telah ditegakkan.',
  },
  {
    id: 17,
    character: 'Sang Buaya',
    characterRole: 'Terhimpit semula dan gagal mengangkat kayu berat itu',
    timeStart: 139,
    timeEnd: 150,
    stageDirection: 'Bertungkus-lumus meronta dan menjerit cemas',
    text: 'Tolong! Beratnya! Tolong aku alihkan kayu ini!',
    intonationTip: 'Nada tersekat-sekat, tercungap-cungap dan memohon pertolongan yang sia-sia.',
    focusVocab: [
      { word: 'Bertungkus-lumus', meaning: 'Berusaha atau berjuang bersungguh-sungguh dengan sepenuh tenaga' }
    ]
  },
  {
    id: 18,
    character: 'Sang Kancil',
    characterRole: 'Menasihati Sang Kerbau tentang integriti dan batas budi',
    timeStart: 150,
    timeEnd: 159,
    stageDirection: 'Tegas menyampaikan pengajaran moral',
    text: 'Jangan, Sang Kerbau! Jangan percaya kepada buaya yang tidak mengenang budi ini. Jom kita tinggalkan dia!',
    intonationTip: 'Nada tegas mendidik, melarang kerbau agar tidak mengulangi kesilapan yang membahayakan diri.',
    focusVocab: [
      { word: 'Tidak mengenang budi', meaning: 'Peribahasa bermaksud tidak tahu membalas jasa atau berterima kasih (kacang lupakan kulit)' }
    ]
  },
  {
    id: 19,
    character: 'Sang Kerbau',
    characterRole: 'Menyatakan kesyukuran dan penghargaan atas kepintaran kancil',
    timeStart: 159,
    timeEnd: 165,
    stageDirection: 'Lega dan berterima kasih',
    text: 'Terima kasih, Sang Kancil. Kepintaran engkau telah menyelamatkan nyawa aku.',
    intonationTip: 'Nada tulus, bersyukur dan merendah diri menerima pertolongan yang adil.',
    focusVocab: [
      { word: 'Kepintaran', meaning: 'Kebijaksanaan berfikir untuk menyelesaikan masalah secara aman dan tuntas' }
    ]
  }
];

export const CHARACTER_PROFILES = [
  {
    name: 'Sang Kancil',
    title: 'Hakim Rimba Yang Cerdik',
    avatar: '🦌',
    image: '/src/assets/images/pzd_kancil_avatar_1792913732462.jpg',
    color: 'emerald',
    description: 'Haiwan kecil yang sangat pintar dan cerdik. Sang Kancil menggunakan akal fikirannya untuk menolong Sang Kerbau tanpa perlu bergaduh secara kasar.',
    traits: ['Sangat Cerdik', 'Adil', 'Bijak Berfikir', 'Suka Menolong']
  },
  {
    name: 'Sang Kerbau',
    title: 'Sahabat Rimba Yang Baik Hati',
    avatar: '🐃',
    image: '/src/assets/images/pzd_kerbau_avatar_1792913732279.jpg',
    color: 'amber',
    description: 'Haiwan gagah yang mempunyai hati yang sangat baik. Sang Kerbau ikhlas menolong sesiapa sahaja, tetapi perlu berhati-hati supaya tidak mudah ditipu.',
    traits: ['Baik Hati', 'Ikhlas', 'Suka Menolong', 'Jujur']
  },
  {
    name: 'Sang Buaya',
    title: 'Haiwan Yang Tidak Mengenang Budi',
    avatar: '🐊',
    image: '/src/assets/images/pzd_buaya_avatar_1792913732534.jpg',
    color: 'rose',
    description: 'Haiwan yang mungkir janji dan tidak tahu berterima kasih. Selepas diselamatkan, dia mahu memakan Sang Kerbau kerana mementingkan diri sendiri.',
    traits: ['Mungkir Janji', 'Tamak', 'Lupa Kebaikan', 'Tidak Berterima Kasih']
  }
];

export const DSKP_INFO = {
  standarKandungan1: '1.3 Bercerita, dan menceritakan perkara yang didengar, ditonton dan dibaca dengan sebutan dan intonasi yang betul.',
  standarPembelajaran1: '1.3.2 Menceritakan sesuatu bahan yang ditonton dengan sebutan dan intonasi yang sesuai.',
  standarKandungan2: 'Membaca dan mengapresiasi karya sastera dan bukan sastera.',
  standarPembelajaran2: 'Membaca dan menganalisis kandungan teks karya sastera, dan karya bukan sastera untuk memberikan respon yang tepat serta menghayati nilai murni yang terkandung di dalamnya.',
  tema: 'Kemasyarakatan dan Integriti',
  konsep5P: [
    {
      nama: 'Penggabungjalinan',
      huraian: 'Menggabungkan kemahiran mendengar (audio drama), bertutur (latihan intonasi bercerita), membaca (analisis skrip sastera), dan tatabahasa secara bersepadu.'
    },
    {
      nama: 'Penyerapan',
      huraian: 'Menyerap nilai integriti, amanah, budi bahasa, pendidikan sivik serta pengetahuan sains alam semulajadi (ekosistem sungai & berat beban).'
    },
    {
      nama: 'Penilaian',
      huraian: 'Pentaksiran Bilik Darjah (PBD) formatif melalui skor kuiz interaktif, semakan kriteria bercerita (sebutan, intonasi, penghayatan), dan kad pelaporan digital.'
    },
    {
      nama: 'Pemulihan',
      huraian: 'Bantuan petunjuk kontekstual dan modul pemulihan khas dengan soalan berpandu sekiranya murid belum menguasai tahap minima 80%.'
    },
    {
      nama: 'Pengayaan',
      huraian: 'Cabaran pemikiran aras tinggi (KBAT) untuk mencipta akhir cerita alternatif, mengarang pantun integriti, dan menganalisis dilema moral masyarakat.'
    }
  ]
};
