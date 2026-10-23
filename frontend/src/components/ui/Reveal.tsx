import React, { useEffect, useRef, useState } from "react";

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number; // in seconds (e.g. 0.1, 0.2) or ms (e.g. 150)
  duration?: number; // in seconds (e.g. 1.35)
  distance?: number; // in pixels (e.g. 60)
  className?: string;
  triggerOnce?: boolean;
  threshold?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 1.35,
  distance = 60,
  className = "",
  triggerOnce = true,
  threshold = 0.08,
  style,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check if IntersectionObserver is supported
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) {
              observer.unobserve(el);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, triggerOnce]);

  // Compute transform based on direction
  const getInitialTransform = () => {
    // Check if on mobile to keep horizontal transforms within safe viewport bounds
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const hDist = isMobile ? Math.min(distance, 18) : distance;
    const vDist = isMobile ? Math.min(distance, 28) : distance;

    switch (direction) {
      case "up":
        return `translate3d(0, ${vDist}px, 0)`; // niche se uper aayega
      case "down":
        return `translate3d(0, -${vDist}px, 0)`; // uper se niche aayega
      case "left":
        return `translate3d(-${hDist}px, 0, 0)`; // left se right aayega
      case "right":
        return `translate3d(${hDist}px, 0, 0)`; // right se left aayega
      case "none":
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  // Normalize delay: if passed in milliseconds (e.g. 150), convert to seconds
  const normalizedDelay = delay >= 10 ? delay / 1000 : delay;

  // Gentle, slow cinematic duration: scale any fast duration (< 1s) to ~1.2s - 1.4s
  const effectiveDuration = duration ? (duration < 1.1 ? Math.max(1.2, duration * 1.5) : duration) : 1.35;

  const dynamicStyles: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translate3d(0, 0, 0)" : getInitialTransform(),
    // Silk ease-out curve for gentle, slow cinematic entrance without snapping
    transition: `transform ${effectiveDuration}s cubic-bezier(0.22, 1, 0.36, 1) ${normalizedDelay}s, opacity ${effectiveDuration}s cubic-bezier(0.22, 1, 0.36, 1) ${normalizedDelay}s`,
    willChange: "transform, opacity",
    maxWidth: "100%",
    ...style,
  };

  return (
    <div
      ref={elementRef}
      className={`reveal-wrapper max-w-full ${className}`}
      style={dynamicStyles}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Reveal;
