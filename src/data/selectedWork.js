import { projects } from "./projects";

const PREVIEWS = [
  {
    title: "ProcureGenie Local LLM",
    description: "Local LLM assistant for vendor discovery, RFQs, and supplier evaluation.",
    category: "AI / Backend",
  },
  {
    title: "Weather App",
    description: "Real-time weather for any city, in a calm React interface.",
    category: "Full Stack",
  },
  {
    title: "DJ Rohan - FreeLance",
    description: "Freelance DJ site with motion, gallery, and a contact flow.",
    category: "Full Stack",
  },
];

export const selectedWork = PREVIEWS.map((preview) => {
  const project = projects.find((item) => item.title === preview.title);
  return {
    ...preview,
    href: project?.vercel || project?.github || "/",
  };
});
