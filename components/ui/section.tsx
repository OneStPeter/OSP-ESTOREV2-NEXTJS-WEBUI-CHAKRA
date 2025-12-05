"use client";

import { IPlans } from "@/types/product";
import {
  Badge,
  Box,
  Flex,
  HStack,
  Image,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

import { Body, H3, H4, PrimaryMdButton, SecondaryMdButton } from "st-peter-ui";
import { m } from "motion/react";
import { addToCart } from "@/lib/utils/cart";
interface SectionProps {
  compareList: string[];
  toggleCompare: (planDesc: string) => void;
  image: string;
  planDesc: string;
  description: string;
  contractPrice: number;
  planTerm: number;
  terms: { mode: string; planTerm: number; price: number }[];
  reverse?: boolean;
}
const Section: React.FC<SectionProps> = ({
  compareList,
  toggleCompare,
  image,
  planDesc,
  description,
  contractPrice,
  planTerm,
  terms,
  reverse = false,
}) => {
  const isInCompare = compareList.includes(planDesc);

  const router = useRouter();

  const groups = terms.reduce((acc, t) => {
    acc[t.planTerm] = acc[t.planTerm] || [];
    acc[t.planTerm].push(t);
    return acc;
  }, {} as Record<number, typeof terms>);

  const modeOrder: Record<string, number> = { C: 0, A: 1, S: 2, Q: 3, M: 4 };
  Object.values(groups).forEach((arr) =>
    arr.sort(
      (a, b) =>
        (modeOrder[a.mode] ?? Number.POSITIVE_INFINITY) -
        (modeOrder[b.mode] ?? Number.POSITIVE_INFINITY)
    )
  );

  const sorted = Object.entries(groups).sort(
    ([a], [b]) => Number(a) - Number(b)
  );
  const isTwo = sorted.length === 2;

  return (
    <Box>
      <Box as="section" role="group" position="relative">
        <Flex
          flexDirection={{
            base: "column",
            lg: reverse ? "row-reverse" : "row",
          }}
          gap={{ base: 6, lg: 8 }}
          justify="center"
          alignItems="center"
          mb={8}
          pb={8}
        >
          <Box
            w={{ base: "full", lg: "xl" }}
            h={{ base: "250px", lg: "300px" }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {image ? (
              <Box w="full" h="full" position="relative">
                <NextImage
                  unoptimized
                  src={image}
                  alt={planDesc ?? ""}
                  width={400}
                  height={300}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            ) : null}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap={4}
            w={{ base: "full", lg: "500px" }}
          >
            <Box display="flex" flexDirection="column" gap={4} flex={1}>
              <H3>{planDesc}</H3>
              <Body>{description}</Body>
              <Body>Contract Price: {contractPrice}</Body>

              <Flex gap={8} direction={isTwo ? "row" : "column"}>
                {sorted.map(([year, items]) => (
                  <Box key={year} flex={1}>
                    <Box h="1px" bg="green.200" />
                    <Body>{year} years</Body>

                    {items.map((term, index) => (
                      <HStack
                        gap={4}
                        key={index}
                        bg="gray.50"
                        p={4}
                        mt={4}
                        rounded="md"
                        justify="space-between"
                      >
                        <Body>
                          {term.mode == "M"
                            ? "Monthly"
                            : term.mode == "C"
                            ? "Cash"
                            : term.mode == "Q"
                            ? "Quarterly"
                            : term.mode == "S"
                            ? "Semi-Annual"
                            : term.mode == "A"
                            ? "Annual"
                            : "Unknown"}{" "}
                        </Body>
                        <Body>{term.price}</Body>
                      </HStack>
                    ))}
                  </Box>
                ))}
              </Flex>

              <Box h="1px" bg="green.200" />
              <Stack
                gap={{ base: 4, md: 8 }}
                direction={{ base: "column", md: "row" }}
              >
                {isInCompare ? (
                  <PrimaryMdButton onClick={() => toggleCompare(planDesc)}>
                    <FaCheck />
                    <span>ADDED TO COMPARE</span>
                  </PrimaryMdButton>
                ) : (
                  <SecondaryMdButton
                    onClick={() => toggleCompare(planDesc)}
                    disabled={compareList.length >= 3}
                  >
                    <IoMdAdd />
                    <span>COMPARE PLAN</span>
                  </SecondaryMdButton>
                )}
                {/* <SecondaryMdButton onClick={() => addToCart(planDesc)}>
                  Add to Cart
                </SecondaryMdButton> */}
                <PrimaryMdButton
                  onClick={() => router.push(`/plan-details/${planDesc}`)}
                >
                  Buy Now
                </PrimaryMdButton>
              </Stack>
            </Box>
          </Box>
        </Flex>

        <Box h="1px" bg="gray.200" mb={8} />
      </Box>
    </Box>
  );
};

export default Section;
