import { frameworkBadges, trustStats } from "@/lib/constants";
import { motion } from "framer-motion";
import { Sparkles, Cpu, Layers, Zap, Bot, Terminal } from "lucide-react";

export default function SocialProof() {
  return (
    <section className="py-20 relative overflow-hidden bg-[#0A0C13] border-y-2 border-[#1E2230]">
      {/* Background subtle grid */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        {/* Top Powered by Bar */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 sm:gap-3 flex-wrap justify-center bg-[#10121A] border-2 border-[#282B37] px-4 py-2 shadow-[3px_3px_0_0_#000]"
          >
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#FFE600]">
              <Sparkles size={13} className="text-[#FFE600]" />
              POWERED BY
            </div>
            <div className="h-4 w-[2px] bg-[#282B37] hidden sm:block" />
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#161924] border border-[#3E4357] text-xs font-mono font-semibold text-white">
                <Bot size={13} className="text-[#00F0FF]" /> GitHub Copilot
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#161924] border border-[#3E4357] text-xs font-mono font-semibold text-white">
                <Cpu size={13} className="text-[#FF7700]" /> Claude 3.5 Sonnet
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#161924] border border-[#3E4357] text-xs font-mono font-semibold text-white">
                <Terminal size={13} className="text-[#00FF66]" /> OpenRouter & Ollama
              </span>
            </div>
          </motion.div>
        </div>

        {/* Framework Badges Continuous Marquee */}
        <div className="relative mb-14 overflow-hidden py-2">
          {/* Gradient Edge Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#0A0C13] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#0A0C13] to-transparent z-10 pointer-events-none" />

          {/* Row 1: Forward Marquee */}
          <div className="flex animate-marquee gap-3.5 w-max mb-3">
            {[...frameworkBadges, ...frameworkBadges, ...frameworkBadges].map((f, i) => (
              <div
                key={`r1-${f.name}-${i}`}
                className="shrink-0 group cursor-default flex items-center gap-2.5 px-4 py-2 bg-[#12141D] border-2 border-[#282B37] transition-all duration-150 hover:border-white hover:scale-105"
                style={{
                  boxShadow: `3px 3px 0 0 ${f.color}40`,
                }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-none border"
                  style={{ backgroundColor: f.color, borderColor: f.color }}
                />
                <span className="text-xs font-mono font-bold text-white tracking-wide">
                  {f.name}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground bg-[#1A1D2B] px-1.5 py-0.5 border border-[#282B37]">
                  {f.category}
                </span>
              </div>
            ))}
          </div>

          {/* Row 2: Reverse Marquee for depth & rich motion */}
          <div className="flex animate-marquee-reverse gap-3.5 w-max">
            {[...frameworkBadges.slice().reverse(), ...frameworkBadges.slice().reverse(), ...frameworkBadges.slice().reverse()].map((f, i) => (
              <div
                key={`r2-${f.name}-${i}`}
                className="shrink-0 group cursor-default flex items-center gap-2 px-3.5 py-1.5 bg-[#0F1118] border border-[#282B37] transition-all duration-150 hover:border-white hover:scale-105"
              >
                <span className="w-1.5 h-1.5 rounded-none" style={{ backgroundColor: f.color }} />
                <span className="text-[11px] font-mono font-semibold text-gray-300">
                  {f.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid - High-Impact Brutalist Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#10121A] border-2 border-[#282B37] shadow-[6px_6px_0_0_#FFE600] grid grid-cols-2 lg:grid-cols-4 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#282B37]"
        >
          {trustStats.map((s, i) => (
            <div
              key={s.label}
              className="p-6 md:p-8 flex flex-col justify-between transition-colors hover:bg-[#141722] group"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 border border-[#282B37] bg-[#161924] text-muted-foreground group-hover:text-white transition-colors">
                  {s.tag}
                </span>
                <span className="w-2 h-2" style={{ backgroundColor: s.color }} />
              </div>
              <div>
                <div
                  className="text-3xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight group-hover:scale-105 transition-transform origin-left"
                  style={{ color: s.color }}
                >
                  {s.displayValue}
                </div>
                <div className="text-xs sm:text-sm font-mono text-gray-300 mt-2 font-medium">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
