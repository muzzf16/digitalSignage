import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Building2, Maximize2, Settings } from 'lucide-react'

type HeaderProps = {
  currentTime: Date;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
};

export function Header({ currentTime, isFullscreen, toggleFullscreen }: HeaderProps) {
  if (isFullscreen) {
    return null;
  }

  return (
    <motion.header
      className="bg-white shadow-sm border-b border-gray-200"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <motion.div
            className="flex items-center space-x-3"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Building2 className="w-8 h-8 text-blue-800" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Perekonomian Rakyat</h1>
              <p className="text-xs text-gray-600">Digital Banking System</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center space-x-4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-right">
              <p className="text-xs text-gray-600">{currentTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <motion.p
                className="text-lg font-semibold text-gray-900"
                key={currentTime.toLocaleTimeString('id-ID')}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {currentTime.toLocaleTimeString('id-ID')}
              </motion.p>
            </div>
            <div className="flex items-center space-x-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" onClick={toggleFullscreen}>
                  <Maximize2 className="w-4 h-4 mr-2" />
                  Fullscreen
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" onClick={() => window.open('/content-management', '_blank')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
