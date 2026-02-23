import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Play, Tv, Globe, Search } from 'lucide-react';
import { channels } from '../data/channels';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500 selection:text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-indigo-900/40 to-black pb-12 pt-20 md:pt-32 px-4">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-xs font-medium tracking-wider mb-6 text-indigo-300">
              T20 WORLD CUP 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-6 bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
              Crixzy Live Stream
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Experience the thrill of cricket. Watch live matches, explore channels, and discover movies all in one place.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#channels" 
                className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" /> Start Watching
              </a>
              <a 
                href="https://t.me/+OACGYQBHrIJmM2Y1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 bg-white/10 border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                Join Telegram
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Channels Grid */}
      <div id="channels" className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold font-display">Live Channels</h2>
          <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-medium text-red-400 uppercase tracking-widest">Live Now</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.map((channel, index) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/watch/${channel.id}`} className="group block relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative bg-[#111] border border-white/10 rounded-2xl p-6 h-full hover:border-indigo-500/50 transition-colors duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                    <Tv className="w-24 h-24" />
                  </div>
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${channel.type === 'sports' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>
                      {channel.type === 'sports' ? <Globe className="w-6 h-6" /> : <Tv className="w-6 h-6" />}
                    </div>
                    <span className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-1 rounded bg-black/50">
                      {channel.language}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{channel.name}</h3>
                  <p className="text-sm text-gray-400 mb-6 line-clamp-2">
                    Watch live streaming of {channel.name} in high quality. Don't miss any action from the T20 World Cup.
                  </p>
                  
                  <div className="flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform duration-300">
                    Watch Stream <Play className="w-3 h-3 ml-2 fill-current" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Movie Search Promo */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-gray-900 to-black border border-white/10 p-8 md:p-12"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop')] bg-cover opacity-10 mix-blend-overlay" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold font-display mb-4">Looking for Movies?</h2>
              <p className="text-gray-400 mb-6">
                Discover thousands of movies and TV shows instantly with our powerful search engine.
              </p>
              <a 
                href="https://starry7c.github.io/search-movie/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-semibold transition-colors backdrop-blur-sm"
              >
                <Search className="w-4 h-4 mr-2" /> Search Movies
              </a>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl rotate-12">
                <span className="text-2xl">🎬</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
