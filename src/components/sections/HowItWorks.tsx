import { howItWorksSteps } from "@/lib/constants";
import { PanelLeft, ListChecks, Cpu, Play } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, any> = {
  PanelLeft, ListChecks, Cpu, Play,
};

const stepThemes = [
  { color: "#FFE600", shadow: "shadow-[5px_5px_0_0_#FFE600]", numBg: "bg-[#FFE600]", textColor: "text-[#FFE600]" },
  { color: "#00F0FF", shadow: "shadow-[5px_5px_0_0_#00F0FF]", numBg: "bg-[#00F0FF]", textColor: "text-[#00F0FF]" },
  { color: "#FF2E93", shadow: "shadow-[5px_5px_0_0_#FF2E93]", numBg: "bg-[#FF2E93]", textColor: "text-[#FF2E93]" },
  { color: "#00FF66", shadow: "shadow-[5px_5px_0_0_#00FF66]", numBg: "bg-[#00FF66]", textColor: "text-[#00FF66]" },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 relative bg-[#0A0C13] border-b-2 border-[#1E2230]">
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#10121A] border-2 border-[#FFE600] text-[#FFE600] font-mono text-xs font-black uppercase tracking-widest mb-4 shadow-[3px_3px_0_0_#FFE600]">
            ⚙️ EXECUTION PIPELINE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            FOUR STEPS TO A <span className="bg-[#00F0FF] text-black px-2 py-0.5 border-2 border-black shadow-[3px_3px_0_0_#FFE600] inline-block">COMPLETE TEST SUITE</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg font-sans">
            From empty workspace to running production tests in less than a minute.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksSteps.map((step, i) => {
            const Icon = iconMap[step.icon];
            const theme = stepThemes[i];
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`bg-[#10121A] border-2 border-[#282B37] hover:border-white p-6 sm:p-7 ${theme.shadow} transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 group flex flex-col justify-between`}
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-black text-black px-2.5 py-1 border-2 border-black" style={{ backgroundColor: theme.color }}>
                      STEP {step.number}
                    </span>
                    <div
                      className="w-10 h-10 flex items-center justify-center border-2 border-black bg-[#161924]"
                    >
                      <Icon size={20} className={theme.textColor} />
                    </div>
                  </div>

                  <h3 className="text-xl font-black font-mono uppercase text-white mb-3 tracking-tight group-hover:text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    {step.body}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#282B37] flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>STAGE_0{i + 1}</span>
                  <span className="font-bold" style={{ color: theme.color }}>VERIFIED</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
