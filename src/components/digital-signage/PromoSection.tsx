import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Gift, Star } from 'lucide-react'
import { Slide } from '@/lib/types'

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
}

type PromoSectionProps = {
  slides: Slide[];
};

export function PromoSection({ slides }: PromoSectionProps) {
  const [activePromoIndex, setActivePromoIndex] = useState(0)

  useEffect(() => {
    if (slides.length === 0) return

    const promoTimer = setInterval(() => {
      setActivePromoIndex((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(promoTimer)
  }, [slides.length])

  return (
    <motion.div
      className="lg:col-span-1"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="h-full">
        <AnimatePresence mode="wait" custom={1}>
          {slides.length > 0 ? slides.map((slide, index) => (
            index === activePromoIndex && (
              <motion.div
                key={slide.id}
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className={`h-full bg-gradient-to-br ${slide.backgroundColor} rounded-lg p-8 text-white relative overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full"></div>
                </div>

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
                        <Gift className="w-3 h-3 mr-1" />
                        {slide.category}
                      </Badge>
                      <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                      <p className="text-xl mb-4 text-white/90">{slide.subtitle}</p>
                      <p className="text-base mb-6 text-white/80">{slide.description}</p>
                    </motion.div>

                    <motion.div
                      className="space-y-3"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {slide.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center space-x-2"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
                        >
                          <Star className="w-4 h-4" />
                          <span className="text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Button className="w-full bg-white text-orange-600 hover:bg-gray-100 font-semibold">
                      Get our special promo now!
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )
          )) : (
            <motion.div
              className="h-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-8 text-white flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Special Promo</h2>
                <p className="text-xl">Get our special promo now!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {slides.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activePromoIndex ? 'bg-orange-500' : 'bg-gray-300'
                }`}
                onClick={() => setActivePromoIndex(index)}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
