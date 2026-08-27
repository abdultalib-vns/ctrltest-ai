import { useCallback, useEffect, useState } from "react";

export function useInView<T extends Element = HTMLElement>(threshold = 0.1) {
  const [node, setNode] = useState<T | null>(null);
  const [inView, setInView] = useState(false);

  const ref = useCallback((element: T | null) => {
    setNode(element);
  }, []);

  useEffect(() => {
    if (!node || inView) return;

    const isVisible = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

      return visibleHeight > rect.height * threshold;
    };

    const markInView = () => {
      setInView(true);
    };

    if (isVisible()) {
      markInView();
      return;
    }

    let observer: IntersectionObserver | null = null;

    const handleVisibilityCheck = () => {
      if (!isVisible()) return;

      markInView();
      observer?.disconnect();
      window.removeEventListener("scroll", handleVisibilityCheck);
      window.removeEventListener("resize", handleVisibilityCheck);
    };

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting && entry.intersectionRatio < threshold) return;
          handleVisibilityCheck();
        },
        { threshold: [0, threshold, 0.25, 0.5], rootMargin: "0px" }
      );

      observer.observe(node);
    }

    window.addEventListener("scroll", handleVisibilityCheck, { passive: true });
    window.addEventListener("resize", handleVisibilityCheck);

    const rafId = window.requestAnimationFrame(handleVisibilityCheck);

    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleVisibilityCheck);
      window.removeEventListener("resize", handleVisibilityCheck);
    };
  }, [inView, node, threshold]);

  return { ref, inView };
}
