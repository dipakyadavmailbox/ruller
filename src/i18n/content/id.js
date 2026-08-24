// ID — Indonesian content for the core translated pages. Mirrors the key
// shape of ./en.js exactly; validate.js fails the build on any drift.

export default {
  home: {
    title: 'Alat Online Gratis — Penggaris, Konverter, dan Kalkulator',
    description: 'Kumpulan alat gratis yang berjalan di peramban: penggaris layar terkalibrasi, konverter satuan dan format, utilitas PDF, serta kalkulator kesehatan. Tanpa unggahan.',
    keywords: 'alat online gratis, konverter satuan, penggaris layar, alat pdf, pembuat kode qr, kalkulator kalori',
    h1: 'Alat gratis yang berjalan sepenuhnya di peramban Anda',
    intro: 'Lima belas utilitas presisi untuk desainer, pengembang, dan urusan sehari-hari. Setiap perhitungan terjadi di perangkat Anda sendiri — tanpa akun, tanpa unggahan, tanpa menunggu server.',
    bullets: [
      'Apa pun yang Anda ketik atau jatuhkan tidak pernah keluar dari perangkat',
      'Tetap bekerja luring setelah halaman dimuat',
      'Tanpa pendaftaran, tanpa tanda air, tanpa batas per berkas',
    ],
    bodyHeading: 'Satu kotak peralatan, bukan lima belas tab',
    body: 'Kebanyakan alat web gratis mengunggah berkas Anda ke server, menempelkan tanda air pada hasilnya, dan membatasi seberapa sering Anda boleh memakainya. Alat-alat ini tidak. Setiap alat adalah program kecil di sisi peramban: peramban yang bekerja, berkas tetap di tempatnya, dan hasilnya muncul seketika.',
    faq: [
      { q: 'Apakah alat-alat ini benar-benar gratis?', a: 'Ya. Semua gratis, tanpa akun, tanpa masa coba, dan tanpa batas berkas. Situs ini dibiayai iklan, karena itu Anda akan melihat slot iklan yang diberi label jelas di antara bagian-bagian halaman.' },
      { q: 'Apakah berkas saya diunggah ke suatu tempat?', a: 'Tidak. Mengubah ukuran gambar, menggabungkan PDF, mengonversi data, dan semua kalkulator berjalan di dalam tab peramban Anda. Berkas tidak pernah menjadi bagian dari permintaan jaringan.' },
      { q: 'Apakah alat ini bekerja di ponsel?', a: 'Ya. Semua alat responsif dan ramah sentuh, termasuk penggaris layar yang bisa dikalibrasi di ponsel memakai kartu bank.' },
    ],
  },

  ruler: {
    title: 'Penggaris Layar Online — Ukuran Asli, Terkalibrasi 1:1',
    description: 'Penggaris layar ukuran asli yang dikalibrasi ke monitor Anda dengan kartu kredit. Ukur dalam milimeter, sentimeter, dan inci pada skala 1:1 di layar mana pun.',
    keywords: 'penggaris online, penggaris ukuran asli, penggaris layar, penggaris mm, penggaris cm online, penggaris inci, penggaris terkalibrasi',
    h1: 'Ukur apa pun di layar Anda',
    intro: 'Penggaris yang menempel di tepi jendela pada skala milimeter dan inci yang sebenarnya. Kalibrasi sekali dengan kartu bank mana pun, dan skalanya tetap akurat secara fisik meski Anda memperbesar tampilan.',
    bullets: [
      'Dikalibrasi dengan kartu bank standar ISO 7810 selebar 85,60 mm',
      'Tetap akurat saat diperbesar atau saat pindah layar',
      'Tanpa akses kamera, tanpa perekaman layar, tanpa unggahan',
    ],
    bodyHeading: 'Mengapa kebanyakan penggaris layar keliru',
    body: 'Penggaris web pada umumnya menganggap semua layar 96 DPI. Layar sungguhan berkisar dari 96 hingga lebih dari 300 DPI, sehingga penggaris tanpa kalibrasi bisa meleset sampai tiga kali lipat. Menempelkan kartu ke layar lalu menyamakan garis tepinya memberi tahu alat ini kerapatan piksel Anda yang sebenarnya.',
    faq: [
      { q: 'Bagaimana cara mengalibrasi penggaris ke ukuran asli?', a: 'Buka panel kalibrasi dan tempelkan kartu kredit, kartu debit, atau kartu identitas mana pun ke layar. Geser penggeser sampai garis tepi di layar persis sama dengan kartu fisik Anda.' },
      { q: 'Apakah tetap akurat saat saya memperbesar tampilan?', a: 'Ya. Penggaris memantau perubahan skala jendela dan rasio piksel perangkat lalu menghitung ulang jarak antargaris, sehingga satu sentimeter tetap satu sentimeter.' },
      { q: 'Bisakah dipakai di ponsel atau tablet?', a: 'Bisa. Kalibrasi bekerja sama di iPhone, iPad, dan Android. Kalibrasi sekali per perangkat dan pengaturannya diingat secara lokal.' },
    ],
  },

  aspectRatio: {
    title: 'Kalkulator Rasio Aspek dan Pemotongan',
    description: 'Hitung lebar dan tinggi yang sesuai untuk rasio aspek apa pun — 16:9, 9:16, 4:5, 1:1, 21:9 — atau temukan pemotongan tengah terbesar yang muat pada gambar Anda.',
    keywords: 'kalkulator rasio aspek, kalkulator 16:9, kalkulator crop, proporsi gambar, resolusi video',
    h1: 'Kalkulator Rasio Aspek dan Pemotongan',
    intro: 'Masukkan satu dimensi dan dapatkan yang lain untuk rasio apa pun, atau tempelkan ukuran gambar Anda untuk memperoleh kotak pemotongan tengah yang tepat.',
    bullets: [
      'Semua rasio umum media sosial, video, dan cetak sudah tersedia',
      'Mode pemotongan juga mengembalikan offset, bukan hanya ukurannya',
      'Hasil diperbarui sambil Anda mengetik, tanpa kejutan pembulatan',
    ],
    bodyHeading: 'Rasio yang benar-benar dipakai platform',
    body: 'Video vertikal di TikTok, Reels, dan Shorts memakai 9:16 pada 1080×1920. Unggahan feed Instagram memakai 1:1 atau 4:5. YouTube memakai 16:9, film layar lebar 21:9, dan sebagian besar kamera memotret pada 3:2. Memilih rasio yang tepat sebelum ekspor mencegah pemotongan otomatis oleh platform.',
    faq: [
      { q: 'Apa itu rasio aspek?', a: 'Perbandingan antara lebar dan tinggi, ditulis lebar:tinggi. Gambar 16:9 memiliki lebar 16 satuan untuk setiap 9 satuan tinggi, berapa pun jumlah pikselnya.' },
      { q: 'Bagaimana mencari dimensi yang hilang?', a: 'Kalikan sisi yang diketahui dengan pecahan rasionya. Untuk 16:9, tinggi sama dengan lebar dikali 9 dibagi 16.' },
      { q: 'Apa beda menyesuaikan dan memotong?', a: 'Menyesuaikan menskalakan seluruh gambar dan bisa menambah bilah kosong. Memotong membuang piksel untuk mencapai rasio tanpa menggepengkan apa pun.' },
    ],
  },

  dpi: {
    title: 'Kalkulator DPI / PPI dan Ukuran Cetak',
    description: 'Ubah piksel menjadi ukuran cetak dan sebaliknya. Cari cetakan tajam terbesar yang mampu dihasilkan gambar Anda, atau piksel yang dibutuhkan pada 300 DPI.',
    keywords: 'kalkulator dpi, kalkulator ppi, ukuran cetak, piksel ke sentimeter, 300 dpi, resolusi gambar',
    h1: 'Kalkulator DPI / PPI dan Ukuran Cetak',
    intro: 'Berpindah dua arah antara piksel dan ukuran cetak fisik pada resolusi mana pun, dan langsung lihat apakah sebuah gambar cukup tajam untuk ukuran yang Anda inginkan.',
    bullets: [
      'Dari piksel ke ukuran cetak, dan dari ukuran ke piksel yang dibutuhkan',
      'Panduan kualitas pada 72, 150, 300, dan 600 DPI',
      'Bekerja dalam inci, sentimeter, dan milimeter',
    ],
    bodyHeading: 'Berapa resolusi yang sebenarnya dibutuhkan cetakan',
    body: '300 DPI adalah standar untuk apa pun yang dipegang di tangan — cetak foto, majalah, kartu nama. Poster yang dilihat dari jarak satu meter sudah bagus pada 150 DPI, dan baliho tetap layak pada 30. Membagi lebar piksel dengan DPI target menghasilkan lebar cetak dalam inci.',
    faq: [
      { q: 'Apa beda DPI dan PPI?', a: 'PPI menghitung piksel per inci pada gambar digital; DPI menghitung titik tinta per inci yang dijatuhkan pencetak. Dalam pemakaian sehari-hari untuk menentukan ukuran gambar, keduanya dipakai bergantian.' },
      { q: 'Apakah 300 DPI selalu diperlukan?', a: 'Tidak. Itu standar untuk penglihatan jarak dekat. Karya format besar yang dilihat dari jauh tetap tajam pada resolusi jauh lebih rendah.' },
      { q: 'Bisakah menaikkan DPI untuk memperbaiki kualitas?', a: 'Mengubah angka DPI saja hanya mengubah ukuran cetak. Menambah detail nyata membutuhkan lebih banyak piksel, dan penskalaan hanya bisa mendekatinya.' },
    ],
  },

  imageResizer: {
    title: 'Kompresor dan Pengubah Ukuran Gambar',
    description: 'Ubah ukuran dan kompres gambar JPG, PNG, dan WebP di peramban Anda. Pratinjau hasilnya, bandingkan ukuran berkas, lalu unduh — tanpa unggahan.',
    keywords: 'ubah ukuran gambar, kompres gambar, perkecil ukuran foto, kompresor jpg, konversi ke webp',
    h1: 'Kompresor dan Pengubah Ukuran Gambar',
    intro: 'Jatuhkan sebuah gambar, tentukan target ukuran atau kualitas, lalu unduh hasilnya. Peramban Anda sendiri yang membaca ulang dan menyandikan berkas, jadi berkas itu tidak pernah keluar dari perangkat.',
    bullets: [
      'JPG, PNG, dan WebP masuk dan keluar, dengan perbandingan ukuran langsung',
      'Ubah ukuran berdasarkan piksel atau persentase, dengan rasio terkunci',
      'Cocok untuk banyak berkas sekaligus, tanpa batas harian',
    ],
    bodyHeading: 'Berkas lebih kecil tanpa penurunan yang terlihat',
    body: 'Sebagian besar foto membawa data jauh lebih banyak daripada yang dibutuhkan halaman yang menampilkannya. Memangkas foto selebar 4000 piksel menjadi 1600 piksel yang benar-benar dipakai tata letak, lalu menyandikannya ulang pada kualitas 80%, biasanya menghapus 90% ukuran berkas tanpa perbedaan yang terlihat mata.',
    faq: [
      { q: 'Apakah foto saya diunggah ke server?', a: 'Tidak. Gambar dibaca lewat API berkas peramban dan diproses pada kanvas di dalam halaman. Tidak ada permintaan jaringan yang membawa gambar Anda.' },
      { q: 'Format mana yang sebaiknya dipilih?', a: 'WebP paling kecil pada kualitas yang sama dan kini didukung di mana-mana. Pakai JPG untuk kompatibilitas maksimum dan PNG bila Anda butuh transparansi atau grafik datar yang tajam.' },
      { q: 'Apakah mengubah ukuran menghapus data EXIF?', a: 'Ya. Penyandian ulang membuang metadata asli, termasuk koordinat GPS dan detail kamera, yang biasanya memang diinginkan sebelum dipublikasikan.' },
    ],
  },

  colorTools: {
    title: 'Pemilih Warna dan Pembuat Palet',
    description: 'Pilih warna dan baca sebagai HEX, RGB, HSL, atau HSV. Buat palet komplementer, analog, dan triadik, lalu ekspor sebagai CSS, Tailwind, atau JSON.',
    keywords: 'pemilih warna, hex ke rgb, pembuat palet, konverter hsl, skema warna, warna tailwind',
    h1: 'Pemilih Warna dan Pembuat Palet',
    intro: 'Baca warna apa pun dalam semua notasi sekaligus, bangun palet yang harmonis di sekitarnya, lalu salin seluruhnya dalam format yang dipakai proyek Anda.',
    bullets: [
      'HEX, RGB, HSL, dan HSV tetap selaras saat Anda menggeser',
      'Skema komplementer, analog, triadik, dan tetradik',
      'Ekspor sekali klik ke variabel CSS, konfigurasi Tailwind, atau JSON',
    ],
    bodyHeading: 'Palet yang dibangun di atas teori warna',
    body: 'Skema yang harmonis lahir dari hubungan tetap pada roda warna. Pasangan komplementer berseberangan untuk kontras maksimum; kumpulan analog bersebelahan dan terasa tenang; kumpulan triadik berjarak sama dan tetap hidup tanpa kehilangan keseimbangan.',
    faq: [
      { q: 'Apa arti kode HEX?', a: 'Tiga pasang digit heksadesimal untuk merah, hijau, dan biru, masing-masing dari 00 sampai FF. #FF0000 adalah merah penuh tanpa hijau atau biru.' },
      { q: 'Kapan sebaiknya memakai HSL alih-alih HEX?', a: 'HSL memisahkan rona, saturasi, dan kecerahan, sehingga membuat tingkatan warna cukup dengan mengubah satu angka, bukan menebak nilai heksadesimal baru.' },
      { q: 'Apakah palet yang diekspor aksesibel?', a: 'Pembuat palet menampilkan rasio kontras sehingga Anda bisa memeriksa pasangan mana pun terhadap ambang WCAG AA 4,5:1 untuk teks isi sebelum dipakai.' },
    ],
  },

  password: {
    title: 'Pemeriksa Kekuatan dan Pembuat Kata Sandi',
    description: 'Lihat seberapa kuat kata sandi Anda sebenarnya dan berapa lama mesin modern membutuhkan waktu untuk membobolnya. Diperiksa sepenuhnya di peramban Anda.',
    keywords: 'kekuatan kata sandi, pembuat kata sandi, kata sandi aman, waktu pembobolan, entropi',
    h1: 'Pemeriksa Kekuatan Kata Sandi',
    intro: 'Ketik sebuah kata sandi dan dapatkan perkiraan entropi yang jujur, waktu pembobolan yang realistis, serta kelemahan spesifik yang membuatnya mudah ditebak.',
    bullets: [
      'Perkiraan entropi dan waktu pembobolan terhadap kecepatan GPU masa kini',
      'Menandai kata kamus, urutan papan ketik, dan penggantian huruf yang umum',
      'Tidak ada yang dikirim — pemeriksaan berjalan di dalam halaman',
    ],
    bodyHeading: 'Panjang mengalahkan kerumitan',
    body: 'Mengganti "a" dengan "@" nyaris tidak menambah apa pun, karena perkakas pembobol mencoba penggantian itu lebih dulu. Menambah karakter justru melipatgandakan ruang pencarian. Empat kata yang tidak berhubungan lebih mudah diingat sekaligus jauh lebih sulit dibobol daripada rangkaian simbol yang pendek.',
    faq: [
      { q: 'Amankah mengetik kata sandi asli saya di sini?', a: 'Pemeriksaan berjalan sepenuhnya di peramban Anda dan tidak ada ketikan yang dikirim lewat jaringan. Meski begitu, kebiasaan paling aman adalah menguji kata sandi dengan panjang dan pola serupa, bukan yang benar-benar Anda pakai.' },
      { q: 'Apa yang membuat kata sandi kuat?', a: 'Panjang lebih dulu: targetkan minimal 16 karakter. Frasa sandi dari empat atau lima kata tak berhubungan mengalahkan rangkaian pendek yang rumit, baik dalam hal mudah diingat maupun kekuatannya.' },
      { q: 'Bagaimana waktu pembobolan dihitung?', a: 'Dari perkiraan entropi dalam bit terhadap laju hash GPU konsumen saat ini, dengan asumsi serangan luring pada basis data yang bocor.' },
    ],
  },

  calorie: {
    title: 'Kalkulator Kalori — BMR, TDEE, dan Makro',
    description: 'Hitung BMR dan TDEE Anda dengan persamaan Mifflin-St Jeor, dapatkan pembagian makro sesuai tujuan, dan catat makanan terhadap target harian Anda.',
    keywords: 'kalkulator kalori, kalkulator tdee, kalkulator bmr, kalkulator makro, kebutuhan kalori harian',
    h1: 'Kalkulator Kalori dan Catatan Makanan',
    intro: 'Ketahui berapa yang dibakar tubuh Anda saat istirahat dan pada hari biasa, lalu tetapkan target untuk menurunkan, mempertahankan, atau menambah berat badan dan catat makanan terhadapnya.',
    bullets: [
      'BMR Mifflin-St Jeor, persamaan yang dipakai kalangan klinis',
      'Pengali aktivitas dari jarang bergerak hingga atlet',
      'Pembagian protein, karbohidrat, dan lemak yang disesuaikan dengan tujuan Anda',
    ],
    bodyHeading: 'BMR, TDEE, dan jarak di antara keduanya',
    body: 'BMR adalah jumlah yang akan Anda bakar bila berbaring seharian. TDEE mengalikannya dengan faktor aktivitas untuk mencakup gerakan, olahraga, dan pencernaan. Makan secara konsisten di bawah TDEE menurunkan berat badan; defisit sekitar 500 kkal per hari kira-kira setara setengah kilogram per minggu.',
    faq: [
      { q: 'Seberapa akurat perkiraannya?', a: 'Mifflin-St Jeor meleset sekitar 10% untuk kebanyakan orang. Metabolisme tiap individu berbeda, jadi anggap angkanya sebagai titik awal dan sesuaikan setelah dua minggu hasil nyata.' },
      { q: 'Seberapa besar defisit yang aman?', a: 'Panduan umumnya adalah defisit 15-25% di bawah TDEE. Defisit yang sangat agresif mengorbankan otot dan sulit dipertahankan. Bicarakan dengan dokter sebelum melakukan perubahan drastis.' },
      { q: 'Apakah catatan makanan saya disimpan di server?', a: 'Tidak. Catatan disimpan di penyimpanan lokal peramban dan tidak pernah keluar dari perangkat. Menghapus data situs akan menghapus catatan itu.' },
    ],
  },

  pregnancy: {
    title: 'Kalkulator Kehamilan — Perkiraan Lahir dan Ovulasi',
    description: 'Perkirakan hari perkiraan lahir dari haid terakhir, tanggal pembuahan, atau transfer bayi tabung, dan lihat usia kehamilan, trimester, serta masa subur Anda.',
    keywords: 'kalkulator hpl, kalkulator kehamilan, kalkulator ovulasi, masa subur, usia kehamilan',
    h1: 'Kalkulator Kehamilan — Perkiraan Lahir dan Ovulasi',
    intro: 'Masukkan hari pertama haid terakhir, tanggal pembuahan yang diketahui, atau tanggal transfer bayi tabung untuk memperoleh hari perkiraan lahir, usia kehamilan saat ini, dan trimester.',
    bullets: [
      'Penanggalan aturan Naegele dari haid terakhir, pembuahan, atau transfer bayi tabung',
      'Menyesuaikan diri untuk siklus selain 28 hari',
      'Perkiraan ovulasi dan masa subur untuk perencanaan',
    ],
    bodyHeading: 'Bagaimana hari perkiraan lahir dihitung',
    body: 'Perkiraan standar menambahkan 280 hari pada hari pertama haid terakhir, yang mengandaikan siklus 28 hari dengan ovulasi pada hari ke-14. Siklus yang lebih panjang atau lebih pendek menggeser tanggalnya, karena itu kalkulator ini menanyakan panjang siklus Anda alih-alih mengandaikannya.',
    faq: [
      { q: 'Seberapa akurat hari perkiraan lahir?', a: 'Hanya sekitar 4% bayi lahir tepat pada tanggal perkiraan. Kira-kira 80% lahir dalam dua minggu sebelum atau sesudahnya, karena itu disebut perkiraan.' },
      { q: 'Bagaimana jika siklus saya bukan 28 hari?', a: 'Masukkan panjang rata-rata siklus Anda yang sebenarnya. Kalkulator menggeser asumsi ovulasi sesuai dengan itu, bukan memaksakan model baku 14 hari.' },
      { q: 'Apakah ini menggantikan pemeriksaan USG?', a: 'Tidak. USG trimester pertama adalah metode penanggalan paling akurat. Alat ini untuk informasi dan perencanaan, bukan nasihat medis.' },
    ],
  },

  regex: {
    title: 'Penguji Regex dengan Penyorotan Langsung',
    description: 'Uji ekspresi reguler pada teks Anda sendiri dengan penyorotan kecocokan langsung, grup tangkapan, pratinjau penggantian, dan lembar contekan sintaks.',
    keywords: 'penguji regex, uji ekspresi reguler, regex online, contekan regex, regex javascript',
    h1: 'Penguji Regex dan Lembar Contekan',
    intro: 'Tulis sebuah pola dan lihat setiap kecocokan tersorot sambil Anda mengetik, dengan grup tangkapan dirinci dan pratinjau penggantian di sebelahnya.',
    bullets: [
      'Penyorotan langsung dengan grup tangkapan bernama dan bernomor',
      'Semua flag JavaScript, termasuk sticky dan unicode',
      'Panel contekan untuk sintaks yang tidak pernah teringat',
    ],
    bodyHeading: 'Menyusun pola yang tahan uji',
    body: 'Mulailah dari cuplikan nyata teks yang harus Anda cocokkan, bukan versi ideal. Tambahkan satu batasan setiap kali dan perhatikan penyorotan menyempit. Jangkar dan kelas karakter yang eksplisit hampir selalu mengalahkan titik-bintang rakus yang kebetulan berhasil pada contoh pertama.',
    faq: [
      { q: 'Ini varian regex yang mana?', a: 'JavaScript (ECMAScript), mesin yang tertanam di peramban Anda. Sebagian besar sintaksnya berlaku juga untuk PCRE, tetapi lookbehind dan beberapa escape properti Unicode berbeda.' },
      { q: 'Apa yang diubah oleh flag g?', a: 'Tanpa flag itu mesin berhenti pada kecocokan pertama. Dengan flag itu, semua kecocokan dalam teks ditemukan, dan itulah yang ditampilkan penyorotan.' },
      { q: 'Apakah teks uji saya dikirim ke suatu tempat?', a: 'Tidak. Peramban Anda sendiri yang mengompilasi dan menjalankan pola tersebut. Tidak ada yang dicatat atau dikirim.' },
    ],
  },

  cron: {
    title: 'Pembuat dan Pemvalidasi Ekspresi Cron',
    description: 'Susun dan validasi ekspresi cron dengan penjelasan bahasa sehari-hari serta pratinjau waktu jalan berikutnya. Mendukung sintaks 5 dan 6 kolom.',
    keywords: 'pembuat cron, generator crontab, validator cron, jadwal cron, waktu jalan berikutnya',
    h1: 'Pembuat dan Pemvalidasi Ekspresi Cron',
    intro: 'Rakit jadwal kolom demi kolom atau tempelkan ekspresi yang sudah ada, lalu dapatkan penjelasan yang mudah dibaca beserta beberapa waktu jalan berikutnya.',
    bullets: [
      'Penjelasan bahasa sehari-hari untuk ekspresi apa pun',
      'Pratinjau jadwal berikutnya dalam zona waktu Anda sendiri',
      'Menangani rentang, langkah, daftar, dan varian 6 kolom dengan detik',
    ],
    bodyHeading: 'Membaca kelima kolom',
    body: 'Satu baris cron berisi menit, jam, tanggal, bulan, dan hari dalam minggu, dengan urutan itu. Tanda bintang berarti setiap nilai, */5 berarti setiap kelipatan lima, dan 1-5 adalah rentang. Jebakan klasiknya: tanggal dan hari dalam minggu digabung dengan ATAU, bukan DAN.',
    faq: [
      { q: 'Apa arti */5 * * * *?', a: 'Setiap lima menit, pada setiap jam, setiap hari. Operator langkah berlaku pada kolom tempat ia ditulis.' },
      { q: 'Zona waktu mana yang dipakai cron?', a: 'Cron sistem memakai zona waktu server. Pratinjau di sini memakai zona waktu peramban Anda, jadi periksa pengaturan server sebelum mengandalkan waktunya.' },
      { q: 'Mengapa jadwal hari dalam minggu saya berjalan di hari yang salah?', a: 'Bila tanggal dan hari dalam minggu sama-sama dibatasi, cron berjalan jika salah satunya cocok, bukan keduanya. Biarkan salah satu sebagai tanda bintang untuk mendapat perilaku yang diharapkan kebanyakan orang.' },
    ],
  },

  dataConverter: {
    title: 'Konverter JSON, CSV, dan YAML',
    description: 'Konversi antara JSON, CSV, dan YAML seketika di peramban Anda, lengkap dengan validasi, perapian, serta pemecah kode Base64 dan JWT.',
    keywords: 'json ke csv, csv ke json, konverter yaml, perapi json, pemecah base64, pemecah jwt',
    h1: 'Konverter JSON ⇄ CSV ⇄ YAML',
    intro: 'Tempelkan data dalam salah satu dari tiga format dan terima kembali dalam salah satu format lainnya, tervalidasi dan tertata, tanpa satu bita pun keluar dari peramban Anda.',
    bullets: [
      'Bolak-balik antara JSON, CSV, dan YAML dengan deteksi tipe',
      'Kesalahan menunjuk baris dan kolom yang tepat',
      'Pemecah kode Base64, URL, dan JWT sudah tertanam',
    ],
    bodyHeading: 'Di mana ketiga format itu berbeda',
    body: 'JSON bersifat ketat dan dapat dibaca di mana saja. YAML memakai model data yang sama dengan indentasi menggantikan kurung kurawal, sehingga nyaman ditulis dan mudah rusak. CSV bersifat datar, jadi objek bersarang harus diratakan menjadi nama kolom bertitik saat diekspor.',
    faq: [
      { q: 'Apakah data saya diunggah?', a: 'Tidak. Penguraian dan konversi berjalan di peramban Anda. Tidak ada yang dicatat, disimpan, atau dikirim, sehingga aman untuk berkas konfigurasi yang memuat rahasia.' },
      { q: 'Bagaimana JSON bersarang ditangani dalam CSV?', a: 'Kunci bersarang diratakan menjadi judul kolom bertitik seperti pengguna.alamat.kota, sehingga tidak ada informasi yang hilang.' },
      { q: 'Apakah pemecah JWT memverifikasi tanda tangan?', a: 'Tidak. Alat ini memecah header dan payload untuk diperiksa. Verifikasi memerlukan kunci penandatangan dan merupakan tugas server Anda.' },
    ],
  },

  qr: {
    title: 'Pembuat Kode QR — Wi-Fi, vCard, dan URL',
    description: 'Buat kode QR untuk tautan, jaringan Wi-Fi, kontak vCard, surel, dan teks biasa. Sesuaikan warna dan koreksi galat, lalu unduh PNG atau SVG.',
    keywords: 'pembuat kode qr, kode qr wifi, kode qr vcard, kode qr gratis, qr png svg',
    h1: 'Pembuat Kode QR',
    intro: 'Buat kode QR untuk tautan, jaringan Wi-Fi, kartu kontak, surel, atau teks biasa, lalu unduh sebagai PNG beresolusi tinggi atau SVG yang bisa diperbesar tanpa batas.',
    bullets: [
      'Muatan Wi-Fi, vCard, surel, SMS, dan URL',
      'Warna khusus dan empat tingkat koreksi galat',
      'PNG untuk cetak dan SVG untuk penskalaan tanpa batas',
    ],
    bodyHeading: 'Kode yang tetap terbaca di atas kertas',
    body: 'Jaga kontras yang kuat antara pola dan latar belakang, biarkan zona kosong di sekelilingnya tetap bersih, dan pilih koreksi galat tingkat H bila kode akan memuat logo atau berisiko tergores. Muatan yang lebih pendek menghasilkan pola yang lebih renggang, yang terbaca andal pada ukuran kecil.',
    faq: [
      { q: 'Apakah kode QR ini kedaluwarsa?', a: 'Tidak. Kode dibuat di peramban Anda dan langsung menyandikan data Anda. Tidak ada layanan pengalihan di tengah yang bisa dimatikan.' },
      { q: 'Apa itu koreksi galat?', a: 'Data berlebih yang membuat kode rusak tetap bisa dipindai. Tingkat L menoleransi sekitar 7% kerusakan, tingkat H sekitar 30%, dengan konsekuensi pola yang lebih rapat.' },
      { q: 'Amankah mencetak kode QR Wi-Fi?', a: 'Kode itu memuat kata sandi jaringan dalam teks biasa, jadi siapa pun yang memotretnya bisa masuk ke Wi-Fi Anda. Pakailah untuk jaringan tamu, bukan jaringan utama.' },
    ],
  },

  pdf: {
    title: 'Alat PDF — Gabung, Pisah, dan Konversi',
    description: 'Gabungkan beberapa PDF menjadi satu, pisahkan PDF menjadi halaman tunggal, atau ubah gambar menjadi PDF. Semua berjalan di peramban, tanpa unggahan dan tanpa tanda air.',
    keywords: 'gabung pdf, pisah pdf, gambar ke pdf, alat pdf online, gabung pdf gratis',
    h1: 'Konverter, Penggabung, dan Pemisah PDF',
    intro: 'Gabungkan dokumen, keluarkan halaman, atau susun PDF dari gambar. Berkas diurai dan ditulis ulang di dalam peramban Anda, jadi tidak ada yang diunggah dan tidak ada yang dicap.',
    bullets: [
      'Penggabungan dengan pengurutan seret, pemisahan per halaman atau rentang',
      'Gambar ke PDF dengan kendali ukuran dan orientasi halaman',
      'Tanpa tanda air, tanpa batas ukuran berkas, tanpa kuota harian',
    ],
    bodyHeading: 'Mengapa memproses PDF secara lokal itu penting',
    body: 'Kontrak, surat medis, dan rekening koran justru dokumen jenis inilah yang orang tempelkan ke konverter daring gratis. Mengerjakannya secara lokal berarti dokumen itu tidak pernah tersimpan di server orang lain, tidak pernah masuk antrean pemrosesan, dan tidak pernah tunduk pada kebijakan penyimpanan yang tidak Anda baca.',
    faq: [
      { q: 'Apakah ada batas ukuran berkas?', a: 'Hanya memori perangkat Anda. Karena tidak ada unggahan, batas praktisnya jauh lebih tinggi daripada 10-20 MB yang diizinkan kebanyakan konverter daring.' },
      { q: 'Apakah hasilnya akan bertanda air?', a: 'Tidak. Alat ini menulis PDF bersih tanpa merek apa pun.' },
      { q: 'Bisakah membuka PDF yang dilindungi kata sandi?', a: 'PDF terenkripsi harus dibuka kuncinya lebih dulu. Hapus kata sandi di pembaca PDF Anda, lalu jalankan berkasnya di sini.' },
    ],
  },

  unitConverter: {
    title: 'Konverter Satuan — Panjang, Berat, dan Suhu',
    description: 'Konversi lebih dari 80 satuan panjang, berat, suhu, luas, volume, kecepatan, data, energi, dan tekanan, dengan hasil yang diformat sesuai bahasa Anda.',
    keywords: 'konverter satuan, konverter metrik, kg ke pon, cm ke inci, celsius ke fahrenheit, konverter ukuran',
    h1: 'Konverter Satuan',
    intro: 'Sepuluh kategori dan lebih dari delapan puluh satuan, dikonversi sambil Anda mengetik, dengan angka dikelompokkan dan diberi tanda baca seperti cara bahasa Anda menuliskannya.',
    bullets: [
      'Panjang, berat, suhu, luas, volume, kecepatan, waktu, data, energi, tekanan',
      'Metrik dan imperial berdampingan, dengan presisi penuh tetap terjaga',
      'Hasil diformat untuk bahasa Anda, jadi 1.234,5 atau 1,234.5 sesuai kebutuhan',
    ],
    bodyHeading: 'Presisi yang bertahan sampai konversi balik',
    body: 'Konversi memakai faktor yang eksak, bukan yang sudah dibulatkan, sehingga mengonversi ke satuan lain lalu kembali menghasilkan angka semula. Suhu ditangani sebagai konversi afin, bukan perkalian sederhana, dan di situlah kebanyakan konverter cepat keliru.',
    faq: [
      { q: 'Berapa banyak angka desimal yang dipertahankan?', a: 'Presisi ganda penuh secara internal, dengan pembulatan yang wajar untuk ditampilkan. Nilai eksaknya tersedia bila Anda perlu menyalinnya.' },
      { q: 'Mengapa bahasa saya menampilkan koma sebagai tanda desimal?', a: 'Karena begitulah bahasa Anda menuliskan angka. Bahasa Indonesia menulis 1.234,5 sementara bahasa Inggris menulis 1,234.5. Alat ini mengikuti bahasa halaman.' },
      { q: 'Apakah galon AS dan galon imperial sama?', a: 'Tidak, dan selisihnya besar. Satu galon AS setara 3,785 liter, satu galon imperial 4,546 liter. Keduanya dicantumkan terpisah.' },
    ],
  },

  about: {
    title: 'Tentang Rocking Tools',
    description: 'Siapa yang membangun Rocking Tools, mengapa setiap utilitas berjalan di sisi peramban, dan bagaimana situs alat gratis berbasis iklan tetap privat sejak rancangannya.',
    keywords: 'tentang rocking tools, alat mengutamakan privasi, alat web sisi peramban',
    h1: 'Tentang Rocking Tools',
    intro: 'Sekumpulan kecil utilitas peramban yang dibangun di atas satu aturan: pekerjaan terjadi di perangkat Anda, bukan di perangkat kami.',
    bullets: [
      'Setiap alat berjalan di sisi peramban — tidak ada titik unggah yang bisa bocor',
      'Gratis dipakai, dibiayai iklan yang diberi label jelas',
      'Terbuka soal apa yang kami kumpulkan, dan itu sangat sedikit',
    ],
    bodyHeading: 'Mengapa di sisi peramban',
    body: 'Model bisnis lazim untuk alat gratis adalah mengambil berkas Anda, memprosesnya di server, dan menyimpannya cukup lama sampai berguna bagi seseorang. Menjalankan pekerjaan yang sama di peramban menghapus pertukaran itu sepenuhnya. Halaman dimuat, kode berjalan secara lokal, dan data Anda tidak punya tempat untuk pergi.',
    faq: [
      { q: 'Bagaimana situs ini dibiayai?', a: 'Lewat iklan Google AdSense, ditampilkan pada slot berlabel di antara konten. Itulah seluruh model bisnisnya — tidak ada versi berbayar dan tidak ada yang dijual kembali.' },
      { q: 'Data apa yang Anda kumpulkan?', a: 'Statistik agregat tentang kunjungan halaman, serta apa pun yang dikumpulkan penyedia iklan sesuai persetujuan yang Anda berikan. Berkas dan masukan Anda tidak pernah termasuk di dalamnya.' },
      { q: 'Bisakah saya meminta alat baru?', a: 'Bisa. Halaman kontak sampai langsung kepada kami, dan permintaan benar-benar memengaruhi apa yang dibangun berikutnya.' },
    ],
  },

  faq: {
    title: 'Pertanyaan yang Sering Diajukan',
    description: 'Jawaban seputar privasi, penanganan berkas, akurasi, penggunaan luring, iklan, dan dukungan bahasa untuk semua alat di Rocking Tools.',
    keywords: 'tanya jawab rocking tools, privasi alat online, apakah alat online aman',
    h1: 'Pertanyaan yang Sering Diajukan',
    intro: 'Pertanyaan yang paling sering muncul tentang cara kerja alat-alat ini, apa yang terjadi pada data Anda, dan apa yang dilakukan maupun tidak dilakukan situs ini.',
    bullets: [
      'Privasi dan penanganan berkas dijelaskan secara lugas',
      'Bagaimana akurasi dicapai tanpa server',
      'Apa fungsi iklan dan bagaimana persetujuan bekerja',
    ],
    bodyHeading: 'Masih bingung?',
    body: 'Jika pertanyaan Anda tidak terjawab di bawah, halaman kontak langsung sampai ke seorang manusia. Laporan bug yang menyebutkan peramban dan sistem operasi yang Anda pakai sangat kami hargai, karena sebagian besar masalah tampilan hanya muncul pada satu kombinasi tertentu.',
    faq: [
      { q: 'Apakah saya perlu akun?', a: 'Tidak. Tidak ada pendaftaran di mana pun di situs ini dan tidak ada alat yang dikunci di baliknya.' },
      { q: 'Apakah alat-alat ini bekerja luring?', a: 'Sebagian besar ya. Setelah halaman dimuat, alat berjalan dari kode yang sudah ada di peramban. Menyegarkan halaman akan membutuhkan jaringan lagi.' },
      { q: 'Mengapa saya melihat iklan?', a: 'Iklan membayar hosting dan pengembangan agar alat-alat ini tetap gratis tanpa batas. Slot iklan diberi label dan dijauhkan dari area kerja setiap alat.' },
      { q: 'Situs ini tersedia dalam bahasa apa saja?', a: 'Halaman beranda dan semua halaman alat diterbitkan dalam bahasa Inggris, Spanyol, Prancis, Jerman, Portugis Brasil, Hindi, Indonesia, dan Jepang. Angka, mata uang, dan tanggal mengikuti bahasa yang Anda pilih.' },
    ],
  },
}
