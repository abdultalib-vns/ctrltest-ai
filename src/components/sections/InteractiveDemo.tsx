import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buildTree, appTypes, frameworks, languages, testingTypes, cicdProviders, type FileTreeNode } from "@/lib/constants/demo";
import { getCodePreview } from "@/lib/constants/code-previews";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Folder, FileText, Terminal, Code2, Copy, Check, SlidersHorizontal, ChevronRight } from "lucide-react";

function TreeNode({
  node, depth = 0, index = 0, selectedFile, onSelect,
}: {
  node: FileTreeNode; depth?: number; index?: number;
  selectedFile: string | null; onSelect: (name: string) => void;
}) {
  const isFile = node.type === "file";
  const isSelected = isFile && selectedFile === node.name;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.03, duration: 0.15 }}
        onClick={() => isFile && onSelect(node.name)}
        className={`flex items-center gap-2 py-1 px-2.5 transition-all text-xs font-mono border ${
          isFile ? "cursor-pointer" : "cursor-default"
        } ${
          isSelected
            ? "bg-[#FFE600] text-black font-black border-black shadow-[2px_2px_0_0_#00F0FF]"
            : "border-transparent hover:border-[#282B37] hover:bg-[#161924] text-gray-300"
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {node.type === "folder" ? (
          <Folder size={14} className="text-[#00F0FF] shrink-0" />
        ) : (
          <FileText size={14} className={`shrink-0 ${isSelected ? "text-black" : "text-[#00FF66]"}`} />
        )}
        <span className="truncate">
          {node.name}
        </span>
      </motion.div>
      {node.children?.map((child, i) => (
        <TreeNode key={child.name} node={child} depth={depth + 1} index={index + i + 1} selectedFile={selectedFile} onSelect={onSelect} />
      ))}
    </>
  );
}

function countNodes(nodes: FileTreeNode[]): number {
  return nodes.reduce((acc, n) => acc + 1 + (n.children ? countNodes(n.children) : 0), 0);
}

function getFirstFile(nodes: FileTreeNode[]): string | null {
  for (const n of nodes) {
    if (n.type === "file") return n.name;
    if (n.children) {
      const f = getFirstFile(n.children);
      if (f) return f;
    }
  }
  return null;
}

export default function InteractiveDemo() {
  const [config, setConfig] = useState({
    appType: "Web Application",
    framework: "Playwright",
    language: "TypeScript",
    testingType: "E2E Testing",
    cicd: "GitHub Actions",
  });
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const tree = useMemo(() => buildTree(config), [config]);
  const configKey = JSON.stringify(config);

  useMemo(() => {
    setSelectedFile(getFirstFile(tree));
  }, [tree]);

  const code = useMemo(
    () => getCodePreview(selectedFile, config),
    [selectedFile, config]
  );

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <section id="demo" className="py-28 relative bg-[#08090D] border-b-2 border-[#1E2230] overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#10121A] border-2 border-[#FF2E93] text-[#FF2E93] font-mono text-xs font-black uppercase tracking-widest mb-4 shadow-[3px_3px_0_0_#FF2E93]">
            🎮 LIVE WORKSPACE SIMULATOR
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            TEST-DRIVE THE <span className="bg-[#FFE600] text-black px-2.5 py-0.5 border-2 border-black shadow-[3px_3px_0_0_#00F0FF] inline-block">CODE GENERATOR</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg font-sans">
            Customize your stack parameters, navigate the generated directory structure, and inspect production-grade code.
          </p>
        </motion.div>

        {/* 3-Column Brutalist Simulator Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#10121A] border-2 border-[#282B37] shadow-[7px_7px_0_0_#FFE600] grid lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#282B37] overflow-hidden"
        >
          {/* Column 1: Config Parameters */}
          <div className="lg:col-span-3 bg-[#0D0F16] flex flex-col">
            <div className="bg-[#141722] px-4 py-3 flex items-center gap-2.5 border-b-2 border-[#282B37]">
              <SlidersHorizontal size={15} className="text-[#FFE600]" />
              <span className="text-xs font-mono font-black text-white uppercase tracking-wider">
                01. STACK CONFIG
              </span>
            </div>
            <div className="p-4 sm:p-5 space-y-4">
              {[
                { label: "App Category", value: config.appType, options: appTypes, key: "appType", color: "#FFE600" },
                { label: "Test Framework", value: config.framework, options: frameworks, key: "framework", color: "#00F0FF" },
                { label: "Language", value: config.language, options: languages, key: "language", color: "#FF2E93" },
                { label: "Test Strategy", value: config.testingType, options: testingTypes, key: "testingType", color: "#00FF66" },
                { label: "CI/CD Provider", value: config.cicd, options: cicdProviders, key: "cicd", color: "#9D4EDD" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-[11px] font-mono font-bold text-gray-300 mb-1.5 flex items-center justify-between uppercase tracking-wider">
                    <span>{field.label}</span>
                    <span className="w-1.5 h-1.5" style={{ backgroundColor: field.color }} />
                  </label>
                  <Select value={field.value} onValueChange={(v) => setConfig({ ...config, [field.key]: v })}>
                    <SelectTrigger className="bg-[#12141D] border-2 border-[#282B37] hover:border-white text-white font-mono text-xs h-10 rounded-none focus:ring-0 focus:border-[#FFE600]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#12141D] border-2 border-[#FFE600] rounded-none text-white font-mono text-xs">
                      {field.options.map((o) => (
                        <SelectItem key={o} value={o} className="hover:bg-[#1E2230] cursor-pointer">
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: File Explorer */}
          <div className="lg:col-span-4 bg-[#0F1119] flex flex-col">
            <div className="bg-[#141722] px-4 py-3 flex items-center justify-between border-b-2 border-[#282B37]">
              <div className="flex items-center gap-2">
                <Folder size={15} className="text-[#00F0FF]" />
                <span className="text-xs font-mono font-black text-white uppercase tracking-wider">
                  02. PROJECT TREE
                </span>
              </div>
              <span className="text-[10px] font-mono font-black text-black bg-[#00F0FF] px-2 py-0.5 border border-black">
                {countNodes(tree)} FILES
              </span>
            </div>
            <div className="p-3 min-h-[380px] max-h-[460px] overflow-y-auto space-y-0.5 custom-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={configKey}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {tree.map((node, i) => (
                    <TreeNode
                      key={node.name}
                      node={node}
                      index={i * 2}
                      selectedFile={selectedFile}
                      onSelect={setSelectedFile}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Column 3: Generated Code Preview */}
          <div className="lg:col-span-5 bg-[#0A0C13] flex flex-col">
            <div className="bg-[#141722] px-4 py-3 flex items-center justify-between border-b-2 border-[#282B37]">
              <div className="flex items-center gap-2">
                <Code2 size={15} className="text-[#FF2E93]" />
                <span className="text-xs font-mono font-black text-[#FFE600] uppercase tracking-wider truncate max-w-[200px]">
                  {selectedFile || "code.ts"}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="brutal-btn bg-[#181B26] hover:bg-[#FFE600] text-white hover:text-black border border-[#3E4357] hover:border-black px-2.5 py-1 text-[10px] font-mono font-black uppercase flex items-center gap-1.5 transition-all"
              >
                {copied ? <Check size={12} className="text-[#00FF66]" /> : <Copy size={12} />}
                {copied ? "COPIED!" : "COPY CODE"}
              </button>
            </div>
            <div className="p-4 min-h-[380px] max-h-[460px] overflow-auto bg-[#07080C] custom-scrollbar">
              <AnimatePresence mode="wait">
                <motion.pre
                  key={selectedFile || "empty"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-xs font-mono leading-relaxed text-gray-300 whitespace-pre overflow-x-auto"
                >
                  {code.split("\n").map((line, i) => (
                    <div key={i} className="flex hover:bg-[#12141F]">
                      <span className="text-gray-600 select-none w-7 text-right mr-3 shrink-0">{i + 1}</span>
                      <span dangerouslySetInnerHTML={{ __html: highlightSyntax(line) }} />
                    </div>
                  ))}
                </motion.pre>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function highlightSyntax(line: string): string {
  const escaped = line
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const tokenRegex = /(\/\/[^\n]*|#[^\n]*)|(["'`])(?:(?!\2).)*?\2|\b(import|from|export|const|let|var|function|class|async|await|return|if|else|new|this|describe|it|test|expect|before|after|beforeEach|afterEach|def|self|assert|public|private|void|static)\b|\b(true|false|null|undefined|\d+)\b|([A-Z][a-zA-Z0-9_]*)/g;

  return escaped.replace(tokenRegex, (match, comment, stringQuote, keyword, numBool, typeName) => {
    if (comment) {
      return `<span style="color: #717686; font-style: italic;">${match}</span>`;
    }
    if (stringQuote !== undefined || match.startsWith('"') || match.startsWith("'") || match.startsWith('`')) {
      return `<span style="color: #00FF66;">${match}</span>`;
    }
    if (keyword) {
      return `<span style="color: #FF2E93; font-weight: 700;">${match}</span>`;
    }
    if (numBool) {
      return `<span style="color: #FFE600;">${match}</span>`;
    }
    if (typeName) {
      return `<span style="color: #00F0FF; font-weight: 600;">${match}</span>`;
    }
    return match;
  });
}
