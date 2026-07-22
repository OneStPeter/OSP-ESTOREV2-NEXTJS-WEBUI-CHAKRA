"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { Body, SecondaryMdButton } from "st-peter-ui";
import { FiArrowRight } from "react-icons/fi";

import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import { STANDARD_SPACING } from "@/lib/theme/standard-design-tokens";

import ProductCard from "@/components/ui/card";

import Reveal from "../shared/reveal";
import SectionHead from "../shared/section-head";
import { SECTION_PX } from "../shared/section-tokens";

/* A grouped plan card (one entry per plan, with its available terms). */
export type GroupedPlan = {
  planDesc: string;
  casketDesc: string;
  img: string;
  terms: { planTerm?: number; price?: number }[];
};

const planAccentColors = ["#F7EFE5", "#DFF5FB", "#FFE1E6"];

/* -----------------------------------------------------------------------------
 * PlansShowcase — featured plan cards with a subtle compare entry point.
 * -------------------------------------------------------------------------- */
export default function PlansShowcase({
  groupedPlans,
  compareList,
  toggleCompare,
}: {
  groupedPlans: GroupedPlan[];
  compareList: string[];
  toggleCompare: (planDesc: string) => void;
}) {
  const router = useRouter();

  // Show the first few plans on the landing page.
  // TODO: to split Life vs. Cremation, filter by productCode ("LP" vs "CP")
  // upstream in the server route before grouping.
  const featuredPlans = useMemo(() => groupedPlans.slice(0, 3), [groupedPlans]);

  return (
    <Box
      as="section"
      aria-label="Our plans"
      bg={`linear-gradient(180deg, ${BRAND_COLORS.subtleBg} 0%, ${BRAND_COLORS.white} 100%)`}
    >
      <Box
        maxW="7xl"
        mx="auto"
        px={SECTION_PX}
        py={{ base: "48px", md: "80px" }}
      >
        <Reveal>
          <Flex
            direction={{ base: "row", md: "row" }}
            justify="space-between"
            align={{ base: "flex-end", md: "flex-end" }}
            gap={STANDARD_SPACING.md}
            mb={{ base: "28px", md: "40px" }}
          >
            <SectionHead
              eyebrow="Life & Cremation Plans"
              title="Find the plan that fits your family"
              maxW="520px"
            />

            {/* Subtle compare entry point */}
            <SecondaryMdButton
              onClick={() => router.push("/plans")}
              h="44px"
              flexShrink={0}
              whiteSpace="nowrap"
            >
              See all plans
              <FiArrowRight />
            </SecondaryMdButton>
          </Flex>
        </Reveal>

        {featuredPlans.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            gap={{ base: 4, md: 6 }}
          >
            {featuredPlans.map((g, index) => (
              <Reveal key={g.planDesc ?? index} delay={index * 80}>
                <ProductCard
                  variant="plan"
                  image={g.img}
                  title={g.planDesc}
                  description={g.casketDesc}
                  terms={g.terms}
                  compareList={compareList}
                  toggleCompare={toggleCompare}
                  onCompare={() => toggleCompare(g.planDesc)}
                  accentBg={planAccentColors[index % planAccentColors.length]}
                />
              </Reveal>
            ))}
          </SimpleGrid>
        ) : (
          // Fallback when no plan data is available.
          <Body color={BRAND_COLORS.grey}>
            Plans are loading. Please check back shortly.
          </Body>
        )}
      </Box>
    </Box>
  );
}
