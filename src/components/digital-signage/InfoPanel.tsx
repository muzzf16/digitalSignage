import { motion } from 'framer-motion'
import { InterestRate, ExchangeRate, News } from '@/lib/types'
import { RateCard } from './RateCard'
import { ExchangeRates } from './ExchangeRates'
import { NewsTicker } from './NewsTicker'
import { WeatherWidget } from './WeatherWidget'

type InfoPanelProps = {
  rates: InterestRate[];
  exchangeRates: ExchangeRate[];
  news: News[];
  weather: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
  };
};

export function InfoPanel({ rates, exchangeRates, news, weather }: InfoPanelProps) {
  const loanRate = rates.find(r => r.type.includes('Loan'));
  const depositRate = rates.find(r => r.type.includes('Deposit'));

  return (
    <motion.div
      className="lg:col-span-2 space-y-6"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg p-6 text-white h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          <div className="space-y-6">
            {loanRate && <RateCard rate={loanRate} delay={0.4} />}
            {exchangeRates.length > 0 && <ExchangeRates rates={exchangeRates} />}
          </div>
          <div className="space-y-6">
            {depositRate && <RateCard rate={depositRate} delay={0.6} />}
            <WeatherWidget weather={weather} />
            {news.length > 0 && <NewsTicker news={news} />}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
