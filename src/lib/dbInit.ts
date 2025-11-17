import { db } from './db';

// Initialize the database with default data
export async function initializeDatabase() {
  console.log('Initializing database...');

  // Check if slides already exist
  const existingSlides = await db.slide.count();
  if (existingSlides === 0) {
    console.log('Creating default slides...');
    await db.slide.createMany({
      data: [
        {
          title: 'Special Promo',
          subtitle: 'Get our special promo now!',
          description: 'Nikmati berbagai penawaran menarik dari kami',
          features: ['Bunga Khusus', 'Proses Cepat', 'Syarat Mudah'],
          backgroundColor: 'from-orange-500 to-orange-600',
          textColor: 'text-white',
          isActive: true,
          order: 1,
          category: 'Promo',
        },
        {
          title: 'Kredit Usaha Mikro',
          subtitle: 'Bunga 8.5% p.a.',
          description: 'Solusi pembiayaan untuk pengembangan usaha Anda',
          features: ['Plafon hingga 500jt', 'Bunga Kompetitif', 'Jaminan Aman'],
          backgroundColor: 'from-orange-600 to-red-500',
          textColor: 'text-white',
          isActive: true,
          order: 2,
          category: 'Kredit',
        },
        {
          title: 'Tabungan Berjangka',
          subtitle: 'Bunga hingga 6% p.a.',
          description: 'Investasi aman dengan return optimal',
          features: ['Bunga Tetap', 'Dijamin Pemerintah', 'Gratis Biaya'],
          backgroundColor: 'from-yellow-500 to-orange-500',
          textColor: 'text-white',
          isActive: true,
          order: 3,
          category: 'Tabungan',
        },
      ],
    });
  }

  // Check if rates already exist
  const existingRates = await db.interestRate.count();
  if (existingRates === 0) {
    console.log('Creating default interest rates...');
    await db.interestRate.createMany({
      data: [
        {
          type: 'Mikro Business Loan',
          rate: '8.50%',
          period: 'p.a',
          isActive: true,
        },
        {
          type: 'Deposit',
          rate: '6.00%',
          period: 'p.a',
          isActive: true,
        },
      ],
    });
  }

  // Check if news already exist
  const existingNews = await db.news.count();
  if (existingNews === 0) {
    console.log('Creating default news...');
    await db.news.createMany({
      data: [
        {
          title: 'Inflasi Oktober Terkendali di Level 3.23%',
          description: 'BPS mencatat inflasi Oktober 2024 sebesar 3.23% year on year',
          category: 'news',
          date: new Date().toLocaleDateString('id-ID'),
          isActive: true,
        },
        {
          title: 'Program Literasi Keuangan Gratis',
          description: 'BPR mengadakan edukasi keuangan gratis untuk masyarakat',
          category: 'announcement',
          date: new Date().toLocaleDateString('id-ID'),
          isActive: true,
        },
        {
          title: 'Cashback 5% untuk Transaksi QRIS',
          description: 'Transaksi menggunakan QRIS dapatkan cashback 5%',
          category: 'promo',
          date: new Date().toLocaleDateString('id-ID'),
          isActive: true,
        },
      ],
    });
  }

  // Check if exchange rates already exist
  const existingExchangeRates = await db.exchangeRate.count();
  if (existingExchangeRates === 0) {
    console.log('Creating default exchange rates...');
    await db.exchangeRate.createMany({
      data: [
        {
          currency: 'US Dollar',
          code: 'USD',
          buy: 16688,
          sell: 16788,
          change: 25,
          changePercent: 0.15,
          isActive: true,
        },
        {
          currency: 'Singapore Dollar',
          code: 'SGD',
          buy: 12807.74,
          sell: 12907.74,
          change: -15.26,
          changePercent: -0.12,
          isActive: true,
        },
        {
          currency: 'Euro',
          code: 'EUR',
          buy: 18250.5,
          sell: 18350.5,
          change: 45.3,
          changePercent: 0.25,
          isActive: true,
        },
        {
          currency: 'Japanese Yen',
          code: 'JPY',
          buy: 112.45,
          sell: 113.45,
          change: 0.85,
          changePercent: 0.76,
          isActive: true,
        },
        {
          currency: 'British Pound',
          code: 'GBP',
          buy: 21350.75,
          sell: 21450.75,
          change: -35.25,
          changePercent: -0.16,
          isActive: true,
        },
      ],
    });
  }

  console.log('Database initialization completed.');
}

// Run initialization if this file is executed directly
if (require.main === module) {
  initializeDatabase()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await db.$disconnect();
    });
}