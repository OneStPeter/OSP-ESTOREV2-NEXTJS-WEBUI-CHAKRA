"use client";

import { Box, Button, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { IconType } from "react-icons";
import { LuCalendarDays, LuCreditCard, LuHeartHandshake } from "react-icons/lu";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";
import {
  CarouselContent,
  CarouselItem,
  ProductCarousel,
  type CarouselApi,
} from "@/components/ui/product-carousel";

type AdBanner = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
  icon: IconType;
  bg: string;
  accent: string;
  textColor: string;
};

const sampleBanners: AdBanner[] = [
  {
    id: "pay-online",
    eyebrow: "Online payment",
    title: "Settle your plan from home",
    description:
      "Pay securely and keep your account updated without visiting a branch.",
    actionLabel: "Pay now",
    href: "/account/pay-my-plan",
    icon: LuCreditCard,
    bg: BRAND_COLORS.successBg,
    accent: BRAND_COLORS.primaryGreen,
    textColor: BRAND_COLORS.neutralText,
  },
  {
    id: "book-visit",
    eyebrow: "Branch assistance",
    title: "Need help with your plan?",
    description:
      "Schedule a visit and get guided support from a St. Peter representative.",
    actionLabel: "Memorial Service Booking",
    href: "/booking",
    icon: LuCalendarDays,
    bg: "#EEF6FF",
    accent: "#026BA9",
    textColor: BRAND_COLORS.neutralText,
  },
  {
    id: "claims",
    eyebrow: "Claims support",
    title: "Start a claim request",
    description:
      "Prepare the needed details and submit your claim request in one place.",
    actionLabel: "File a claim",
    href: "/claims",
    icon: LuHeartHandshake,
    bg: "#FFF9C4",
    accent: "#92792D",
    textColor: BRAND_COLORS.neutralText,
  },
];

export default function AdBannerCarousel() {
  const router = useRouter();
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const updateSelectedIndex = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    setSelectedIndex(carouselApi.selectedScrollSnap());
  }, []);

  const updateScrollSnaps = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    setScrollSnaps(carouselApi.scrollSnapList());
    setSelectedIndex(carouselApi.selectedScrollSnap());
  }, []);

  const handleSetApi = useCallback(
    (carouselApi: CarouselApi) => {
      setApi(carouselApi);
      updateScrollSnaps(carouselApi);
    },
    [updateScrollSnaps],
  );

  useEffect(() => {
    if (!api) return;

    api.on("select", updateSelectedIndex);
    api.on("reInit", updateScrollSnaps);

    return () => {
      api.off("select", updateSelectedIndex);
      api.off("reInit", updateScrollSnaps);
    };
  }, [api, updateScrollSnaps, updateSelectedIndex]);

  useEffect(() => {
    if (!api || scrollSnaps.length <= 1) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const intervalId = window.setInterval(() => {
      api.scrollNext();
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [api, scrollSnaps.length]);

  return (
    <Box w="full">
      <ProductCarousel
        setApi={handleSetApi}
        opts={{
          align: "start",
          containScroll: "trimSnaps",
          dragFree: false,
          loop: true,
        }}
      >
        <CarouselContent style={{ marginLeft: "-16px" }}>
          {sampleBanners.map((banner) => (
            <CarouselItem key={banner.id} style={{ paddingLeft: "16px" }}>
              <Flex
                minH={{ base: "132px", md: "152px" }}
                borderRadius={STANDARD_RADIUS.xl}
                bg={banner.bg}
                borderWidth="1px"
                borderColor={BRAND_COLORS.neutralBorder}
                boxShadow={STANDARD_SHADOWS.level1}
                overflow="hidden"
                position="relative"
                p={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
                align="stretch"
                justify="space-between"
                gap={STANDARD_SPACING.sm}
              >
                <VStack align="flex-start" gap="8px" maxW="72%" zIndex={1}>
                  <Text
                    fontSize="11px"
                    fontWeight="800"
                    color={banner.accent}
                    textTransform="uppercase"
                    letterSpacing="0.06em"
                    lineHeight="1"
                  >
                    {banner.eyebrow}
                  </Text>
                  <Text
                    fontSize={{ base: "17px", md: "20px" }}
                    fontWeight="800"
                    color={banner.textColor}
                    lineHeight="1.15"
                  >
                    {banner.title}
                  </Text>
                  <Text
                    fontSize={{ base: "12px", md: "14px" }}
                    color={BRAND_COLORS.grey}
                    lineHeight="1.45"
                  >
                    {banner.description}
                  </Text>
                  <Button
                    size="sm"
                    mt="auto"
                    bg={banner.accent}
                    color={BRAND_COLORS.white}
                    borderRadius={STANDARD_RADIUS.md}
                    _hover={{ opacity: 0.9 }}
                    onClick={() => router.push(banner.href)}
                  >
                    {banner.actionLabel}
                  </Button>
                </VStack>

                <Flex
                  align="center"
                  justify="center"
                  boxSize={{ base: "64px", md: "88px" }}
                  borderRadius={STANDARD_RADIUS.lg}
                  bg={BRAND_COLORS.white}
                  color={banner.accent}
                  flexShrink={0}
                  alignSelf="center"
                  boxShadow={STANDARD_SHADOWS.level1}
                >
                  <Icon
                    as={banner.icon}
                    boxSize={{ base: "30px", md: "38px" }}
                  />
                </Flex>
              </Flex>
            </CarouselItem>
          ))}
        </CarouselContent>
      </ProductCarousel>

      {scrollSnaps.length > 1 ? (
        <Flex
          justify="center"
          align="center"
          gap="8px"
          mt={STANDARD_SPACING.xs}
        >
          {scrollSnaps.map((_, index) => {
            const isSelected = selectedIndex === index;

            return (
              <Button
                key={index}
                aria-label={`Go to advertisement ${index + 1}`}
                aria-current={isSelected ? "true" : undefined}
                w={isSelected ? "24px" : "8px"}
                minW={isSelected ? "24px" : "8px"}
                h="8px"
                p={0}
                borderRadius={STANDARD_RADIUS.full}
                bg={isSelected ? BRAND_COLORS.primaryGreen : "#C9D1CC"}
                transition="width 180ms ease-out, background 180ms ease-out"
                onClick={() => api?.scrollTo(index)}
              />
            );
          })}
        </Flex>
      ) : null}
    </Box>
  );
}
