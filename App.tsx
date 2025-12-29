
import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Minus, 
  TrendingUp, 
  Info,
  DollarSign,
  Coins
} from 'lucide-react';
import { INITIAL_PARAMS, TOTAL_SUPPLY } from './constants';
import { MezoParams, EstimationResults } from './types';

// Custom Mezo Logo Component mimicking the wavy pill icon
const MezoLogo = ({ className }: { className?: string }) => (
  <div className={`relative flex items-center justify-center bg-white rounded-full ${className}`}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#e6004d" strokeWidth="4" strokeLinecap="round" className="w-1/2 h-1/2">
      <path d="M4 12c2-4 4-4 6 0s4 4 6 0 2-4 4-4" />
    </svg>
  </div>
);

const FloatingToken = ({ style, delay = "0s", duration = "12s" }: { style: React.CSSProperties, delay?: string, duration?: string }) => (
  <div className="absolute pointer-events-none opacity-30 animate-fly" style={{ ...style, animationDelay: delay, animationDuration: duration }}>
    <div className="w-24 h-24 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center shadow-lg">
       <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" className="w-12 h-12">
        <path d="M4 12c2-4 4-4 6 0s4 4 6 0 2-4 4-4" />
      </svg>
    </div>
  </div>
);

const App: React.FC = () => {
  const [params, setParams] = useState<MezoParams>(INITIAL_PARAMS);

  const results: EstimationResults = useMemo(() => {
    const mcap = Number(params.expectedMarketCap) || 0;
    const tokens = Number(params.userTokens) || 0;
    const tokenPriceAtMcap = mcap / TOTAL_SUPPLY;
    const estimatedValueUsd = tokens * tokenPriceAtMcap;

    return {
      estimatedValueUsd,
      tokenPriceAtMcap
    };
  }, [params]);

  // Helper for formatting according to the user's request (1 000 000,00)
  const formatNum = (num: number, decimals: number = 2) => {
    return num.toLocaleString('ru-RU', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  const formatSimple = (num: number) => {
    return num.toLocaleString('ru-RU');
  };

  const handleInputChange = (field: keyof MezoParams, value: string) => {
    // If it's an empty string, allow it so the user can clear the input
    if (value === "") {
      setParams(prev => ({ ...prev, [field]: "" }));
      return;
    }
    
    // Otherwise, parse it as a number but keep it as a string if we want to avoid 
    // leading zeros in the input value while typing.
    // However, keeping it as the raw value from the input is best for UX.
    setParams(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#e6004d] text-white relative overflow-hidden flex flex-col reformat-ll">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="bg-glow top-[-10%] left-[-10%]" />
        <div className="bg-glow bottom-[-20%] right-[-10%] animation-delay-4000" style={{ animationDelay: '4s' }} />
        
        {/* Animated Tokens flying around */}
        <FloatingToken style={{ top: '15%', right: '10%' }} delay="0s" duration="15s" />
        <FloatingToken style={{ bottom: '25%', left: '5%' }} delay="-3s" duration="18s" />
        <FloatingToken style={{ top: '60%', right: '20%' }} delay="-7s" duration="14s" />
        <FloatingToken style={{ top: '5%', left: '30%', transform: 'scale(0.6)' }} delay="-10s" duration="20s" />
        <FloatingToken style={{ bottom: '10%', right: '45%', transform: 'scale(0.8)' }} delay="-5s" duration="16s" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MezoLogo className="w-8 h-8" />
          <span className="text-2xl font-black tracking-tighter">Mezo</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold">
          <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Why Mezo?</a>
          <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Participate</a>
          <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">FAQs</a>
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Hero Text */}
          <div className="space-y-6 animate-fade-up">
            <h1 className="text-6xl md:text-7xl font-black leading-[0.95] tracking-tight">
              Estimate your<br />
              Mezo allocation.
            </h1>
            <p className="text-xl opacity-90 max-w-md font-medium leading-relaxed">
              Based on a total supply of 1 billion Mezo Mats. Enter your token count and expected FDV to calculate your rewards.
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[2rem] shadow-2xl space-y-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            
            {/* User Token Input */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-xs font-black uppercase tracking-widest opacity-70">Your Mezo Mats Tokens</label>
                <span className="text-[10px] font-black bg-white/10 px-2 py-0.5 rounded text-white/80">{formatNum(Number(params.userTokens) || 0, 0)}</span>
              </div>
              <div className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-2xl px-5 py-4 focus-within:border-white/50 transition-all">
                <Coins className="w-5 h-5 opacity-60" />
                <input 
                  type="number"
                  value={params.userTokens}
                  onChange={(e) => handleInputChange('userTokens', e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 text-2xl font-black text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="0"
                />
              </div>
            </div>

            {/* FDV Input */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-xs font-black uppercase tracking-widest opacity-70">Expected FDV (Target Market Cap)</label>
                <span className="text-[10px] font-black bg-white/10 px-2 py-0.5 rounded text-white/80">${formatNum(Number(params.expectedMarketCap) || 0, 0)}</span>
              </div>
              <div className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-2xl px-5 py-4 focus-within:border-white/50 transition-all">
                <DollarSign className="w-5 h-5 opacity-60" />
                <input 
                  type="number"
                  value={params.expectedMarketCap}
                  onChange={(e) => handleInputChange('expectedMarketCap', e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 text-2xl font-black text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="100 000 000"
                />
              </div>
              <input 
                type="range"
                min="10000000"
                max="300000000"
                step="1000000"
                value={Number(params.expectedMarketCap) || 10000000}
                onChange={(e) => handleInputChange('expectedMarketCap', e.target.value)}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[8px] font-black uppercase tracking-widest opacity-40">
                <span>10M</span>
                <span>300M</span>
              </div>
            </div>

            {/* Results Area */}
            <div className="pt-8 border-t border-white/10 space-y-6">
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Estimated Value</p>
                <div className="text-6xl font-black tracking-tighter">
                  ${formatNum(results.estimatedValueUsd)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-[9px] font-black uppercase opacity-50 mb-1">Price Per Token</p>
                  <p className="text-lg font-black">${formatNum(results.tokenPriceAtMcap, 4)}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-[9px] font-black uppercase opacity-50 mb-1">Network Supply</p>
                  <p className="text-lg font-black">{formatSimple(1000000000 / 1000000000)}.0B</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <footer className="relative z-10 py-12 px-6 flex flex-col md:flex-row items-center justify-between border-t border-white/10 bg-[#e6004d]">
        <div className="flex items-center gap-2 mb-4 md:mb-0 opacity-80">
          <MezoLogo className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-widest">Mezo Mats Protocol</span>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest opacity-50">
          © 2024 Mezo. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
