import { useEffect, useRef, useState } from "react";
import { Folder, FileText, ChevronRight, Check } from "lucide-react";
import { motion } from "framer-motion";

const lines = [
  { indent: 0, icon: "folder", name: "tests/", color: "text-[#00F0FF]" },
  { indent: 1, icon: "folder", name: "e2e/", color: "text-[#00F0FF]" },
  { indent: 2, icon: "file", name: "home.spec.ts", color: "text-[#00FF66]" },
  { indent: 2, icon: "file", name: "login.spec.ts", color: "text-[#00FF66]" },
  { indent: 2, icon: "file", name: "dashboard.spec.ts", color: "text-[#00FF66]" },
  { indent: 1, icon: "folder", name: "pages/", color: "text-[#FFE600]" },
  { indent: 2, icon: "file", name: "BasePage.ts", color: "text-white" },
  { indent: 2, icon: "file", name: "HomePage.ts", color: "text-white" },
  { indent: 1, icon: "folder", name: "helpers/", color: "text-[#9D4EDD]" },
  { indent: 2, icon: "file", name: "test-data.ts", color: "text-gray-300" },
  { indent: 0, icon: "file", name: "playwright.config.ts", color: "text-[#FFE600]" },
  { indent: 0, icon: "file", name: ".github/workflows/tests.yml", color: "text-[#FF2E93]" },
  { indent: 0, icon: "file", name: ".env.example", color: "text-gray-400" },
];

export default function HeroFileTree() {
  const [visibleCount, setVisibleCount] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const phaseRef = useRef<"typing" | "pausing">("typing");

  useEffect(() => {
    const tick = () => {
      setVisibleCount((prev) => {
        if (phaseRef.current === "pausing") {
          phaseRef.current = "typing";
          return 0;
        }
        const next = prev + 1;
        if (next > lines.length) {
          phaseRef.current = "pausing";
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          intervalRef.current = window.setTimeout(() => {
            setVisibleCount(0);
            phaseRef.current = "typing";
            intervalRef.current = window.setInterval(tick, 160);
          }, 2200) as unknown as number;
          return prev;
        }
        return next;
      });
    };
    intervalRef.current = window.setInterval(tick, 160);
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        window.clearTimeout(intervalRef.current);
      }
    };
  }, []);

  const progressPercent = Math.round((visibleCount / lines.length) * 100);

  return (
    <div className="relative bg-[#10121A] border-2 border-[#282B37] shadow-[6px_6px_0_0_#00F0FF] overflow-hidden">
      {/* Window Chrome / Titlebar */}
      <div className="bg-[#161924] px-4 py-3 flex items-center justify-between border-b-2 border-[#282B37]">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-none bg-[#FF2E93] border border-black" />
          <div className="w-3 h-3 rounded-none bg-[#FFE600] border border-black" />
          <div className="w-3 h-3 rounded-none bg-[#00FF66] border border-black" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider ml-1">
            VS CODE WORKSPACE / GENERATED SUITE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-black text-black bg-[#00FF66] px-2 py-0.5 border border-black">
            {progressPercent}% READY
          </span>
        </div>
      </div>

      {/* File Tree List */}
      <div className="p-4 font-mono text-sm space-y-0.5 min-h-[380px] bg-[#0E1017]">
        {lines.slice(0, visibleCount).map((line, i) => (
          <motion.div
            key={`${line.name}-${i}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2 py-1 px-2 hover:bg-[#161924] transition-colors group cursor-default"
            style={{ paddingLeft: `${line.indent * 18 + 6}px` }}
          >
            {line.icon === "folder" ? (
              <>
                <ChevronRight size={12} className="text-gray-500" />
                <Folder size={14} className={line.color} />
              </>
            ) : (
              <>
                <span className="w-3" />
                <FileText size={14} className={line.color} />
              </>
            )}
            <span className={`${line.color} text-[13px] font-medium`}>{line.name}</span>
            {line.name.endsWith(".spec.ts") && (
              <span className="ml-auto text-[9px] font-mono text-[#00FF66] bg-[#00FF66]/10 px-1.5 py-0.2 border border-[#00FF66]/30 hidden sm:inline-block">
                GENERATED
              </span>
            )}
          </motion.div>
        ))}
        {visibleCount < lines.length && (
          <div className="flex items-center gap-2 py-1 px-2" style={{ paddingLeft: "8px" }}>
            <div className="w-[3px] h-4 bg-[#FFE600] animate-pulse" />
            <span className="text-[11px] font-mono text-muted-foreground animate-pulse">Generating artifacts...</span>
          </div>
        )}
      </div>

      {/* Bottom Status Ribbon */}
      <div className="bg-[#12141D] px-4 py-2 border-t-2 border-[#282B37] flex items-center justify-between text-[11px] font-mono text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-none bg-[#00FF66] animate-ping" />
          <span className="text-white font-bold">Claude 3.5</span> active in extension host
        </div>
        <div className="text-white font-bold">
          {visibleCount}/{lines.length} files
        </div>
      </div>
    </div>
  );
}
