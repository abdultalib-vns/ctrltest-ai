import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Layers } from "lucide-react";

export default function DocsCTA() {
  return (
    <section className="py-20 bg-[#08090D] border-b-2 border-[#1E2230]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-[1240px] mx-auto px-6 bg-[#10121A] border-2 border-[#FFE600] shadow-[6px_6px_0_0_#FFE600] p-8 sm:p-12 flex flex-col md:flex-row md:items-center gap-8 justify-between"
      >
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-[#161924] border border-[#FFE600] text-[#FFE600] font-mono text-[11px] font-black uppercase tracking-widest mb-3">
            <BookOpen size={13} /> OFFICIAL DOCUMENTATION
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-mono uppercase text-white mb-3 tracking-tight">
            EXPLORE EVERY SUPPORTED TESTING FRAMEWORK.
          </h2>
          <p className="text-gray-300 font-sans text-sm sm:text-base leading-relaxed">
            Browse all language patterns, config templates, and automated native artifact contracts used to scaffold and validate generated testing suites.
          </p>
        </div>
        <a
          href="#demo"
          className="brutal-btn bg-[#FFE600] text-black border-2 border-black shadow-[3px_3px_0_0_#00F0FF] hover:shadow-[1px_1px_0_0_#00F0FF] h-12 px-7 text-xs font-black uppercase tracking-wider shrink-0 flex items-center gap-2"
        >
          FRAMEWORK SPECS <ArrowRight size={16} />
        </a>
      </motion.div>
    </section>
  );
}
