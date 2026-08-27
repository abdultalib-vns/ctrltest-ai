import { testimonials } from "@/lib/constants";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonialThemes = [
  { color: "#FFE600", shadow: "shadow-[6px_6px_0_0_#FFE600]", tag: "VERIFIED QA", avatarBg: "bg-[#FFE600] text-black" },
  { color: "#00F0FF", shadow: "shadow-[6px_6px_0_0_#00F0FF]", tag: "TEST LEAD", avatarBg: "bg-[#00F0FF] text-black" },
  { color: "#FF2E93", shadow: "shadow-[6px_6px_0_0_#FF2E93]", tag: "QA MANAGER", avatarBg: "bg-[#FF2E93] text-white" },
];

export default function Testimonials() {
  return (
    <section className="py-28 relative bg-[#0A0C13] border-b-2 border-[#1E2230]">
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#10121A] border-2 border-[#FF2E93] text-[#FF2E93] font-mono text-xs font-black uppercase tracking-widest mb-4 shadow-[3px_3px_0_0_#FF2E93]">
            💬 COMMUNITY FEEDBACK
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            LOVED BY <span className="bg-[#00F0FF] text-black px-2 py-0.5 border-2 border-black shadow-[3px_3px_0_0_#FFE600] inline-block">QA & DEV TEAMS</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg font-sans">
            Hear from automation engineers saving hundreds of hours on test framework bootstrapping.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => {
            const theme = testimonialThemes[i];
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-[#10121A] border-2 border-[#282B37] hover:border-white p-7 sm:p-8 ${theme.shadow} transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} size={15} className="text-[#FFE600] fill-[#FFE600]" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 border border-[#282B37] bg-[#161924] text-gray-300">
                      {theme.tag}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-gray-200 mb-8 leading-relaxed font-sans italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t-2 border-[#282B37]">
                  <div className={`w-11 h-11 flex items-center justify-center font-mono font-black text-sm border-2 border-black shrink-0 ${theme.avatarBg}`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-mono font-black uppercase text-white">{t.name}</div>
                    <div className="text-xs text-gray-400 font-sans">{t.role}, {t.company}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
