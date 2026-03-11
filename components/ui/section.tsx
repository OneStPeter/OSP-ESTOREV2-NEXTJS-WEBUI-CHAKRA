"use client";

import { Box, Flex, HStack, SimpleGrid } from "@chakra-ui/react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

import {
  Body,
  BuyNowButton,
  H3,
  PrimaryMdButton,
  SecondaryMdButton,
} from "st-peter-ui";

interface SectionProps {
  compareList: string[];
  toggleCompare: (planDesc: string) => void;
  image: string;
  planDesc: string;
  description: string;
  contractPrice: number | string;
  planTerm: number;
  terms: { mode: string; planTerm: number; price: number | string }[];
  reverse?: boolean;
}

const Section: React.FC<SectionProps> = ({
  compareList,
  toggleCompare,
  image,
  planDesc,
  description,
  contractPrice,
  terms,
  reverse = false,
}) => {
  const isInCompare = compareList.includes(planDesc);
  const router = useRouter();

  const groups = terms.reduce(
    (acc, t) => {
      acc[t.planTerm] = acc[t.planTerm] || [];
      acc[t.planTerm].push(t);
      return acc;
    },
    {} as Record<number, typeof terms>,
  );

  const modeOrder: Record<string, number> = { C: 0, A: 1, S: 2, Q: 3, M: 4 };
  Object.values(groups).forEach((arr) =>
    arr.sort(
      (a, b) =>
        (modeOrder[a.mode] ?? Number.POSITIVE_INFINITY) -
        (modeOrder[b.mode] ?? Number.POSITIVE_INFINITY),
    ),
  );

  const sorted = Object.entries(groups).sort(
    ([a], [b]) => Number(a) - Number(b),
  );

  const modeLabel = (mode: string) => {
    if (mode === "M") return "Monthly";
    if (mode === "C") return "Spot Cash";
    if (mode === "Q") return "Quarterly";
    if (mode === "S") return "Semi-Annual";
    if (mode === "A") return "Annual";
    return "Unknown";
  };

  return (
    <Box w="full" mb={{ base: 8, md: 10 }}>
      <Box
        as="section"
        role="group"
        position="relative"
        w="full"
        bg="transparent"
      >
        <Flex
          flexDirection={{
            base: "column",
            xl: reverse ? "row-reverse" : "row",
          }}
          gap={{ base: 6, xl: 8 }}
          justify="space-between"
          alignItems={{ base: "stretch", xl: "center" }}
          w="full"
        >
          <Box
            w={{ base: "full", xl: "48%" }}
            borderRadius="2xl"
            overflow="hidden"
            position="relative"
            minH={{ base: "220px", sm: "260px", md: "320px", xl: "420px" }}
            //bg="#ececef"
          >
            {image ? (
              <NextImage
                unoptimized
                src={image}
                alt={planDesc ?? ""}
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority={false}
              />
            ) : null}

            <Box
              position="absolute"
              insetX={0}
              bottom={0}
              h="30%"
              bg="linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.28) 100%)"
            />
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap={4}
            w={{ base: "full", xl: "52%" }}
            minW={0}
          >
            <Box
              display="flex"
              flexDirection="column"
              gap={4}
              flex={1}
              minW={0}
            >
              <H3>{planDesc}</H3>
              <Body color="gray.600">{description}</Body>
              <Body fontWeight="semibold" color="gray.900">
                Contract Price: {contractPrice}
              </Body>

              <SimpleGrid
                columns={{ base: 1 }}
                minChildWidth={{ md: "240px" }}
                gap={3}
                w="full"
              >
                {sorted.map(([year, items]) => (
                  <Box key={year} bg="gray.100" borderRadius="xl" px={4} py={3}>
                    <Box mb={2}>
                      <Body fontWeight="semibold" color="gray.800">
                        {year} years plan
                      </Body>
                    </Box>

                    {items.map((term, index) => (
                      <Flex
                        key={index}
                        py={2}
                        justify="space-between"
                        align="center"
                      >
                        <Body>{modeLabel(term.mode)}</Body>
                        <Body fontWeight="semibold">{term.price}</Body>
                      </Flex>
                    ))}
                  </Box>
                ))}
              </SimpleGrid>

              <Flex
                direction={{ base: "row" }}
                w="full"
                justify="space-between"
                gap={3}
              >
                <Box>
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
                </Box>

                <Box>
                  <BuyNowButton
                    onClick={() => router.push(`/plan-details/${planDesc}`)}
                  />
                </Box>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Section;
