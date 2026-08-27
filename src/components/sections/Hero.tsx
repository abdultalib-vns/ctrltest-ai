import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles, Terminal, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import HeroScene from "./HeroScene";
import HeroFileTree from "./HeroFileTree";
import { useWaitlist } from "@/context/WaitlistContext";

export default function Hero() {
  const { openWaitlist } = useWaitlist();

  return (
    <section className="relative min-h-[92vh] overflow-hidden flex items-center pt-24 pb-16 bg-[#08090D]">
      <HeroScene />

      {/* Brutalist Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      
      {/* Neo Accent Glows */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-[#00F0FF]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-[#FFE600]/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#FF2E93]/8 blur-[160px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto w-full px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Copy & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            {/* Top Sticker Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#12141D] border-2 border-[#FFE600] shadow-[3px_3px_0_0_#FFE600] mb-6 group"
            >
              <Zap size={14} className="text-[#FFE600] fill-[#FFE600]" />
              <span className="text-xs font-mono font-black uppercase tracking-wider text-white">
                AI TEST AUTOMATION ENGINE FOR VS CODE
              </span>
            </motion.div>

            {/* Brutalist Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.08] tracking-tight mb-6 uppercase">
              GENERATE FULL{" "}
              <span className="inline-block bg-[#FFE600] text-black px-2.5 py-0.5 border-2 border-black shadow-[4px_4px_0_0_#00F0FF] mx-1">
                TEST FRAMEWORKS
              </span>{" "}
              IN UNDER 2 MINUTES.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-xl leading-relaxed font-sans">
              Stop spending days writing boilerplate. CtrlTest AI builds complete, production-ready test suites — configs, helpers, page objects, specs, and CI/CD pipelines — natively in VS Code.
            </p>

            {/* Dual CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={openWaitlist}
                className="brutal-btn bg-[#FFE600] text-black border-2 border-black shadow-[4px_4px_0_0_#00F0FF] hover:shadow-[1px_1px_0_0_#00F0FF] text-sm h-12 px-7 font-black tracking-wider flex items-center gap-2.5"
              >
                <Download size={18} /> DOWNLOAD VSIX
              </button>
              <a
                href="#demo"
                className="brutal-btn bg-[#10121A] text-white border-2 border-[#282B37] hover:border-white shadow-[4px_4px_0_0_#FF2E93] hover:shadow-[1px_1px_0_0_#FF2E93] text-sm h-12 px-7 font-bold tracking-wider flex items-center gap-2"
              >
                <Terminal size={17} className="text-[#FF2E93]" />
                TRY LIVE DEMO <ArrowRight size={16} />
              </a>
            </div>

            {/* Key Value Feature Pills */}
            <div className="flex flex-wrap gap-3 sm:gap-5 pt-2 border-t-2 border-[#1E2230]">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-gray-300">
                <CheckCircle2 size={15} className="text-[#00FF66]" /> 12+ Frameworks Supported
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-gray-300">
                <CheckCircle2 size={15} className="text-[#00F0FF]" /> GitHub Copilot & Claude Powered
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-gray-300">
                <ShieldCheck size={15} className="text-[#FFE600]" /> 100% Local Workspace Safe
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Explorer Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Brutalist Backdrop Offset Layer */}
              <div className="absolute -inset-1.5 bg-gradient-to-br from-[#00F0FF] via-[#FFE600] to-[#FF2E93] -z-10 opacity-30" />
              <HeroFileTree />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
