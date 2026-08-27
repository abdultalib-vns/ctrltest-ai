import { features } from "@/lib/constants";
import { Sparkles, Layers, GitBranch, Settings, Bug, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, any> = {
  Sparkles, Layers, GitBranch, Settings, Bug,
};

const cardThemes = [
  { color: "#FFE600", shadow: "shadow-[5px_5px_0_0_#FFE600]", border: "#FFE600", tag: "MODULE_01 // AI_GENERATION", bg: "bg-[#FFE600]/10" },
  { color: "#00F0FF", shadow: "shadow-[5px_5px_0_0_#00F0FF]", border: "#00F0FF", tag: "MODULE_02 // MULTI_FRAMEWORK", bg: "bg-[#00F0FF]/10" },
  { color: "#FF2E93", shadow: "shadow-[5px_5px_0_0_#FF2E93]", border: "#FF2E93", tag: "MODULE_03 // CI_CD_PIPELINES", bg: "bg-[#FF2E93]/10" },
  { color: "#00FF66", shadow: "shadow-[5px_5px_0_0_#00FF66]", border: "#00FF66", tag: "MODULE_04 // MULTI_ENV_CONFIG", bg: "bg-[#00FF66]/10" },
  { color: "#9D4EDD", shadow: "shadow-[5px_5px_0_0_#9D4EDD]", border: "#9D4EDD", tag: "MODULE_05 // SMART_DEBUGGING", bg: "bg-[#9D4EDD]/10" },
];

export default function Features() {
  return (
    <section id="features" className="py-28 relative bg-[#08090D] border-b-2 border-[#1E2230]">
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#10121A] border-2 border-[#00F0FF] text-[#00F0FF] font-mono text-xs font-black uppercase tracking-widest mb-4 shadow-[3px_3px_0_0_#00F0FF]">
            ⚡ CORE CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            EVERYTHING NEEDED TO <span className="bg-[#FFE600] text-black px-2 py-0.5 border-2 border-black shadow-[3px_3px_0_0_#FF2E93] inline-block">SHIP TESTS 10X FASTER</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg font-sans">
            From single-command framework generation to automated CI/CD pipelines — CtrlTest AI handles the entire testing infrastructure.
          </p>
        </motion.div>

        {/* Large Feature Cards (2 Grid) */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {features.filter((f) => f.large).map((f, i) => {
            const Icon = iconMap[f.icon];
            const theme = cardThemes[i];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-[#10121A] border-2 border-[#282B37] hover:border-white p-7 sm:p-9 ${theme.shadow} transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 group`}
              >
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-1 bg-[#161924] border border-[#282B37] text-gray-300">
                    {theme.tag}
                  </span>
                  <div
                    className="w-12 h-12 flex items-center justify-center border-2 border-black"
                    style={{ backgroundColor: theme.color }}
                  >
                    <Icon size={22} className="text-black font-black" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black font-mono uppercase text-white mb-3 tracking-tight group-hover:text-[#FFE600] transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-sans">
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Regular Feature Cards (3 Grid) */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.filter((f) => !f.large).map((f, i) => {
            const Icon = iconMap[f.icon];
            const theme = cardThemes[2 + i];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={`bg-[#10121A] border-2 border-[#282B37] hover:border-white p-6 sm:p-7 ${theme.shadow} transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 group flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-10 h-10 flex items-center justify-center border-2 border-black"
                      style={{ backgroundColor: theme.color }}
                    >
                      <Icon size={18} className="text-black" />
                    </div>
                    <span className="text-[9px] font-mono font-black uppercase tracking-wider px-2 py-0.5 bg-[#161924] border border-[#282B37] text-gray-400">
                      {theme.tag.split("//")[1]}
                    </span>
                  </div>
                  <h3 className="text-lg font-black font-mono uppercase text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed font-sans">
                    {f.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
