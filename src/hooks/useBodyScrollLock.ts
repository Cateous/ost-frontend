
"use client";
import { useLayoutEffect } from "react";

/**
 * Locks body scroll by toggling Tailwind's 'overflow-hidden' class on the body.
 */
export const useBodyScrollLock = (locked: boolean) => {
  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    if (locked) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    
    // Cleanup function
    return () => {
        document.body.classList.remove("overflow-hidden");
        // Restore original style if it existed
        document.body.style.overflow = originalOverflow;
    };
  }, [locked]);
};
