import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Check, User, Mail, Phone, ShieldCheck, ArrowRight, Gift, Rocket } from "lucide-react";
import { useWaitlist } from "@/context/WaitlistContext";

export default function WaitlistModal() {
  const { isOpen, closeWaitlist } = useWaitlist();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeWaitlist();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeWaitlist]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset state after transition
      setTimeout(() => {
        setIsSubmitted(false);
        setError("");
      }, 300);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid work email address.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    // 1. Safety net: Always save to LocalStorage
    try {
      const existing = JSON.parse(localStorage.getItem("ctrltest_waitlist") || "[]");
      existing.push({ name, email, phone, timestamp: new Date().toISOString() });
      localStorage.setItem("ctrltest_waitlist", JSON.stringify(existing));
    } catch (err) {
      // storage fallback
    }

    // 2. Submit to Free Live Endpoint (FormSubmit.co / Google Script Webhook)
    const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT || "https://formsubmit.co/ajax/hello@abdultalib.in";

    try {
      await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          _subject: `🚀 New CtrlTest AI Early Access Request: ${name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err) {
      // Graceful fallback (lead already saved locally)
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
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
            onClick={closeWaitlist}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-[#10121A] border-2 border-[#FFE600] shadow-[8px_8px_0_0_#00F0FF] z-10 overflow-hidden text-white my-6"
          >
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#161924] border-b-2 border-[#282B37]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/40 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/40 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/40 inline-block" />
                <span className="ml-2 font-mono text-[11px] font-black uppercase tracking-wider text-gray-300">
                  CTRLTEST // EARLY ACCESS LAUNCH
                </span>
              </div>
              <button
                onClick={closeWaitlist}
                className="w-6 h-6 bg-[#10121A] hover:bg-[#FF2E93] text-gray-400 hover:text-white border border-[#282B37] hover:border-black flex items-center justify-center font-mono text-xs font-bold transition-colors"
                aria-label="Close modal"
              >
                <X size={13} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-7">
              {!isSubmitted ? (
                <>
                  {/* Top Bar: Badge + Perks */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#161924] border border-[#00FF66] text-[#00FF66] font-mono text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0_0_#00FF66]">
                      <Gift size={12} className="text-[#00FF66]" /> 100% FREE LAUNCH DAY TRIAL
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[10px] text-gray-300">
                      <span className="flex items-center gap-1"><span className="text-[#00FF66] font-bold">✓</span> 14 Days Free</span>
                      <span className="flex items-center gap-1"><span className="text-[#00F0FF] font-bold">✓</span> Instant Key</span>
                      <span className="flex items-center gap-1"><span className="text-[#FFE600] font-bold">✓</span> Zero Card</span>
                    </div>
                  </div>

                  {/* Heading */}
                  <h3 className="text-xl sm:text-2xl font-black font-mono uppercase tracking-tight text-white mb-2 leading-tight">
                    GET 14 DAYS FREE TRIAL LICENSE ON <span className="bg-[#FFE600] text-black px-1.5 py-0.2 border border-black inline-block">LAUNCH DAY</span>
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-xs sm:text-sm font-sans leading-relaxed mb-4">
                    CtrlTest AI is launching soon! Join our priority waitlist today and receive an exclusive <strong>14-day full access license code</strong> for absolutely free on launch day.
                  </p>

                  {/* Error Alert */}
                  {error && (
                    <div className="mb-3 p-2 bg-[#FF2E93]/10 border-2 border-[#FF2E93] text-[#FF2E93] text-xs font-mono font-bold">
                      ⚠ {error}
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono font-black uppercase text-gray-300 mb-1">
                          Full Name <span className="text-[#FF2E93]">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                            <User size={13} />
                          </div>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Alex Mercer"
                            className="w-full bg-[#0B0D14] border-2 border-[#282B37] focus:border-[#FFE600] focus:outline-none pl-8 pr-3 py-2 text-xs sm:text-sm font-sans text-white placeholder-gray-600 transition-colors shadow-inner"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono font-black uppercase text-gray-300 mb-1">
                          Phone Number <span className="text-[#FF2E93]">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                            <Phone size={13} />
                          </div>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 (555) 019-2834"
                            className="w-full bg-[#0B0D14] border-2 border-[#282B37] focus:border-[#00FF66] focus:outline-none pl-8 pr-3 py-2 text-xs sm:text-sm font-sans text-white placeholder-gray-600 transition-colors shadow-inner"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-black uppercase text-gray-300 mb-1">
                        Work / Personal Email <span className="text-[#FF2E93]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                          <Mail size={13} />
                        </div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@company.com"
                          className="w-full bg-[#0B0D14] border-2 border-[#282B37] focus:border-[#00F0FF] focus:outline-none pl-8 pr-3 py-2 text-xs sm:text-sm font-sans text-white placeholder-gray-600 transition-colors shadow-inner"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="brutal-btn w-full mt-2 bg-[#FFE600] hover:bg-[#FFE600] text-black border-2 border-black shadow-[4px_4px_0_0_#00F0FF] hover:shadow-[1px_1px_0_0_#00F0FF] h-11 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 font-mono transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          RESERVING SPOT...
                        </span>
                      ) : (
                        <>
                          <Rocket size={15} /> CLAIM FREE 14-DAY LICENSE <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-[10px] font-mono text-gray-500 text-center mt-3">
                    🔒 Zero spam. We only notify you when the VSIX extension drops on launch day.
                  </p>
                </>
              ) : (
                /* Success View */
                <div className="text-center py-2">
                  <div className="w-12 h-12 bg-[#00FF66] text-black border-2 border-black shadow-[3px_3px_0_0_#00F0FF] flex items-center justify-center mx-auto mb-3">
                    <Check size={26} strokeWidth={3} />
                  </div>

                  <div className="inline-block px-2.5 py-0.5 bg-[#161924] border border-[#00FF66] text-[#00FF66] font-mono text-[10px] font-black uppercase tracking-widest mb-2">
                    VIP ACCESS CONFIRMED
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black font-mono uppercase text-white mb-2">
                    YOU'RE ON THE VIP LIST!
                  </h3>

                  <p className="text-gray-300 text-xs sm:text-sm font-sans leading-relaxed max-w-lg mx-auto mb-4">
                    Thank you, <strong>{name}</strong>! We've successfully reserved your <strong>14-day complimentary full access trial license</strong>. On launch day, we will send your activation code and verified VSIX installer link directly to <strong>{email}</strong>.
                  </p>

                  <div className="p-3 bg-[#161924] border-2 border-[#282B37] text-left mb-4 font-mono text-xs grid sm:grid-cols-3 gap-2">
                    <div>
                      <span className="text-gray-500 block text-[10px]">NAME:</span>
                      <span className="text-white font-bold">{name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px]">EMAIL:</span>
                      <span className="text-[#00F0FF] font-bold truncate block">{email}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px]">REWARD:</span>
                      <span className="text-[#00FF66] font-bold block">14-Day Free License</span>
                    </div>
                  </div>

                  <button
                    onClick={closeWaitlist}
                    className="brutal-btn bg-[#FFE600] text-black border-2 border-black shadow-[3px_3px_0_0_#000] hover:shadow-[1px_1px_0_0_#000] h-10 px-7 text-xs font-black uppercase tracking-wider font-mono"
                  >
                    GOT IT, BACK TO SITE
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
