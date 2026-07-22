"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Error from "@/components/ui/error";
import {
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import ComparisonBanner from "@/components/ui/comparison-banner";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";
import Page from "@/components/layout/page/Page";
import PlanCard, { type GroupedPlan } from "./plan-card";

type Props = {
  traditionalGroups: GroupedPlan[];
  cremationGroups: GroupedPlan[];
};

const categoryTabs = [
  { value: "traditional", label: "Traditional" },
  { value: "cremation", label: "Cremation" },
];

const AllProductsCopy = ({ traditionalGroups, cremationGroups }: Props) => {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("traditional");
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbRatio, setThumbRatio] = useState(1);
  const alertRef = useRef<HTMLDivElement | null>(null);
  const traditionalScrollRef = useRef<HTMLDivElement | null>(null);
  const cremationScrollRef = useRef<HTMLDivElement | null>(null);
  const scrollRafRef = useRef<number | null>(null);

  useEffect(() => {
    sessionStorage.removeItem("CheckoutCart");
  }, []);

  useEffect(() => {
    if (!showAlert) return;

    alertRef.current?.scrollIntoView({ behavior: "smooth" });

    const timer = setTimeout(() => setShowAlert(false), 3000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  const toggleCompare = useCallback((planDesc: string) => {
    setCompareList((prev) =>
      prev.includes(planDesc)
        ? prev.filter((desc) => desc !== planDesc)
        : [...prev, planDesc],
    );
  }, []);

  const openPlan = useCallback(
    (planDesc: string) => {
      router.push(`/plan-details/${encodeURIComponent(planDesc)}`);
    },
    [router],
  );

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

    const maxScroll = el.scrollWidth - el.clientWidth;
    setScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
    setThumbRatio(el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1);
  }, [getActiveScrollElement]);

  const handleScroll = useCallback(() => {
    if (scrollRafRef.current !== null) return;

    scrollRafRef.current = requestAnimationFrame(() => {
      scrollRafRef.current = null;
      updateScrollButtons();
    });
  }, [updateScrollButtons]);

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

    window.addEventListener("resize", updateScrollButtons);

    return () => {
      window.removeEventListener("resize", updateScrollButtons);

      if (scrollRafRef.current !== null) {
        cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
    };
  }, [
    activeTab,
    cremationGroups.length,
    traditionalGroups.length,
    updateScrollButtons,
  ]);

  const renderPlanCards = (groups: GroupedPlan[], planType: string) => (
    <Box position="relative" w="full">
      <Grid
        ref={
          planType === "Traditional" ? traditionalScrollRef : cremationScrollRef
        }
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
        onScroll={handleScroll}
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
        {groups.map((group) => {
          const isInCompare = compareList.includes(group.planDesc);

          return (
            <PlanCard
              key={group.planDesc}
              group={group}
              planType={planType}
              isInCompare={isInCompare}
              compareDisabled={!isInCompare && compareList.length >= 3}
              onOpen={openPlan}
              onToggleCompare={toggleCompare}
            />
          );
        })}
      </Grid>

      {thumbRatio < 1 && (
        <Flex
          display={{ base: "flex", md: "none" }}
          justify="center"
          mt="4px"
          aria-hidden="true"
        >
          <Box
            position="relative"
            w="72px"
            h="4px"
            borderRadius="full"
            bg="#E4F7EC"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top="0"
              bottom="0"
              w={`${Math.max(thumbRatio * 100, 18)}%`}
              left={`${scrollProgress * (100 - Math.max(thumbRatio * 100, 18))}%`}
              borderRadius="full"
              bg="#159B50"
              transition="left 0.1s linear"
            />
          </Box>
        </Flex>
      )}

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
    <Page.Root title="" description="" hideBackButton>
      <Page.MainContent>
        <Page.Row>
          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "stretch", md: "flex-end" }}
            justify="space-between"
            gap={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
          >
            <Box display={{ base: "none", md: "block" }}>
              <Text
                fontSize={{ base: "11px", md: "12px" }}
                fontWeight="800"
                letterSpacing="0.08em"
                textTransform="uppercase"
                color={BRAND_COLORS.darkGreen}
              >
                Traditional &amp; Cremation Plans
              </Text>
              <Text
                fontSize={{ base: "20px", md: "26px" }}
                fontWeight="800"
                lineHeight="1.2"
                color={BRAND_COLORS.neutralText}
                mt="2px"
              >
                Find the plan that fits your family
              </Text>
            </Box>

            <VStack align={{ base: "stretch", md: "flex-end" }} gap="8px">
              <Flex
                role="tablist"
                aria-label="Plan category"
                w={{ base: "full", md: "auto" }}
                bg={BRAND_COLORS.subtleBg}
                borderWidth="1px"
                borderColor={BRAND_COLORS.neutralBorder}
                borderRadius={STANDARD_RADIUS.full}
                p="8px"
                gap="4px"
              >
                {categoryTabs.map((tab) => {
                  const isActive = activeTab === tab.value;

                  return (
                    <Button
                      key={tab.value}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="plans-tabpanel"
                      onClick={() => setActiveTab(tab.value)}
                      flex={{ base: 1, md: "initial" }}
                      h={{ base: "44px", md: "40px" }}
                      minW={{ md: "132px" }}
                      px="20px"
                      borderRadius={STANDARD_RADIUS.full}
                      bg={isActive ? "#177D54" : "transparent"}
                      color={isActive ? BRAND_COLORS.white : "#5D5D58"}
                      fontSize={{ base: "13px", md: "14px" }}
                      fontWeight="700"
                      boxShadow={
                        isActive ? "0 1px 3px rgba(0,0,0,0.14)" : "none"
                      }
                      transition="background 0.15s ease, color 0.15s ease"
                      _hover={{
                        bg: isActive ? "#177D54" : BRAND_COLORS.white,
                      }}
                    >
                      {tab.label}
                    </Button>
                  );
                })}
              </Flex>
            </VStack>
          </Flex>
        </Page.Row>

        <Page.Row id="plans-tabpanel" role="tabpanel">
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
