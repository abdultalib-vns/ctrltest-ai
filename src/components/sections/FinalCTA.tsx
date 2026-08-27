import { Download, ArrowRight, Sparkles, Terminal, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useWaitlist } from "@/context/WaitlistContext";
import { useDeveloperModal } from "@/context/DeveloperModalContext";

export default function FinalCTA() {
  const { openWaitlist } = useWaitlist();
  const { openDeveloperModal } = useDeveloperModal();

  return (
    <section className="py-28 relative overflow-hidden bg-[#08090D] border-b-2 border-[#1E2230]">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#10121A] border-2 border-[#FFE600] shadow-[8px_8px_0_0_#00F0FF] p-8 sm:p-14 text-center relative"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#161924] border border-[#FFE600] text-[#FFE600] font-mono text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles size={14} className="text-[#FFE600]" /> STOP WRITING BOILERPLATE
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6 leading-tight">
            READY TO GENERATE YOUR TEST SUITE IN <span className="bg-[#FFE600] text-black px-2.5 py-0.5 border-2 border-black shadow-[3px_3px_0_0_#FF2E93] inline-block">2 MINUTES?</span>
          </h2>
          
          <p className="text-gray-300 text-base sm:text-lg mb-10 max-w-2xl mx-auto font-sans leading-relaxed">
            Join hundreds of developers and QA engineers who rely on CtrlTest AI to scaffold reliable, enterprise-grade test automation architectures.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              onClick={openWaitlist}
              className="brutal-btn bg-[#FFE600] text-black border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[1px_1px_0_0_#000] text-sm h-12 px-8 font-black uppercase tracking-wider flex items-center gap-2.5"
            >
              <Download size={18} /> DOWNLOAD VSIX EXTENSION
            </button>
            <a
              href="#demo"
              className="brutal-btn bg-[#161924] text-white border-2 border-[#282B37] hover:border-white shadow-[4px_4px_0_0_#FF2E93] hover:shadow-[1px_1px_0_0_#FF2E93] text-sm h-12 px-8 font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <Terminal size={16} className="text-[#FF2E93]" /> TRY INTERACTIVE DEMO <ArrowRight size={16} />
            </a>
          </div>
          
          <p className="text-xs text-gray-400 font-mono">
            Verified release v2.0.17 • VS Code 1.93+ • Developed & Engineered by{" "}
            <button
              onClick={openDeveloperModal}
              className="text-[#FFE600] hover:text-[#00F0FF] font-bold underline underline-offset-4 decoration-[#FFE600] hover:decoration-[#00F0FF] cursor-pointer transition-colors"
              title="Click to view Abdul Talib's profile & contact links"
            >
              Abdul Talib
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
