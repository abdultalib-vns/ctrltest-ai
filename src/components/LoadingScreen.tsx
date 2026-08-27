import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logoImg from "@/assets/logo.png";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING CORE ENGINE...");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 2.2 + 1.2;

        if (next >= 100) {
          clearInterval(interval);
          setStatusText("WORKSPACE READY");
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 500);
          }, 400);
          return 100;
        }

        if (next > 75) {
          setStatusText("FINALIZING EXTENSION ENVIRONMENT...");
        } else if (next > 50) {
          setStatusText("CALIBRATING 12+ FRAMEWORK CONTRACTS...");
        } else if (next > 25) {
          setStatusText("LOADING AST CODE SYNTHESIZER...");
        } else {
          setStatusText("INITIALIZING CORE ENGINE...");
        }

        return next;
      });
    }, 45);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#08090D]"
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

          {/* Center Brand Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center z-10"
          >
            {/* Logo */}
            <div className="relative mb-6">
              <img
                src={logoImg}
                alt="CtrlTest AI"
                className="w-20 h-20 object-contain drop-shadow-[0_4px_16px_rgba(0,240,255,0.4)]"
              />
            </div>

            {/* Title */}
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-2xl sm:text-3xl font-black uppercase text-white tracking-wider">
                CtrlTest<span className="text-[#00F0FF]">AI</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-black uppercase bg-[#FFE600] text-black border border-black shadow-[2px_2px_0_0_#000]">
                v2.0
              </span>
            </div>

            {/* Progress Box */}
            <div className="w-64 bg-[#10121A] border-2 border-[#282B37] p-3 shadow-[4px_4px_0_0_#FFE600]">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-gray-400 mb-2">
                <span>SYSTEM_BOOT</span>
                <span className="text-[#FFE600]">{Math.min(Math.round(progress), 100)}%</span>
              </div>
              <div className="h-2.5 bg-[#161924] border border-[#282B37] overflow-hidden p-0.5">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00F0FF] via-[#FFE600] to-[#FF2E93]"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            <div className="font-mono text-[11px] text-gray-400 mt-4 tracking-widest uppercase">
              {statusText}
            </div>
          </motion.div>

          {/* Right corner developer attribution (non-clickable) */}
          <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 z-20 pointer-events-none select-none">
            <div className="px-3 py-1.5 bg-[#10121A] border-2 border-[#282B37] shadow-[3px_3px_0_0_#FFE600] text-xs font-mono text-gray-300">
              Designed & Developed by <span className="text-[#FFE600] font-bold">Abdul Talib</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
