"use client";

import { useRouter } from "next/navigation";
import { Box, Flex, Grid, VStack } from "@chakra-ui/react";
import { Body, SecondaryMdButton } from "st-peter-ui";
import { FiArrowRight } from "react-icons/fi";

import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import { STANDARD_SPACING } from "@/lib/theme/standard-design-tokens";

import Reveal from "../shared/reveal";
import SectionHead from "../shared/section-head";
import { SECTION_PX } from "../shared/section-tokens";

/* -----------------------------------------------------------------------------
 * About — asymmetric two-column editorial band introducing St. Peter.
 * -------------------------------------------------------------------------- */
export default function About() {
  const router = useRouter();

  return (
    <Box as="section" aria-label="About St. Peter" bg={BRAND_COLORS.white}>
      <Box
        maxW="7xl"
        mx="auto"
        px={SECTION_PX}
        py={{ base: "48px", md: "80px" }}
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "0.9fr 1.1fr" }}
          gap={{ base: STANDARD_SPACING.md, lg: STANDARD_SPACING.xl }}
          alignItems="start"
        >
          <Reveal>
            <SectionHead
              eyebrow="Who We Are"
              title="A trusted name in compassionate memorial care"
              maxW="460px"
            />
          </Reveal>

          <Reveal delay={100}>
            <VStack
              align="stretch"
              gap={STANDARD_SPACING.md}
              pt={{ lg: "6px" }}
            >
              <Body
                color={BRAND_COLORS.grey}
                fontSize={{ base: "md", md: "lg" }}
              >
                For decades, St. Peter Life Plan has walked alongside Filipino
                families providing dignified memorial services and affordable,
                insurance-backed plans. Our promise is simple: to make planning
                ahead a gentle, reassuring step you take out of love.
                {/* TODO: replace with finalized company copy. */}
              </Body>
              <Flex
                gap={STANDARD_SPACING.sm}
                wrap="wrap"
                justify={{ base: "flex-end" }}
              >
                <SecondaryMdButton
                  onClick={() => router.push("/about-us")}
                  h="46px"
                  whiteSpace="nowrap"
                >
                  Learn more about us
                  <FiArrowRight />
                </SecondaryMdButton>
              </Flex>
            </VStack>
          </Reveal>
        </Grid>
      </Box>
    </Box>
  );
}
