import { Github, Twitter, Linkedin, MessageCircle, Terminal, Heart, Globe, Mail } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { useDeveloperModal } from "@/context/DeveloperModalContext";

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Changelog", href: "#changelog" },
  { label: "Interactive Demo", href: "#demo" },
];
const resourceLinks = [
  { label: "Quick Start", href: "#install" },
  { label: "IDE Requirements", href: "#faq" },
  { label: "Documentation", href: "#faq" },
  { label: "Release Notes", href: "#changelog" },
];

export default function Footer() {
  const { openDeveloperModal } = useDeveloperModal();

  return (
    <footer className="relative bg-[#07080C] text-white">
      <div className="max-w-[1240px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          {/* Brand Col */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 flex items-center justify-center">
                <img src={logoImg} alt="CtrlTest AI" className="w-9 h-9 object-contain" />
              </div>
              <span className="font-mono font-black text-lg uppercase tracking-wider text-white">
                CtrlTest<span className="text-[#00F0FF]">AI</span>
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono font-black uppercase bg-[#FFE600] text-black border border-black">
                v2.0.17
              </span>
            </div>
            <p className="text-sm text-gray-400 font-sans leading-relaxed max-w-sm mb-6">
              AI-powered test automation scaffolding engine for VS Code. Generate end-to-end testing frameworks in under 2 minutes.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#10121A] border-2 border-[#00FF66] shadow-[3px_3px_0_0_#00FF66]">
              <span className="w-2 h-2 rounded-none bg-[#00FF66] animate-pulse" />
              <span className="text-[11px] font-mono font-bold text-gray-200">
                12+ FRAMEWORKS READY
              </span>
            </div>
          </div>
          
          {/* Links Col 1 */}
          <div>
            <h4 className="text-xs font-mono font-black text-[#FFE600] mb-4 uppercase tracking-widest">
              // PRODUCT
            </h4>
            <div className="space-y-2.5 font-mono text-xs">
              {productLinks.map((l) => (
                <a key={l.label} href={l.href} className="block text-gray-400 hover:text-white transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-xs font-mono font-black text-[#00F0FF] mb-4 uppercase tracking-widest">
              // RESOURCES
            </h4>
            <div className="space-y-2.5 font-mono text-xs">
              {resourceLinks.map((l) => (
                <a key={l.label} href={l.href} className="block text-gray-400 hover:text-white transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links Col 3 */}
          <div>
            <h4 className="text-xs font-mono font-black text-[#FF2E93] mb-4 uppercase tracking-widest">
              // DEVELOPER
            </h4>
            <div className="space-y-2.5 font-mono text-xs">
              <button
                onClick={openDeveloperModal}
                className="block text-left text-gray-400 hover:text-[#FFE600] transition-colors cursor-pointer"
              >
                About Abdul Talib
              </button>
              <button
                onClick={openDeveloperModal}
                className="block text-left text-gray-400 hover:text-[#00F0FF] transition-colors cursor-pointer"
              >
                Contact Developer
              </button>
              <a
                href="https://www.abdultalib.in"
                target="_blank"
                rel="noreferrer"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                abdultalib.in ↗
              </a>
              <a
                href="https://www.linkedin.com/in/abdultalib751/"
                target="_blank"
                rel="noreferrer"
                className="block text-gray-400 hover:text-[#00FF66] transition-colors"
              >
                LinkedIn Profile ↗
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Attribution & Socials */}
        <div className="pt-8 border-t-2 border-[#1E2230] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-gray-400 text-center md:text-left">
            © 2026 CtrlTest AI. Engineered & Architected with precision by{" "}
            <button
              onClick={openDeveloperModal}
              className="text-[#FFE600] hover:text-[#00F0FF] font-bold underline underline-offset-4 decoration-[#FFE600] hover:decoration-[#00F0FF] cursor-pointer transition-colors"
              title="Click to view Abdul Talib's profile & contact links"
            >
              Abdul Talib
            </button>
            .
          </p>
          
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: "https://github.com", color: "#FFE600", title: "GitHub" },
              { icon: Globe, href: "https://www.abdultalib.in", color: "#00F0FF", title: "Website" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/abdultalib751/", color: "#00FF66", title: "LinkedIn" },
              { icon: Mail, href: "mailto:hello@abdultalib.in", color: "#FF2E93", title: "Email" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <a
                  key={i}
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  title={s.title}
                  className="w-8 h-8 bg-[#12141D] border-2 border-[#282B37] hover:border-white flex items-center justify-center text-gray-300 hover:text-white transition-all shadow-[2px_2px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
                >
                  <Icon size={14} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
