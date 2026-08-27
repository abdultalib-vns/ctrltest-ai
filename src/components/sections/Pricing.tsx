import { useState } from "react";
import { freeTier, pricingTiers } from "@/lib/constants";
import { Check, Zap, Sparkles, Shield, Rocket, Building, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useWaitlist } from "@/context/WaitlistContext";

type Currency = "USD" | "INR";

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [currency, setCurrency] = useState<Currency>("USD");
  const { openWaitlist } = useWaitlist();

  const getPrice = (tier: typeof pricingTiers[0]) => {
    if (currency === "USD") return annual ? tier.annualPriceUSD : tier.monthlyPriceUSD;
    return annual ? tier.annualPriceINR : tier.monthlyPriceINR;
  };

  const symbol = currency === "USD" ? "$" : "₹";

  const formatPrice = (price: number) => {
    if (currency === "INR") return price.toLocaleString("en-IN");
    return price % 1 === 0 ? price.toString() : price.toFixed(2);
  };

  const tierThemes = [
    { color: "#00F0FF", shadow: "shadow-[6px_6px_0_0_#00F0FF]", border: "border-[#00F0FF]", btnBg: "bg-[#161924] hover:bg-[#00F0FF] text-white hover:text-black border-2 border-[#282B37] hover:border-black" },
    { color: "#FFE600", shadow: "shadow-[8px_8px_0_0_#FFE600]", border: "border-[#FFE600]", btnBg: "bg-[#FFE600] text-black border-2 border-black shadow-[3px_3px_0_0_#00F0FF] hover:shadow-[1px_1px_0_0_#00F0FF]" },
    { color: "#FF2E93", shadow: "shadow-[6px_6px_0_0_#FF2E93]", border: "border-[#FF2E93]", btnBg: "bg-[#161924] hover:bg-[#FF2E93] text-white hover:text-black border-2 border-[#282B37] hover:border-black" },
  ];

  return (
    <section id="pricing" className="py-28 relative bg-[#08090D] border-b-2 border-[#1E2230]">
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#10121A] border-2 border-[#FFE600] text-[#FFE600] font-mono text-xs font-black uppercase tracking-widest mb-4 shadow-[3px_3px_0_0_#FFE600]">
            💳 PRICING PLANS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            SIMPLE, TRANSPARENT <span className="bg-[#FFE600] text-black px-2 py-0.5 border-2 border-black shadow-[3px_3px_0_0_#00F0FF] inline-block">PRICING</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg font-sans">
            Start with the 14-day free trial or upgrade to Single User ($1/mo) and Pro Team ($10/mo).
          </p>

          {/* Controls: Currency & Billing Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            {/* Currency Selector */}
            <div className="bg-[#10121A] border-2 border-[#282B37] p-1 flex gap-1 shadow-[3px_3px_0_0_#000]">
              {(["USD", "INR"] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-4 py-1.5 font-mono text-xs font-black transition-all ${
                    currency === c
                      ? "bg-[#FFE600] text-black border border-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {c === "USD" ? "$ USD" : "₹ INR"}
                </button>
              ))}
            </div>

            {/* Billing Toggle */}
            <div className="bg-[#10121A] border-2 border-[#282B37] px-4 py-2 flex items-center gap-3 shadow-[3px_3px_0_0_#000]">
              <span className={`text-xs font-mono font-bold ${!annual ? "text-white" : "text-gray-500"}`}>
                MONTHLY
              </span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative w-12 h-6 border-2 border-black p-0.5 transition-colors ${annual ? "bg-[#00FF66]" : "bg-[#282B37]"}`}
              >
                <div className={`w-4 h-4 bg-black transition-transform ${annual ? "translate-x-6" : "translate-x-0"}`} />
              </button>
              <span className={`text-xs font-mono font-bold flex items-center gap-1.5 ${annual ? "text-white" : "text-gray-500"}`}>
                ANNUAL
                <span className="bg-[#00FF66] text-black text-[9px] font-black px-1.5 py-0.2 border border-black">
                  YEARLY DISCOUNTS
                </span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Free Trial Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#10121A] border-2 border-[#282B37] hover:border-white shadow-[6px_6px_0_0_#00FF66] p-7 sm:p-9 mb-10 transition-all"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="text-xs font-mono font-black text-black bg-[#00FF66] px-2.5 py-0.5 border border-black">
                  FREE TIER
                </span>
                <h3 className="text-2xl font-black font-mono uppercase text-white">{freeTier.name}</h3>
                <span className="text-xs font-mono text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 border border-[#00FF66]/30">
                  14 DAYS FULL ACCESS
                </span>
              </div>
              <p className="text-gray-300 text-sm sm:text-base mb-4 font-sans">{freeTier.description}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {freeTier.features.map((f) => (
                  <span key={f} className="flex items-center gap-2 text-xs font-mono text-gray-300">
                    <Check size={14} className="text-[#00FF66]" />
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={openWaitlist}
              className="brutal-btn bg-[#161924] hover:bg-[#00FF66] text-white hover:text-black border-2 border-[#282B37] hover:border-black h-12 px-7 text-xs font-black uppercase tracking-wider shrink-0 transition-all"
            >
              {freeTier.cta}
            </button>
          </div>
        </motion.div>

        {/* Paid Tiers (3 Grid) */}
        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, i) => {
            const isEnterprise = tier.monthlyPriceUSD === 0;
            const price = getPrice(tier);
            const theme = tierThemes[i];
            const discount = currency === "USD" ? tier.yearlyDiscountUSD : tier.yearlyDiscountINR;

            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-[#10121A] border-2 ${tier.popular ? "border-[#FFE600]" : "border-[#282B37]"} hover:border-white p-7 sm:p-8 ${theme.shadow} transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 flex flex-col justify-between`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FFE600] text-black text-[10px] font-mono font-black border-2 border-black shadow-[2px_2px_0_0_#000] uppercase tracking-wider whitespace-nowrap">
                    ⭐ MOST POPULAR // RECOMMENDED
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-black font-mono uppercase text-white">{tier.name}</h3>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 border border-[#282B37] text-gray-400">
                      {tier.licenses}
                    </span>
                  </div>
                  <p className="text-xs font-sans text-gray-400 mb-6">{tier.description}</p>

                  <div className="mb-6 pb-6 border-b-2 border-[#282B37]">
                    {isEnterprise ? (
                      <div className="text-4xl font-black font-mono text-white">CUSTOM</div>
                    ) : (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl sm:text-5xl font-black font-mono" style={{ color: theme.color }}>
                            {symbol}{formatPrice(price)}
                          </span>
                          <span className="text-xs font-mono text-gray-400">
                            /{annual ? "year" : "month"}
                          </span>
                        </div>
                        {annual && discount && (
                          <div className="mt-2.5 inline-flex items-center gap-1.5 px-2 py-1 bg-[#161924] border border-[#00FF66] text-[#00FF66] text-[10px] font-mono font-black uppercase">
                            <Tag size={11} /> {discount}
                          </div>
                        )}
                        {!annual && discount && (
                          <div className="mt-2 text-[11px] font-mono text-gray-400">
                            or <span className="text-white font-bold">{symbol}{formatPrice(currency === "USD" ? tier.annualPriceUSD : tier.annualPriceINR)}/year</span> ({discount})
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <button
                    onClick={openWaitlist}
                    className={`brutal-btn w-full mb-6 h-11 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 ${theme.btnBg}`}
                  >
                    {tier.popular && <Zap size={14} />}
                    {tier.cta}
                  </button>

                  <ul className="space-y-3 font-mono text-xs">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-gray-300">
                        <div className="w-4 h-4 bg-[#161924] border border-[#282B37] flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={11} className="text-[#00FF66]" />
                        </div>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
