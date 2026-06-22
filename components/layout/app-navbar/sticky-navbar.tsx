"use client";

import { Box, Flex } from "@chakra-ui/react";
import { ReactNode, useEffect, useRef, useState } from "react";

const SPRING = "0.46s cubic-bezier(0.34, 1.56, 0.64, 1)";
const EASE_OUT = "0.26s cubic-bezier(0.4, 0, 0.2, 1)";

export const StickyNavbar = ({ children }: { children: ReactNode }) => {
  const [minimized, setMinimized] = useState(false);
  // Track scroll position per element so delta is always relative to that element.
  const scrollMap = useRef(new Map<EventTarget, number>());

  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target || typeof target.scrollTop !== "number") return;

      const prev = scrollMap.current.get(target) ?? target.scrollTop;
      const curr = target.scrollTop;
      const delta = curr - prev;
      scrollMap.current.set(target, curr);

      if (curr < 10) setMinimized(false);
      else if (delta > 4) setMinimized(true);
      else if (delta < -4) setMinimized(false);
    };

    // capture: true intercepts scroll from any nested scrollable element
    document.addEventListener("scroll", handler, {
      capture: true,
      passive: true,
    });
    return () =>
      document.removeEventListener("scroll", handler, { capture: true });
  }, []);

  return (
    <Box
      position="fixed"
      left={0}
      right={0}
      bottom={0}
      display="flex"
      justifyContent="center"
      zIndex={100}
      pointerEvents="none"
    >
      <Box position="relative" display="flex" justifyContent="center" w="100%">
        <Box
          w="100%"
          pointerEvents={minimized ? "none" : "auto"}
          style={{
            opacity: minimized ? 0 : 1,
            transform: minimized
              ? "translateY(28px) scale(0.98)"
              : "translateY(0) scale(1)",
            transition: `opacity ${EASE_OUT}, transform ${SPRING}`,
          }}
        >
          <Flex
            bg="white"
            borderTop="1px solid"
            borderColor="gray.200"
            px={2}
            py={2}
            justify="space-evenly "
            align="center"
          >
            {children}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
