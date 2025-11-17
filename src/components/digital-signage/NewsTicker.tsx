import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { News } from '@/lib/types'

type NewsTickerProps = {
  news: News[];
};

export function NewsTicker({ news }: NewsTickerProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">News & Updates</h3>
          <Calendar className="w-5 h-5 text-purple-400" />
        </div>
        <div className="space-y-3 max-h-32 overflow-y-auto">
          {news.map((newsItem, idx) => (
            <motion.div
              key={newsItem.id}
              className="pb-2 border-b border-white/10 last:border-0"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8 + idx * 0.1 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium">{newsItem.title}</p>
                  <p className="text-xs text-white/60">{newsItem.date}</p>
                </div>
                <Badge
                  variant="secondary"
                  className={`text-xs ${
                    newsItem.category === 'news' ? 'bg-blue-500/20 text-blue-300' :
                    newsItem.category === 'promo' ? 'bg-green-500/20 text-green-300' :
                    'bg-purple-500/20 text-purple-300'
                  }`}
                >
                  {newsItem.category}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
