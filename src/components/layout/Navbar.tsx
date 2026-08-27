import { useEffect, useState } from "react";
import { Menu, X, Zap, ChevronDown, BookOpen, Rocket } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useWaitlist } from "@/context/WaitlistContext";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Demo", href: "#demo" },
  { label: "Pricing", href: "#pricing" },
  {
    label: "Resources",
    href: "#faq",
    hasDropdown: true,
    items: [
      { label: "Documentation", href: "#faq", icon: BookOpen, desc: "Guides & API reference" },
      { label: "Getting Started", href: "#how-it-works", icon: Rocket, desc: "Quick start tutorial" },
    ],
  },
];

export default function Navbar() {
  const { openWaitlist } = useWaitlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["features", "how-it-works", "demo", "pricing", "faq"];
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openDropdown) return;
    const close = () => setOpenDropdown(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [openDropdown]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`relative transition-all duration-300 border-b-2 ${
          scrolled
            ? "bg-[#08090D]/95 border-[#282B37] shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
            : "bg-[#08090D]/80 border-[#1C1E29]"
        }`}
        style={{ backdropFilter: "blur(16px)" }}
      >
        <div className="max-w-[1200px] mx-auto flex h-16 items-center justify-between px-6">
          {/* Logo - BORDERLESS */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative flex h-10 w-10 items-center justify-center">
              <img src={logoImg} alt="CtrlTest AI" className="h-10 w-10 object-contain transition-transform duration-200 group-hover:scale-110" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold uppercase font-mono text-white tracking-wider text-[17px]">
                CtrlTest<span className="text-[#00F0FF]">AI</span>
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono font-black uppercase bg-[#FFE600] text-black border border-black shadow-[1.5px_1.5px_0_0_#00F0FF]">
                v2.0
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex whitespace-nowrap">
            {navLinks.map((link) => (
              <div key={link.label} className="relative">
                {link.hasDropdown ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown(openDropdown === link.label ? null : link.label);
                    }}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-150 border-2 ${
                      activeSection === link.href.slice(1) || openDropdown === link.label
                        ? "text-[#00F0FF] border-[#00F0FF]/40 bg-[#00F0FF]/10 shadow-[2px_2px_0_0_#00F0FF]"
                        : "text-muted-foreground border-transparent hover:text-white hover:border-[#282B37] hover:bg-[#12141D]"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={`relative px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-150 border-2 inline-block ${
                      activeSection === link.href.slice(1)
                        ? "text-[#FFE600] border-[#FFE600]/40 bg-[#FFE600]/10 shadow-[2px_2px_0_0_#FFE600]"
                        : "text-muted-foreground border-transparent hover:text-white hover:border-[#282B37] hover:bg-[#12141D]"
                    }`}
                  >
                    {link.label}
                  </a>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {link.hasDropdown && openDropdown === link.label && link.items && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1.5 w-72 bg-[#10121A] border-2 border-black shadow-[5px_5px_0_0_#FFE600] p-2 z-50"
                    >
                      <div className="text-[10px] font-mono font-black uppercase text-[#FFE600] px-2.5 py-1 mb-1 border-b border-[#282B37]">
                        SUPPORTED STACKS // 12+ ENGINES
                      </div>
                      <div className="space-y-1">
                        {link.items?.map((item) => {
                          const Icon = item.icon;
                          return (
                            <a
                              key={item.label}
                              href={item.href}
                              onClick={(e) => handleClick(e, item.href)}
                              className="flex items-start gap-2.5 p-2 bg-transparent hover:bg-[#161924] border border-transparent hover:border-[#282B37] transition-all group"
                            >
                              <div className="w-7 h-7 bg-[#161924] border border-[#282B37] group-hover:border-[#00F0FF] flex items-center justify-center shrink-0 mt-0.5">
                                <Icon size={14} className="text-[#00F0FF]" />
                              </div>
                              <div>
                                <div className="text-xs font-mono font-bold text-white group-hover:text-[#FFE600]">
                                  {item.label}
                                </div>
                                <div className="text-[11px] text-gray-400 font-sans">
                                  {item.desc}
                                </div>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={openWaitlist}
              className="brutal-btn bg-[#FFE600] text-black border-2 border-black shadow-[3px_3px_0_0_#00F0FF] hover:shadow-[1px_1px_0_0_#00F0FF] text-xs h-9 px-5 font-black uppercase tracking-wider flex items-center gap-2"
            >
              <Rocket size={14} /> Download VSIX
            </button>
          </div>

          <button
            type="button"
            className="text-foreground p-1 border-2 border-[#282B37] bg-[#12141D] md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#0E1017] border-b-2 border-[#FFE600] shadow-[0_8px_20px_rgba(0,0,0,0.9)] overflow-hidden md:hidden mx-4"
          >
            <div className="space-y-2 px-6 py-4">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={`block px-3 py-2 text-xs font-mono font-bold uppercase tracking-wider border ${
                      activeSection === link.href.slice(1)
                        ? "text-[#FFE600] bg-[#FFE600]/10 border-[#FFE600]"
                        : "text-gray-300 border-transparent hover:text-white hover:bg-[#161924]"
                    }`}
                  >
                    {link.label}
                  </a>
                  {link.hasDropdown && link.items && (
                    <div className="ml-3 mt-1 space-y-1 border-l-2 border-[#282B37] pl-3">
                      {link.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => handleClick(e, item.href)}
                            className="flex items-center gap-2 px-2 py-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors"
                          >
                            <Icon size={14} className="text-[#00F0FF]" />
                            {item.label}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  openWaitlist();
                }}
                className="brutal-btn w-full mt-4 bg-[#FFE600] text-black border-2 border-black shadow-[3px_3px_0_0_#00F0FF] py-2.5 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Zap size={14} /> Download VSIX Extension
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
