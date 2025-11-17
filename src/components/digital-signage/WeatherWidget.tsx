import { motion } from 'framer-motion'
import { Cloud } from 'lucide-react'

type WeatherWidgetProps = {
  weather: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
  };
};

export function WeatherWidget({ weather }: WeatherWidgetProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">Weather</h3>
          <Cloud className="w-5 h-5 text-blue-300" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{weather.temperature}°C</div>
            <div className="text-sm text-white/70">{weather.condition}</div>
          </div>
          <div className="text-right text-sm text-white/70">
            <div>Humidity: {weather.humidity}%</div>
            <div>Wind: {weather.windSpeed} km/h</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
