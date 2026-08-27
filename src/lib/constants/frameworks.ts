export const frameworkBadges = [
  { name: "Playwright", color: "#00FF66", bg: "rgba(0, 255, 102, 0.08)", border: "#00FF66", category: "Web & E2E" },
  { name: "Cypress", color: "#00F0FF", bg: "rgba(0, 240, 255, 0.08)", border: "#00F0FF", category: "Web E2E" },
  { name: "Selenium", color: "#FFE600", bg: "rgba(255, 230, 0, 0.08)", border: "#FFE600", category: "Browser Auto" },
  { name: "WebdriverIO", color: "#FF7700", bg: "rgba(255, 119, 0, 0.08)", border: "#FF7700", category: "NextGen E2E" },
  { name: "Appium", color: "#9D4EDD", bg: "rgba(157, 78, 221, 0.08)", border: "#9D4EDD", category: "Mobile iOS/Android" },
  { name: "Detox", color: "#FF2E93", bg: "rgba(255, 46, 147, 0.08)", border: "#FF2E93", category: "React Native" },
  { name: "Jest", color: "#FFE600", bg: "rgba(255, 230, 0, 0.08)", border: "#FFE600", category: "Unit & Integration" },
  { name: "Pytest", color: "#00F0FF", bg: "rgba(0, 240, 255, 0.08)", border: "#00F0FF", category: "Python Suite" },
  { name: "Supertest", color: "#00FF66", bg: "rgba(0, 255, 102, 0.08)", border: "#00FF66", category: "REST API" },
  { name: "k6", color: "#9D4EDD", bg: "rgba(157, 78, 221, 0.08)", border: "#9D4EDD", category: "Load & Perf" },
  { name: "Robot Framework", color: "#FF7700", bg: "rgba(255, 119, 0, 0.08)", border: "#FF7700", category: "Keyword Testing" },
  { name: "Cucumber BDD", color: "#00FF66", bg: "rgba(0, 255, 102, 0.08)", border: "#00FF66", category: "Gherkin BDD" },
];

export const trustStats = [
  { displayValue: "300+", label: "VS Code Installs", tag: "RAPID GROWTH", color: "#FFE600", shadow: "brutal-shadow-yellow" },
  { displayValue: "12+", label: "Testing Frameworks", tag: "FULL COVERAGE", color: "#00F0FF", shadow: "brutal-shadow-cyan" },
  { displayValue: "8", label: "Languages Supported", tag: "POLYGLOT", color: "#00FF66", shadow: "brutal-shadow-lime" },
  { displayValue: "~2min", label: "Average Generation", tag: "INSTANT SETUP", color: "#FF2E93", shadow: "brutal-shadow-pink" },
];

export const features = [
  {
    title: "AI Framework Generation",
    description: "Generate complete, production-ready test frameworks from a simple wizard. Powered by Claude AI through GitHub Copilot.",
    icon: "Sparkles",
    large: true,
  },
  {
    title: "Multi-Framework Support",
    description: "Playwright, Cypress, Selenium, WebdriverIO, Appium, Detox, Jest, Pytest, Supertest, k6, Robot Framework, and Cucumber BDD — all from one tool.",
    icon: "Layers",
    large: true,
  },
  {
    title: "CI/CD Integration",
    description: "Auto-generate GitHub Actions, GitLab CI, Jenkins, Azure DevOps, or CircleCI pipelines ready to run your tests.",
    icon: "GitBranch",
    large: false,
  },
  {
    title: "Environment Config",
    description: "Multi-environment support with .env files, config managers, and environment-specific test data out of the box.",
    icon: "Settings",
    large: false,
  },
  {
    title: "Smart Debugging",
    description: "Built-in debug configurations, trace viewers, screenshot-on-failure, and detailed HTML reports.",
    icon: "Bug",
    large: false,
  },
];

export const howItWorksSteps = [
  {
    number: "01",
    title: "Open Panel",
    body: "Launch the CtrlTest AI panel from VS Code's sidebar or command palette.",
    icon: "PanelLeft",
  },
  {
    number: "02",
    title: "Fill Wizard",
    body: "Select your app type, framework, language, testing type, and CI/CD provider.",
    icon: "ListChecks",
  },
  {
    number: "03",
    title: "AI Generates",
    body: "Claude AI builds your entire test framework — configs, helpers, sample tests, and CI pipelines.",
    icon: "Cpu",
  },
  {
    number: "04",
    title: "Run Tests",
    body: "Your complete test suite is ready. Run tests immediately with zero additional setup.",
    icon: "Play",
  },
];

export const ideSupport = [
  { name: "VS Code", status: "supported" as const, icon: "Monitor" },
  { name: "Cursor", status: "supported" as const, icon: "Monitor" },
  { name: "Codespaces", status: "supported" as const, icon: "Cloud" },
  { name: "Windsurf", status: "supported" as const, icon: "Monitor" },
  { name: "JetBrains", status: "coming" as const, icon: "Monitor" },
  { name: "Neovim", status: "coming" as const, icon: "Terminal" },
];

export const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior QA Engineer",
    company: "TechFlow",
    initials: "SC",
    quote: "CtrlTest AI saved us weeks of setup time. We went from zero to a complete Playwright framework with CI/CD in under a minute.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Test Automation Lead",
    company: "DevScale",
    initials: "MJ",
    quote: "The multi-framework support is incredible. We use Cypress for web, Appium for mobile, and Supertest for API — all generated from one tool.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "QA Manager",
    company: "CloudNine",
    initials: "PP",
    quote: "Best VS Code extension for test automation. The AI understands best practices and generates clean, maintainable code every time.",
    rating: 5,
  },
];
