#!/usr/bin/env python3
"""One-page contact PDF for /connect. Regenerates public/brand/Divy-Barot.pdf."""

from pathlib import Path

from reportlab.lib.colors import Color, HexColor
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

OUT = Path(__file__).resolve().parents[1] / "public" / "brand" / "Divy-Barot.pdf"

BG = HexColor("#12100C")
FG = HexColor("#F5F0E8")
MUTED = HexColor("#A8A092")
ACCENT = HexColor("#D97706")
BORDER = Color(245 / 255, 240 / 255, 232 / 255, alpha=0.18)

NAME = "DIVY BAROT"
ROLE = "Full-Stack AI Engineer"
POSITIONING = "I build AI-powered products and intelligent software."
INTRO = (
    "I design and ship AI-powered products — from model integration "
    "to the interface people actually use."
)
SERVICES = [
    "AI Engineering",
    "Agentic AI",
    "Full-Stack Development",
    "AI Product Development",
]
WORK = [
    ("ProcureGenie Local LLM", "AI / Backend", "Local LLM procurement assistant."),
    ("Weather App", "Full Stack", "Real-time weather in a calm React interface."),
    ("DJ Rohan", "Full Stack", "Freelance DJ site with motion and contact flow."),
]
CONTACT = [
    ("Website", "divydoesnotcode-portfolio-livid-beta.vercel.app"),
    ("Email", "workwithdivy@gmail.com"),
    ("LinkedIn", "linkedin.com/in/divy-barot"),
    ("GitHub", "github.com/divydoesnotcode"),
]


def hairline(c, x1, y, x2):
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.6)
    c.line(x1, y, x2, y)


def section_label(c, text, x, y):
    c.setFillColor(MUTED)
    c.setFont("Courier", 8)
    c.drawString(x, y, text.upper())


def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    width, height = letter
    c = canvas.Canvas(str(OUT), pagesize=letter)
    c.setTitle("Divy Barot — Full-Stack AI Engineer")
    c.setAuthor("Divy Barot")
    c.setSubject("Digital contact card")

    c.setFillColor(BG)
    c.rect(0, 0, width, height, fill=1, stroke=0)

    left = 0.75 * inch
    right = width - 0.75 * inch
    y = height - 0.85 * inch

    c.setFillColor(ACCENT)
    c.roundRect(left, y - 4, 36, 36, 8, fill=1, stroke=0)
    c.setFillColor(HexColor("#191c21"))
    c.setFont("Times-Bold", 20)
    c.drawString(left + 11, y + 6, "D")

    c.setFillColor(MUTED)
    c.setFont("Courier", 8)
    c.drawRightString(right, y + 14, "DIGITAL CONTACT CARD")

    y -= 72
    c.setFillColor(FG)
    c.setFont("Times-Bold", 28)
    c.drawString(left, y, NAME)

    y -= 22
    c.setFillColor(FG)
    c.setFont("Courier", 11)
    c.drawString(left, y, ROLE)

    y -= 28
    c.setFillColor(MUTED)
    c.setFont("Times-Roman", 11)
    c.drawString(left, y, POSITIONING)

    y -= 28
    hairline(c, left, y, right)

    y -= 28
    section_label(c, "Positioning", left, y)
    y -= 18
    c.setFillColor(FG)
    c.setFont("Times-Roman", 11)
    for line in wrap(INTRO, 78):
        c.drawString(left, y, line)
        y -= 15

    y -= 16
    section_label(c, "Expertise", left, y)
    y -= 20
    x = left
    for service in SERVICES:
        c.setStrokeColor(BORDER)
        c.setFillColor(HexColor("#1A1713"))
        label_w = c.stringWidth(service, "Courier", 8) + 16
        c.roundRect(x, y - 6, label_w, 18, 4, fill=1, stroke=1)
        c.setFillColor(FG)
        c.setFont("Courier", 8)
        c.drawString(x + 8, y, service)
        x += label_w + 8

    y -= 36
    section_label(c, "Selected Work", left, y)
    y -= 8
    for title, category, blurb in WORK:
        y -= 28
        c.setFillColor(FG)
        c.setFont("Times-Bold", 12)
        c.drawString(left, y, title)
        c.setFillColor(ACCENT)
        c.setFont("Courier", 8)
        c.drawRightString(right, y, category.upper())
        y -= 14
        c.setFillColor(MUTED)
        c.setFont("Times-Roman", 10)
        c.drawString(left, y, blurb)

    y -= 28
    hairline(c, left, y, right)
    y -= 28
    section_label(c, "Contact", left, y)
    y -= 22
    for label, value in CONTACT:
        c.setFillColor(MUTED)
        c.setFont("Courier", 8)
        c.drawString(left, y, label.upper())
        c.setFillColor(FG)
        c.setFont("Times-Roman", 11)
        c.drawString(left + 90, y, value)
        y -= 18

    c.setFillColor(MUTED)
    c.setFont("Courier", 8)
    c.drawString(left, 0.55 * inch, "© 2026 Divy Barot")
    c.drawRightString(right, 0.55 * inch, "Save this card. Stay in touch.")

    c.showPage()
    c.save()
    print(f"Wrote {OUT}")


def wrap(text, width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        trial = f"{current} {word}".strip()
        if len(trial) <= width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


if __name__ == "__main__":
    main()
