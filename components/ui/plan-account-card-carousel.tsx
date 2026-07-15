"use client";

import { Box, Button, Flex } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";
import PlanAccountCard, {
  type PlanAccountCardPlan,
} from "@/components/ui/plan-account-card";
import {
  CarouselContent,
  CarouselItem,
  ProductCarousel,
  type CarouselApi,
} from "@/components/ui/product-carousel";

type PlanAccountCardCarouselProps = {
  plans: PlanAccountCardPlan[];
  onPlanClick?: (plan: PlanAccountCardPlan) => void;
  onPay?: (plan: PlanAccountCardPlan) => void;
};

const PlanAccountCardCarousel = ({
  plans,
  onPlanClick,
  onPay,
}: PlanAccountCardCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const updateSelectedIndex = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) {
      return;
    }

    setSelectedIndex(carouselApi.selectedScrollSnap());
  }, []);

  const updateScrollSnaps = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) {
      return;
    }

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
    if (!api) {
      return;
    }

    api.on("select", updateSelectedIndex);
    api.on("reInit", updateScrollSnaps);

    return () => {
      api.off("select", updateSelectedIndex);
      api.off("reInit", updateScrollSnaps);
    };
  }, [api, updateScrollSnaps, updateSelectedIndex]);

  // Embla reports a single scroll snap when all cards fit in one view (no
  // scrolling). In that case — typically desktop with a few cards — center the
  // track instead of leaving empty space on the right. When it overflows, keep
  // the normal left-aligned, scrollable layout.
  const fitsInView = scrollSnaps.length <= 1;

  return (
    <Box w="full">
      <ProductCarousel
        setApi={handleSetApi}
        opts={{
          align: "start",
          containScroll: "trimSnaps",
          dragFree: false,
          loop: false,
        }}
      >
        <CarouselContent
          style={{
            marginLeft: "-16px",
            justifyContent: fitsInView ? "space-between" : "flex-start",
          }}
        >
          {plans.map((plan) => (
            <CarouselItem
              key={plan.contractNo ?? plan.lpaNumber ?? plan.plan}
              style={{
                flexBasis: "min(100%, 360px)",
                paddingLeft: STANDARD_SPACING.sm,
              }}
            >
              <PlanAccountCard
                plan={plan}
                isSelected
                onClick={() => onPlanClick?.(plan)}
                onPay={() => onPay?.(plan)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </ProductCarousel>

      {scrollSnaps.length > 1 ? (
        <Flex
          justify="center"
          align="center"
          gap="8px"
          mt={STANDARD_SPACING.sm}
        >
          {scrollSnaps.map((_, index) => {
            const isSelected = selectedIndex === index;

            return (
              <Button
                key={index}
                aria-label={`Go to plan ${index + 1}`}
                aria-current={isSelected ? "true" : undefined}
                w={isSelected ? "28px" : "8px"}
                minW={isSelected ? "28px" : "8px"}
                h="8px"
                p={0}
                borderRadius={STANDARD_RADIUS.full}
                bg={
                  isSelected
                    ? BRAND_COLORS.primaryGreen
                    : BRAND_COLORS.neutralBorder
                }
                transition="width 180ms ease-out, background 180ms ease-out"
                onClick={() => api?.scrollTo(index)}
              />
            );
          })}
        </Flex>
      ) : null}
    </Box>
  );
};

export default PlanAccountCardCarousel;
