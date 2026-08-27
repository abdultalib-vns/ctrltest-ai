import { motion } from "framer-motion";
import { Download, ShieldCheck, Terminal, Package, ArrowRight } from "lucide-react";
import { useWaitlist } from "@/context/WaitlistContext";

const steps = [
  { n: "01", title: "DOWNLOAD VSIX", body: "Download the verified extension binary directly from this site.", color: "#FFE600", shadow: "shadow-[4px_4px_0_0_#FFE600]" },
  { n: "02", title: "INSTALL IN VS CODE", body: "Open Extensions view (Ctrl+Shift+X) → click '⋯' → 'Install from VSIX…'", color: "#00F0FF", shadow: "shadow-[4px_4px_0_0_#00F0FF]" },
  { n: "03", title: "RELOAD & LAUNCH", body: "Run 'Developer: Reload Window' and launch CtrlTest from the activity bar.", color: "#00FF66", shadow: "shadow-[4px_4px_0_0_#00FF66]" },
];

export default function Installation() {
  const { openWaitlist } = useWaitlist();

  return (
    <section id="install" className="py-28 relative bg-[#0A0C13] border-b-2 border-[#1E2230]">
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="bg-[#10121A] border-2 border-[#282B37] shadow-[6px_6px_0_0_#FF2E93] p-8 sm:p-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#161924] border border-[#FF2E93] text-[#FF2E93] font-mono text-xs font-black uppercase tracking-widest mb-4">
              <Package size={14} /> STANDALONE VSIX PACKAGE
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              ONE INSTALLER. YOUR LOCAL VS CODE WORKSPACE.
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-sans mb-8">
              CtrlTest AI is packaged and published as a verified VSIX bundle for local installation. Your generation workflows and source code stay private where your project lives.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={openWaitlist}
                className="brutal-btn bg-[#FFE600] text-black border-2 border-black shadow-[4px_4px_0_0_#00F0FF] hover:shadow-[1px_1px_0_0_#00F0FF] text-sm h-12 px-7 font-black tracking-wider flex items-center gap-2.5"
              >
                <Download size={18} /> DOWNLOAD CURRENT VSIX (v2.0.17)
              </button>
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-[#161924] border border-[#282B37] text-xs font-mono text-gray-300">
                <ShieldCheck size={16} className="text-[#00FF66]" />
                <span>ctrltest-ai-2.0.17.vsix // SHA-256 VERIFIED</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3 Step Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-[#10121A] border-2 border-[#282B37] hover:border-white p-7 ${s.shadow} transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 group`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-black text-black px-2.5 py-0.5 border border-black" style={{ backgroundColor: s.color }}>
                  STEP {s.n}
                </span>
                <span className="text-xs font-mono text-muted-foreground">SETUP_0{i + 1}</span>
              </div>
              <h3 className="text-lg font-mono font-black uppercase text-white mb-2">{s.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
