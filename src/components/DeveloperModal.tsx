import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Globe, Linkedin, ExternalLink, Copy, Check, Sparkles, User, Terminal, Code2 } from "lucide-react";
import { useDeveloperModal } from "@/context/DeveloperModalContext";

export default function DeveloperModal() {
  const { isOpen, closeDeveloperModal } = useDeveloperModal();
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeDeveloperModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeDeveloperModal]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setCopiedEmail(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText("hello@abdultalib.in");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDeveloperModal}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-xl bg-[#10121A] border-2 border-[#FFE600] shadow-[8px_8px_0_0_#00F0FF] z-10 overflow-hidden text-white my-6"
          >
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#161924] border-b-2 border-[#282B37]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/40 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/40 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/40 inline-block" />
                <span className="ml-2 font-mono text-[11px] font-black uppercase tracking-wider text-gray-300">
                  DEVELOPER PROFILE // ABDUL TALIB
                </span>
              </div>
              <button
                onClick={closeDeveloperModal}
                className="w-6 h-6 bg-[#10121A] hover:bg-[#FF2E93] text-gray-400 hover:text-white border border-[#282B37] hover:border-black flex items-center justify-center font-mono text-xs font-bold transition-colors"
                aria-label="Close modal"
              >
                <X size={13} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-7">
              {/* Header profile info */}
              <div className="flex items-start gap-4 mb-6 pb-5 border-b-2 border-[#282B37]">
                {/* Monogram Avatar */}
                <div className="w-14 h-14 bg-[#FFE600] text-black border-2 border-black shadow-[3px_3px_0_0_#FF2E93] flex items-center justify-center font-mono text-xl font-black shrink-0">
                  AT
                </div>
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#161924] border border-[#00FF66] text-[#00FF66] font-mono text-[10px] font-black uppercase tracking-wider mb-1">
                    <Code2 size={11} className="text-[#00FF66]" /> CREATOR & ARCHITECT
                  </div>
                  <h3 className="text-2xl font-black font-mono uppercase text-white tracking-tight">
                    Abdul Talib
                  </h3>
                  <p className="text-xs text-gray-400 font-sans mt-0.5">
                    Full-Stack Engineer & Automation Architect • Creator of CtrlTest AI
                  </p>
                </div>
              </div>

              {/* Links Grid */}
              <div className="space-y-3 mb-6">
                {/* 1. Email */}
                <div className="p-3.5 bg-[#161924] border-2 border-[#282B37] hover:border-[#00F0FF] shadow-[4px_4px_0_0_#00F0FF] transition-all flex items-center justify-between gap-3 group">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 bg-[#0B0D14] border border-[#282B37] group-hover:border-[#00F0FF] flex items-center justify-center text-[#00F0FF] shrink-0">
                      <Mail size={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono font-bold uppercase text-gray-400">
                        DIRECT EMAIL
                      </div>
                      <a
                        href="mailto:hello@abdultalib.in"
                        className="text-xs sm:text-sm font-mono font-bold text-white hover:text-[#00F0FF] transition-colors truncate block"
                      >
                        hello@abdultalib.in
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={handleCopyEmail}
                      className="px-2.5 py-1.5 bg-[#0B0D14] hover:bg-[#FFE600] text-gray-300 hover:text-black border border-[#282B37] hover:border-black font-mono text-[10px] font-bold uppercase flex items-center gap-1 transition-all"
                      title="Copy email address"
                    >
                      {copiedEmail ? <Check size={11} className="text-[#00FF66]" /> : <Copy size={11} />}
                      {copiedEmail ? "COPIED" : "COPY"}
                    </button>
                    <a
                      href="mailto:hello@abdultalib.in"
                      className="p-1.5 bg-[#00F0FF] text-black border border-black hover:bg-white font-mono text-xs transition-colors"
                      title="Send email"
                    >
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>

                {/* 2. Website */}
                <a
                  href="https://www.abdultalib.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-[#161924] border-2 border-[#282B37] hover:border-[#FFE600] shadow-[4px_4px_0_0_#FFE600] transition-all flex items-center justify-between gap-3 group block"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 bg-[#0B0D14] border border-[#282B37] group-hover:border-[#FFE600] flex items-center justify-center text-[#FFE600] shrink-0">
                      <Globe size={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono font-bold uppercase text-gray-400">
                        OFFICIAL WEBSITE & PORTFOLIO
                      </div>
                      <div className="text-xs sm:text-sm font-mono font-bold text-white group-hover:text-[#FFE600] transition-colors truncate">
                        https://www.abdultalib.in
                      </div>
                    </div>
                  </div>
                  <div className="w-7 h-7 bg-[#FFE600] text-black border border-black flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                    <ExternalLink size={13} />
                  </div>
                </a>

                {/* 3. LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/abdultalib751/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-[#161924] border-2 border-[#282B37] hover:border-[#00FF66] shadow-[4px_4px_0_0_#00FF66] transition-all flex items-center justify-between gap-3 group block"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 bg-[#0B0D14] border border-[#282B37] group-hover:border-[#00FF66] flex items-center justify-center text-[#00FF66] shrink-0">
                      <Linkedin size={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono font-bold uppercase text-gray-400">
                        LINKEDIN PROFILE
                      </div>
                      <div className="text-xs sm:text-sm font-mono font-bold text-white group-hover:text-[#00FF66] transition-colors truncate">
                        linkedin.com/in/abdultalib751/
                      </div>
                    </div>
                  </div>
                  <div className="w-7 h-7 bg-[#00FF66] text-black border border-black flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                    <ExternalLink size={13} />
                  </div>
                </a>
              </div>

              {/* Bottom Close Button */}
              <div className="flex items-center justify-between pt-2 border-t border-[#282B37]">
                <span className="text-[10px] font-mono text-gray-500">
                  CtrlTest AI • Creator attribution
                </span>
                <button
                  onClick={closeDeveloperModal}
                  className="brutal-btn bg-[#161924] hover:bg-white text-gray-300 hover:text-black border border-[#282B37] hover:border-black h-9 px-5 text-xs font-mono font-bold uppercase tracking-wider transition-all"
                >
                  CLOSE WINDOW
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
