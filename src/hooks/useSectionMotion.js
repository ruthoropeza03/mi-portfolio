import { useEffect, useRef } from "react";

export function useSectionMotion() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    element.classList.add("motion-ready");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.classList.add("motion-active");
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      element.classList.add("motion-active");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("motion-active");
          observer.unobserve(element);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return ref;
}
