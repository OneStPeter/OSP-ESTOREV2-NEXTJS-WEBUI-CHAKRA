"use client";

import { useRouter } from "next/navigation";
import {
  Box,
  Flex,
  Grid,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { H1, Body, Small, PrimaryMdButton, SecondaryMdButton } from "st-peter-ui";
import {
  FiArrowRight,
  FiShield,
  FiHeart,
  FiCreditCard,
  FiUsers,
  FiMapPin,
  FiClock,
} from "react-icons/fi";

import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";

import Reveal from "../shared/reveal";
import { SECTION_PX } from "../shared/section-tokens";
import StatRibbonItem from "./stat-ribbon-item";

/* -----------------------------------------------------------------------------
 * PLACEHOLDER CONTENT — replace with real copy / verified figures.
 * -------------------------------------------------------------------------- */
const heroHighlights = [
  { icon: FiShield, label: "Trust and security guaranteed" },
  { icon: FiCreditCard, label: "Affordable monthly plans" },
  { icon: FiHeart, label: "Peace of mind for loved ones" },
];

// TODO: confirm these figures with the business before launch.
const companyStats = [
  { icon: FiClock, value: 45, suffix: "+", label: "Years of service" },
  { icon: FiUsers, value: 1, suffix: "M+", label: "Filipino planholders" },
  { icon: FiMapPin, value: 200, suffix: "+", label: "Branches nationwide" },
  { icon: FiHeart, value: 280, suffix: "+", label: "Chapels" },
];

/* -----------------------------------------------------------------------------
 * Hero — editorial split layout with an anchored stat ribbon at its base.
 * -------------------------------------------------------------------------- */
export default function Hero() {
  const router = useRouter();

  return (
    <Box
      as="section"
      aria-label="Welcome"
      position="relative"
      bg={`linear-gradient(160deg, ${BRAND_COLORS.successBg}CC 0%, ${BRAND_COLORS.white} 44%, ${BRAND_COLORS.lightCyan}44 100%)`}
    >
      {/* Soft layered glow — the calm background treatment. */}
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        bg={`radial-gradient(circle at 82% 16%, ${BRAND_COLORS.seafoamGreen}4D 0%, ${BRAND_COLORS.seafoamGreen}00 34%), radial-gradient(circle at 4% 82%, ${BRAND_COLORS.paleGold}66 0%, ${BRAND_COLORS.paleGold}00 30%)`}
      />

      <Box
        position="relative"
        w="full"
        maxW="7xl"
        mx="auto"
        px={SECTION_PX}
        pt={{ base: "32px", md: "56px", lg: "140px" }}
        pb={{ base: "40px", md: "64px", lg: "88px" }}
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "1.05fr 0.95fr" }}
          gap={{ base: STANDARD_SPACING.lg, lg: STANDARD_SPACING.xl }}
          alignItems="center"
        >
          {/* Copy */}
          <Box minW={0} order={{ base: 2, lg: 1 }}>
            <Reveal>
              <Flex
                display="inline-flex"
                align="center"
                gap="8px"
                px="12px"
                py="6px"
                borderRadius={STANDARD_RADIUS.full}
                bg={`${BRAND_COLORS.white}CC`}
                borderWidth="1px"
                borderColor={BRAND_COLORS.neutralBorder}
                mb={STANDARD_SPACING.sm}
              >
                <Icon as={FiShield} color={BRAND_COLORS.primaryGreen} />
                <Small fontWeight="700" color={BRAND_COLORS.neutralText}>
                  Trusted by Filipino families since 1980
                </Small>
              </Flex>
            </Reveal>

            <Reveal delay={60}>
              <H1
                mt={0}
                color={BRAND_COLORS.neutralText}
                fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
                lineHeight={{ base: "1.15", lg: "1.08" }}
                fontWeight="800"
                maxW="640px"
                css={{ overflowWrap: "anywhere" }}
              >
                Plan ahead today, so your family finds{" "}
                <Box as="span" color={BRAND_COLORS.primaryGreen}>
                  peace of mind tomorrow
                </Box>
                .
              </H1>
            </Reveal>

            <Reveal delay={120}>
              <Body
                mt={STANDARD_SPACING.sm}
                color={BRAND_COLORS.grey}
                fontSize={{ base: "md", md: "lg" }}
                maxW="560px"
              >
                Secure a life plan or cremation plan with flexible terms and
                spare your loved ones difficult decisions and costs when it
                matters most.
              </Body>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={180}>
              <Flex
                mt={STANDARD_SPACING.md}
                gap={STANDARD_SPACING.sm}
                direction={{ base: "column", sm: "row" }}
                maxW={{ base: "100%", sm: "440px" }}
              >
                <PrimaryMdButton
                  onClick={() => router.push("/plans")}
                  width="100%"
                  h="48px"
                  whiteSpace="nowrap"
                >
                  Explore Plans
                  <FiArrowRight />
                </PrimaryMdButton>
                <SecondaryMdButton
                  onClick={() => router.push("/pay-my-plan")}
                  width="100%"
                  h="48px"
                  whiteSpace="nowrap"
                >
                  Pay My Plan
                </SecondaryMdButton>
              </Flex>
            </Reveal>

            {/* Trust highlights */}
            <Reveal delay={240}>
              <Flex
                mt={STANDARD_SPACING.lg}
                gap={STANDARD_SPACING.md}
                wrap="wrap"
              >
                {heroHighlights.map((h) => (
                  <Flex key={h.label} align="center" gap="8px">
                    <Box
                      boxSize="32px"
                      borderRadius={STANDARD_RADIUS.md}
                      bg={BRAND_COLORS.successBg}
                      color={BRAND_COLORS.darkGreen}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <Icon as={h.icon} boxSize="16px" />
                    </Box>
                    <Small fontWeight="700" color={BRAND_COLORS.neutralText}>
                      {h.label}
                    </Small>
                  </Flex>
                ))}
              </Flex>
            </Reveal>
          </Box>

          {/* Visual — calm imagery in a soft layered frame (signature detail).
           * Renders on ALL breakpoints now: a tall panel on desktop, a compact
           * banner that leads the hero on mobile/tablet. */}
          <Box minW={0} order={{ base: 1, lg: 2 }}>
            <Reveal y={24} delay={120}>
              <Box position="relative">
                {/* layered shape behind the image (desktop only) */}
                <Box
                  display={{ base: "none", lg: "block" }}
                  position="absolute"
                  inset="-16px -16px auto auto"
                  w="70%"
                  h="70%"
                  borderRadius="36px"
                  bg={`${BRAND_COLORS.softGreen}66`}
                  transform="rotate(6deg)"
                />
                <Box
                  position="relative"
                  borderRadius={{ base: "20px", lg: "36px" }}
                  overflow="hidden"
                  boxShadow={STANDARD_SHADOWS.level4}
                  borderWidth="1px"
                  borderColor={`${BRAND_COLORS.white}CC`}
                  aspectRatio={{ base: 16 / 9, lg: 16 / 12 }}
                  bg={BRAND_COLORS.mutedBg}
                  backgroundImage="url('/images/hero-bg.jpg')"
                  backgroundSize="cover"
                  backgroundPosition="center"
                  role="img"
                  aria-label="A peaceful memorial garden"
                >
                  <Box
                    position="absolute"
                    inset={0}
                    bg={`linear-gradient(180deg, ${BRAND_COLORS.black}00 45%, ${BRAND_COLORS.black}26 100%)`}
                  />
                </Box>
              </Box>
            </Reveal>
          </Box>
        </Grid>

        {/* Anchored stat ribbon — the hero's signature base element.
         * 2×2 on mobile, single row on desktop; sits on an elevated card. */}
        <Reveal delay={200}>
          <Box
            mt={{ base: STANDARD_SPACING.lg, lg: "64px" }}
            bg={`${BRAND_COLORS.white}F2`}
            borderWidth="1px"
            borderColor={BRAND_COLORS.neutralBorder}
            borderRadius={STANDARD_RADIUS.xl}
            boxShadow={STANDARD_SHADOWS.level2}
            px={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.lg }}
            py={{ base: STANDARD_SPACING.md, md: STANDARD_SPACING.lg }}
          >
            <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: 4, md: 6 }}>
              {companyStats.map((stat, index) => (
                <StatRibbonItem
                  key={stat.label}
                  {...stat}
                  showDivider={index > 0}
                />
              ))}
            </SimpleGrid>
          </Box>
        </Reveal>
      </Box>
    </Box>
  );
}
