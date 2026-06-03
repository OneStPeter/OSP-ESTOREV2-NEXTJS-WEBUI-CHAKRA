"use client";

import ProductCard from "@/components/ui/card";
import ComparisonBanner from "@/components/ui/comparison-banner";
import Error from "@/components/ui/error";

import { Box, Flex, IconButton } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BaseText, Body } from "st-peter-ui";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function ProductLandingPage({
  groupedPlans,
}: {
  groupedPlans: any[];
}) {
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const [showMemorialLeftButton, setShowMemorialLeftButton] = useState(false);
  const [showMemorialRightButton, setShowMemorialRightButton] = useState(true);

  const alertRef = useRef<HTMLDivElement>(null);
  const productScrollRef = useRef<HTMLDivElement>(null);
  const memorialScrollRef = useRef<HTMLDivElement>(null);

  const toggleCompare = (planDesc: string) => {
    setCompareList((prev) =>
      prev.includes(planDesc)
        ? prev.filter((p) => p !== planDesc)
        : [...prev, planDesc],
    );
  };

  const updateScrollButtons = () => {
    const el = productScrollRef.current;

    if (!el) return;

    const isAtStart = el.scrollLeft <= 8;
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;

    setShowLeftButton(!isAtStart);
    setShowRightButton(!isAtEnd);
  };

  const updateMemorialScrollButtons = () => {
    const el = memorialScrollRef.current;

    if (!el) return;

    const isAtStart = el.scrollLeft <= 8;
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;

    setShowMemorialLeftButton(!isAtStart);
    setShowMemorialRightButton(!isAtEnd);
  };

  const scrollProductsRight = () => {
    productScrollRef.current?.scrollBy({
      left: 280,
      behavior: "smooth",
    });
  };

  const scrollProductsLeft = () => {
    productScrollRef.current?.scrollBy({
      left: -280,
      behavior: "smooth",
    });
  };

  const scrollMemorialRight = () => {
    memorialScrollRef.current?.scrollBy({
      left: 280,
      behavior: "smooth",
    });
  };

  const scrollMemorialLeft = () => {
    memorialScrollRef.current?.scrollBy({
      left: -280,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!showAlert) return;

    alertRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showAlert]);

  useEffect(() => {
    updateScrollButtons();
    updateMemorialScrollButtons();

    const productEl = productScrollRef.current;
    const memorialEl = memorialScrollRef.current;

    productEl?.addEventListener("scroll", updateScrollButtons);
    memorialEl?.addEventListener("scroll", updateMemorialScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    window.addEventListener("resize", updateMemorialScrollButtons);

    return () => {
      productEl?.removeEventListener("scroll", updateScrollButtons);
      memorialEl?.removeEventListener("scroll", updateMemorialScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
      window.removeEventListener("resize", updateMemorialScrollButtons);
    };
  }, [groupedPlans]);

  const popularPlans = groupedPlans.slice(0, 3);

  const productAccentColors = ["#F7EFE5", "#DFF5FB", "#FFE1E6"];

  return (
    <section>
      {showAlert && (
        <Box
          ref={alertRef}
          position="fixed"
          top={4}
          left="50%"
          transform="translateX(-50%)"
          zIndex={1000}
          w={{ base: "90%", md: "50%" }}
        >
          <Error title="Please select at least 2 plans to compare" />
        </Box>
      )}

      <Box
        px={{ base: 4, sm: 6, md: 8, lg: 12 }}
        py={{ base: 10, md: 14, lg: 16 }}
        bg="white"
      >
        <Flex
          textAlign="center"
          flexDirection="column"
          alignItems="center"
          gap={{ base: 3, md: 4 }}
          maxW="720px"
          mx="auto"
        >
          <BaseText
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            fontWeight="bold"
            lineHeight="1.15"
          >
            Popular Plans
          </BaseText>

          <Body>
            Choose a plan that fits your needs. Flexible terms and affordable
            prices.
          </Body>
        </Flex>

        <Box
          mt={{ base: 8, md: 10 }}
          maxW="1120px"
          mx="auto"
          position="relative"
        >
          <Box
            ref={productScrollRef}
            display={{ base: "flex", lg: "grid" }}
            gridTemplateColumns={{
              lg: "repeat(3, minmax(0, 1fr))",
            }}
            gap={{ base: 4, md: 6 }}
            alignItems="stretch"
            overflowX={{ base: "auto", lg: "visible" }}
            overflowY="hidden"
            scrollBehavior="smooth"
            scrollSnapType={{ base: "x mandatory", lg: "none" }}
            pb={{ base: 3, lg: 0 }}
            px={{ base: 1, lg: 0 }}
            onScroll={updateScrollButtons}
            css={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {popularPlans.map((g, index) => (
              <Box
                key={index}
                flex={{ base: "0 0 82%", sm: "0 0 48%", lg: "unset" }}
                minW={{ base: "260px", sm: "300px", lg: "auto" }}
                scrollSnapAlign={{ base: "start", lg: "none" }}
              >
                <ProductCard
                  compareList={compareList}
                  toggleCompare={toggleCompare}
                  variant="plan"
                  image={g.img}
                  title={g.planDesc}
                  description={g.casketDesc}
                  terms={g.terms}
                  accentBg={
                    productAccentColors[index % productAccentColors.length]
                  }
                  onCompare={() => toggleCompare(g.planDesc)}
                />
              </Box>
            ))}
          </Box>

          {showLeftButton && (
            <IconButton
              aria-label="Scroll products to the left"
              display={{ base: "flex", lg: "none" }}
              position="absolute"
              left="12px"
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
              <FiArrowLeft size={22} />
            </IconButton>
          )}

          {showRightButton && (
            <IconButton
              aria-label="Scroll products to the right"
              display={{ base: "flex", lg: "none" }}
              position="absolute"
              right="12px"
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
              <FiArrowRight size={22} />
            </IconButton>
          )}
        </Box>
      </Box>

      <Box
        px={{ base: 4, sm: 6, md: 8, lg: 12 }}
        py={{ base: 10, md: 14 }}
        mt={{ base: 4, md: 8 }}
        bg="gray.50"
      >
        <Flex
          textAlign="center"
          flexDirection="column"
          alignItems="center"
          gap={{ base: 3, md: 4 }}
          maxW="720px"
          mx="auto"
        >
          <BaseText
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            fontWeight="bold"
            lineHeight="1.15"
          >
            Memorial Parks
          </BaseText>

          <Body>Beautiful locations for lasting memories.</Body>
        </Flex>

        <Box
          mt={{ base: 8, md: 10 }}
          maxW="760px"
          mx="auto"
          position="relative"
          // bg
        >
          <Box
            ref={memorialScrollRef}
            display={{ base: "flex", md: "grid" }}
            gridTemplateColumns={{
              md: "repeat(2, minmax(0, 1fr))",
            }}
            gap={{ base: 4, md: 6 }}
            alignItems="stretch"
            overflowX={{ base: "auto", md: "visible" }}
            overflowY="hidden"
            scrollBehavior="smooth"
            scrollSnapType={{ base: "x mandatory", md: "none" }}
            pb={{ base: 3, md: 0 }}
            px={{ base: 1, md: 0 }}
            onScroll={updateMemorialScrollButtons}
            css={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Box
              flex={{ base: "0 0 82%", sm: "0 0 48%", md: "unset" }}
              minW={{ base: "260px", sm: "300px", md: "auto" }}
              scrollSnapAlign={{ base: "start", md: "none" }}
            >
              <ProductCard
                variant="memorial"
                title="Guiguinto, Bulacan"
                image="/images/memorial-park/memorial-park-1.jpg"
                address="Guiguinto Memorial Gardens - St. Peter Memorial Gardens"
                accentBg="#F7EFE5"
              />
            </Box>

            <Box
              flex={{ base: "0 0 82%", sm: "0 0 48%", md: "unset" }}
              minW={{ base: "260px", sm: "300px", md: "auto" }}
              scrollSnapAlign={{ base: "start", md: "none" }}
            >
              <ProductCard
                variant="memorial"
                title="Legaspi City, Albay"
                image="/images/memorial-park/memorial-park-2.jpg"
                address="Taysan Hills, Brgy. 56-Taysan, Legaspi City"
                accentBg="#DFF5FB"
              />
            </Box>
          </Box>

          {showMemorialLeftButton && (
            <IconButton
              aria-label="Scroll memorial parks to the left"
              display={{ base: "flex", md: "none" }}
              position="absolute"
              left="12px"
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
              onClick={scrollMemorialLeft}
              _hover={{
                bg: "#D5F2E2",
                transform: "translate(-50%, -50%)",
              }}
              _active={{
                bg: "#C8ECD8",
              }}
            >
              <FiArrowLeft size={22} />
            </IconButton>
          )}

          {showMemorialRightButton && (
            <IconButton
              aria-label="Scroll memorial parks to the right"
              display={{ base: "flex", md: "none" }}
              position="absolute"
              right="12px"
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
              onClick={scrollMemorialRight}
              _hover={{
                bg: "green.50",
                transform: "translate(50%, -50%)",
              }}
              _active={{
                bg: "green.100",
              }}
            >
              <FiArrowRight size={22} />
            </IconButton>
          )}
        </Box>
      </Box>

      <ComparisonBanner
        compareList={compareList}
        setCompareList={setCompareList}
        setShowAlert={setShowAlert}
      />
    </section>
  );
}
