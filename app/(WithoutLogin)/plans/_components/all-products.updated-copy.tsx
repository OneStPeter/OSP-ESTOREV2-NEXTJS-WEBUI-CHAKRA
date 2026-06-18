"use client";

/* =============================================================================
 * UPDATED IMPLEMENTATION
 * Re-built on top of the shared Page layout shell:
 *   components/claude/layout/page/Page.tsx  (Page.Root / ToolContent / MainContent / Row)
 *
 * - Title / description -> Page.Root header (with its built-in BackButton)
 * - Traditional / Cremation tabs -> Page.ToolContent (state-driven pills)
 * - Plan cards + alert + ComparisonBanner -> Page.MainContent
 *
 * The previous implementation is preserved (commented out) at the bottom of
 * this file for reference.
 * ========================================================================== */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IPlans } from "@/types/product";
import Error from "@/components/ui/error";
import {
  Box,
  Badge,
  Button,
  Flex,
  Grid,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import ComparisonBanner from "@/components/ui/comparison-banner";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";
import { PrimaryMdButton, SecondaryMdButton } from "st-peter-ui";
import NextImage from "next/image";
import Page from "@/components/layout/page/Page";

type GroupedPlan = {
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

type Props = {
  plans: IPlans[];
  traditionalGroups: GroupedPlan[];
  cremationGroups: GroupedPlan[];
};

const formatCurrency = (value: number | string) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(Number(value));

const groupPlansByProduct = (
  plans: IPlans[],
  productCode: string,
): GroupedPlan[] => {
  const filtered = plans.filter((p) => p.productCode === productCode);
  const map = new Map<string, GroupedPlan>();

  filtered.forEach((p) => {
    const key = p.planDesc;

    if (!map.has(key)) {
      map.set(key, {
        planDesc: p.planDesc,
        casketDesc: p.casketDesc,
        img: `/images/plan-images/${p.planDesc}.jpg`,
        contractPrice: formatCurrency(p.contractPrice),
        terms: [],
      });
    }

    const entry = map.get(key)!;

    const exists = entry.terms.some(
      (t) => t.planTerm === p.planTerm && t.mode === p.mode,
    );

    if (!exists) {
      entry.terms.push({
        mode: p.mode,
        planTerm: p.planTerm,
        price: formatCurrency(p.ipInstAmt),
      });
    }
  });

  return Array.from(map.values());
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

const categoryTabs = [
  { value: "traditional", label: "Traditional" },
  { value: "cremation", label: "Cremation" },
];

const AllProductsCopy = ({
  plans,
  traditionalGroups: initialTraditionalGroups,
  cremationGroups: initialCremationGroups,
}: Props) => {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("traditional");
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const alertRef = useRef<HTMLDivElement | null>(null);
  const traditionalScrollRef = useRef<HTMLDivElement | null>(null);
  const cremationScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    sessionStorage.removeItem("CheckoutCart");
  }, []);

  useEffect(() => {
    if (!showAlert) return;

    alertRef.current?.scrollIntoView({ behavior: "smooth" });

    const timer = setTimeout(() => setShowAlert(false), 3000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  const traditionalGroups = useMemo(() => {
    if (initialTraditionalGroups?.length) return initialTraditionalGroups;
    return groupPlansByProduct(plans, "LP");
  }, [initialTraditionalGroups, plans]);

  const cremationGroups = useMemo(() => {
    if (initialCremationGroups?.length) return initialCremationGroups;
    return groupPlansByProduct(plans, "CP");
  }, [initialCremationGroups, plans]);

  const toggleCompare = (planDesc: string) => {
    setCompareList((prev) =>
      prev.includes(planDesc)
        ? prev.filter((desc) => desc !== planDesc)
        : [...prev, planDesc],
    );
  };

  const openPlan = (planDesc: string) => {
    router.push(`/plan-details/${encodeURIComponent(planDesc)}`);
  };

  const getActiveScrollElement = useCallback(
    () =>
      activeTab === "traditional"
        ? traditionalScrollRef.current
        : cremationScrollRef.current,
    [activeTab],
  );

  const updateScrollButtons = useCallback(() => {
    const el = getActiveScrollElement();

    if (!el) return;

    const isAtStart = el.scrollLeft <= 8;
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;

    setShowLeftButton(!isAtStart);
    setShowRightButton(!isAtEnd);
  }, [getActiveScrollElement]);

  const scrollProductsRight = () => {
    const el = getActiveScrollElement();

    el?.scrollBy({
      left: el.clientWidth,
      behavior: "smooth",
    });
  };

  const scrollProductsLeft = () => {
    const el = getActiveScrollElement();

    el?.scrollBy({
      left: -el.clientWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateScrollButtons();

    const traditionalEl = traditionalScrollRef.current;
    const cremationEl = cremationScrollRef.current;

    traditionalEl?.addEventListener("scroll", updateScrollButtons);
    cremationEl?.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      traditionalEl?.removeEventListener("scroll", updateScrollButtons);
      cremationEl?.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [
    activeTab,
    cremationGroups.length,
    traditionalGroups.length,
    updateScrollButtons,
  ]);

  /* =============================================================================
   * OLD renderPlanCard — vertical card layout (preserved for reference).
   * Replaced by the row/list layout in the new renderPlanCard below.
   * ========================================================================== */
  /*
  const renderPlanCard = (group: GroupedPlan, planType: string) => {
    const isInCompare = compareList.includes(group.planDesc);
    const sortedTerms = sortTerms(group.terms);
    const firstTerm = sortedTerms[0];
    const monthlyTerm =
      sortedTerms.find((term) => term.mode === "M") ?? firstTerm;
    const displayedTerms = sortedTerms
      .filter((term) => term.planTerm === firstTerm?.planTerm)
      .slice(0, 6);
    const isFeatured = index === 1;

    return (
      <Box
        key={group.planDesc}
        position="relative"
        overflow={{ base: "visible", md: "hidden" }}
        bg={{ base: "transparent", md: BRAND_COLORS.white }}
        borderWidth={{ base: "0", md: isInCompare ? "2px" : "1px" }}
        borderColor={
          isInCompare ? BRAND_COLORS.primaryGreen : BRAND_COLORS.neutralBorder
        }
        borderRadius={{ base: 0, md: STANDARD_RADIUS.xl }}
        minH={{ base: "480px", md: "576px" }}
        minW={0}
        display="flex"
        flexDirection="column"
        scrollSnapAlign="start"
        flex={{ base: "0 0 min(72vw, 280px)", md: "initial" }}
        boxShadow={{
          base: "none",
          md: isFeatured ? "none" : STANDARD_SHADOWS.level1,
        }}
      >
        <Box display={{ base: "block", md: "none" }} w="full">
          <Box
            position="relative"
            h={{ base: "500px", sm: "320px" }}
            w="full"
            borderRadius="12px"
            overflow="hidden"
            bg={BRAND_COLORS.mutedBg}
            onClick={() => openPlan(group.planDesc)}
          >
            <NextImage
              unoptimized
              src={group.img}
              alt={group.planDesc ?? ""}
              fill
              sizes="72vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority={false}
            />
            <Button
              position="absolute"
              top="10px"
              left="50%"
              transform="translateX(-50%)"
              h="24px"
              minW="104px"
              px="10px"
              borderRadius={STANDARD_RADIUS.full}
              bg="rgba(255, 255, 255, 0.72)"
              color={BRAND_COLORS.black}
              fontSize="10px"
              fontWeight="700"
              backdropFilter="blur(6px)"
              disabled={!isInCompare && compareList.length >= 3}
              onClick={(event) => {
                event.stopPropagation();
                toggleCompare(group.planDesc);
              }}
              _hover={{ bg: "rgba(255, 255, 255, 0.86)" }}
            >
              {isInCompare ? "Added" : "Add to Compare"}
            </Button>
            <Box
              position="absolute"
              left="0"
              right="0"
              bottom="0"
              px="8px"
              py="10px"
              bg="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.74) 38%, rgba(0, 0, 0, 0.9) 100%)"
            >
              <Text
                color={BRAND_COLORS.white}
                fontSize="12px"
                fontWeight="600"
                lineHeight="1.15"
                lineClamp={3}
              >
                {group.casketDesc}
              </Text>
            </Box>
          </Box>

          <Box pt="8px">
            <Text
              color={BRAND_COLORS.black}
              fontSize="16px"
              fontWeight="800"
              lineHeight="1.1"
              lineClamp={1}
            >
              {group.planDesc}
            </Text>
            <Text
              color={BRAND_COLORS.darkGreen}
              fontSize="13px"
              fontWeight="800"
              lineHeight="1.1"
              mt="3px"
              lineClamp={1}
            >
              {monthlyTerm?.price ?? group.contractPrice}/mo
            </Text>
          </Box>
        </Box>

        <Flex
          display={{ base: "none", md: "flex" }}
          h={{ base: "148px", md: "156px" }}
          w="full"
          bg={BRAND_COLORS.subtleBg}
          align="center"
          justify="center"
          borderBottomWidth="1px"
          borderColor={BRAND_COLORS.neutralBorder}
        >
          <Box
            position="relative"
            h="full"
            w="full"
            bg={BRAND_COLORS.mutedBg}
            overflow="hidden"
          >
            <NextImage
              unoptimized
              src={group.img}
              alt={group.planDesc ?? ""}
              fill
              sizes="(max-width: 767px) 100vw, 25vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority={false}
            />
          </Box>
        </Flex>

        <VStack
          display={{ base: "none", md: "flex" }}
          align="stretch"
          gap={STANDARD_SPACING.sm}
          p={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
          flex="1"
        >
          <Box>
            <Box
              display="inline-flex"
              alignItems="center"
              px="12px"
              py="6px"
              borderRadius={STANDARD_RADIUS.full}
              bg={BRAND_COLORS.successBg}
            >
              <Text
                color={BRAND_COLORS.darkGreen}
                fontSize="12px"
                fontWeight="800"
                lineHeight="1"
              >
                {getPlanCategory(planType, group.casketDesc)}
              </Text>
            </Box>

            <Text
              color={BRAND_COLORS.black}
              fontSize={{ base: "20px", md: "22px" }}
              fontWeight="800"
              lineHeight="1.25"
              mt={STANDARD_SPACING.sm}
              lineClamp={1}
            >
              {group.planDesc}
            </Text>
            <Text
              color={BRAND_COLORS.darkGreen}
              fontSize="14px"
              lineHeight="1.65"
              lineClamp={2}
              mt={STANDARD_SPACING.xs}
            >
              {group.casketDesc}
            </Text>
          </Box>

          <Box
            bg={BRAND_COLORS.successBg}
            borderRadius={STANDARD_RADIUS.lg}
            px={STANDARD_SPACING.sm}
            py={STANDARD_SPACING.sm}
          >
            <Flex align="baseline" gap="4px" wrap="wrap">
              <Text
                color={BRAND_COLORS.darkGreen}
                fontSize={{ base: "30px", md: "34px" }}
                fontWeight="900"
                lineHeight="1"
              >
                {monthlyTerm?.price ?? group.contractPrice}
              </Text>
              <Text color={BRAND_COLORS.darkGreen} fontSize="13px">
                /mo
              </Text>
            </Flex>
            <Flex
              align="center"
              gap={STANDARD_SPACING.xs}
              wrap="wrap"
              mt={STANDARD_SPACING.xs}
            >
              <Text color={BRAND_COLORS.darkGreen} fontSize="12px">
                Value:{" "}
                <Box as="span" fontWeight="800" color={BRAND_COLORS.black}>
                  {group.contractPrice}
                </Box>
              </Text>
              <Text color={BRAND_COLORS.darkGreen} fontSize="12px">
                •
              </Text>
              <Text color={BRAND_COLORS.darkGreen} fontSize="12px">
                Term: {firstTerm?.planTerm ?? 0} yrs
              </Text>
            </Flex>
          </Box>

          <VStack align="stretch" gap="10px" flex="1">
            {displayedTerms.map((term) => (
              <Flex
                key={`${term.planTerm}-${term.mode}`}
                align="flex-start"
                gap="10px"
              >
                <Text color={BRAND_COLORS.black} fontSize="14px">
                  {modeLabel(term.mode)} payment at{" "}
                  <Box as="span" fontWeight="800">
                    {term.price}
                  </Box>
                </Text>
              </Flex>
            ))}
          </VStack>

          <VStack align="stretch" gap={STANDARD_SPACING.xs} mt="auto">
            <SecondaryMdButton
              h="44px"
              minW={0}
              px={STANDARD_SPACING.sm}
              borderRadius={STANDARD_RADIUS.md}
              bg={
                isInCompare ? BRAND_COLORS.darkGreen : BRAND_COLORS.primaryGreen
              }
              color={BRAND_COLORS.white}
              fontWeight="800"
              whiteSpace="nowrap"
              disabled={!isInCompare && compareList.length >= 3}
              onClick={() => toggleCompare(group.planDesc)}
              _hover={{ bg: BRAND_COLORS.darkGreen }}
            >
              {isInCompare ? <FaCheck /> : <IoMdAdd />}
              {isInCompare ? "Added to Compare" : "Add to Compare"}
            </SecondaryMdButton>
            <PrimaryMdButton
              h="44px"
              minW={0}
              px={STANDARD_SPACING.sm}
              borderRadius={STANDARD_RADIUS.md}
              borderWidth="1px"
              borderColor={BRAND_COLORS.neutralBorder}
              bg={BRAND_COLORS.white}
              color={BRAND_COLORS.darkGreen}
              whiteSpace="nowrap"
              onClick={() => openPlan(group.planDesc)}
              _hover={{ bg: BRAND_COLORS.successBg }}
            >
              View Details
              <FiArrowRight />
            </PrimaryMdButton>
          </VStack>
        </VStack>
      </Box>
    );
  };
  */

  /* =============================================================================
   * renderPlanCard — horizontal row / list layout.
   * Thumbnail (with compare checkbox) + name/price + term + feature chips + chevron.
   * ========================================================================== */
  const renderPlanCard = (
    group: GroupedPlan,
    index: number,
    planType: string,
  ) => {
    const isInCompare = compareList.includes(group.planDesc);
    const sortedTerms = sortTerms(group.terms);
    const firstTerm = sortedTerms[0];
    const monthlyTerm =
      sortedTerms.find((term) => term.mode === "M") ?? firstTerm;
    const displayedTerms = sortedTerms
      .filter((term) => term.planTerm === firstTerm?.planTerm)
      .slice(0, 3);

    const priceValue = monthlyTerm?.price ?? group.contractPrice;
    const compareDisabled = !isInCompare && compareList.length >= 3;

    return (
      <Box
        key={group.planDesc}
        w={{ base: "min(86vw, 340px)", md: "full" }}
        h="full"
        flex={{ base: "0 0 min(86vw, 340px)", md: "initial" }}
        scrollSnapAlign={{ base: "start", md: "none" }}
        scrollSnapStop={{ base: "always", md: "normal" }}
      >
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
            onClick={() => openPlan(group.planDesc)}
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
            <Text mt={1} fontSize="xs" fontWeight="600" color="gray.500">
              Plan value {group.contractPrice}
            </Text>
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
                onClick={() => toggleCompare(group.planDesc)}
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
                onClick={() => openPlan(group.planDesc)}
                _hover={{ bg: "green.700", color: "white" }}
              >
                BUY NOW
              </PrimaryMdButton>
            </Flex>
          </Flex>
        </Flex>

        {/* ===== Mobile: latest compact row (commented — replaced by the earlier card view above) =====
        <Box
          role="button"
          tabIndex={0}
          onClick={() => openPlan(group.planDesc)}
          cursor="pointer"
          position="relative"
          display={{ base: "flex", md: "none" }}
          alignItems="center"
          gap={STANDARD_SPACING.sm}
          w="full"
          p="12px"
          bg={BRAND_COLORS.white}
          borderWidth={isInCompare ? "2px" : "1px"}
          borderColor={
            isInCompare ? BRAND_COLORS.primaryGreen : BRAND_COLORS.neutralBorder
          }
          borderRadius={STANDARD_RADIUS.xl}
          boxShadow={STANDARD_SHADOWS.level1}
          transition="border-color 0.15s ease, box-shadow 0.15s ease"
          _hover={{ borderColor: BRAND_COLORS.primaryGreen }}
        >
          <Box position="relative" flexShrink={0}>
            <Box
              position="relative"
              w="64px"
              h="64px"
              borderRadius={STANDARD_RADIUS.lg}
              overflow="hidden"
              bg={BRAND_COLORS.mutedBg}
            >
              <NextImage
                unoptimized
                src={group.img}
                alt={group.planDesc ?? ""}
                fill
                sizes="64px"
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority={false}
              />
            </Box>

            <Button
              position="absolute"
              top="5px"
              left="5px"
              w="20px"
              h="20px"
              minW="20px"
              p="0"
              borderRadius="6px"
              borderWidth="1.5px"
              borderColor={
                isInCompare
                  ? BRAND_COLORS.primaryGreen
                  : BRAND_COLORS.neutralBorder
              }
              bg={
                isInCompare
                  ? BRAND_COLORS.primaryGreen
                  : "rgba(255,255,255,0.9)"
              }
              color={BRAND_COLORS.white}
              aria-label={
                isInCompare ? "Remove from compare" : "Add to compare"
              }
              disabled={compareDisabled}
              onClick={(event) => {
                event.stopPropagation();
                toggleCompare(group.planDesc);
              }}
              _hover={{
                bg: isInCompare ? BRAND_COLORS.darkGreen : BRAND_COLORS.white,
              }}
            >
              {isInCompare && <FaCheck size={10} />}
            </Button>
          </Box>

          <Box flex="1" minW={0}>
            <Flex align="baseline" justify="space-between" gap="8px">
              <Text
                color={BRAND_COLORS.black}
                fontSize="17px"
                fontWeight="800"
                lineHeight="1.15"
                lineClamp={1}
              >
                {group.planDesc}
              </Text>
              <Flex align="baseline" gap="2px" flexShrink={0}>
                <Text
                  color={BRAND_COLORS.darkGreen}
                  fontSize="15px"
                  fontWeight="800"
                  lineHeight="1.15"
                >
                  {priceValue}
                </Text>
                <Text color={BRAND_COLORS.darkGreen} fontSize="11px">
                  /mo
                </Text>
              </Flex>
            </Flex>

            <Text
              color={BRAND_COLORS.grey}
              fontSize="12px"
              lineHeight="1.2"
              mt="2px"
            >
              {firstTerm?.planTerm ?? 0}-year term
            </Text>

            <Box mt="8px">
              {featureChips(BRAND_COLORS.mutedBg, BRAND_COLORS.subtleBg)}
            </Box>
          </Box>

          <Box
            as={FiChevronRight}
            flexShrink={0}
            color={BRAND_COLORS.grey}
            boxSize="20px"
          />
        </Box>
        ===== end latest compact row ===== */}

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
            onClick={() => openPlan(group.planDesc)}
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
                onClick={() => toggleCompare(group.planDesc)}
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
                onClick={() => openPlan(group.planDesc)}
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

  const renderPlanCards = (
    groups: GroupedPlan[],
    planType: string,
  ) => (
    <Box position="relative" w="full">
      <Grid
        ref={planType === "Traditional" ? traditionalScrollRef : cremationScrollRef}
        display={{ base: "flex", md: "grid" }}
        templateColumns={{
          md: "repeat(2, minmax(0, 1fr))",
          xl: "repeat(3, minmax(0, 1fr))",
        }}
        gap={STANDARD_SPACING.sm}
        alignItems="stretch"
        overflowX={{ base: "auto", md: "visible" }}
        overflowY="hidden"
        scrollBehavior="smooth"
        scrollSnapType={{ base: "x mandatory", md: "none" }}
        pb={{ base: STANDARD_SPACING.md, md: "0" }}
        px={{ base: "2px", md: "0" }}
        onScroll={updateScrollButtons}
        w="full"
        css={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {groups.map((group, index) => renderPlanCard(group, index, planType))}
      </Grid>

      {showLeftButton && (
        <IconButton
          aria-label="Scroll plans to the left"
          display={{ base: "flex", md: "none" }}
          position="absolute"
          left="0"
          top="50%"
          transform="translate(-50%, -50%)"
          zIndex={10}
          w="30px"
          h="30px"
          minW="30px"
          borderRadius="full"
          bg="#E4F7EC"
          color="#159B50"
          borderWidth="1px"
          borderColor="#BFE9D0"
          onClick={scrollProductsLeft}
          _hover={{
            bg: "#D5F2E2",
            transform: "translate(-50%, -50%)",
          }}
          _active={{
            bg: "#C8ECD8",
          }}
        >
          <FiArrowLeft size={21} />
        </IconButton>
      )}

      {showRightButton && (
        <IconButton
          aria-label="Scroll plans to the right"
          display={{ base: "flex", md: "none" }}
          position="absolute"
          right="0"
          top="50%"
          transform="translate(50%, -50%)"
          zIndex={10}
          w="30px"
          h="30px"
          minW="30px"
          borderRadius="full"
          bg="white"
          color="#159B50"
          borderWidth="1px"
          borderColor="#159B50"
          onClick={scrollProductsRight}
          _hover={{
            bg: "green.50",
            transform: "translate(50%, -50%)",
          }}
          _active={{
            bg: "green.100",
          }}
        >
          <FiArrowRight size={21} />
        </IconButton>
      )}
    </Box>
  );

  return (
    <Page.Root
      title="Our Life Plans"
      description="Secure your family's future with peace of mind"
    >
      {/* Right-side header tools: category filter pills */}
      <Page.ToolContent w={{ base: "100%", lg: "auto" }}>
        <Flex
          gap="8px"
          justify={{ base: "flex-end", lg: "flex-end" }}
          w={{ base: "100%", lg: "auto" }}
          borderWidth="1px"
          borderColor={BRAND_COLORS.neutralBorder}
          bg={BRAND_COLORS.white}
          px="12px"
          py="6px"
          borderRadius={STANDARD_RADIUS.full}
          // w="lg"
        >
          {categoryTabs.map((tab) => {
            const isActive = activeTab === tab.value;

            return (
              <Button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                h="28px"
                flex={{ base: 1, lg: "initial" }}
                minW="88px"
                px="14px"
                borderRadius={STANDARD_RADIUS.full}
                borderWidth="1px"
                borderColor={isActive ? "#173E33" : ""}
                bg={isActive ? "#177D54" : BRAND_COLORS.white}
                color={isActive ? BRAND_COLORS.white : "#5D5D58"}
                fontSize="12px"
                fontWeight="700"
                _hover={{
                  bg: isActive ? "#177D54" : BRAND_COLORS.subtleBg,
                }}
              >
                {tab.label}
              </Button>
            );
          })}
        </Flex>
      </Page.ToolContent>

      <Page.MainContent>
        <Page.Row>
          {showAlert && (
            <Box
              ref={alertRef}
              position="fixed"
              top={{ base: 20, md: 24 }}
              left="50%"
              transform="translateX(-50%)"
              zIndex={1000}
              w={{ base: "90%", md: "50%" }}
            >
              <Error title="Please select at least 2 plans to compare" />
            </Box>
          )}

          {activeTab === "traditional"
            ? renderPlanCards(traditionalGroups, "Traditional")
            : renderPlanCards(cremationGroups, "Cremation")}
        </Page.Row>

        <ComparisonBanner
          compareList={compareList}
          setCompareList={setCompareList}
          setShowAlert={setShowAlert}
        />
      </Page.MainContent>
    </Page.Root>
  );
};

export default AllProductsCopy;

/* =============================================================================
 * ORIGINAL IMPLEMENTATION (commented out — preserved for reference)
 * Used a centered Container with a manual back button / breadcrumb header and
 * Chakra Tabs. Replaced by the Page-shell version above.
 * ========================================================================== */
// "use client";
//
// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { IPlans } from "@/types/product";
// import Error from "@/components/ui/error";
// import {
//   Box,
//   Button,
//   Flex,
//   Grid,
//   IconButton,
//   Tabs,
//   Text,
//   VStack,
// } from "@chakra-ui/react";
// import ComparisonBanner from "@/components/ui/comparison-banner";
// import Container from "@/components/ui/container";
// import { useRouter } from "next/navigation";
// import { FaArrowLeft, FaCheck } from "react-icons/fa";
// import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
// import { IoMdAdd } from "react-icons/io";
// import { BRAND_COLORS } from "@/lib/theme/brand-colors";
// import {
//   STANDARD_RADIUS,
//   STANDARD_SHADOWS,
//   STANDARD_SPACING,
// } from "@/lib/theme/standard-design-tokens";
// import {
//   Body,
//   Breadcrumb,
//   H3,
//   H4,
//   PrimaryMdButton,
//   SecondaryMdButton,
// } from "st-peter-ui";
// import NextImage from "next/image";
//
// type GroupedPlan = {
//   planDesc: string;
//   casketDesc: string;
//   img: string;
//   contractPrice: string;
//   terms: {
//     mode: string;
//     planTerm: number;
//     price: string;
//   }[];
// };
//
// type Props = {
//   plans: IPlans[];
//   traditionalGroups: GroupedPlan[];
//   cremationGroups: GroupedPlan[];
// };
//
// const formatCurrency = (value: number | string) =>
//   new Intl.NumberFormat("en-PH", {
//     style: "currency",
//     currency: "PHP",
//     maximumFractionDigits: 0,
//   }).format(Number(value));
//
// const groupPlansByProduct = (
//   plans: IPlans[],
//   productCode: string,
// ): GroupedPlan[] => {
//   const filtered = plans.filter((p) => p.productCode === productCode);
//   const map = new Map<string, GroupedPlan>();
//
//   filtered.forEach((p) => {
//     const key = p.planDesc;
//
//     if (!map.has(key)) {
//       map.set(key, {
//         planDesc: p.planDesc,
//         casketDesc: p.casketDesc,
//         img: `/images/plan-images/${p.planDesc}.jpg`,
//         contractPrice: formatCurrency(p.contractPrice),
//         terms: [],
//       });
//     }
//
//     const entry = map.get(key)!;
//
//     const exists = entry.terms.some(
//       (t) => t.planTerm === p.planTerm && t.mode === p.mode,
//     );
//
//     if (!exists) {
//       entry.terms.push({
//         mode: p.mode,
//         planTerm: p.planTerm,
//         price: formatCurrency(p.ipInstAmt),
//       });
//     }
//   });
//
//   return Array.from(map.values());
// };
//
// const modeOrder: Record<string, number> = { C: 0, A: 1, S: 2, Q: 3, M: 4 };
//
// const modeLabel = (mode: string) => {
//   if (mode === "M") return "Monthly";
//   if (mode === "C") return "Spot cash";
//   if (mode === "Q") return "Quarterly";
//   if (mode === "S") return "Semi-annual";
//   if (mode === "A") return "Annual";
//   return "Other";
// };
//
// const sortTerms = (terms: GroupedPlan["terms"]) =>
//   [...terms].sort((a, b) => {
//     if (a.planTerm !== b.planTerm) return a.planTerm - b.planTerm;
//     return (
//       (modeOrder[a.mode] ?? Number.POSITIVE_INFINITY) -
//       (modeOrder[b.mode] ?? Number.POSITIVE_INFINITY)
//     );
//   });
//
// const getPlanCategory = (planType: string, description: string) => {
//   const material = description.toLowerCase().includes("wood")
//     ? "Wood"
//     : "Metal";
//
//   return `${planType} - ${material}`;
// };
//
// const AllProductsCopy = ({
//   plans,
//   traditionalGroups: initialTraditionalGroups,
//   cremationGroups: initialCremationGroups,
// }: Props) => {
//   const router = useRouter();
//   const [showAlert, setShowAlert] = useState(false);
//   const [compareList, setCompareList] = useState<string[]>([]);
//   const [activeTab, setActiveTab] = useState("traditional");
//   const [showLeftButton, setShowLeftButton] = useState(false);
//   const [showRightButton, setShowRightButton] = useState(true);
//   const alertRef = useRef<HTMLDivElement | null>(null);
//   const traditionalScrollRef = useRef<HTMLDivElement | null>(null);
//   const cremationScrollRef = useRef<HTMLDivElement | null>(null);
//
//   useEffect(() => {
//     sessionStorage.removeItem("CheckoutCart");
//   }, []);
//
//   useEffect(() => {
//     if (!showAlert) return;
//
//     alertRef.current?.scrollIntoView({ behavior: "smooth" });
//
//     const timer = setTimeout(() => setShowAlert(false), 3000);
//     return () => clearTimeout(timer);
//   }, [showAlert]);
//
//   const traditionalGroups = useMemo(() => {
//     if (initialTraditionalGroups?.length) return initialTraditionalGroups;
//     return groupPlansByProduct(plans, "LP");
//   }, [initialTraditionalGroups, plans]);
//
//   const cremationGroups = useMemo(() => {
//     if (initialCremationGroups?.length) return initialCremationGroups;
//     return groupPlansByProduct(plans, "CP");
//   }, [initialCremationGroups, plans]);
//
//   const toggleCompare = (planDesc: string) => {
//     setCompareList((prev) =>
//       prev.includes(planDesc)
//         ? prev.filter((desc) => desc !== planDesc)
//         : [...prev, planDesc],
//     );
//   };
//
//   const openPlan = (planDesc: string) => {
//     router.push(`/plan-details/${encodeURIComponent(planDesc)}`);
//   };
//
//   const getActiveScrollElement = useCallback(
//     () =>
//       activeTab === "traditional"
//         ? traditionalScrollRef.current
//         : cremationScrollRef.current,
//     [activeTab],
//   );
//
//   const updateScrollButtons = useCallback(() => {
//     const el = getActiveScrollElement();
//
//     if (!el) return;
//
//     const isAtStart = el.scrollLeft <= 8;
//     const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
//
//     setShowLeftButton(!isAtStart);
//     setShowRightButton(!isAtEnd);
//   }, [getActiveScrollElement]);
//
//   const scrollProductsRight = () => {
//     const el = getActiveScrollElement();
//
//     el?.scrollBy({
//       left: el.clientWidth,
//       behavior: "smooth",
//     });
//   };
//
//   const scrollProductsLeft = () => {
//     const el = getActiveScrollElement();
//
//     el?.scrollBy({
//       left: -el.clientWidth,
//       behavior: "smooth",
//     });
//   };
//
//   useEffect(() => {
//     updateScrollButtons();
//
//     const traditionalEl = traditionalScrollRef.current;
//     const cremationEl = cremationScrollRef.current;
//
//     traditionalEl?.addEventListener("scroll", updateScrollButtons);
//     cremationEl?.addEventListener("scroll", updateScrollButtons);
//     window.addEventListener("resize", updateScrollButtons);
//
//     return () => {
//       traditionalEl?.removeEventListener("scroll", updateScrollButtons);
//       cremationEl?.removeEventListener("scroll", updateScrollButtons);
//       window.removeEventListener("resize", updateScrollButtons);
//     };
//   }, [
//     activeTab,
//     cremationGroups.length,
//     traditionalGroups.length,
//     updateScrollButtons,
//   ]);
//
//   const breadcrumbItems = [
//     { label: "Home", href: "/" },
//     { label: "Life Plans", href: "/plans" },
//   ];
//
//   const renderPlanCard = (
//     group: GroupedPlan,
//     index: number,
//     planType: string,
//   ) => {
//     const isInCompare = compareList.includes(group.planDesc);
//     const sortedTerms = sortTerms(group.terms);
//     const firstTerm = sortedTerms[0];
//     const monthlyTerm =
//       sortedTerms.find((term) => term.mode === "M") ?? firstTerm;
//     const displayedTerms = sortedTerms
//       .filter((term) => term.planTerm === firstTerm?.planTerm)
//       .slice(0, 6);
//     const isFeatured = index === 1;
//
//     return (
//       <Box
//         key={group.planDesc}
//         position="relative"
//         overflow={{ base: "visible", md: "hidden" }}
//         bg={{ base: "transparent", md: BRAND_COLORS.white }}
//         borderWidth={{ base: "0", md: isInCompare ? "2px" : "1px" }}
//         borderColor={
//           isInCompare ? BRAND_COLORS.primaryGreen : BRAND_COLORS.neutralBorder
//         }
//         borderRadius={{ base: 0, md: STANDARD_RADIUS.xl }}
//         minH={{ base: "auto", md: "640px" }}
//         minW={0}
//         display="flex"
//         flexDirection="column"
//         scrollSnapAlign="start"
//         flex={{ base: "0 0 min(72vw, 280px)", md: "initial" }}
//         boxShadow={{
//           base: "none",
//           md: isFeatured ? "none" : STANDARD_SHADOWS.level1,
//         }}
//       >
//         <Box display={{ base: "block", md: "none" }} w="full">
//           <Box
//             position="relative"
//             h={{ base: "500px", sm: "320px" }}
//             w="full"
//             borderRadius="12px"
//             overflow="hidden"
//             bg={BRAND_COLORS.mutedBg}
//             onClick={() => openPlan(group.planDesc)}
//           >
//             <NextImage
//               unoptimized
//               src={group.img}
//               alt={group.planDesc ?? ""}
//               fill
//               sizes="72vw"
//               style={{ objectFit: "cover", objectPosition: "center" }}
//               priority={false}
//             />
//             <Button
//               position="absolute"
//               top="10px"
//               left="50%"
//               transform="translateX(-50%)"
//               h="24px"
//               minW="104px"
//               px="10px"
//               borderRadius={STANDARD_RADIUS.full}
//               bg="rgba(255, 255, 255, 0.72)"
//               color={BRAND_COLORS.black}
//               fontSize="10px"
//               fontWeight="700"
//               backdropFilter="blur(6px)"
//               disabled={!isInCompare && compareList.length >= 3}
//               onClick={(event) => {
//                 event.stopPropagation();
//                 toggleCompare(group.planDesc);
//               }}
//               _hover={{ bg: "rgba(255, 255, 255, 0.86)" }}
//             >
//               {isInCompare ? "Added" : "Add to Compare"}
//             </Button>
//             {/* <IconButton
//               aria-label={
//                 isInCompare ? "Remove plan from compare" : "Add plan to compare"
//               }
//               position="absolute"
//               top="10px"
//               right="10px"
//               w="24px"
//               h="24px"
//               minW="24px"
//               borderRadius="7px"
//               bg="rgba(255, 255, 255, 0.72)"
//               color={BRAND_COLORS.darkGreen}
//               backdropFilter="blur(6px)"
//               disabled={!isInCompare && compareList.length >= 3}
//               onClick={(event) => {
//                 event.stopPropagation();
//                 toggleCompare(group.planDesc);
//               }}
//               _hover={{ bg: "rgba(255, 255, 255, 0.86)" }}
//             >
//               {isInCompare ? <FaCheck size={12} /> : <IoMdAdd size={15} />}
//             </IconButton> */}
//             <Box
//               position="absolute"
//               left="0"
//               right="0"
//               bottom="0"
//               px="8px"
//               py="10px"
//               bg="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.74) 38%, rgba(0, 0, 0, 0.9) 100%)"
//             >
//               <Text
//                 color={BRAND_COLORS.white}
//                 fontSize="12px"
//                 fontWeight="600"
//                 lineHeight="1.15"
//                 lineClamp={3}
//               >
//                 {group.casketDesc}
//               </Text>
//             </Box>
//           </Box>
//
//           <Box pt="8px">
//             <Text
//               color={BRAND_COLORS.black}
//               fontSize="16px"
//               fontWeight="800"
//               lineHeight="1.1"
//               lineClamp={1}
//             >
//               {group.planDesc}
//             </Text>
//             <Text
//               color={BRAND_COLORS.darkGreen}
//               fontSize="13px"
//               fontWeight="800"
//               lineHeight="1.1"
//               mt="3px"
//               lineClamp={1}
//             >
//               {monthlyTerm?.price ?? group.contractPrice}/mo
//             </Text>
//           </Box>
//         </Box>
//
//         <Flex
//           display={{ base: "none", md: "flex" }}
//           h={{ base: "148px", md: "156px" }}
//           w="full"
//           bg={BRAND_COLORS.subtleBg}
//           align="center"
//           justify="center"
//           borderBottomWidth="1px"
//           borderColor={BRAND_COLORS.neutralBorder}
//         >
//           <Box
//             position="relative"
//             h="full"
//             w="full"
//             bg={BRAND_COLORS.mutedBg}
//             overflow="hidden"
//           >
//             <NextImage
//               unoptimized
//               src={group.img}
//               alt={group.planDesc ?? ""}
//               fill
//               sizes="(max-width: 767px) 100vw, 25vw"
//               style={{ objectFit: "cover", objectPosition: "center" }}
//               priority={false}
//             />
//           </Box>
//         </Flex>
//
//         <VStack
//           display={{ base: "none", md: "flex" }}
//           align="stretch"
//           gap={STANDARD_SPACING.sm}
//           p={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
//           flex="1"
//         >
//           <Box>
//             <Box
//               display="inline-flex"
//               alignItems="center"
//               px="12px"
//               py="6px"
//               borderRadius={STANDARD_RADIUS.full}
//               bg={BRAND_COLORS.successBg}
//             >
//               <Text
//                 color={BRAND_COLORS.darkGreen}
//                 fontSize="12px"
//                 fontWeight="800"
//                 lineHeight="1"
//               >
//                 {getPlanCategory(planType, group.casketDesc)}
//               </Text>
//             </Box>
//
//             <Text
//               color={BRAND_COLORS.black}
//               fontSize={{ base: "20px", md: "22px" }}
//               fontWeight="800"
//               lineHeight="1.25"
//               mt={STANDARD_SPACING.sm}
//               lineClamp={1}
//             >
//               {group.planDesc}
//             </Text>
//             <Text
//               color={BRAND_COLORS.darkGreen}
//               fontSize="14px"
//               lineHeight="1.65"
//               lineClamp={2}
//               mt={STANDARD_SPACING.xs}
//             >
//               {group.casketDesc}
//             </Text>
//           </Box>
//
//           <Box
//             bg={BRAND_COLORS.successBg}
//             borderRadius={STANDARD_RADIUS.lg}
//             px={STANDARD_SPACING.sm}
//             py={STANDARD_SPACING.sm}
//           >
//             <Flex align="baseline" gap="4px" wrap="wrap">
//               <Text
//                 color={BRAND_COLORS.darkGreen}
//                 fontSize={{ base: "30px", md: "34px" }}
//                 fontWeight="900"
//                 lineHeight="1"
//               >
//                 {monthlyTerm?.price ?? group.contractPrice}
//               </Text>
//               <Text color={BRAND_COLORS.darkGreen} fontSize="13px">
//                 /mo
//               </Text>
//             </Flex>
//             <Flex
//               align="center"
//               gap={STANDARD_SPACING.xs}
//               wrap="wrap"
//               mt={STANDARD_SPACING.xs}
//             >
//               <Text color={BRAND_COLORS.darkGreen} fontSize="12px">
//                 Value:{" "}
//                 <Box as="span" fontWeight="800" color={BRAND_COLORS.black}>
//                   {group.contractPrice}
//                 </Box>
//               </Text>
//               <Text color={BRAND_COLORS.darkGreen} fontSize="12px">
//                 •
//               </Text>
//               <Text color={BRAND_COLORS.darkGreen} fontSize="12px">
//                 Term: {firstTerm?.planTerm ?? 0} yrs
//               </Text>
//             </Flex>
//           </Box>
//
//           <VStack align="stretch" gap="10px" flex="1">
//             {displayedTerms.map((term) => (
//               <Flex
//                 key={`${term.planTerm}-${term.mode}`}
//                 align="flex-start"
//                 gap="10px"
//               >
//                 <Text color={BRAND_COLORS.black} fontSize="14px">
//                   {modeLabel(term.mode)} payment at{" "}
//                   <Box as="span" fontWeight="800">
//                     {term.price}
//                   </Box>
//                 </Text>
//               </Flex>
//             ))}
//           </VStack>
//
//           <VStack align="stretch" gap={STANDARD_SPACING.xs} mt="auto">
//             <SecondaryMdButton
//               h="44px"
//               minW={0}
//               px={STANDARD_SPACING.sm}
//               borderRadius={STANDARD_RADIUS.md}
//               bg={
//                 isInCompare ? BRAND_COLORS.darkGreen : BRAND_COLORS.primaryGreen
//               }
//               color={BRAND_COLORS.white}
//               fontWeight="800"
//               whiteSpace="nowrap"
//               disabled={!isInCompare && compareList.length >= 3}
//               onClick={() => toggleCompare(group.planDesc)}
//               _hover={{ bg: BRAND_COLORS.darkGreen }}
//             >
//               {isInCompare ? <FaCheck /> : <IoMdAdd />}
//               {isInCompare ? "Added to Compare" : "Add to Compare"}
//             </SecondaryMdButton>
//             <PrimaryMdButton
//               h="44px"
//               minW={0}
//               px={STANDARD_SPACING.sm}
//               borderRadius={STANDARD_RADIUS.md}
//               borderWidth="1px"
//               borderColor={BRAND_COLORS.neutralBorder}
//               bg={BRAND_COLORS.white}
//               color={BRAND_COLORS.darkGreen}
//               whiteSpace="nowrap"
//               onClick={() => openPlan(group.planDesc)}
//               _hover={{ bg: BRAND_COLORS.successBg }}
//             >
//               View Details
//               <FiArrowRight />
//             </PrimaryMdButton>
//           </VStack>
//         </VStack>
//       </Box>
//     );
//   };
//
//   const renderPlanCards = (
//     groups: GroupedPlan[],
//     planType: string,
//     scrollRef: React.RefObject<HTMLDivElement | null>,
//   ) => (
//     <Box position="relative" w="full">
//       <Grid
//         ref={scrollRef}
//         display={{ base: "flex", md: "grid" }}
//         templateColumns={{
//           md: "repeat(2, minmax(0, 1fr))",
//           lg: "repeat(3, minmax(0, 1fr))",
//           xl: "repeat(3, minmax(0, 1fr))",
//         }}
//         gap={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
//         alignItems="stretch"
//         overflowX={{ base: "auto", md: "visible" }}
//         overflowY="hidden"
//         scrollBehavior="smooth"
//         scrollSnapType={{ base: "x mandatory", md: "none" }}
//         pb={{ base: STANDARD_SPACING.md, md: "0" }}
//         px={{ base: "2px", md: "0" }}
//         onScroll={updateScrollButtons}
//         w="full"
//         css={{
//           scrollbarWidth: "none",
//           msOverflowStyle: "none",
//           "&::-webkit-scrollbar": {
//             display: "none",
//           },
//         }}
//       >
//         {groups.map((group, index) => renderPlanCard(group, index, planType))}
//       </Grid>
//
//       {showLeftButton && (
//         <IconButton
//           aria-label="Scroll plans to the left"
//           display={{ base: "flex", md: "none" }}
//           position="absolute"
//           left="0"
//           top="50%"
//           transform="translate(-50%, -50%)"
//           zIndex={10}
//           w="30px"
//           h="30px"
//           minW="30px"
//           borderRadius="full"
//           bg="#E4F7EC"
//           color="#159B50"
//           borderWidth="1px"
//           borderColor="#BFE9D0"
//           onClick={scrollProductsLeft}
//           _hover={{
//             bg: "#D5F2E2",
//             transform: "translate(-50%, -50%)",
//           }}
//           _active={{
//             bg: "#C8ECD8",
//           }}
//         >
//           <FiArrowLeft size={21} />
//         </IconButton>
//       )}
//
//       {showRightButton && (
//         <IconButton
//           aria-label="Scroll plans to the right"
//           display={{ base: "flex", md: "none" }}
//           position="absolute"
//           right="0"
//           top="50%"
//           transform="translate(50%, -50%)"
//           zIndex={10}
//           w="30px"
//           h="30px"
//           minW="30px"
//           borderRadius="full"
//           bg="white"
//           color="#159B50"
//           borderWidth="1px"
//           borderColor="#159B50"
//           onClick={scrollProductsRight}
//           _hover={{
//             bg: "green.50",
//             transform: "translate(50%, -50%)",
//           }}
//           _active={{
//             bg: "green.100",
//           }}
//         >
//           <FiArrowRight size={21} />
//         </IconButton>
//       )}
//     </Box>
//   );
//
//   return (
//     <Container>
//       <Box display={{ base: "block", md: "none" }} mb={{ base: 0, md: 0 }}>
//         <Button variant="ghost" size="md" onClick={() => router.back()} px={0}>
//           <FaArrowLeft color="#177D54" />
//           Back
//         </Button>
//       </Box>
//       <Box display={{ base: "none", md: "block" }} mb={{ base: 0, md: 4 }}>
//         <Breadcrumb items={breadcrumbItems} />
//       </Box>
//       <Box
//         // pb={{ base: "calc(168px + env(safe-area-inset-bottom))", md: 16 }}
//         w="full"
//       >
//         {showAlert && (
//           <Box
//             ref={alertRef}
//             position="fixed"
//             top={{ base: 20, md: 24 }}
//             left="50%"
//             transform="translateX(-50%)"
//             zIndex={1000}
//             w={{ base: "90%", md: "50%" }}
//           >
//             <Error title="Please select at least 2 plans to compare" />
//           </Box>
//         )}
//
//         <VStack align="stretch" w="full">
//           <Box mt={{ base: 4, md: 0 }} mb={{ base: 4, md: 4 }}>
//             <H3 display={{ base: "none", md: "block" }}>Our life plans</H3>
//             <H4>Secure your family&apos;s future with peace of mind</H4>
//           </Box>
//           <Tabs.Root
//             value={activeTab}
//             onValueChange={(details) => setActiveTab(details.value)}
//             variant="plain"
//           >
//             <Tabs.List gap="8px" mt="8px" mb="8px">
//               <Tabs.Trigger
//                 value="traditional"
//                 h="28px"
//                 minW="88px"
//                 px="14px"
//                 borderRadius={STANDARD_RADIUS.full}
//                 borderWidth="1px"
//                 borderColor="#D1CCC0"
//                 bg={BRAND_COLORS.white}
//                 color="#5D5D58"
//                 fontSize="12px"
//                 fontWeight="700"
//                 _selected={{
//                   bg: "#177D54",
//                   borderColor: "#173E33",
//                   color: BRAND_COLORS.white,
//                 }}
//               >
//                 Traditional
//               </Tabs.Trigger>
//               <Tabs.Trigger
//                 value="cremation"
//                 h="28px"
//                 minW="88px"
//                 px="14px"
//                 borderRadius={STANDARD_RADIUS.full}
//                 borderWidth="1px"
//                 borderColor="#D1CCC0"
//                 bg={BRAND_COLORS.white}
//                 color="#5D5D58"
//                 fontSize="12px"
//                 fontWeight="700"
//                 _selected={{
//                   bg: "#177D54",
//                   borderColor: "#173E33",
//                   color: BRAND_COLORS.white,
//                 }}
//               >
//                 Cremation
//               </Tabs.Trigger>
//             </Tabs.List>
//
//             <Tabs.Content value="traditional">
//               {renderPlanCards(
//                 traditionalGroups,
//                 "Traditional",
//                 traditionalScrollRef,
//               )}
//             </Tabs.Content>
//             <Tabs.Content value="cremation">
//               {renderPlanCards(
//                 cremationGroups,
//                 "Cremation",
//                 cremationScrollRef,
//               )}
//             </Tabs.Content>
//           </Tabs.Root>
//         </VStack>
//
//         <ComparisonBanner
//           compareList={compareList}
//           setCompareList={setCompareList}
//           setShowAlert={setShowAlert}
//         />
//       </Box>
//     </Container>
//   );
// };
//
// export default AllProductsCopy;
