function fold(line) {
  if (line.length <= 75) return line;
  const chunks = [];
  let remaining = line;
  chunks.push(remaining.slice(0, 75));
  remaining = remaining.slice(75);
  while (remaining.length) {
    chunks.push(" " + remaining.slice(0, 74));
    remaining = remaining.slice(74);
  }
  return chunks.join("\r\n");
}

function escapeValue(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function buildVCard(profile, origin) {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeValue(profile.name)}`,
    `N:${escapeValue(profile.familyName)};${escapeValue(profile.givenName)};;;`,
    `TITLE:${escapeValue(profile.role)}`,
  ];

  if (profile.contact.phone) {
    lines.push(`TEL;TYPE=CELL:${escapeValue(profile.contact.phone)}`);
  }

  if (profile.contact.email) {
    lines.push(`EMAIL;TYPE=INTERNET:${escapeValue(profile.contact.email)}`);
  }

  const site = origin || profile.links.portfolio;
  if (site) lines.push(`URL:${escapeValue(site)}`);
  if (profile.links.linkedin) {
    lines.push(`URL;TYPE=LinkedIn:${escapeValue(profile.links.linkedin)}`);
  }
  if (profile.links.github) {
    lines.push(`URL;TYPE=GitHub:${escapeValue(profile.links.github)}`);
  }

  lines.push("END:VCARD");
  return lines.map(fold).join("\r\n") + "\r\n";
}

export function downloadTextFile(filename, contents, mime = "text/vcard;charset=utf-8") {
  const blob = new Blob([contents], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
