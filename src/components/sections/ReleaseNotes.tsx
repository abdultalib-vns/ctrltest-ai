import { motion } from "framer-motion";
import { Download, BookOpen, GitCommit, CheckCircle2 } from "lucide-react";
import { useWaitlist } from "@/context/WaitlistContext";

const releases = [
  {
    version: "v2.0.17",
    title: "Direct WizardPanel recovery verification",
    tag: "LATEST RELEASE",
    color: "#00FF66",
    shadow: "shadow-[4px_4px_0_0_#00FF66]",
    points: [
      "Streamed response auto-recovery and completion through extension host",
      "Verifies planned artifacts before writes and committed counts during writes",
      "Preserves accumulated files, native artifacts, and workspace safety",
    ],
  },
  {
    version: "v2.0.12",
    title: "End-to-end recovery verification",
    tag: "HOST VERIFICATION",
    color: "#00F0FF",
    shadow: "shadow-[4px_4px_0_0_#00F0FF]",
    points: [
      "Verifies multi-batch recovery through live generation orchestration",
      "Verifies planned artifacts before disk writing for zero corruptions",
      "Accumulates missing files seamlessly during complex suite builds",
    ],
  },
  {
    version: "v2.0.11",
    title: "Accumulated recovery & live progress",
    tag: "PROGRESS ENGINE",
    color: "#FFE600",
    shadow: "shadow-[4px_4px_0_0_#FFE600]",
    points: [
      "Accumulates missing-file completion batches without discarding prior files",
      "Real-time planned and committed artifact count indicators",
      "Native framework validation before committing to disk",
    ],
  },
  {
    version: "v2.0.10",
    title: "Short-response framework recovery",
    tag: "RECOVERY CORE",
    color: "#FF2E93",
    shadow: "shadow-[4px_4px_0_0_#FF2E93]",
    points: [
      "Completes undersized valid framework maps safely",
      "Requests only missing files before full revalidation",
      "Protects workspace safety and file system integrity",
    ],
  },
  {
    version: "v2.0.8",
    title: "Professional Playwright layout support",
    tag: "VALIDATOR FIX",
    color: "#9D4EDD",
    shadow: "shadow-[4px_4px_0_0_#9D4EDD]",
    points: [
      "Accepts config/playwright.config.* structure cleanly",
      "Retains native spec validation and helper contracts",
      "Eliminates false rejections for custom directories",
    ],
  },
  {
    version: "v2.0.7",
    title: "Reliable provider output recovery",
    tag: "RECOVERY IMPROVEMENT",
    color: "#FF7700",
    shadow: "shadow-[4px_4px_0_0_#FF7700]",
    points: [
      "Unwraps common provider response envelopes seamlessly",
      "Explains framework contract gaps before execution",
      "Performs structured repair before writing files to disk",
    ],
  },
];

export default function ReleaseNotes() {
  const { openWaitlist } = useWaitlist();

  return (
    <section id="changelog" className="py-28 relative bg-[#08090D] border-b-2 border-[#1E2230]">
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#10121A] border-2 border-[#00FF66] text-[#00FF66] font-mono text-xs font-black uppercase tracking-widest mb-4 shadow-[3px_3px_0_0_#00FF66]">
              📜 REVISION HISTORY
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              RECENT IMPROVEMENTS & <span className="bg-[#00FF66] text-black px-2 py-0.5 border-2 border-black shadow-[3px_3px_0_0_#00F0FF] inline-block">RELEASES</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg font-sans">
              Detailed changelog of features, compatibility patches, and engine upgrades.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={openWaitlist}
              className="brutal-btn bg-[#FFE600] text-black border-2 border-black shadow-[3px_3px_0_0_#00F0FF] hover:shadow-[1px_1px_0_0_#00F0FF] text-xs h-11 px-5 font-black uppercase tracking-wider flex items-center gap-2"
            >
              <Download size={15} /> GET VSIX v2.0.17
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {releases.map((r, i) => (
            <motion.article
              key={r.version}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08 }}
              className={`bg-[#10121A] border-2 border-[#282B37] hover:border-white p-6 ${r.shadow} transition-all duration-150 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="font-mono text-xs font-black px-2 py-0.5 border border-black text-black" style={{ backgroundColor: r.color }}>
                    {r.version}
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-gray-400 border border-[#282B37] bg-[#161924] px-2 py-0.5">
                    {r.tag}
                  </span>
                </div>
                <h3 className="text-base font-black font-mono uppercase text-white mb-3">{r.title}</h3>
                <ul className="space-y-2 font-mono text-xs">
                  {r.points.map((p) => (
                    <li key={p} className="text-gray-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 mt-1.5 shrink-0" style={{ backgroundColor: r.color }} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
