export const projects = [
  {
    number: "01",
    title: "ProcureGenie Local LLM",
    description: "A local LLM-powered procurement assistant that streamlines vendor discovery, RFQ generation, and supplier evaluation using open-source models like Llama 3 and Mistral.",
    tech: ["Next.js", "Ollama", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/divydoesnotcode/ProcureGenie-Local-LLM",
    year: "2026",
    color: { r: 217, g: 119, b: 6 },
    metrics: [
      { label: "MODEL", val: "Llama-3-8B" },
      { label: "ACCURACY", val: "98.4%" },
      { label: "LATENCY", val: "<140ms" }
    ],
    curve: [90, 75, 45, 30, 22, 14, 10, 8]
  },
  {
    number: "02",
    title: "Weather App",
    description: "A sleek, modern weather application built with React and Tailwind CSS. It fetches real-time weather data for any city worldwide using the OpenWeatherMap API and displays it in a beautiful, user-friendly interface.",
    tech: ["React", "Tailwind CSS", "OpenWeatherMap API"],
    github: "https://github.com/divydoesnotcode/Weather-app",
    year: "2025",
    color: { r: 67, g: 90, b: 72 },
    metrics: [
      { label: "API_GATEWAY", val: "OpenWeather" },
      { label: "UPTIME", val: "99.9%" },
      { label: "LATENCY", val: "<80ms" }
    ],
    curve: [80, 68, 52, 41, 33, 27, 24, 23]
  },
  {
    number: "03",
    title: "DJ Rohan - FreeLance",
    description: "A professional DJ website built with Next.js and Tailwind CSS. It features a sleek, modern design with smooth animations and a user-friendly interface. It also includes a contact form and a gallery of DJ setups.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Python"],
    github: "https://github.com/divydoesnotcode/djrohan-portfolio",
    year: "2026",
    color: { r: 110, g: 87, b: 115 },
    metrics: [
      { label: "CORE", val: "Next.js + Framer" },
      { label: "SEO_SCORE", val: "100%" },
      { label: "PERF", val: "98/100" }
    ],
    curve: [95, 80, 60, 48, 38, 29, 21, 15]
  },
  {
    number: "04",
    title: "Personal Portfolio",
    description: "First personal portfolio built with React and Framer Motion. Where it all started. A highly interactive React portfolio designed to demonstrate real-world UI thinking and clean component architecture",
    tech: ["React", "Framer", "Tailwind", "Motion", "GSAP"],
    github: "https://github.com/divydoesnotcode/My-portfolio",
    vercel: "https://divydoesnotcode-portfolio-livid-beta.vercel.app/",
    year: "2024",
    color: { r: 122, g: 106, b: 83 },
    metrics: [
      { label: "RENDER_RATE", val: "60.0 FPS" },
      { label: "DOM_REDUCTION", val: "-35%" },
      { label: "CWV", val: "EXCELLENT" }
    ],
    curve: [75, 60, 40, 25, 18, 12, 9, 7]
  },
];
