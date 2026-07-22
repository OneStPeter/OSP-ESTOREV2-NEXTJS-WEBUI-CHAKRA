"use client";

import { memo } from "react";
import { Badge, Box, Flex, Text, VStack } from "@chakra-ui/react";
import NextImage from "next/image";
import { FaCheck } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { PrimaryMdButton, SecondaryMdButton } from "st-peter-ui";

export type GroupedPlan = {
  planDesc: string;
  casketDesc: string;
  img: string;
  contractPrice: string;
  terms: {
    mode: string;
    planTerm: number;
    price: string;
  }[];
};

const modeOrder: Record<string, number> = { C: 0, A: 1, S: 2, Q: 3, M: 4 };

const modeLabel = (mode: string) => {
  if (mode === "M") return "Monthly";
  if (mode === "C") return "Spot cash";
  if (mode === "Q") return "Quarterly";
  if (mode === "S") return "Semi-annual";
  if (mode === "A") return "Annual";
  return "Other";
};

const sortTerms = (terms: GroupedPlan["terms"]) =>
  [...terms].sort((a, b) => {
    if (a.planTerm !== b.planTerm) return a.planTerm - b.planTerm;
    return (
      (modeOrder[a.mode] ?? Number.POSITIVE_INFINITY) -
      (modeOrder[b.mode] ?? Number.POSITIVE_INFINITY)
    );
  });

const getPlanCategory = (planType: string, description: string) => {
  const material = description.toLowerCase().includes("wood")
    ? "Wood"
    : "Metal";

  return `${planType} - ${material}`;
};

type PlanCardProps = {
  group: GroupedPlan;
  planType: string;
  isInCompare: boolean;
  compareDisabled: boolean;
  onOpen: (planDesc: string) => void;
  onToggleCompare: (planDesc: string) => void;
};

/* =============================================================================
 * PlanCard — a single plan tile.
 * Mobile: full-width carousel card. Tablet / desktop: e-commerce grid card.
 * ========================================================================== */
const PlanCard = ({
  group,
  planType,
  isInCompare,
  compareDisabled,
  onOpen,
  onToggleCompare,
}: PlanCardProps) => {
  const sortedTerms = sortTerms(group.terms);
  const firstTerm = sortedTerms[0];
  const monthlyTerm =
    sortedTerms.find((term) => term.mode === "M") ?? firstTerm;
  const displayedTerms = sortedTerms
    .filter((term) => term.planTerm === firstTerm?.planTerm)
    .slice(0, 3);

  const priceValue = monthlyTerm?.price ?? group.contractPrice;

  return (
    <Box
      w={{ base: "100%", md: "full" }}
      h="full"
      flex={{ base: "0 0 100%", md: "initial" }}
      scrollSnapAlign={{ base: "center", md: "none" }}
      scrollSnapStop={{ base: "always", md: "normal" }}
    >
      {/* ===== Mobile: full-width card ===== */}
      <Flex
        display={{ base: "flex", md: "none" }}
        direction="column"
        h="full"
        w="full"
        overflow="hidden"
        bg="white"
        border="1px solid"
        borderColor={isInCompare ? "green.600" : "gray.200"}
        borderRadius="xl"
        transition="all 0.25s ease"
      >
        <Box
          position="relative"
          h={{ base: "170px", sm: "190px" }}
          w="full"
          overflow="hidden"
          cursor="pointer"
          onClick={() => onOpen(group.planDesc)}
        >
          <NextImage
            unoptimized
            src={group.img}
            alt={group.planDesc ?? ""}
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority={false}
          />
          {isInCompare ? (
            <Badge
              position="absolute"
              top={3}
              left={3}
              px={3}
              py={1}
              borderRadius="full"
              bg="green.600"
              color="white"
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="wide"
            >
              SELECTED
            </Badge>
          ) : null}
        </Box>

        <Flex
          direction="column"
          align="center"
          textAlign="center"
          flex="1"
          px={4}
          py={4}
          minH="360px"
        >
          <Text
            fontSize="xs"
            fontWeight="800"
            color="green.800"
            letterSpacing="wide"
            textTransform="uppercase"
            mb={2}
          >
            {getPlanCategory(planType, group.casketDesc)}
          </Text>
          <Text
            as="h3"
            fontSize="md"
            fontWeight="800"
            color="gray.900"
            lineHeight="1.2"
            lineClamp={2}
          >
            {group.planDesc}
          </Text>
          <Text
            mt={1}
            fontSize="sm"
            color="gray.600"
            lineHeight="1.45"
            lineClamp={4}
          >
            {group.casketDesc}
          </Text>
          <Text
            mt={3}
            fontSize="sm"
            fontWeight="800"
            color="gray.900"
            lineHeight="1.2"
          >
            {priceValue} / month
          </Text>
          <Text mt={1} fontSize="xs" fontWeight="600" color="gray.500">
            {firstTerm?.planTerm ?? 0} years
          </Text>
          {/* <Text mt={1} fontSize="xs" fontWeight="600" color="gray.500">
            Plan value {group.contractPrice}
          </Text> */}
          <VStack align="stretch" gap="6px" mt={3} w="full">
            {displayedTerms.map((term) => (
              <Flex
                key={`${term.planTerm}-${term.mode}`}
                align="center"
                justify="space-between"
                gap="10px"
              >
                <Text color="gray.500" fontSize="xs" fontWeight="600">
                  {modeLabel(term.mode)}
                </Text>
                <Text color="gray.900" fontSize="xs" fontWeight="800">
                  {term.price}
                </Text>
              </Flex>
            ))}
          </VStack>
          <Flex mt="auto" pt={5} w="full" gap={3}>
            <SecondaryMdButton
              flex="1"
              h="42px"
              borderRadius="full"
              border="1px solid"
              borderColor="green.700"
              bg="white"
              color="green.800"
              fontSize="xs"
              fontWeight="800"
              letterSpacing="wide"
              disabled={compareDisabled}
              onClick={() => onToggleCompare(group.planDesc)}
              _hover={{ bg: "green.50" }}
            >
              {isInCompare ? <FaCheck /> : <IoMdAdd />}
              <span>{isInCompare ? "ADDED" : "COMPARE"}</span>
            </SecondaryMdButton>
            <PrimaryMdButton
              flex="1"
              h="42px"
              borderRadius="full"
              borderWidth="1px"
              borderColor="green.700"
              bg="white"
              color="green.800"
              fontSize="xs"
              fontWeight="800"
              letterSpacing="wide"
              onClick={() => onOpen(group.planDesc)}
              _hover={{ bg: "green.700", color: "white" }}
            >
              BUY NOW
            </PrimaryMdButton>
          </Flex>
        </Flex>
      </Flex>

      {/* ===== Tablet / Desktop: e-commerce card ===== */}
      <Flex
        display={{ base: "none", md: "flex" }}
        direction="column"
        h="full"
        w="full"
        position="relative"
        overflow="hidden"
        bg="white"
        border="1px solid"
        borderColor={isInCompare ? "green.600" : "gray.200"}
        borderRadius="xl"
        transition="all 0.25s ease"
        _hover={{
          transform: "translateY(-6px)",
          boxShadow: "0 10px 20px rgba(15, 23, 42, 0.14)",
          borderColor: "green.600",
        }}
      >
        {/* Image */}
        <Box
          position="relative"
          w="full"
          h={{ md: "210px" }}
          cursor="pointer"
          overflow="hidden"
          onClick={() => onOpen(group.planDesc)}
        >
          <NextImage
            unoptimized
            src={group.img}
            alt={group.planDesc ?? ""}
            fill
            sizes="(max-width: 1280px) 50vw, 33vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority={false}
          />

          {isInCompare ? (
            <Badge
              position="absolute"
              top={3}
              left={3}
              px={3}
              py={1}
              borderRadius="full"
              bg="green.600"
              color="white"
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="wide"
            >
              SELECTED
            </Badge>
          ) : null}
        </Box>

        <Flex
          direction="column"
          align="center"
          textAlign="center"
          flex="1"
          px={{ md: 5 }}
          py={{ md: 5 }}
          minH={{ md: "250px" }}
        >
          <Text
            as="h3"
            fontSize="lg"
            fontWeight="800"
            color="gray.900"
            lineHeight="1.2"
            lineClamp={2}
          >
            {group.planDesc}
          </Text>
          <Text
            mt={1}
            fontSize="sm"
            color="gray.600"
            lineHeight="1.45"
            lineClamp={2}
          >
            {group.casketDesc}
          </Text>
          <Text
            mt={3}
            fontSize="sm"
            fontWeight="800"
            color="gray.900"
            lineHeight="1.2"
          >
            {priceValue} / month
          </Text>
          <Text mt={1} fontSize="xs" fontWeight="600" color="gray.500">
            {firstTerm?.planTerm ?? 0} years
          </Text>

          <Flex
            mt="auto"
            pt={5}
            w="full"
            gap={3}
            direction={{ md: "column", lg: "row" }}
          >
            <SecondaryMdButton
              flex="1"
              h="42px"
              borderRadius="full"
              border="1px solid"
              borderColor="green.700"
              bg="white"
              color="green.800"
              fontSize="xs"
              fontWeight="800"
              letterSpacing="wide"
              disabled={compareDisabled}
              onClick={() => onToggleCompare(group.planDesc)}
              _hover={{ bg: "green.50" }}
            >
              {isInCompare ? <FaCheck /> : <IoMdAdd />}
              <span>{isInCompare ? "ADDED" : "COMPARE"}</span>
            </SecondaryMdButton>
            <PrimaryMdButton
              flex="1"
              h="42px"
              borderWidth="1px"
              borderRadius="full"
              borderColor="green.700"
              bg="white"
              color="green.800"
              fontSize="xs"
              fontWeight="800"
              letterSpacing="wide"
              onClick={() => onOpen(group.planDesc)}
              _hover={{ bg: "green.700", color: "white" }}
            >
              BUY NOW
            </PrimaryMdButton>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

/* Memoized: props are referentially stable (grouped plans come from a useMemo,
 * callbacks from useCallback), so scroll-driven parent re-renders no longer
 * re-render every card. */
export default memo(PlanCard);
