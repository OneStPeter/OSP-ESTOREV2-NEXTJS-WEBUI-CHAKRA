"use client";

import React, { useState, useRef, useEffect } from "react";
import { Box, IconButton, Badge } from "@chakra-ui/react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useCartCount } from "@/hooks/useCartCount";

export default function FloatingCart({ onOpen }: { onOpen: () => void }) {
  const cartCount = useCartCount();
  const [position, setPosition] = useState({ x: 16, y: 120 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const floatingRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!floatingRef.current) return;
    setIsDragging(true);
    const rect = floatingRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!floatingRef.current) return;
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Keep within viewport boundaries
      const maxX = window.innerWidth - 48;
      const maxY = window.innerHeight - 48;
      const constrainedX = Math.max(0, Math.min(newX, maxX));
      const constrainedY = Math.max(0, Math.min(newY, maxY));

      setPosition({
        x: constrainedX,
        y: constrainedY,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // Persist position to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "floating-cart-pos",
          JSON.stringify({ x: position.x, y: position.y }),
        );
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Load saved position on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("floating-cart-pos");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setPosition(parsed);
        } catch (e) {
          console.error("Failed to parse saved position:", e);
        }
      }
    }
  }, []);

  return (
    <Box
      ref={floatingRef}
      position="fixed"
      left={`${position.x}px`}
      top={`${position.y}px`}
      zIndex={40}
      cursor={isDragging ? "grabbing" : "grab"}
      transition={isDragging ? "none" : "box-shadow 150ms ease-out"}
      _hover={{
        filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))",
      }}
      filter={
        isDragging
          ? "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))"
          : "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))"
      }
      userSelect="none"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box position="relative">
        <IconButton
          aria-label="Shopping Cart"
          size="sm"
          variant="ghost"
          color="gray.fg"
          onClick={onOpen}
          onMouseDown={handleMouseDown}
          _active={{ bg: "none" }}
        >
          <MdOutlineShoppingCart size={24} />
        </IconButton>
        {cartCount > 0 && (
          <Badge
            bg="#ef4444"
            color="white"
            borderRadius="full"
            fontSize="xs"
            position="absolute"
            top="-2px"
            right="-2px"
            minW="5"
            h="5"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontWeight="bold"
            pointerEvents="none"
          >
            {cartCount}
          </Badge>
        )}
      </Box>
    </Box>
  );
}
