import { faqItems } from "@/lib/constants";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle, Plus } from "lucide-react";

export default function FAQ() {
  return (
    <section id="faq" className="py-28 relative bg-[#08090D] border-b-2 border-[#1E2230]">
      <div className="max-w-[860px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#10121A] border-2 border-[#00F0FF] text-[#00F0FF] font-mono text-xs font-black uppercase tracking-widest mb-4 shadow-[3px_3px_0_0_#00F0FF]">
            ❓ KNOWLEDGE BASE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            FREQUENTLY ASKED <span className="bg-[#FFE600] text-black px-2 py-0.5 border-2 border-black shadow-[3px_3px_0_0_#FF2E93] inline-block">QUESTIONS</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg font-sans">
            Got questions about licensing, privacy, frameworks, or extension setup?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-[#10121A] border-2 border-[#282B37] data-[state=open]:border-[#FFE600] data-[state=open]:shadow-[5px_5px_0_0_#FFE600] shadow-[3px_3px_0_0_#000] px-6 py-1 transition-all rounded-none"
              >
                <AccordionTrigger className="text-white hover:text-[#FFE600] hover:no-underline text-left py-5 font-mono text-base font-bold uppercase tracking-wide">
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-mono font-black text-black bg-[#00F0FF] px-2 py-0.5 border border-black shrink-0">
                      Q{i + 1}
                    </span>
                    <span>{item.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pb-6 pt-1 leading-relaxed font-sans text-sm sm:text-base border-t border-[#282B37]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
