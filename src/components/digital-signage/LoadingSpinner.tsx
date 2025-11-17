import { motion } from 'framer-motion'

export function LoadingSpinner() {
  return (
    <motion.div
      className="min-h-screen bg-gray-100 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <p className="text-gray-600">Memuat data...</p>
      </motion.div>
    </motion.div>
  )
}
