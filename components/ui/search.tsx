"use client";
import { Box, InputGroup } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react/input";
import { useEffect, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";

const Search = () => {
  const placeholders: readonly string[] = [
    "Most affordable plan",
    "Benefits of St. Peter plan",
    "How to buy a plan online?",
    "Look up memorial park",
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (placeholders.length <= 1) return;

    const intervalId = setInterval(() => {
      setIsFading(true);
      const timeoutId = setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        setIsFading(false);
      }, 200);
      return () => clearTimeout(timeoutId);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <InputGroup endElement={<FaArrowCircleRight size={32} color="#006838" />}>
        <Box position="relative" w="full">
          <Input
            placeholder=""
            size="lg"
            bgColor={"white"}
            color={"black"}
            h={16}
            borderRadius={100}
            p={8}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Box
            aria-hidden
            pointerEvents="none"
            position="absolute"
            left={8}
            right={14}
            top="50%"
            transform="translateY(-50%)"
            color="gray.400"
            opacity={value || isFocused ? 0 : isFading ? 0 : 1}
            transition="opacity 0.2s ease"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {placeholders[placeholderIndex]}
          </Box>
        </Box>
      </InputGroup>
    </div>
  );
};

export default Search;
