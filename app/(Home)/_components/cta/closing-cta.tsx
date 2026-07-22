"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { H2, Body } from "st-peter-ui";
import { FiArrowRight } from "react-icons/fi";

import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";

import Reveal from "../shared/reveal";
import { SECTION_PX } from "../shared/section-tokens";

/* -----------------------------------------------------------------------------
 * ClosingCta — arched-top CTA band (signature shape) that closes the page.
 * -------------------------------------------------------------------------- */
export default function ClosingCta() {
  const router = useRouter();

  return (
    <Box
      as="section"
      aria-label="Get started"
      position="relative"
      borderTopRadius={{ base: "32px", md: "64px" }}
      bg={`linear-gradient(135deg, ${BRAND_COLORS.darkGreen} 0%, ${BRAND_COLORS.primaryGreen} 100%)`}
      overflow="hidden"
    >
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        bg={`radial-gradient(circle at 88% 0%, ${BRAND_COLORS.paleGold}33 0%, ${BRAND_COLORS.paleGold}00 40%)`}
      />
      <Box
        position="relative"
        maxW="5xl"
        mx="auto"
        px={SECTION_PX}
        py={{ base: "56px", md: "88px" }}
        textAlign="center"
      >
        <Reveal>
          <H2
            color={BRAND_COLORS.white}
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="800"
            lineHeight="1.15"
            maxW="760px"
            mx="auto"
            css={{ overflowWrap: "anywhere" }}
          >
            Take the first gentle step today
          </H2>
          <Body
            color={`${BRAND_COLORS.white}E6`}
            fontSize={{ base: "md", md: "lg" }}
            mt={STANDARD_SPACING.sm}
            maxW="600px"
            mx="auto"
          >
            Start your application online and explore our plans at your own pace.
          </Body>

          <Flex
            mt={STANDARD_SPACING.lg}
            gap={STANDARD_SPACING.sm}
            direction={{ base: "column", sm: "row" }}
            justify="center"
            align="center"
            wrap="wrap"
          >
            {/* Primary — solid white, high contrast on the green band */}
            <Button
              onClick={() => router.push("/plans")}
              w={{ base: "100%", sm: "auto" }}
              minW={{ sm: "224px" }}
              h="54px"
              px="32px"
              borderRadius={STANDARD_RADIUS.full}
              bg={BRAND_COLORS.white}
              color={BRAND_COLORS.darkGreen}
              fontWeight="800"
              fontSize="md"
              gap="8px"
              whiteSpace="nowrap"
              boxShadow={STANDARD_SHADOWS.level2}
              transition="transform 0.2s ease, background 0.2s ease"
              _hover={{
                bg: BRAND_COLORS.successBg,
                transform: "translateY(-2px)",
              }}
              _active={{ transform: "translateY(0)" }}
              _focusVisible={{
                outline: "none",
                boxShadow: `0 0 0 3px ${BRAND_COLORS.white}`,
              }}
            >
              Start an Application
              <Icon as={FiArrowRight} boxSize="18px" />
            </Button>
          </Flex>
        </Reveal>
      </Box>
    </Box>
  );
}
