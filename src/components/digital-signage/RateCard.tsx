import { motion } from 'framer-motion'
import { CreditCard, PiggyBank } from 'lucide-react'
import { InterestRate } from '@/lib/types'

type RateCardProps = {
  rate: InterestRate;
  delay: number;
};

export function RateCard({ rate, delay }: RateCardProps) {
  const isLoan = rate.type.includes('Loan');
  const icon = isLoan ? <CreditCard className="w-5 h-5 text-yellow-400" /> : <PiggyBank className="w-5 h-5 text-blue-400" />;
  const textColor = isLoan ? 'text-yellow-400' : 'text-blue-400';
  const description = isLoan ? 'Bunga kompetitif untuk usaha Anda' : 'Promo khusus bulan ini';

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">{rate.type}</h3>
          {icon}
        </div>
        <div className={`text-3xl font-bold ${textColor}`}>
          {rate.rate} <span className="text-base font-normal">p.a.</span>
        </div>
        <p className="text-sm text-white/70 mt-1">{description}</p>
      </div>
    </motion.div>
  );
}
