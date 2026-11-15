
"use client";

import { useEffect, useRef } from "react";

interface UseElementVisibilityOptions {
  delay?: number;
  enabled?: boolean;
  onVisible: () => void | Promise<void>;
}

export function useElementVisibility<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T | null>,
  {
    delay = 3000,
    enabled = true,
    onVisible,
  }: UseElementVisibilityOptions
) {
  const callbackRef = useRef(onVisible);
  const executedRef = useRef(false);

  useEffect(() => {
    callbackRef.current = onVisible;
  }, [onVisible]);

  useEffect(() => {
    const element = ref.current;

    if (!element || !enabled) {
      executedRef.current = false;
      return;
    }

    let timer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const fullyVisible =
          entry.isIntersecting &&
          entry.intersectionRatio >= 1;

        if (fullyVisible && !executedRef.current) {
          if (!timer) {
            timer = setTimeout(async () => {
              timer = null;

              executedRef.current = true;

              try {
                await callbackRef.current();
              } catch (error) {
                executedRef.current = false;
                console.error("Visibility callback failed:", error);
              }
            }, delay);
          }
        } else {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
        }
      },
      {
        threshold: 1,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [ref, delay, enabled]);
}
