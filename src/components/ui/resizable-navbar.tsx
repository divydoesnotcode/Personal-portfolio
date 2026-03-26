"use client";
import { cn } from "../../lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState } from "react";


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("sticky top-4 z-20 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
            child as React.ReactElement<{ visible?: boolean }>,
            { visible },
          )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        backdropFilter: isHovered
          ? "blur(14px) saturate(160%)"
          : "blur(12px) saturate(140%)",
        boxShadow: isHovered
          ? "0 4px 24px rgba(26,22,16,0.12), inset 0 1px 0 0 rgba(255,255,255,0.6)"
          : "0 2px 12px rgba(26,22,16,0.08), inset 0 1px 0 0 rgba(255,255,255,0.5)",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "min(1080px, 95vw)",
        willChange: "transform, backdrop-filter",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-4 py-2 lg:flex backdrop-blur-[12px] border",
        isHovered ? "bg-[var(--bg)]/90 border-[var(--border-strong)]" : "bg-[var(--bg)]/80 border-[var(--border)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium transition duration-200 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-200"
          key={`link-${idx}`}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Navigate to ${item.name}`}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-[var(--accent-muted)] border border-[var(--accent)]/20 shadow-[0_2px_8px_var(--accent-muted)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
              style={{ willChange: "transform" }}
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        backdropFilter: isHovered
          ? "blur(14px) saturate(160%)"
          : "blur(12px) saturate(140%)",
        boxShadow: isHovered
          ? "0 4px 24px rgba(26,22,16,0.12), inset 0 1px 0 0 rgba(255,255,255,0.6)"
          : "0 2px 12px rgba(26,22,16,0.08), inset 0 1px 0 0 rgba(255,255,255,0.5)",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{ willChange: "transform, backdrop-filter" }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-0 py-2 lg:hidden backdrop-blur-[12px] border",
        isHovered ? "bg-[var(--bg)]/95 border-[var(--border-strong)]" : "bg-[var(--bg)]/90 border-[var(--border)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between px-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg px-4 py-8 backdrop-blur-md border shadow-[0_4px_16px_var(--border)]",
            isHovered ? "bg-[var(--bg)]/98 border-[var(--border-strong)]" : "bg-[var(--bg)]/95 border-[var(--border)]",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className="p-2 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-md transition-transform duration-300 hover:scale-105"
    >
      {isOpen ? (
        <IconX className="text-[var(--fg)] cursor-pointer hover:text-[var(--accent)] transition-colors duration-300" />
      ) : (
        <IconMenu2 className="text-[var(--fg)] cursor-pointer hover:text-[var(--accent)] transition-colors duration-300" />
      )}
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-[var(--fg)] group"
      aria-label="Home"
    >
      <motion.img
        src="https://assets.aceternity.com/logo-dark.png"
        alt="Company Logo"
        width={30}
        height={30}
        whileHover={{ scale: 1.05, rotate: 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="transition-transform duration-200"
      />
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark";
} & (
    | React.ComponentPropsWithoutRef<"a">
    | React.ComponentPropsWithoutRef<"button">
  )) => {
  const baseStyles =
    "px-4 py-2 rounded-md text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition-all duration-200 inline-block text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";

  const variantStyles = {
    primary:
      "bg-[var(--fg)] text-[var(--bg)] shadow-lg hover:shadow-xl hover:bg-[var(--accent)] focus:ring-[var(--accent)]/50",
    secondary:
      "bg-transparent text-[var(--fg-muted)] hover:text-[var(--fg)] focus:ring-[var(--border)]",
    dark:
      "bg-black text-white shadow-lg hover:shadow-xl focus:ring-stone-700",
  };
   
  const Component = Tag as any;
  return (
    <Component
      href={href || undefined}
      target={Tag === "a" || href ? "_blank" : undefined}
      rel={Tag === "a" || href ? "noopener noreferrer" : undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
};