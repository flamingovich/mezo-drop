
import React, { useState, useMemo } from 'react';
import { 
  DollarSign,
  Coins
} from 'lucide-react';
import { INITIAL_PARAMS, TOTAL_SUPPLY } from './constants';
import { MezoParams, EstimationResults } from './types';

const MezoLogo = ({ className }: { className?: string }) => (
  <div className={`relative flex items-center justify-center bg-white rounded-full ${className}`}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#9e1a44" strokeWidth="4" strokeLinecap="round" className="w-1/2 h-1/2">
      <path d="M4 12c2-4 4-4 6 0s4 4 6 0 2-4 4-4" />
    </svg>
  </div>
);

const FloatingToken = ({ style, delay = "0s", duration = "15s" }: { style: React.CSSProperties, delay?: string, duration?: string }) => (
  <div className="absolute pointer-events-none animate-fly" style={{ ...style, animationDelay: delay, animationDuration: duration }}>
    <div className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-2xl">
       <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" className="w-10 h-10 opacity-60">
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
    if (value === "") {
      setParams(prev => ({ ...prev, [field]: "" }));
      return;
    }
    setParams(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#1a050c] text-white relative overflow-hidden flex flex-col reformat-ll">
      {/* Liquid Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="liquid-blob w-[500px] h-[500px] bg-[#9e1a44] -top-48 -left-24" />
        <div className="liquid-blob w-[600px] h-[600px] bg-[#4a1028] bottom-[-100px] right-[-100px]" style={{ animationDelay: '-5s' }} />
        <div className="liquid-blob w-[400px] h-[400px] bg-[#e6004d] top-[30%] right-[10%] opacity-20" style={{ animationDelay: '-10s' }} />
        
        <FloatingToken style={{ top: '15%', right: '12%' }} delay="0s" duration="20s" />
        <FloatingToken style={{ bottom: '20%', left: '8%' }} delay="-4s" duration="25s" />
        <FloatingToken style={{ top: '65%', right: '18%' }} delay="-8s" duration="22s" />
      </div>

      <nav className="relative z-10 max-w-7xl mx-auto w-full px-8 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MezoLogo className="w-10 h-10 shadow-lg" />
          <span className="text-2xl font-black tracking-tighter opacity-90">Mezo</span>
        </div>
        <div className="hidden md:flex gap-10 text-[11px] font-black uppercase tracking-[0.2em] opacity-40">
          <a href="#" className="hover:opacity-100 transition-opacity">Protocol</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Ecosystem</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Docs</a>
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-8 animate-fade-up">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest opacity-60">
              Community Rewards Estimator
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
              Calculate<br />Your Rewards.
            </h1>
            <p className="text-lg opacity-50 max-w-md font-medium leading-relaxed">
              Analyze your Mezo Mats allocation based on projected market performance. 1B total supply protocol design.
            </p>
          </div>

          <div className="liquid-glass p-10 rounded-[2.5rem] shadow-2xl space-y-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Mezo Mats Holding</label>
                <div className="px-3 py-1 rounded-lg bg-white/5 text-[10px] font-bold text-white/60">
                  {formatNum(Number(params.userTokens) || 0, 0)}
                </div>
              </div>
              <div className="flex items-center gap-5 bg-black/20 border border-white/5 rounded-3xl px-6 py-5 focus-within:border-white/20 transition-all">
                <Coins className="w-6 h-6 opacity-30" />
                <input 
                  type="number"
                  value={params.userTokens}
                  onChange={(e) => handleInputChange('userTokens', e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 text-3xl font-black text-white placeholder:opacity-20"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Expected FDV (Market Cap)</label>
                <div className="px-3 py-1 rounded-lg bg-white/5 text-[10px] font-bold text-white/60">
                  ${formatNum(Number(params.expectedMarketCap) || 0, 0)}
                </div>
              </div>
              <div className="flex items-center gap-5 bg-black/20 border border-white/5 rounded-3xl px-6 py-5 focus-within:border-white/20 transition-all">
                <DollarSign className="w-6 h-6 opacity-30" />
                <input 
                  type="number"
                  value={params.expectedMarketCap}
                  onChange={(e) => handleInputChange('expectedMarketCap', e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 text-3xl font-black text-white placeholder:opacity-20"
                  placeholder="100 000 000"
                />
              </div>
              <div className="px-2">
                <input 
                  type="range"
                  min="10000000"
                  max="300000000"
                  step="1000000"
                  value={Number(params.expectedMarketCap) || 10000000}
                  onChange={(e) => handleInputChange('expectedMarketCap', e.target.value)}
                  className="w-full appearance-none bg-white/10 rounded-full h-1"
                />
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest opacity-20 mt-4">
                  <span>$10M FDV</span>
                  <span>$300M FDV</span>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-white/5 space-y-8">
              <div className="text-center group">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mb-3 group-hover:opacity-50 transition-opacity">Projected Allocation Value</p>
                <div className="text-7xl font-black tracking-tighter tabular-nums drop-shadow-sm">
                  ${formatNum(results.estimatedValueUsd)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-black/20 rounded-3xl p-6 border border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-2">Token Price</p>
                  <p className="text-xl font-black tracking-tight">${formatNum(results.tokenPriceAtMcap, 4)}</p>
                </div>
                <div className="bg-black/20 rounded-3xl p-6 border border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-2">Mats Supply</p>
                  <p className="text-xl font-black tracking-tight">{formatSimple(1000000000 / 1000000000)}.0B</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <footer className="relative z-10 py-10 px-8 flex flex-col md:flex-row items-center justify-between border-t border-white/5">
        <div className="flex items-center gap-3 mb-6 md:mb-0 opacity-40 hover:opacity-100 transition-opacity">
          <MezoLogo className="w-6 h-6 grayscale" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Mezo Mats Protocol</span>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-20">
          SECURE • DECENTRALIZED • 2024
        </div>
      </footer>
    </div>
  );
};

export default App;
