import { ideSupport } from "@/lib/constants";
import { Monitor, Cloud, Terminal, Check, Clock, ShieldCheck, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, any> = {
  Monitor, Cloud, Terminal,
};

const prerequisites = [
  { text: "VS Code 1.93+ (or Cursor / Windsurf)", highlight: "Core Host" },
  { text: "GitHub Copilot Extension installed & active", highlight: "AI Engine" },
  { text: "Active GitHub Copilot subscription or Claude API", highlight: "LLM Provider" },
  { text: "Node.js 18+ runtime recommended", highlight: "Runtime" },
];

export default function IDESetup() {
  return (
    <section className="py-28 relative bg-[#08090D] border-b-2 border-[#1E2230]">
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#10121A] border-2 border-[#00FF66] text-[#00FF66] font-mono text-xs font-black uppercase tracking-widest mb-4 shadow-[3px_3px_0_0_#00FF66]">
            💻 ENVIRONMENT COMPATIBILITY
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            IDE & <span className="bg-[#00FF66] text-black px-2 py-0.5 border-2 border-black shadow-[3px_3px_0_0_#00F0FF] inline-block">SETUP REQUIREMENTS</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg font-sans">
            Runs natively inside your existing developer workflow with zero cloud dependencies.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Requirements & Quick Start */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Prerequisites Card */}
            <div className="bg-[#10121A] border-2 border-[#282B37] shadow-[5px_5px_0_0_#00F0FF] p-6 sm:p-7">
              <div className="flex items-center justify-between pb-4 mb-5 border-b-2 border-[#282B37]">
                <h3 className="text-lg font-black font-mono uppercase text-white tracking-wide">
                  01 // PREREQUISITES
                </h3>
                <span className="text-[10px] font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 border border-[#00F0FF]/30">
                  REQUIRED
                </span>
              </div>
              <ul className="space-y-3.5">
                {prerequisites.map((p) => (
                  <li key={p.text} className="flex items-center justify-between gap-3 text-sm text-gray-300 font-sans">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-[#00FF66] text-black flex items-center justify-center font-bold text-xs shrink-0 border border-black">
                        ✓
                      </div>
                      <span>{p.text}</span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-gray-500 bg-[#161924] px-1.5 py-0.5 border border-[#282B37] shrink-0">
                      {p.highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quickstart Flow */}
            <div className="bg-[#10121A] border-2 border-[#282B37] shadow-[5px_5px_0_0_#FFE600] p-6 sm:p-7">
              <div className="flex items-center justify-between pb-4 mb-5 border-b-2 border-[#282B37]">
                <h3 className="text-lg font-black font-mono uppercase text-white tracking-wide">
                  02 // QUICK LAUNCH
                </h3>
                <span className="text-[10px] font-mono font-bold text-[#FFE600] bg-[#FFE600]/10 px-2 py-0.5 border border-[#FFE600]/30">
                  30 SECONDS
                </span>
              </div>
              <div className="space-y-3 font-mono text-xs">
                {[
                  "Install VSIX extension in VS Code",
                  "Press Ctrl+Shift+P → 'CtrlTest AI: Open Panel'",
                  "Choose your stack & generate instantly",
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 bg-[#161924] border border-[#282B37]">
                    <span className="w-6 h-6 bg-[#FFE600] text-black font-black flex items-center justify-center text-xs shrink-0 border border-black">
                      {i + 1}
                    </span>
                    <span className="text-gray-300 font-medium">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: IDE Compatibility Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {ideSupport.map((ide, i) => {
              const Icon = iconMap[ide.icon];
              const isSupported = ide.status === "supported";
              return (
                <motion.div
                  key={ide.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`bg-[#10121A] border-2 border-[#282B37] hover:border-white p-5 text-center transition-all duration-150 group ${
                    isSupported ? "shadow-[4px_4px_0_0_#00FF66]" : "shadow-[4px_4px_0_0_#282B37]"
                  }`}
                >
                  <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3 bg-[#161924] border-2 border-[#282B37] group-hover:border-white transition-colors">
                    <Icon size={22} className={isSupported ? "text-[#00F0FF]" : "text-gray-500"} />
                  </div>
                  <div className="text-sm font-mono font-black uppercase text-white mb-2">{ide.name}</div>
                  <span
                    className={`inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 border ${
                      isSupported
                        ? "bg-[#00FF66]/10 text-[#00FF66] border-[#00FF66]/40"
                        : "bg-[#161924] text-gray-500 border-[#282B37]"
                    }`}
                  >
                    {isSupported ? "✓ SUPPORTED" : "COMING SOON"}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
