import React from 'react';
import { motion } from 'framer-motion';
import { Diamond, Info } from 'lucide-react';

// NV Center Visualization Component
export const NVCenterVisualization = ({ language, isDark }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Choose the appropriate HTML file based on theme
  const nvCenterUrl = isDark ? "/nv_center_dark.html" : "/nv_center_light.html";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`backdrop-blur-lg rounded-3xl border overflow-hidden mb-16 ${
        isDark 
          ? 'bg-black/40 border-teal-500/20'
          : 'bg-white/70 border-teal-300/30 shadow-xl'
      }`}
    >
      {/* Header */}
      <div className="p-8 pb-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-2xl ${
              isDark ? 'bg-teal-600/20' : 'bg-teal-100'
            }`}>
              <Diamond className={`${
                isDark ? 'text-teal-400' : 'text-teal-600'
              }`} size={24} />
            </div>
            <div>
              <h2 className={`text-3xl font-bold ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                {language === 'EN' 
                  ? 'Nitrogen-Vacancy Center in Diamond' 
                  : 'ダイヤモンド中の窒素空孔センター'
                }
              </h2>
              <p className={`text-lg ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {language === 'EN' 
                  ? 'Interactive 3D Structure Visualization' 
                  : 'インタラクティブ3D構造可視化'
                }
              </p>
            </div>
          </div>
          <motion.button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`p-3 rounded-xl transition-all duration-300 ${
              isDark 
                ? 'bg-teal-600/20 text-teal-400 hover:bg-teal-600/30'
                : 'bg-teal-100 text-teal-600 hover:bg-teal-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Maximize2 size={20} />
          </motion.button>
        </div>
        
        {/* Description */}
        <div className={`p-6 rounded-2xl mb-6 ${
          isDark ? 'bg-gray-800/40' : 'bg-gray-100/80'
        }`}>
          <div className="flex items-start space-x-4">
            <Info className={`${
              isDark ? 'text-cyan-400' : 'text-cyan-600'
            } flex-shrink-0 mt-1`} size={20} />
            <div className="space-y-2">
              <p className={`${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                {language === 'EN' 
                  ? 'The nitrogen-vacancy (NV) center is a point defect in diamond consisting of a nitrogen atom (N) adjacent to a vacancy (V) in the crystal lattice. This quantum defect serves as the foundation for our quantum sensing research.'
                  : '窒素空孔（NV）センターは、結晶格子内の空孔（V）に隣接する窒素原子（N）からなるダイヤモンドの点欠陥です。この量子欠陥は、私たちの量子センシング研究の基礎となっています。'
                }
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    isDark ? 'bg-gray-500' : 'bg-gray-600'
                  }`}></div>
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {language === 'EN' ? 'Carbon atoms' : '炭素原子'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {language === 'EN' ? 'Nitrogen atom' : '窒素原子'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {language === 'EN' ? 'Vacancy' : '空孔'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Visualization */}
      <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black/95' : 'relative'}`}>
        {isFullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 z-10 p-3 bg-teal-600/20 text-teal-400 hover:bg-teal-600/30 rounded-xl transition-all duration-300"
          >
            <Maximize2 size={20} />
          </button>
        )}
        <div className={`${
          isFullscreen 
            ? 'w-full h-full p-8' 
            : 'h-96 md:h-[500px] lg:h-[600px]'
        }`}>
          <iframe
            src={nvCenterUrl}
            title="NV Center Visualization"
            className="w-full h-full border-0 rounded-xl"
            style={{ 
              minHeight: isFullscreen ? '100vh' : '400px'
            }}
          />
        </div>
      </div>
      
      {/* Controls/Info */}
      {!isFullscreen && (
        <div className="p-6 pt-0">
          <div className={`text-sm text-center ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {language === 'EN' 
              ? 'Click and drag to rotate • Scroll to zoom • Click fullscreen for detailed view'
              : 'クリックしてドラッグで回転 • スクロールでズーム • フルスクリーンで詳細表示'
            }
          </div>
        </div>
      )}
    </motion.div>
  );
};