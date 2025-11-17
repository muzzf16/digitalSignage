import { motion } from 'framer-motion'
import { DollarSign, ArrowUp, ArrowDown } from 'lucide-react'
import { ExchangeRate } from '@/lib/types'

type ExchangeRatesProps = {
  rates: ExchangeRate[];
};

export function ExchangeRates({ rates }: ExchangeRatesProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">Exchange Rates</h3>
          <DollarSign className="w-5 h-5 text-green-400" />
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {rates.map((rate, idx) => (
            <motion.div
              key={rate.code}
              className="flex items-center justify-between py-2 border-b border-white/10 last:border-0"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 + idx * 0.05 }}
            >
              <div className="flex items-center space-x-3">
                <span className="font-medium text-sm w-12">{rate.code}</span>
                <span className="text-xs text-white/70">{rate.currency}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm">Buy: {rate.buy.toLocaleString('id-ID')}</div>
                  <div className="text-xs text-white/70">Sell: {rate.sell.toLocaleString('id-ID')}</div>
                </div>
                <div className={`flex items-center space-x-1 text-xs ${
                  rate.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {rate.change >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  <span>{Math.abs(rate.changePercent)}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
