import { useState } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [generatedCode, setGeneratedCode] = useState('');
  const [prompt, setPrompt] = useState('A sleek pricing section with 3 responsive cards');
  // Naya state Brand URL ke liye
  const [brandUrl, setBrandUrl] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('preview');

  const generateUI = () => {
    setLoading(true);
    setGeneratedCode('');
    
    // API URL mein prompt ke saath brand parameter bhi bhej rahe hain
    const apiUrl = `http://localhost:8080/api/v1/ui/generate?prompt=${encodeURIComponent(prompt)}&brand=${encodeURIComponent(brandUrl)}`;
    
    fetch(apiUrl)
      .then(res => res.text())
      .then(htmlString => {
        setGeneratedCode(htmlString);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden relative selection:bg-purple-500 font-sans">
      
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 p-4 md:p-8 flex flex-col items-center min-h-screen max-w-7xl mx-auto">
        
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-2 text-center mt-6">
          AI Studio Pro
        </h1>
        <p className="text-gray-400 mb-8 tracking-wide">With Brand Chameleon 🦎</p>

        {/* Chameleon Inputs */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-3 rounded-2xl flex flex-col gap-3 w-full shadow-2xl z-20 mb-8">
          
          <div className="flex flex-col md:flex-row gap-3">
            {/* Prompt Input */}
            <div className="flex-grow flex flex-col">
              <label className="text-xs text-purple-300 uppercase font-bold ml-2 mb-1 tracking-wider">What to build?</label>
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-black/30 border border-white/5 rounded-xl p-3 outline-none text-white placeholder-gray-500 w-full focus:border-purple-500 transition-colors"
                placeholder="E.g., A responsive glassmorphism login form"
                onKeyDown={(e) => e.key === 'Enter' && !loading && generateUI()}
              />
            </div>

            {/* Brand URL Input */}
            <div className="md:w-1/3 flex flex-col">
              <label className="text-xs text-blue-300 uppercase font-bold ml-2 mb-1 tracking-wider">Clone Brand (Optional)</label>
              <input 
                type="text" 
                value={brandUrl}
                onChange={(e) => setBrandUrl(e.target.value)}
                className="bg-black/30 border border-white/5 rounded-xl p-3 outline-none text-white placeholder-gray-500 w-full focus:border-blue-500 transition-colors"
                placeholder="E.g., stripe.com or Spotify"
                onKeyDown={(e) => e.key === 'Enter' && !loading && generateUI()}
              />
            </div>
          </div>

          <button 
            onClick={generateUI}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl font-bold text-lg hover:scale-[1.01] transition-all disabled:opacity-50 tracking-wide mt-1"
          >
            {loading ? 'Synthesizing...' : 'Generate Magic'}
          </button>
        </div>

        {/* Tabs: Preview / Code */}
        {generatedCode && !loading && (
          <div className="flex gap-4 mb-6 bg-white/5 p-1 rounded-xl backdrop-blur-md border border-white/10">
            <button 
              onClick={() => setViewMode('preview')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${viewMode === 'preview' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              👁️ Preview
            </button>
            <button 
              onClick={() => setViewMode('code')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${viewMode === 'code' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              💻 Code
            </button>
          </div>
        )}

        {loading && (
           <div className="mt-10 flex flex-col items-center">
             <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
             <p className="mt-4 text-blue-300 font-medium animate-pulse">Extracting Brand DNA...</p>
           </div>
        )}

        {/* The Display Area */}
        {generatedCode && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            {viewMode === 'preview' ? (
              <div 
                className="w-full p-2 md:p-8"
                dangerouslySetInnerHTML={{ __html: generatedCode }} 
              />
            ) : (
              <div className="w-full p-6 bg-black/60 overflow-x-auto text-green-400 font-mono text-sm leading-relaxed">
                <pre><code>{generatedCode}</code></pre>
              </div>
            )}
          </motion.div>
        )}

      </div>
    </div>
  );
}

export default App;