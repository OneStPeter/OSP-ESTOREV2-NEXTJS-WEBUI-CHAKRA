"use client";

import { Box, Flex } from "@chakra-ui/react";

import { BRAND_COLORS } from "@/lib/theme/brand-colors";

import Testimonials, {
  type TestimonialItem,
} from "@/components/ui/testimonials";

import Reveal from "../shared/reveal";
import SectionHead from "../shared/section-head";
import { SECTION_PX } from "../shared/section-tokens";

// TODO: swap for real, consented testimonials (or pull from a CMS/API).
const testimonials: TestimonialItem[] = [
  {
    quote:
      "Having a St. Peter Life Plan gave our family one less thing to worry about during the hardest time. Everything was handled with such care and dignity.",
    name: "Maria Santos",
    branch: "Quezon City",
    planholderSince: "Planholder since 2014",
  },
  {
    quote:
      "I applied online in minutes and chose a monthly term that fit our budget. It feels good knowing my children won't carry this burden.",
    name: "Roberto Dela Cruz",
    branch: "Cebu City",
    planholderSince: "Planholder since 2019",
  },
  {
    quote:
      "The staff treated my mother's memorial with so much respect. I'm grateful we planned ahead — it let us focus on remembering her.",
    name: "Angelica Reyes",
    branch: "Davao City",
    planholderSince: "Planholder since 2016",
  },
];

/* -----------------------------------------------------------------------------
 * TestimonialsSection — planholder stories, reusing the shared Testimonials grid.
 * -------------------------------------------------------------------------- */
export default function TestimonialsSection() {
  return (
    <Box as="section" aria-label="Planholder stories" bg={BRAND_COLORS.subtleBg}>
      <Box maxW="7xl" mx="auto" px={SECTION_PX} py={{ base: "48px", md: "80px" }}>
        <Reveal>
          <SectionHead
            eyebrow="Stories of Trust"
            title="Families who planned with peace of mind"
            maxW="620px"
          />
        </Reveal>

        <Reveal delay={120}>
          <Flex justify="center" mt={{ base: "32px", md: "48px" }}>
            {/* Reuses the shared Testimonials grid component. */}
            <Testimonials testimonials={testimonials} />
          </Flex>
        </Reveal>
      </Box>
    </Box>
  );
}
