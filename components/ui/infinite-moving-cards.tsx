"use client";

import { cn } from "@/lib/utils";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <Box
      ref={containerRef}
      position="relative"
      zIndex={20}
      maxW="7xl"
      overflow="hidden"
      className="[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
    >
      <Box
        as="ul"
        ref={scrollerRef}
        display="flex"
        w="max"
        minW="full"
        flexShrink={0}
        flexWrap="nowrap"
        gap={4}
        py={4}
        className={cn(
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <Box
            as="li"
            border="1px solid"
            borderColor="gray.200"
            p={8}
            position="relative"
            w={{ base: "350px", md: "450px" }}
            maxW="full"
            flexShrink={0}
            rounded="2xl"
            borderBottom="none"
            bgGradient="linear(180deg, #fafafa, #f5f5f5)"
            key={item.name}
          >
            <blockquote>
              <Box
                aria-hidden="true"
                userSelect="none"
                pointerEvents="none"
                position="absolute"
                top="-0.5"
                left="-0.5"
                zIndex={-1}
                h="calc(100% + 4px)"
                w="calc(100% + 4px)"
              ></Box>
              <Text
                position="relative"
                zIndex={20}
                fontSize="sm"
                lineHeight="1.6"
                fontWeight="normal"
                color="gray.800"
              >
                {item.quote}
              </Text>
              <Flex align="start">
                <Flex direction="column" gap={1} mt={8}>
                  <Text fontSize="sm" color="gray.600">
                    {item.name}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {item.title}
                  </Text>
                </Flex>
              </Flex>
            </blockquote>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
