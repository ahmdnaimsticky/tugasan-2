/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Questions and activities for Game 1 (Kendiri), Game 2 (Berkumpulan), and Game 3 (Kritis PBL)

export interface StorySequenceItem {
  id: string;
  order: number;
  text: string;
  audioSegmentId: number;
  hint: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
  learningStandard: string;
  kbatLevel: 'Rendah' | 'Sederhana' | 'Tinggi (KBAT)';
  audioSegmentId?: number;
}

// ================= GAME 1: PEMBELAJARAN KENDIRI =================

// Level 1: Susun Babak Cerita mengikut Kronologi
export const STORY_SEQUENCE_LEVEL: StorySequenceItem[] = [
  {
    id: 'seq-1',
    order: 1,
    text: 'Sang Kerbau mendengar rintihan dan melihat Sang Buaya dihempap oleh batang pokok yang besar di tepi sungai.',
    audioSegmentId: 1,
    hint: 'Peristiwa ini berlaku pada permulaan cerita semasa Sang Kerbau sedang bersiar-siar di hutan.'
  },
  {
    id: 'seq-2',
    order: 2,
    text: 'Sang Kerbau berasa kasihan lalu mengangkat batang pokok menggunakan tanduknya untuk menyelamatkan Sang Buaya.',
    audioSegmentId: 5,
    hint: 'Sang Kerbau menggunakan kekuatannya untuk menolong Sang Buaya yang merayu kesakitan.'
  },
  {
    id: 'seq-3',
    order: 3,
    text: 'Sebaik sahaja bebas, Sang Buaya bertindak khianat dengan menerkam dan menggigit kaki Sang Kerbau kerana kelaparan.',
    audioSegmentId: 6,
    hint: 'Sang Buaya tidak mengenang budi dan memungkiri janjinya kerana mementingkan perutnya sendiri.'
  },
  {
    id: 'seq-4',
    order: 4,
    text: 'Sang Kancil muncul lalu berpura-pura tidak percaya bahawa kerbau mampu mengangkat kayu seberat itu.',
    audioSegmentId: 12,
    hint: 'Sang Kancil menggunakan akal cerdiknya dengan meragui cerita tersebut untuk memerangkap buaya.'
  },
  {
    id: 'seq-5',
    order: 5,
    text: 'Sang Buaya bersetuju untuk melakonkan semula peristiwa itu dan membiarkan batang pokok diletakkan kembali ke atas badannya.',
    audioSegmentId: 15,
    hint: 'Ego dan sifat sombong Sang Buaya menyebabkan dia masuk ke dalam perangkap Sang Kancil.'
  },
  {
    id: 'seq-6',
    order: 6,
    text: 'Sang Kancil mengajak Sang Kerbau meninggalkan Sang Buaya yang terhimpit semula sebagai balasan atas perbuatannya.',
    audioSegmentId: 18,
    hint: 'Akhir cerita di mana keadilan ditegakkan dan Sang Kerbau terselamat daripada bahaya.'
  }
];

// Level 2: Kosa Kata & Pemahaman Teks
export const VOCAB_QUESTIONS: QuizQuestion[] = [
  {
    id: 'voc-1',
    question: 'Apakah maksud perkataan "dihempap" dalam dialog Sang Buaya?',
    options: [
      'Dihanyutkan oleh arus sungai yang deras',
      'Ditindih atau ditimpa oleh sesuatu benda yang berat',
      'Dikejar oleh pemangsa yang ganas',
      'Dihalang oleh batu-batu kerikil'
    ],
    correctAnswer: 1,
    explanation: 'Perkataan "dihempap" bermaksud ditimpa atau ditindih oleh objek berat, seperti batang pokok yang menimpa badan Sang Buaya.',
    hint: 'Fikirkan kedudukan batang pokok yang menekan badan Sang Buaya hingga dia tidak dapat bergerak.',
    learningStandard: 'Membaca dan menganalisis kandungan teks',
    kbatLevel: 'Rendah',
    audioSegmentId: 4
  },
  {
    id: 'voc-2',
    question: 'Mengapakah Sang Kerbau "meronta-ronta" setelah diserang oleh Sang Buaya?',
    options: [
      'Kerana Sang Kerbau mahu bermain air di sungai',
      'Kerana Sang Kerbau berasa geli di kakinya',
      'Kerana Sang Kerbau berusaha kuat melepaskan diri daripada gigitan Sang Buaya yang menyakitkan',
      'Kerana Sang Kerbau memanggil kawan-kawannya untuk makan rumput'
    ],
    correctAnswer: 2,
    explanation: '"Meronta-ronta" merujuk kepada pergerakan tubuh yang bersungguh-sungguh untuk melepaskan diri daripada cengkaman bahaya.',
    hint: 'Bayangkan perasaan cemas Sang Kerbau apabila kakinya digigit oleh buaya yang ganas.',
    learningStandard: 'Membaca dan menganalisis kandungan teks',
    kbatLevel: 'Sederhana',
    audioSegmentId: 7
  },
  {
    id: 'voc-3',
    question: 'Apakah simpulan bahasa yang paling tepat untuk menggambarkan watak Sang Buaya?',
    options: [
      'Kacang lupakan kulit (tidak tahu mengenang budi)',
      'Hati batu (sangat degil)',
      'Kaki ayam (tidak memakai alas kaki)',
      'Ringan tulang (rajin bekerja)'
    ],
    correctAnswer: 0,
    explanation: 'Sang Buaya diibaratkan seperti "kacang lupakan kulit" kerana dia membalas kebaikan Sang Kerbau yang menyelamatkannya dengan perbuatan khianat.',
    hint: 'Peribahasa ini digunakan untuk orang yang melupakan pertolongan orang lain setelah senang atau selamat.',
    learningStandard: 'Mengapresiasi karya sastera & nilai murni',
    kbatLevel: 'Sederhana',
    audioSegmentId: 6
  },
  {
    id: 'voc-4',
    question: 'Frasa "bertungkus-lumus" dalam skrip menunjukkan bahawa Sang Buaya...',
    options: [
      'Berenang dengan tenang di tengah sungai',
      'Berusaha sekuat tenaga dengan bersungguh-sungguh untuk mengangkat kayu',
      'Berehat dan tidur di bawah pohon rendang',
      'Mencari makanan lain bersama Sang Kancil'
    ],
    correctAnswer: 1,
    explanation: '"Bertungkus-lumus" membawa maksud bekerja atau berusaha keras dengan sepenuh tenaga untuk mencapai sesuatu.',
    hint: 'Perhatikan usaha Sang Buaya semasa cuba menolak kembali batang kayu yang berat itu.',
    learningStandard: 'Kosa kata kontekstual',
    kbatLevel: 'Rendah',
    audioSegmentId: 17
  }
];

// Level 3: Analisis Nilai Murni, Integriti & Kemasyarakatan (Sivik)
export const MORAL_QUESTIONS: QuizQuestion[] = [
  {
    id: 'mor-1',
    question: 'Apakah nilai murni yang ditunjukkan oleh Sang Kerbau pada permulaan cerita?',
    options: [
      'Keberanian berlawan dengan musuh di sungai',
      'Keprihatinan dan baik hati membantu makhluk yang sedang menderita',
      'Kebijaksanaan membuat tipu muslihat dalam hutan',
      'Sifat berjimat-cermat menyimpan makanan'
    ],
    correctAnswer: 1,
    explanation: 'Sang Kerbau menunjukkan nilai prihatin dan baik hati kerana segera menghulurkan bantuan apabila mendengar rintihan Sang Buaya.',
    hint: 'Apakah tindakan Sang Kerbau apabila mendengar rintihan meminta tolong?',
    learningStandard: 'Menghayati nilai murni dalam karya sastera',
    kbatLevel: 'Sederhana',
    audioSegmentId: 5
  },
  {
    id: 'mor-2',
    question: 'Mengapakah perbuatan Sang Buaya bertentangan dengan prinsip integriti masyarakat?',
    options: [
      'Kerana dia tinggal di dalam air sungai yang keruh',
      'Kerana dia tidak memelihara kebersihan hutan simpan',
      'Kerana dia mengkhianati amanah, melanggar janji dan tidak tahu berterima kasih',
      'Kerana suaranya terlalu kuat mengganggu ketenteraman rimba'
    ],
    correctAnswer: 2,
    explanation: 'Integriti menuntut seseorang untuk bersikap jujur, amanah, dan menepati janji. Perbuatan Sang Buaya memungkiri janji dan membalas kebaikan dengan kejahatan adalah pelanggaran integriti yang serius.',
    hint: 'Integriti berkaitan dengan sifat jujur, amanah, dan memegang janji.',
    learningStandard: 'Analisis nilai murni dan integriti',
    kbatLevel: 'Tinggi (KBAT)',
    audioSegmentId: 8
  },
  {
    id: 'mor-3',
    question: 'Bagaimanakah kepintaran Sang Kancil dapat kita contohi dalam kehidupan seharian?',
    options: [
      'Menyelesaikan perselisihan faham secara aman dan berfikir dengan tenang sebelum bertindak',
      'Mengenakan denda yang tinggi kepada rakan sekelas',
      'Menggunakan kekerasan fizikal untuk mengalahkan mereka yang kuat',
      'Melarikan diri apabila melihat orang lain dalam kesusahan'
    ],
    correctAnswer: 0,
    explanation: 'Sang Kancil mengajar kita menyelesaikan masalah secara berhemah menggunakan fikiran yang bijak dan logik tanpa perlu bertindak ganas.',
    hint: 'Sang Kancil tidak bergaduh dengan Sang Buaya, sebaliknya menggunakan kebijaksanaan.',
    learningStandard: 'Respon tepat & apresiasi sastera',
    kbatLevel: 'Tinggi (KBAT)',
    audioSegmentId: 14
  },
  {
    id: 'mor-4',
    question: 'Jika anda berada di tempat Sang Kerbau, apakah iktibar yang anda peroleh daripada peristiwa ini?',
    options: [
      'Kita tidak boleh menolong sesiapa pun lagi pada masa hadapan',
      'Kita wajar menolong orang dengan ikhlas, tetapi perlu sentiasa berwaspada dan bijak menilai keselamatan diri',
      'Kita patut membalas dendam dengan memukul Sang Buaya beramai-ramai',
      'Kita patut berpindah ke hutan lain yang tiada sungai'
    ],
    correctAnswer: 1,
    explanation: 'Iktibar penting ialah berbuat baik mesti disertai kewaspadaan (buat baik berpada-pada) agar kebaikan kita tidak dieksploitasi oleh pihak yang berniat jahat.',
    hint: 'Fikirkan peribahasa "buat baik berpada-pada, buat jahat jangan sekali".',
    learningStandard: 'Menghayati nilai murni & iktibar',
    kbatLevel: 'Tinggi (KBAT)',
    audioSegmentId: 18
  }
];

// ================= GAME 2: PEMBELAJARAN BERKUMPULAN =================

export interface GroupStation {
  id: number;
  name: string;
  badge: string;
  title: string;
  objective: string;
  instruction: string;
}

export const GROUP_STATIONS: GroupStation[] = [
  {
    id: 1,
    name: 'Stesen 1',
    badge: '🎙️',
    title: 'Lakon Suara & Intonasi Bergilir (DSKP 1.3.2)',
    objective: 'Membaca dan melakonkan dialog mengikut watak dengan sebutan baku dan intonasi yang tepat.',
    instruction: 'Setiap ahli kumpulan memilih satu watak (Pencerita, Sang Kerbau, Sang Buaya, Sang Kancil). Dengar rakaman asal, kemudian bergilir-gilir membacakan dialog dengan emosi yang betul!'
  },
  {
    id: 2,
    name: 'Stesen 2',
    badge: '🧩',
    title: 'Teka Peribahasa & Simpulan Bahasa Rimba',
    objective: 'Memadankan situasi dalam cerita dengan peribahasa Melayu yang tepat bersama rakan sekumpulan.',
    instruction: 'Bincang bersama pasukan dan pilih simpulan bahasa atau peribahasa yang paling tepat bagi setiap situasi cerita.'
  },
  {
    id: 3,
    name: 'Stesen 3',
    badge: '🤝',
    title: 'Susun Ikrar Integriti Kemasyarakatan',
    objective: 'Bekerjasama menyusun blok perkataan menjadi prinsip moral dan integriti hidup bermasyarakat.',
    instruction: 'Susun kad-kad perkataan yang berselerak menjadi ayat ikrar integriti yang bermakna bagi warga sekolah dan masyarakat.'
  },
  {
    id: 4,
    name: 'Stesen 4',
    badge: '⚡',
    title: 'Kuiz Pantas Strategi Pasukan Rimba',
    objective: 'Menjawab cabaran soalan fakta dan pemikiran pantas untuk mengumpul mata kejuaraan kumpulan.',
    instruction: 'Setiap pasukan berbincang dalam masa 30 saat untuk memilih satu jawapan sebulat suara.'
  }
];

export const GROUP_STATION_2_PUZZLES = [
  {
    situation: 'Sang Buaya melupakan pertolongan Sang Kerbau yang telah bersusah-payah mengangkat batang pokok dari badannya.',
    correctProverb: 'Bagai kacang lupakan kulit',
    meaning: 'Orang yang tidak tahu mengenang jasa atau budi orang yang pernah membantunya.',
    options: [
      'Bagai kacang lupakan kulit',
      'Bagai aur dengan tebing',
      'Ada udang di sebalik batu',
      'Ukur baju di badan sendiri'
    ]
  },
  {
    situation: 'Sang Kancil tidak menggunakan tenaga fizikal, sebaliknya menggunakan helah yang sangat cerdik untuk memperdaya Sang Buaya.',
    correctProverb: 'Akal kancil',
    meaning: 'Tipu daya atau kepintaran luar biasa untuk menyelesaikan sesuatu masalah yang rumit.',
    options: [
      'Akal kancil',
      'Berat mulut',
      'Makan angin',
      'Ringan tulang'
    ]
  },
  {
    situation: 'Sang Kerbau yang berniat murni menyelamatkan Sang Buaya hampir menjadi mangsa gigitan buaya yang tamak.',
    correctProverb: 'Buat baik berpada-pada, buat jahat jangan sekali',
    meaning: 'Membuat kebaikan biarlah berhati-hati dan ada batasnya agar tidak membawa mudarat kepada diri sendiri.',
    options: [
      'Buat baik berpada-pada, buat jahat jangan sekali',
      'Sediakan payung sebelum hujan',
      'Air dicencang tidak akan putus',
      'Harimau mati meninggalkan belang'
    ]
  },
  {
    situation: 'Penduduk rimba saling memerlukan antara satu sama lain untuk hidup aman dan harmoni di tepi sungai.',
    correctProverb: 'Bagai aur dengan tebing',
    meaning: 'Hubungan masyarakat yang rapat dan sentiasa tolong-menolong antara satu sama lain.',
    options: [
      'Bagai aur dengan tebing',
      'Bagai isi dengan kuku',
      'Seperti kera mendapat bunga',
      'Masuk kandang kambing mengembek'
    ]
  }
];

export const GROUP_STATION_3_TASKS = [
  {
    id: 'ikrar-1',
    scrambled: ['Budi', 'dikenang,', 'yang', 'dijunjung,', 'baik', 'khianat', 'janganlah', 'sekali.'],
    correctOrder: ['Budi', 'yang', 'baik', 'dikenang,', 'janganlah', 'sekali', 'khianat', 'dijunjung.'],
    meaning: 'Prinsip menghargai jasa sesama manusia dan menjauhi sifat khianat.'
  },
  {
    id: 'ikrar-2',
    scrambled: ['Integriti', 'asas', 'keharmonian', 'hidup', 'bermasyarakat', 'sepanjang', 'zaman.'],
    correctOrder: ['Integriti', 'asas', 'keharmonian', 'hidup', 'bermasyarakat', 'sepanjang', 'zaman.'],
    meaning: 'Kejujuran dan keikhlasan membentuk komuniti yang selamat dan bahagia.'
  }
];

export const GROUP_STATION_4_SPEED_QUIZ = [
  {
    q: 'Apakah alasan yang diberikan oleh Sang Buaya mengapa dia mahu memakan Sang Kerbau?',
    options: ['Kerana Sang Kerbau mengejeknya', 'Kerana dia sudah lama tidak makan dan sangat lapar', 'Kerana Sang Kerbau mematahkan pokok itu', 'Kerana air sungai telah kering'],
    correct: 1
  },
  {
    q: 'Apakah helah pertama yang digunakan oleh Sang Kancil untuk memerangkap semula Sang Buaya?',
    options: ['Mengajak Sang Buaya berlumba lari', 'Berpura-pura tidak percaya Sang Kerbau mampu mengangkat pokok besar itu', 'Membaling batu besar ke dalam sungai', 'Memanggil gajah untuk memijak buaya'],
    correct: 1
  },
  {
    q: 'Mengapakah Sang Buaya mudah terpedaya dengan permintaan Sang Kancil untuk melakonkan semula peristiwa itu?',
    options: ['Kerana Sang Buaya berasa sombong dan ingin membuktikan bahawa dialah yang betul', 'Kerana Sang Buaya sedang mengantuk', 'Kerana Sang Buaya berkawan rapat dengan Sang Kancil', 'Kerana air sungai terlalu sejuk'],
    correct: 0
  }
];

// ================= GAME 3: MAHKAMAH SANG KANCIL (BERFIKIRAN KRITIS & PBL) =================

export interface PBLInvestigationStage {
  stageNumber: number;
  title: string;
  phaseName: string; // e.g., 'Kenal Pasti Masalah', 'Analisis Bukti', 'Uji Hipotesis', 'Keputusan Integriti'
  scenario: string;
  criticalChallenge: string;
  evidenceItems: {
    title: string;
    description: string;
    relevance: string;
    audioSegmentId?: number;
  }[];
  options: {
    text: string;
    isCorrect: boolean;
    analysisFeedback: string;
  }[];
}

export const PBL_STAGES: PBLInvestigationStage[] = [
  {
    stageNumber: 1,
    title: 'Siasatan 1: Meneliti Aduan & Mengenal Pasti Masalah Utama',
    phaseName: 'Mengenal Pasti Masalah',
    scenario: 'Sang Kancil tiba di tebing sungai dan mendapati Sang Buaya sedang menggigit kaki Sang Kerbau. Sang Kerbau mendakwa dia diserang setelah menyelamatkan buaya, manakala Sang Buaya menyatakan dia berhak makan kerana kelaparan.',
    criticalChallenge: 'Sebagai Pembantu Hakim Sang Kancil, apakah masalah besar yang mesti diselesaikan dalam pertikaian ini?',
    evidenceItems: [
      {
        title: 'Laporan Saksi (Sang Kerbau)',
        description: 'Kerbau menolong mengalihkan kayu dengan tanduknya atas dasar belas kasihan.',
        relevance: 'Bukti niat murni dan tindakan kebajikan.',
        audioSegmentId: 11
      },
      {
        title: 'Pengakuan Tertuduh (Sang Buaya)',
        description: '"Peduli apa aku! Aku sudah lama tidak makan!"',
        relevance: 'Bukti perlanggaran hak asasi makhluk lain dan sikap memungkiri budi pekerti.',
        audioSegmentId: 8
      }
    ],
    options: [
      {
        text: 'Masalah sebenar ialah ketiadaan rumput hijau untuk makanan kerbau di tepi sungai.',
        isCorrect: false,
        analysisFeedback: 'Tidak tepat. Isu rumput tiada kaitan langsung dengan konflik gigitan buaya terhadap kerbau.'
      },
      {
        text: 'Masalah besar ialah perbuatan mungkir janji dan tidak mengenang budi oleh Sang Buaya terhadap penyelamatnya, mengancam nyawa Sang Kerbau yang tidak bersalah.',
        isCorrect: true,
        analysisFeedback: 'Tepat sekali! Masalah utama berkisar pada integriti moral: buaya membalas budi baik dengan ancaman maut.'
      },
      {
        text: 'Masalah besar ialah batang pokok itu telah patah kerana ditiup angin kencang.',
        isCorrect: false,
        analysisFeedback: 'Kurang tepat. Pokok tumbang adalah latar punca kejadian, tetapi pertikaian undang-undang rimba berlaku kerana sikap khianat buaya.'
      }
    ]
  },
  {
    stageNumber: 2,
    title: 'Siasatan 2: Memilih Strategi Pembuktian Tanpa Keganasan',
    phaseName: 'Menganalisis & Merangka Hipotesis Strategi',
    scenario: 'Sang Kancil bertubuh kecil. Jika Sang Kancil cuba melawan Sang Buaya secara fizikal atau menarik kaki kerbau, dia dan kerbau mungkin akan tercedera parah kerana kekuatan rahang buaya.',
    criticalChallenge: 'Mengapakah strategi "Pura-pura Tidak Percaya & Lakonan Semula" oleh Sang Kancil adalah jalan penyelesaian paling kritis dan bijak?',
    evidenceItems: [
      {
        title: 'Fizikal Sang Kancil',
        description: 'Tubuh kecil, tangkas tetapi tidak berdaya melawan buaya ganas secara fizikal.',
        relevance: 'Kekerasan bukanlah pilihan yang selamat atau munasabah.'
      },
      {
        title: 'Kelemahan Psikologi Sang Buaya',
        description: 'Sifat sombong, ego tinggi, dan mahu dilihat benar di hadapan haiwan lain.',
        relevance: 'Ego boleh dimanfaatkan untuk membuatkan musuh melakukan kesilapan sendiri.',
        audioSegmentId: 13
      }
    ],
    options: [
      {
        text: 'Kerana dengan berpura-pura ragu, ego Sang Buaya tercabar sehingga dia rela melepaskan gigitan kaki kerbau demi membuktikan kebenaran katanya.',
        isCorrect: true,
        analysisFeedback: 'Tepat dan kritis! Sang Kancil memanfaatkan psikologi buaya: untuk membuktikan dia bercakap benar, buaya terpaksa melepaskan gigitan dan masuk semula ke posisi asal.'
      },
      {
        text: 'Kerana Sang Kancil memang tidak mempercayai kerbau yang bongkok itu.',
        isCorrect: false,
        analysisFeedback: 'Salah. Sang Kancil seorang yang cerdik; dia tahu kerbau itu benar, tetapi dia berhelah demi menyelamatkan kerbau.'
      },
      {
        text: 'Kerana Sang Kancil mahu melengah-lengahkan masa sehingga hujan turun membanjiri tebing.',
        isCorrect: false,
        analysisFeedback: 'Tidak relevan dengan teks cerita. Tiada sebutan mengenai menunggu banjir dalam skrip.'
      }
    ]
  },
  {
    stageNumber: 3,
    title: 'Siasatan 3: Rekonstruksi Tempat Kejadian (Crime Scene Recreation)',
    phaseName: 'Menguji Hipotesis & Perlaksanaan Solusi',
    scenario: 'Sang Buaya telah melepaskan gigitan kaki Sang Kerbau dan mengarahkan kerbau meletakkan semula batang kayu besar ke atas badannya bagi membuktikan peristiwanya.',
    criticalChallenge: 'Apakah tindakan logik yang patut diambil sebaik sahaja kayu diletakkan semula ke atas badan buaya?',
    evidenceItems: [
      {
        title: 'Keadaan Semasa',
        description: 'Batang kayu besar kini menindih semula badan Sang Buaya seperti sedia kala.',
        relevance: 'Buaya kini kehilangan keupayaan menyerang atau mengejar.',
        audioSegmentId: 16
      },
      {
        title: 'Rintihan Buaya Terperangkap',
        description: '"Tolong! Beratnya! Tolong aku alihkan kayu ini!"',
        relevance: 'Membuktikan bahawa tanpa pertolongan ikhlas, buaya sememangnya tidak mampu membebaskan diri.',
        audioSegmentId: 17
      }
    ],
    options: [
      {
        text: 'Sang Kerbau patut terus menolong buaya mengangkat kayu sekali lagi supaya buaya berasa selesa.',
        isCorrect: false,
        analysisFeedback: 'Bahaya! Jika kerbau menolong sekali lagi, buaya yang tidak mengenang budi itu akan menerkamnya semula.'
      },
      {
        text: 'Meninggalkan Sang Buaya di tempat kejadian sebagai hukuman setimpal atas pengkhianatannya dan menyelamatkan diri dengan segera.',
        isCorrect: true,
        analysisFeedback: 'Tepat dan adil! Sang Buaya dikembalikan kepada akibat asal daripada ketidakmampuannya sendiri tanpa dicederakan oleh haiwan lain.'
      },
      {
        text: 'Sang Kancil dan Sang Kerbau tidur di sebelah buaya untuk berkhemah bersama.',
        isCorrect: false,
        analysisFeedback: 'Pilihan yang tidak logik dan membahayakan keselamatan diri.'
      }
    ]
  },
  {
    stageNumber: 4,
    title: 'Siasatan 4: Menjatuhkan Penghakiman Moral & Nilai Kemasyarakatan',
    phaseName: 'Refleksi Integriti & Penilaian Impak Sosial',
    scenario: 'Kes ini ditutup. Sang Kerbau selamat dan mengucapkan terima kasih kepada Sang Kancil, manakala Sang Buaya mendapat pengajaran pahit.',
    criticalChallenge: 'Apakah prinsip integriti masyarakat yang mesti kita amalkan agar insiden seperti ini tidak berlaku dalam kehidupan komuniti kita?',
    evidenceItems: [
      {
        title: 'Ucapan Sang Kerbau',
        description: '"Terima kasih, Sang Kancil. Kepintaran engkau telah menyelamatkan nyawa aku."',
        relevance: 'Menunjukkan adab menghargai jasa dan mengucapkan terima kasih.',
        audioSegmentId: 19
      },
      {
        title: 'Nasihat Sang Kancil',
        description: '"Jangan percaya kepada buaya yang tidak mengenang budi ini."',
        relevance: 'Penegasan terhadap batasan mempercayai golongan yang berulang kali khianat.',
        audioSegmentId: 18
      }
    ],
    options: [
      {
        text: 'Sentiasa menghargai jasa orang lain, memegang amanah janji, dan jangan sekali-kali mengambil kesempatan atas kebaikan sahabat.',
        isCorrect: true,
        analysisFeedback: 'Sempurna! Nilai murni ini menjamin kesejahteraan komuniti di mana setiap individu hidup dengan saling menghormati dan berintegriti tinggi.'
      },
      {
        text: 'Kita harus menipu orang lain sebelum orang lain sempat menipu kita.',
        isCorrect: false,
        analysisFeedback: 'Sangat salah dan bertentangan dengan nilai moral KSSR serta norma kemasyarakatan.'
      },
      {
        text: 'Hanya tolong rakan jika rakan memberi wang ganjaran terlebih dahulu.',
        isCorrect: false,
        analysisFeedback: 'Tidak mencerminkan keikhlasan tolong-menolong yang dianjurkan dalam pendidikan moral/sivik.'
      }
    ]
  }
];

// Pengayaan (Enrichment) KBAT Activity
export const ENRICHMENT_CHALLENGES = [
  {
    id: 'kbat-1',
    title: 'Cipta Pengakhiran Alternatif (Creative Writing)',
    prompt: 'Sekiranya Sang Buaya menyedari kesilapannya dan meminta maaf dengan ikhlas kepada Sang Kerbau sebelum Sang Kancil pergi, apakah yang patut dilakukan oleh Sang Kerbau dan Sang Kancil?',
    guidance: 'Fikirkan konsep kemaafan, keadilan, dan jaminan keselamatan (syarat taubat).'
  },
  {
    id: 'kbat-2',
    title: 'Bina Pantun Empat Kerat: Budi & Integriti',
    prompt: 'Lengkapkan pantun empat kerat ini dengan baris maksud yang bertemakan menghargai budi:',
    lines: [
      'Pohon mengkudu di tepi jeram,',
      'Tempat bersarang burung merpati;',
      'Hutang emas boleh dibayar,',
      'Hutang budi dibawa mati.'
    ],
    moralFocus: 'Nilai budi tidak ternilai harganya dengan wang ringgit.'
  }
];
