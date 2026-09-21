/**
 * Motion language for /connect
 * glow/nodes/bridge/orbit/rings — the tap becoming a meeting
 * mark/letters/shine — identity locking in
 * Connected. → Nice to meet you. — confirmation, then greeting
 * name/role/positioning — who, what, why
 * save contact — the handshake becoming a kept contact
 * sections — proof, capabilities, and the invitation, revealed while reading
 */
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(CustomEase, ScrollTrigger);

CustomEase.create("connectOut", "0.16, 1, 0.3, 1");
CustomEase.create("connectSnap", "0.22, 1, 0.36, 1");

const APPLE_OUT = "connectOut";

function q(root, selector) {
  return root.querySelector(selector);
}

function qa(root, selector) {
  return Array.from(root.querySelectorAll(selector));
}

function prefersFinePointer() {
  return window.matchMedia("(pointer: fine)").matches;
}

function bindMagnetic(el, strength = 18) {
  const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
  const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

  const onMove = (event) => {
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - rect.left - rect.width / 2;
    const relY = event.clientY - rect.top - rect.height / 2;
    xTo((relX / rect.width) * strength);
    yTo((relY / rect.height) * strength);
  };

  const onLeave = () => {
    xTo(0);
    yTo(0);
  };

  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerleave", onLeave);
  el.addEventListener("pointerup", onLeave);

  return () => {
    el.removeEventListener("pointermove", onMove);
    el.removeEventListener("pointerleave", onLeave);
    el.removeEventListener("pointerup", onLeave);
    gsap.set(el, { x: 0, y: 0 });
  };
}

function bindPress(el) {
  const down = () => gsap.to(el, { scale: 0.975, duration: 0.16, ease: "power2.out", overwrite: "auto" });
  const up = () => gsap.to(el, { scale: 1, duration: 0.35, ease: APPLE_OUT, overwrite: "auto" });
  el.addEventListener("pointerdown", down);
  el.addEventListener("pointerup", up);
  el.addEventListener("pointerleave", up);
  el.addEventListener("blur", up);
  return () => {
    el.removeEventListener("pointerdown", down);
    el.removeEventListener("pointerup", up);
    el.removeEventListener("pointerleave", up);
    el.removeEventListener("blur", up);
  };
}

export function pulseSave(button) {
  if (!button) return;
  const ring = button.querySelector("[data-connect='save-pulse']");
  if (!ring) return;
  gsap.fromTo(
    ring,
    { opacity: 0.45, scale: 0.92 },
    { opacity: 0, scale: 1.18, duration: 0.7, ease: "power2.out" }
  );
  gsap.fromTo(
    button,
    { scale: 0.98 },
    { scale: 1, duration: 0.5, ease: APPLE_OUT }
  );
}

export function playConnectMotion(root, { reducedMotion, timeScale = 1, pulse = true, onReady }) {
  const cleanups = [];

  const revealNow = () => {
    const letterMask = q(root, "[data-connect='letter-mask']");
    gsap.set(qa(root, "[data-connect]"), { clearProps: "transform,filter,opacity,visibility" });
    gsap.set(
      qa(
        root,
        ".connect-char, .connect-word, .connect-mark, .connect-orbit-path, .connect-section-rule, .connect-shine"
      ),
      { clearProps: "all" }
    );
    if (letterMask) gsap.set(letterMask, { attr: { height: 52, y: 18 } });
    onReady?.();
  };

  if (reducedMotion) {
    revealNow();
    return () => {};
  }

  const glow = q(root, "[data-connect='glow']");
  const markWrap = q(root, "[data-connect='mark-wrap']");
  const mark = q(root, "[data-connect='mark']");
  const plate = q(root, "[data-connect='plate']");
  const letters = q(root, "[data-connect='letters']");
  const letterMask = q(root, "[data-connect='letter-mask']");
  const shine = q(root, "[data-connect='shine']");
  const orbit = q(root, "[data-connect='orbit-path']");
  const rings = qa(root, "[data-connect='ring']");
  const nodeA = q(root, "[data-connect='node-a']");
  const nodeB = q(root, "[data-connect='node-b']");
  const bridge = q(root, "[data-connect='bridge']");
  const identity = q(root, "[data-connect='identity']");
  const kickerConnected = q(root, "[data-connect='kicker-connected']");
  const kickerMeet = q(root, "[data-connect='kicker-meet']");
  const kickerCard = q(root, "[data-connect='kicker-card']");
  const nameChars = qa(root, ".connect-name .connect-char");
  const roleWords = qa(root, ".connect-role .connect-word");
  const positioning = q(root, "[data-connect='positioning']");
  const actions = q(root, "[data-connect='actions']");
  const primary = q(root, "[data-connect='save-contact']");
  const secondary = q(root, "[data-connect='save-pdf']");
  const links = qa(root, "[data-connect='link']");
  const sections = qa(root, "[data-connect='section']");
  const footer = q(root, "[data-connect='footer']");
  const skip = q(root, ".connect-skip");

  gsap.set(glow, { opacity: 0, scale: 0.72 });
  gsap.set(markWrap, { autoAlpha: 1 });
  gsap.set(mark, { opacity: 0, scale: 0.82, rotateX: 16, transformPerspective: 800 });
  gsap.set(plate, { scale: 0.88, transformOrigin: "50% 50%" });
  gsap.set(letters, { opacity: 1 });
  if (letterMask) gsap.set(letterMask, { attr: { height: 0, y: 70 } });
  gsap.set(shine, { x: -90, opacity: 0 });
  if (orbit) {
    const length = orbit.getTotalLength?.() ?? 340;
    gsap.set(orbit, { strokeDasharray: length, strokeDashoffset: length, opacity: 0.7 });
  }
  gsap.set(rings, { opacity: 0, scale: 0.9, transformOrigin: "50% 50%" });
  gsap.set([nodeA, nodeB], { opacity: 0, scale: 0.5 });
  gsap.set(nodeA, { x: -56, y: 0 });
  gsap.set(nodeB, { x: 56, y: 0 });
  gsap.set(bridge, { scaleX: 0, opacity: 0.8 });
  gsap.set(identity, { autoAlpha: 1 });
  gsap.set([kickerConnected, kickerMeet, kickerCard], { autoAlpha: 0, y: 8, letterSpacing: "0.42em" });
  gsap.set(kickerMeet, { y: 6 });
  gsap.set(nameChars, { yPercent: 110 });
  gsap.set(roleWords, { yPercent: 108, opacity: 0 });
  gsap.set(positioning, { autoAlpha: 0, y: 12 });
  gsap.set(actions, { autoAlpha: 1 });
  gsap.set(primary, { autoAlpha: 0, y: 18, scale: 0.97 });
  gsap.set(secondary, { autoAlpha: 0, y: 16 });
  gsap.set(links, { autoAlpha: 0, y: 14 });
  gsap.set(sections, { autoAlpha: 0, y: 36 });
  gsap.set(qa(root, ".connect-section-rule"), { scaleX: 0 });
  gsap.set(footer, { autoAlpha: 0, y: 12 });

  const tl = gsap.timeline({
    defaults: { ease: APPLE_OUT },
    paused: false,
    onComplete: () => onReady?.(),
  });

  tl.addLabel("meet")
    .to(glow, { opacity: 0.9, scale: 1, duration: 0.9, ease: "connectSnap" }, 0)
    .to(nodeA, { opacity: 1, x: -22, scale: 1, duration: 0.55 }, 0.08)
    .to(nodeB, { opacity: 1, x: 22, scale: 1, duration: 0.55 }, 0.08)
    .to(bridge, { scaleX: 1, duration: 0.42, ease: "connectSnap" }, 0.28)
    .to(orbit, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, 0.12)
    .to(mark, { opacity: 1, scale: 1, rotateX: 0, duration: 0.72 }, 0.18)
    .to(plate, { scale: 1, duration: 0.72 }, 0.18);

  if (letterMask) {
    tl.to(letterMask, { attr: { height: 52, y: 18 }, duration: 0.62, ease: "power3.out" }, 0.38);
  }

  tl.to(shine, { opacity: 0.9, duration: 0.12 }, 0.5)
    .to(shine, { x: 90, duration: 0.7, ease: "power2.inOut" }, 0.5)
    .to(shine, { opacity: 0, duration: 0.2 }, 1.05)
    .to([nodeA, nodeB, bridge], { opacity: 0, duration: 0.35 }, 0.62)
    .to(orbit, { opacity: 0.18, duration: 0.6 }, 0.7);

  if (pulse && rings.length) {
    rings.forEach((ring, index) => {
      tl.fromTo(
        ring,
        { opacity: 0.42, scale: 0.92 },
        { opacity: 0, scale: 1.58, duration: 0.95, ease: "power2.out", transformOrigin: "50% 50%" },
        0.46 + index * 0.12
      );
    });
  }

  tl.addLabel("recognize")
    .to(kickerConnected, { autoAlpha: 1, y: 0, letterSpacing: "0.18em", duration: 0.55 }, 0.62)
    .to(kickerConnected, { autoAlpha: 0, y: -8, duration: 0.32, ease: "power2.in" }, 1.12)
    .to(kickerMeet, { autoAlpha: 1, y: 0, letterSpacing: "0.18em", duration: 0.5 }, 1.18)
    .to(
      nameChars,
      { yPercent: 0, duration: 0.78, stagger: { each: 0.028, from: "start" } },
      1.22
    )
    .to(
      roleWords,
      { yPercent: 0, opacity: 1, duration: 0.55, stagger: 0.06 },
      1.52
    )
    .to(positioning, { autoAlpha: 1, y: 0, duration: 0.6 }, 1.68)
    .to(kickerCard, { autoAlpha: 1, y: 0, letterSpacing: "0.18em", duration: 0.5 }, 1.78)
    .addLabel("save")
    .to(primary, { autoAlpha: 1, y: 0, scale: 1, duration: 0.58 }, 1.9)
    .to(secondary, { autoAlpha: 1, y: 0, duration: 0.5 }, 2.02)
    .to(links, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06 }, 2.12);

  tl.timeScale(timeScale);

  sections.forEach((section, index) => {
    const rule = section.querySelector(".connect-section-rule");
    const items = section.querySelectorAll("[data-connect='work-item']");
    const chips = section.querySelectorAll("[data-connect='chip']");
    const cta = section.querySelector("[data-connect='cta']");

    const st = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 88%",
        once: true,
      },
    });

    st.to(section, { autoAlpha: 1, y: 0, duration: 0.8, ease: APPLE_OUT }, 0);
    if (rule) {
      st.to(rule, { scaleX: 1, duration: 0.7, ease: "power3.out" }, 0);
    }
    if (items.length) {
      gsap.set(items, { opacity: 0, y: 18 });
      st.to(items, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: APPLE_OUT }, 0.12);
    }
    if (chips.length) {
      gsap.set(chips, { opacity: 0, y: 10, scale: 0.94 });
      st.to(
        chips,
        { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.05, ease: APPLE_OUT },
        0.1
      );
    }
    if (cta) {
      const arrow = cta.querySelector("[data-connect='cta-arrow']");
      if (arrow) {
        gsap.set(arrow, { x: -6, opacity: 0 });
        st.to(arrow, { x: 0, opacity: 1, duration: 0.45, ease: APPLE_OUT }, 0.16);
      }
    }

    cleanups.push(() => st.scrollTrigger?.kill());
    void index;
  });

  if (footer) {
    const footerTween = gsap.to(footer, {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      ease: APPLE_OUT,
      scrollTrigger: { trigger: footer, start: "top 95%", once: true },
    });
    cleanups.push(() => footerTween.scrollTrigger?.kill());
  }

  if (glow) {
    const glowScrub = gsap.to(glow, {
      y: 90,
      opacity: 0.35,
      ease: "none",
      scrollTrigger: {
        trigger: q(root, ".connect-hero"),
        start: "top top",
        end: "bottom top",
        scrub: 0.7,
      },
    });
    cleanups.push(() => glowScrub.scrollTrigger?.kill());
  }

  if (markWrap) {
    const markScrub = gsap.to(markWrap, {
      y: -20,
      scale: 0.9,
      ease: "none",
      scrollTrigger: {
        trigger: q(root, ".connect-hero"),
        start: "top top",
        end: "bottom top",
        scrub: 0.65,
      },
    });
    cleanups.push(() => markScrub.scrollTrigger?.kill());
  }

  if (skip) {
    const skipAhead = (event) => {
      if (event.type === "click") tl.progress(1);
    };
    skip.addEventListener("click", skipAhead);
    cleanups.push(() => skip.removeEventListener("click", skipAhead));
  }

  if (prefersFinePointer()) {
    qa(root, "[data-connect-magnetic]").forEach((el) => {
      cleanups.push(bindMagnetic(el, el.dataset.connectMagnetic === "strong" ? 22 : 12));
      cleanups.push(bindPress(el));
    });

    qa(root, "[data-connect='work-item']").forEach((el) => {
      const go = el.querySelector("[data-connect='work-go']");
      const enter = () => go && gsap.to(go, { x: 4, duration: 0.35, ease: APPLE_OUT });
      const leave = () => go && gsap.to(go, { x: 0, duration: 0.4, ease: APPLE_OUT });
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointerleave", leave);
      });
    });

    qa(root, "[data-connect='cta']").forEach((el) => {
      const arrow = el.querySelector("[data-connect='cta-arrow']");
      const enter = () => arrow && gsap.to(arrow, { x: 6, duration: 0.35, ease: APPLE_OUT });
      const leave = () => arrow && gsap.to(arrow, { x: 0, duration: 0.4, ease: APPLE_OUT });
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointerleave", leave);
      });
    });
  }

  return () => {
    tl.kill();
    cleanups.forEach((fn) => fn());
    ScrollTrigger.getAll().forEach((trigger) => {
      if (root.contains(trigger.trigger)) trigger.kill();
    });
  };
}
