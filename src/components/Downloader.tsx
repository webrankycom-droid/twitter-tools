import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  Twitter, 
  CheckCircle2, 
  ArrowRight,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  Film,
  Play,
  ClipboardPaste,
  Download
} from 'lucide-react';

export interface MediaVariant {
  quality: string;
  url: string;
  size: string;
}

export interface MediaItem {
  type: 'video' | 'image' | 'gif';
  label: string;
  variants: MediaVariant[];
}

export interface DownloadResult {
  id: string;
  title: string;
  thumbnail: string;
  media: MediaItem[];
}

interface DownloaderProps {
  title?: string;
  description?: string;
  showHero?: boolean;
}

export default function Downloader({ 
  title, 
  description,
  showHero = true
}: DownloaderProps) {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [siteName, setSiteName] = useState('XDownloader');

  useEffect(() => {
    fetch('/api/site-info')
      .then(res => res.json())
      .then(data => {
        if (data.site_name) setSiteName(data.site_name);
      })
      .catch(() => {});
  }, []);

  const displayTitle = title || t('hero.title');
  const displayDescription = description || t('hero.subtitle');

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setDetecting(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Something went wrong');
      
      setResult(data);
      setActiveTab(0);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setDetecting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className={`relative ${showHero ? 'pt-10 pb-16' : 'py-8'} overflow-hidden`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          {showHero && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight mb-6">
                {displayTitle.split('Twitter').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && <span className="text-indigo-600">Twitter</span>}
                  </React.Fragment>
                ))}
              </h2>
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                {displayDescription}
              </p>
            </motion.div>
          )}

          {/* Input Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative max-w-2xl mx-auto"
          >
            <form onSubmit={handleDownload} className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-emerald-500 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex flex-col sm:flex-row gap-2 p-2 bg-white rounded-xl shadow-2xl border border-slate-100">
                <div className="flex-grow relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Twitter className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={t('hero.placeholder')}
                    className="w-full pl-12 pr-12 py-4 bg-transparent outline-hidden text-slate-900 placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="absolute inset-y-0 right-2 flex items-center px-2 text-slate-400 hover:text-indigo-600 transition-colors"
                    title="Paste from clipboard"
                  >
                    <ClipboardPaste className="h-5 w-5" />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none min-w-[140px]"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {t('hero.button')}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <AnimatePresence>
              {detecting && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mt-6 flex flex-col items-center gap-3"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                        className="w-2 h-2 bg-indigo-600 rounded-full"
                      />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-indigo-600 animate-pulse">Automatically detecting media types...</p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-4 bg-red-50 border border-red-100 rounded-lg flex items-center gap-3 text-red-700 text-sm"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <AnimatePresence>
        {result && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="max-w-4xl mx-auto px-4 pb-12"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
              <div className="md:w-1/2 aspect-video bg-slate-100 relative group">
                <img 
                  src={result.thumbnail} 
                  alt={result.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold">
                  Media Detected
                </div>
              </div>
              <div className="md:w-1/2 p-8 flex flex-col">
                {result.media.length > 1 && (
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    {result.media.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                          activeTab === idx 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {item.type === 'video' && <Film className="w-4 h-4" />}
                        {item.type === 'image' && <ImageIcon className="w-4 h-4" />}
                        {item.type === 'gif' && <Play className="w-4 h-4" />}
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-display font-bold flex items-center gap-2">
                      {result.media[activeTab].type === 'video' && <Film className="w-5 h-5 text-indigo-600" />}
                      {result.media[activeTab].type === 'image' && <ImageIcon className="w-5 h-5 text-indigo-600" />}
                      {result.media[activeTab].type === 'gif' && <Play className="w-5 h-5 text-indigo-600" />}
                      Download {result.media[activeTab].label}
                    </h2>
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      VERIFIED MEDIA
                    </span>
                  </div>
                  <div className="space-y-3">
                    {result.media[activeTab].variants.map((variant, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
                      >
                        <div>
                          <p className="font-bold text-slate-900">{variant.quality}</p>
                          <p className="text-xs text-slate-500">{variant.size}</p>
                        </div>
                        <a 
                          href={`/api/proxy-download?url=${encodeURIComponent(variant.url)}&filename=${siteName}_${result.id}_${variant.quality.replace(/\s+/g, '_')}.${result.media[activeTab].type === 'image' ? 'jpg' : 'mp4'}`}
                          download
                          className="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2"
                        >
                          Download
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => {setResult(null); setUrl('');}}
                  className="mt-8 text-sm text-slate-500 hover:text-indigo-600 font-medium flex items-center justify-center gap-2"
                >
                  Download another media
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
