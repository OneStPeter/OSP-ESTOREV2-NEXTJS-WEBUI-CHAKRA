"use client";

import { Box, Flex } from "@chakra-ui/react";
import { ReactNode, useEffect, useRef, useState } from "react";

const SPRING = "0.46s cubic-bezier(0.34, 1.56, 0.64, 1)";
const EASE_OUT = "0.26s cubic-bezier(0.4, 0, 0.2, 1)";

export const StickyNavbar = ({ children }: { children: ReactNode }) => {
  const [minimized, setMinimized] = useState(false);
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
      bottom={0}
      pt={"5px"}
      left={0}
      right={0}
      zIndex={100}
      bg="white"
      borderTop="1px solid"
      borderColor="gray.200"
      _dark={{ bg: "gray.900", borderColor: "gray.700" }}
      // The spring easing overshoots upward when the bar slides back in.
      // This strip paints the same background just below the bar so no gap
      // shows during that bounce (replaces the old bottom="-10px" trick).
      _after={{
        content: '""',
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        height: "24px",
        bg: "inherit",
      }}
      style={{
        //paddingBottom: "calc(env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
        transform: minimized ? "translateY(100%)" : "translateY(0)",
        transition: `transform ${minimized ? EASE_OUT : SPRING}`,
      }}
    >
      <Flex h="56px" px={2} gap={1} align="center" justify="space-between">
        {children}
      </Flex>
    </Box>
  );
};
