"use client";
import React, { useRef, useState, useEffect } from "react";
import ProductCard from "@/components/ui/card";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";

import { IPlans } from "@/types/product";
import { useRouter } from "next/navigation";
import {
  Box,
  Flex,
  Button,
  IconButton,
  Spinner,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";

const Products = () => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [plans, setPlans] = useState<IPlans[]>([]);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 0);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -clientWidth : clientWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/get-plans");
        const data = await res.json();
        setPlans(data.result);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    setTimeout(checkScroll, 0);
  }, [plans]);

  const showBackButton = useBreakpointValue({ base: true, md: false });

  return (
    <Flex justify="center" align="center" w="full" mb={8}>
      <Box
        p={{ base: 4, md: 8 }}
        gap={4}
        w={{ base: "full", md: "80%" }}
        position="relative"
      >
        {showBackButton && (
          <Box px={4} mb={8}>
            <Button
              onClick={() => router.push("/")}
              variant="ghost"
              // leftIcon={<BackButton />}
            >
              Back
            </Button>
          </Box>
        )}

        {/* === Traditional Plans === */}
        <Box mt="32">
          <Text textAlign="start" ml={4} fontSize="3xl" fontWeight="bold">
            Traditional Plans
          </Text>

          <Flex
            ref={scrollRef}
            gap={6}
            w="full"
            overflowX="auto"
            p={4}
            scrollBehavior="smooth"
            css={{
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE and Edge
            }}
          >
            {plans.length === 0
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <Box
                    key={idx}
                    w="18rem"
                    h="24rem"
                    bg="gray.200"
                    borderRadius="lg"
                    flexShrink={0}
                    animation="pulse 1.5s infinite"
                  />
                ))
              : plans
                  .filter((plan) => plan.productCode === "LP")
                  .map((plan, index) => (
                    <Box
                      as="a"
                      onClick={() => {
                        console.log(
                          "Navigating to:",
                          `/product/${plan.planDesc}`
                        );

                        console.log("Plan clicked:", plan);
                        router.push(`/plan-details/${plan.planDesc}`);
                      }}
                      key={index}
                      flexShrink={0}
                    >
                      <ProductCard
                        variant="plan"
                        image={`/images/plan-images/${plan.planDesc}.jpg`}
                        title={plan.planDesc}
                        description={plan.casketDesc}
                        price={plan.ipInstAmt}
                        planTerm={plan.planTerm}
                      />
                    </Box>
                  ))}
          </Flex>

          <Flex justify="end" align="center" gap={4} mt={8}>
            <IconButton
              aria-label="Scroll left"
              onClick={() => scroll("left")}
              // icon={<ChevronLeft size={32} />}
              rounded="full"
              boxShadow="md"
              colorScheme="gray"
              opacity={atStart ? 0.4 : 1}
              // isDisabled={atStart}
            >
              <GrLinkPrevious />
            </IconButton>
            <IconButton
              aria-label="Scroll right"
              onClick={() => scroll("right")}
              // icon={<ChevronRight size={32} />}
              rounded="full"
              boxShadow="md"
              colorScheme="gray"
              opacity={atEnd ? 0.4 : 1}
              // isDisabled={atEnd}
            >
              <GrLinkNext />
            </IconButton>
          </Flex>
        </Box>

        {/* === Cremation Plans === */}
        <Box mt={16}>
          <Text textAlign="start" ml={4} fontSize="3xl" fontWeight="bold">
            Cremation Plans
          </Text>

          <Flex
            gap={6}
            w="full"
            overflowX="auto"
            p={4}
            scrollBehavior="smooth"
            // sx={{
            //   "::-webkit-scrollbar": { display: "none" },
            //   scrollbarWidth: "none",
            //   msOverflowStyle: "none",
            // }}
          >
            {plans.length === 0
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <Box
                    key={idx}
                    w="18rem"
                    h="24rem"
                    bg="gray.200"
                    borderRadius="lg"
                    flexShrink={0}
                    animation="pulse 1.5s infinite"
                  />
                ))
              : plans
                  .filter((plan) => plan.productCode === "CP")
                  .map((plan, index) => (
                    <ProductCard
                      variant="plan"
                      key={index}
                      image={`images/plan-images/${plan.planDesc}.jpg`}
                      title={plan.planDesc}
                      description={plan.casketDesc}
                      price={plan.ipInstAmt}
                      planTerm={plan.planTerm}
                    />
                  ))}
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Products;
