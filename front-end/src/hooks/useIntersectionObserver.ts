import { useEffect, useRef, useState } from 'react';

/**
 * Custom React hook to observe when an element enters the viewport.
 * Returns a ref to attach to the element and a boolean indicating if it has been revealed.
 */
export const useIntersectionObserver = (threshold = 0.15) => {
  const [hasRevealed, setHasRevealed] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          // Once revealed, we can stop observing to maintain the visible state
          observer.unobserve(currentElement);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before it fully occupies the screen
      }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  return [elementRef, hasRevealed] as const;
};
