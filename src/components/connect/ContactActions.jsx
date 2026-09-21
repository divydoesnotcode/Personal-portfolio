import { createElement } from "react";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { profile } from "../../data/profile";
import { track } from "../../lib/analytics";
import { SaveContactButton } from "./SaveContactButton";
import { SavePdfButton } from "./SavePdfButton";

const LINKS = [
  {
    id: "email",
    label: "Email",
    href: `mailto:${profile.contact.email}`,
    event: "email_click",
    icon: Mail,
    external: false,
    show: Boolean(profile.contact.email),
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: profile.contact.whatsapp || (profile.contact.phone ? `https://wa.me/${profile.contact.phone.replace(/\D/g, "")}` : ""),
    event: "whatsapp_click",
    icon: MessageCircle,
    external: true,
    show: Boolean(profile.contact.whatsapp || profile.contact.phone),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: profile.links.linkedin,
    event: "linkedin_click",
    icon: Linkedin,
    external: true,
    show: Boolean(profile.links.linkedin),
  },
  {
    id: "github",
    label: "GitHub",
    href: profile.links.github,
    event: "github_click",
    icon: Github,
    external: true,
    show: Boolean(profile.links.github),
  },
];

export function ContactActions({ source }) {
  return (
    <div className="connect-actions" id="connect-actions">
      <SaveContactButton source={source} />
      <SavePdfButton source={source} />
      <nav className="connect-links" aria-label="Contact links">
        {LINKS.filter((link) => link.show).map((link) => (
          <a
            key={link.id}
            href={link.href}
            className="connect-link"
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            onClick={() => track(link.event, { source })}
          >
            {createElement(link.icon, { size: 16, "aria-hidden": true })}
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
