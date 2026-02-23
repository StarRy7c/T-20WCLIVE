import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Copy, Check, ArrowLeft, Search, X } from 'lucide-react';
import { channels } from '../data/channels';

export default function Watch() {
  const { channelId } = useParams();
  const channel = channels.find(c => c.id === channelId);
  const [copied, setCopied] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showTelegramModal, setShowTelegramModal] = useState(false);

  useEffect(() => {
    // Show modal after a short delay if not seen before
    const hasSeenPopup = sessionStorage.getItem('telegram_popup_seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowTelegramModal(true);
        sessionStorage.setItem('telegram_popup_seen', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Lazy load simulation
    const timer = setTimeout(() => setIframeLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!channel) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <h1 className="text-2xl font-bold mb-4">Channel Not Found</h1>
        <Link to="/" className="text-blue-400 hover:underline">Go Home</Link>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareText = `Check out this amazing stream on Crixzy! 🎬 ${channel.name}`;

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
    window.open(url, "_blank");
  };

  const handleTelegramShare = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      alert("Failed to copy link.");
    });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden relative">
      {/* Alert Banner */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 text-center py-2 px-3 text-sm font-semibold shadow-lg z-40"
      >
        <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shine_3s_infinite]" />
        <span>🎬 Share The Links With Your Friends & Enjoy Together! 🎉</span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto p-4 md:p-6 pb-20">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Channels
        </Link>

        {/* Player Wrapper */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="relative w-full pb-[56.25%] bg-[#111] rounded-xl overflow-hidden shadow-2xl border border-white/10">
            {iframeLoaded && (
              <iframe
                id="contentFrame"
                sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
                allow="encrypted-media"
                allowFullScreen
                scrolling="no"
                src={channel.url}
                className="absolute top-0 left-0 w-full h-full border-0 opacity-0 transition-opacity duration-500 ease-in-out"
                onLoad={(e) => e.currentTarget.style.opacity = '1'}
              />
            )}
          </div>
          <h1 className="mt-4 text-xl md:text-2xl font-bold font-display">{channel.name}</h1>
        </motion.div>

        {/* Share Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">📤 Share This Stream</h2>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={handleWhatsAppShare}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-lg font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all active:translate-y-0"
            >
              <Share2 className="w-4 h-4" /> WhatsApp
            </button>
            <button 
              onClick={handleTelegramShare}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-[#0088cc] to-[#005f8c] rounded-lg font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all active:translate-y-0"
            >
              <Share2 className="w-4 h-4" /> Telegram
            </button>
            <button 
              onClick={handleCopyLink}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all active:translate-y-0 ${
                copied ? 'bg-gradient-to-br from-green-600 to-green-700' : 'bg-gradient-to-br from-gray-600 to-gray-700'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </motion.div>

        {/* Telegram Join */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-center mb-8"
        >
          <a 
            href="https://t.me/+OACGYQBHrIJmM2Y1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#0088cc] to-[#005f8c] rounded-full font-bold text-sm md:text-base shadow-[0_4px_20px_rgba(0,136,204,0.4)] hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,136,204,0.6)] transition-all"
          >
            <span>🚀</span> Join Our Telegram Channel
          </a>
        </motion.div>

        {/* Search Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="p-6 bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-2xl shadow-xl border border-white/5"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            🔍 Search & Watch Any Movie
          </h3>
          <p className="text-gray-400 text-sm mb-6">Discover thousands of movies and shows instantly</p>
          
          <a 
            href="https://starry7c.github.io/search-movie/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full"
          >
            <button className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl font-bold text-white shadow-lg hover:-translate-y-0.5 hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Search Movies & TV Shows
            </button>
          </a>
          
          <div className="mt-4 text-center">
            <span className="text-xs text-gray-500">✨ Click above to explore our complete movie library</span>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-white/10 text-center text-gray-500 text-xs">
          <p>© 2026 Crixzy | Made with ❤️ for cricket lovers</p>
          <p className="mt-1">Join our community for latest updates and exclusive content</p>
        </footer>
      </div>

      {/* Telegram Modal */}
      <AnimatePresence>
        {showTelegramModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setShowTelegramModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Join Our Telegram</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Get instant updates on live matches, new movies, and exclusive content!
                </p>
                
                <div className="flex flex-col gap-3">
                  <a 
                    href="https://t.me/+OACGYQBHrIJmM2Y1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => setShowTelegramModal(false)}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-colors"
                  >
                    Join Channel
                  </a>
                  <button 
                    onClick={() => setShowTelegramModal(false)}
                    className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl font-semibold transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
