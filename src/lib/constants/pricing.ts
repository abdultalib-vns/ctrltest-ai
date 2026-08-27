export interface PricingTier {
  name: string;
  monthlyPriceUSD: number;
  annualPriceUSD: number;
  monthlyPriceINR: number;
  annualPriceINR: number;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  licenses: string;
  yearlyDiscountUSD?: string;
  yearlyDiscountINR?: string;
}

export const freeTier = {
  name: "Free Trial",
  description: "Experience CtrlTest AI with full access for 14 days — no credit card required.",
  features: [
    "5 generations per month",
    "All frameworks supported",
    "Basic CI/CD templates",
    "Community support",
  ],
  cta: "Start Free Trial",
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Single User",
    monthlyPriceUSD: 1,
    annualPriceUSD: 10,
    monthlyPriceINR: 89,
    annualPriceINR: 899,
    description: "For individual developers & QA engineers",
    licenses: "1 License",
    yearlyDiscountUSD: "Flat $2 discount on yearly package",
    yearlyDiscountINR: "Flat ₹169 discount on yearly package",
    features: [
      "Unlimited framework generations",
      "All 12+ frameworks supported",
      "Advanced CI/CD pipelines & configs",
      "Full Page Object Model architectures",
      "Priority developer support",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro Team",
    monthlyPriceUSD: 10,
    annualPriceUSD: 95,
    monthlyPriceINR: 899,
    annualPriceINR: 7999,
    description: "For fast-moving QA & development teams",
    licenses: "Team Licenses",
    yearlyDiscountUSD: "Flat $25 discount on yearly package",
    yearlyDiscountINR: "Flat ₹2,789 discount on yearly package",
    features: [
      "Everything in Single User",
      "Team seat licenses included",
      "Shared company framework templates",
      "Custom assertion helper generators",
      "Team sharing & collaboration",
      "Direct priority technical support",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    monthlyPriceUSD: 0,
    annualPriceUSD: 0,
    monthlyPriceINR: 0,
    annualPriceINR: 0,
    description: "For organizations requiring custom scale & security",
    licenses: "Unlimited Licenses",
    features: [
      "Everything in Pro Team",
      "Unlimited team seats",
      "SSO & strict private workspace mode",
      "Custom framework contracts & rules",
      "Dedicated account engineer",
      "99.9% uptime & SLA guarantee",
      "On-premise / air-gapped deployment",
    ],
    cta: "Contact Sales",
  },
];
