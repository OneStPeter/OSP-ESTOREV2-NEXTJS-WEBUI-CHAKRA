"use client";

/* =============================================================================
 * UPDATED LANDING PAGE (V2)
 * A modern, dignified landing experience for the St. Peter eStore.
 *
 * This is an ALTERNATE landing page — the original lives in app/sections/* and
 * is still wired to app/page.tsx. Preview this one at the /landing-v2 route.
 *
 * Sections: Hero · Company background · Plans showcase · Testimonials · Closing CTA
 *
 * Data: `groupedPlans` is passed in from the server route (see
 * app/landing-v2/page.tsx), which uses the existing ProductService pattern.
 * Stats and testimonials below are PLACEHOLDERS — replace with real values.
 * ========================================================================== */

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Grid,
  Icon,
  Text,
} from "@chakra-ui/react";
import {
  H1,
  H2,
  Body,
  Small,
  PrimaryMdButton,
  SecondaryMdButton,
} from "st-peter-ui";
import {
  FiArrowRight,
  FiShield,
  FiHeart,
  FiCreditCard,
  FiUsers,
  FiMapPin,
  FiClock,
  FiPhone,
} from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";
import { PAGE_PADDING } from "@/lib/theme/layout-tokens";

import ProductCard from "@/components/ui/card";
import ComparisonBanner from "@/components/ui/comparison-banner";
import Error from "@/components/ui/error";
import Testimonials, {
  type TestimonialItem,
} from "@/components/ui/testimonials";

/* A grouped plan card (one entry per plan, with its available terms). */
export type GroupedPlan = {
  planDesc: string;
  casketDesc: string;
  img: string;
  terms: { planTerm?: number; price?: number }[];
};

/* Subscribes to the prefers-reduced-motion media query (SSR-safe). */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/* -----------------------------------------------------------------------------
 * Reveal — lightweight scroll-in animation that respects prefers-reduced-motion.
 * -------------------------------------------------------------------------- */
function Reveal({
  children,
  y = 18,
  delay = 0,
}: {
  children: React.ReactNode;
  y?: number;
  delay?: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const animate = !usePrefersReducedMotion();

  return (
    <Box
      ref={ref}
      opacity={animate ? (inView ? 1 : 0) : 1}
      transform={animate ? (inView ? "none" : `translateY(${y}px)`) : "none"}
      transition={
        animate
          ? `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`
          : undefined
      }
      willChange="opacity, transform"
    >
      {children}
    </Box>
  );
}

/* Signature gold divider motif used across sections. */
function GoldDivider({ mx = "0" }: { mx?: string }) {
  return (
    <Box
      h="4px"
      w="72px"
      mx={mx}
      borderRadius={STANDARD_RADIUS.full}
      bg={`linear-gradient(90deg, ${BRAND_COLORS.gold}, ${BRAND_COLORS.brightGold})`}
    />
  );
}

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

export default function LandingV2({
  groupedPlans,
}: {
  groupedPlans: GroupedPlan[];
}) {
  const router = useRouter();

  // Compare flow (subtle entry point) — mirrors the product landing behavior.
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);

  const toggleCompare = (planDesc: string) => {
    setCompareList((prev) =>
      prev.includes(planDesc)
        ? prev.filter((p) => p !== planDesc)
        : [...prev, planDesc],
    );
  };

  useEffect(() => {
    if (!showAlert) return;
    alertRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    const timer = setTimeout(() => setShowAlert(false), 3000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  // Show the first few plans on the landing page.
  // TODO: to split Life vs. Cremation, filter by productCode ("LP" vs "CP")
  // upstream in the server route before grouping.
  const featuredPlans = useMemo(() => groupedPlans.slice(0, 3), [groupedPlans]);
  const planAccentColors = ["#F7EFE5", "#DFF5FB", "#FFE1E6"];

  const sectionPx = {
    base: PAGE_PADDING.base,
    md: PAGE_PADDING.lg,
    xl: "64px",
  };

  return (
    <Box as="main" bg={BRAND_COLORS.white} overflowX="hidden">
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

      {/* ===================================================================
       * 1 · HERO
       * ================================================================ */}
      <Box
        as="section"
        aria-label="Welcome"
        position="relative"
        // Fill the visible viewport so the hero is the only section on load.
        // base/md: minus the 65px in-flow AppHeader. lg: full height (the
        // navbar floats over the top, so content is padded/centered to clear it).
        minH={{ base: "calc(100dvh - 65px)", lg: "100dvh" }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        bg={`linear-gradient(135deg, ${BRAND_COLORS.white} 0%, ${BRAND_COLORS.lightCyan}55 50%, ${BRAND_COLORS.successBg} 100%)`}
      >
        {/* Soft layered glow — the calm background treatment. */}
        <Box
          position="absolute"
          inset={0}
          pointerEvents="none"
          bg={`radial-gradient(circle at 82% 18%, ${BRAND_COLORS.seafoamGreen}4D 0%, ${BRAND_COLORS.seafoamGreen}00 36%), radial-gradient(circle at 6% 80%, ${BRAND_COLORS.paleGold}66 0%, ${BRAND_COLORS.paleGold}00 32%)`}
        />

        <Box
          position="relative"
          w="full"
          maxW="7xl"
          mx="auto"
          px={sectionPx}
          pt={{ base: "32px", md: "48px", lg: "150px" }}
          pb={{ base: "32px", md: "48px", lg: "80px" }}
        >
          <Grid
            templateColumns={{ base: "1fr", lg: "1.05fr 0.95fr" }}
            gap={{ base: STANDARD_SPACING.lg, lg: STANDARD_SPACING.xl }}
            alignItems="center"
          >
            {/* Copy */}
            <Box minW={0}>
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
                  >
                    Explore Plans
                    <FiArrowRight />
                  </PrimaryMdButton>
                  <SecondaryMdButton
                    onClick={() => router.push("/pay-my-plan")}
                    width="100%"
                    h="48px"
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

            {/* Visual — calm imagery in a soft layered frame (signature detail) */}
            <Box display={{ base: "none", lg: "block" }} minW={0}>
              <Reveal y={24} delay={120}>
                <Box position="relative">
                  {/* layered shape behind the image */}
                  <Box
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
                    borderRadius="36px"
                    overflow="hidden"
                    boxShadow={STANDARD_SHADOWS.level4}
                    borderWidth="1px"
                    borderColor={`${BRAND_COLORS.white}CC`}
                    aspectRatio={16 / 12}
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
        </Box>
      </Box>

      {/* ===================================================================
       * 2 · COMPANY BACKGROUND
       * ================================================================ */}
      <Box as="section" aria-label="About St. Peter" bg={BRAND_COLORS.white}>
        <Box
          maxW="7xl"
          mx="auto"
          px={sectionPx}
          py={{ base: "48px", md: "80px" }}
        >
          <Reveal>
            <Flex
              direction="column"
              align="center"
              textAlign="center"
              gap="12px"
            >
              <Small
                fontWeight="800"
                letterSpacing="0.08em"
                textTransform="uppercase"
                color={BRAND_COLORS.darkGreen}
              >
                Who We Are
              </Small>
              <H2
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="800"
                lineHeight="1.15"
                color={BRAND_COLORS.neutralText}
                maxW="720px"
              >
                A trusted name in compassionate memorial care
              </H2>
              <GoldDivider mx="auto" />
              <Body color={BRAND_COLORS.grey} maxW="680px">
                For decades, St. Peter Life Plan has walked alongside Filipino
                families providing dignified memorial services and affordable,
                insurance-backed plans. Our promise is simple: to make planning
                ahead a gentle, reassuring step you take out of love.
                {/* TODO: replace with finalized company copy. */}
              </Body>
            </Flex>
          </Reveal>

          {/* Proof points */}
          <Reveal delay={120}>
            <SimpleGrid
              columns={{ base: 2, md: 4 }}
              gap={{ base: 4, md: 6 }}
              mt={{ base: "32px", md: "48px" }}
            >
              {companyStats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </SimpleGrid>
          </Reveal>
        </Box>
      </Box>

      {/* ===================================================================
       * 3 · PLANS SHOWCASE
       * ================================================================ */}
      <Box
        as="section"
        aria-label="Our plans"
        bg={`linear-gradient(180deg, ${BRAND_COLORS.subtleBg} 0%, ${BRAND_COLORS.white} 100%)`}
      >
        <Box
          maxW="7xl"
          mx="auto"
          px={sectionPx}
          py={{ base: "48px", md: "80px" }}
        >
          <Reveal>
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align={{ base: "flex-end", md: "flex-end" }}
              gap={STANDARD_SPACING.sm}
              mb={{ base: "28px", md: "40px" }}
            >
              <Box>
                <Small
                  fontWeight="800"
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                  color={BRAND_COLORS.darkGreen}
                >
                  Life &amp; Cremation Plans
                </Small>
                <H2
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight="800"
                  lineHeight="1.15"
                  color={BRAND_COLORS.neutralText}
                  mt="6px"
                >
                  Find the plan that fits your family
                </H2>
                <Box mt="12px">
                  <GoldDivider />
                </Box>
              </Box>

              {/* Subtle compare entry point */}
              <SecondaryMdButton onClick={() => router.push("/plans")} h="44px">
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

      {/* ===================================================================
       * 4 · TESTIMONIALS
       * ================================================================ */}
      <Box as="section" aria-label="Planholder stories" bg={BRAND_COLORS.white}>
        <Box
          maxW="7xl"
          mx="auto"
          px={sectionPx}
          py={{ base: "48px", md: "80px" }}
        >
          <Reveal>
            <Flex
              direction="column"
              align="center"
              textAlign="center"
              gap="12px"
            >
              <Small
                fontWeight="800"
                letterSpacing="0.08em"
                textTransform="uppercase"
                color={BRAND_COLORS.darkGreen}
              >
                Stories of Trust
              </Small>
              <H2
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="800"
                lineHeight="1.15"
                color={BRAND_COLORS.neutralText}
              >
                Families who planned with peace of mind
              </H2>
              <GoldDivider mx="auto" />
            </Flex>
          </Reveal>

          <Reveal delay={120}>
            <Flex justify="center" mt={{ base: "32px", md: "48px" }}>
              {/* Reuses the shared Testimonials grid component. */}
              <Testimonials testimonials={testimonials} />
            </Flex>
          </Reveal>
        </Box>
      </Box>

      {/* ===================================================================
       * 5 · CLOSING CTA BAND (arched top — signature shape)
       * ================================================================ */}
      <Box
        as="section"
        aria-label="Get started"
        position="relative"
        mt={{ base: "24px", md: "40px" }}
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
          px={sectionPx}
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
              Start your application online and explore our plans at your own
              pace.
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
              >
                Start an Application
                <Icon as={FiArrowRight} boxSize="18px" />
              </Button>

              {/* Secondary — clear outline, readable on green */}
              {/* <Button
                onClick={() => router.push("/contact-us")}
                w={{ base: "100%", sm: "auto" }}
                minW={{ sm: "224px" }}
                h="54px"
                px="32px"
                borderRadius={STANDARD_RADIUS.full}
                variant="outline"
                bg="transparent"
                color={BRAND_COLORS.white}
                borderWidth="1.5px"
                borderColor={BRAND_COLORS.white}
                fontWeight="700"
                fontSize="md"
                gap="8px"
                whiteSpace="nowrap"
                transition="background 0.2s ease"
                _hover={{ bg: `${BRAND_COLORS.white}26` }}
                _active={{ bg: `${BRAND_COLORS.white}1A` }}
              >
                <Icon as={FiPhone} boxSize="17px" />
                Talk to a Representative
              </Button> */}
            </Flex>
          </Reveal>
        </Box>
      </Box>

      {/* Compare banner (appears when plans are selected above). */}
      <ComparisonBanner
        compareList={compareList}
        setCompareList={setCompareList}
        setShowAlert={setShowAlert}
      />
    </Box>
  );
}

/* -----------------------------------------------------------------------------
 * StatCard — animated proof-point used in the company section.
 * -------------------------------------------------------------------------- */
function StatCard({
  icon,
  value,
  suffix,
  label,
}: {
  icon: React.ElementType;
  value: number;
  suffix?: string;
  label: string;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <Box
      ref={ref}
      p={{ base: 4, md: 6 }}
      bg={BRAND_COLORS.white}
      borderRadius={STANDARD_RADIUS.xl}
      borderWidth="1px"
      borderColor={BRAND_COLORS.neutralBorder}
      boxShadow={STANDARD_SHADOWS.level1}
      textAlign="center"
    >
      <Box
        boxSize="44px"
        mx="auto"
        mb="12px"
        borderRadius={STANDARD_RADIUS.md}
        bg={BRAND_COLORS.successBg}
        color={BRAND_COLORS.darkGreen}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Icon as={icon} boxSize="22px" />
      </Box>
      <Text
        fontSize={{ base: "2xl", md: "4xl" }}
        fontWeight="800"
        lineHeight="1"
        color={BRAND_COLORS.darkGreen}
      >
        {inView ? <CountUp start={0} end={value} duration={2} /> : 0}
        {suffix}
      </Text>
      <Small color={BRAND_COLORS.grey} fontWeight="600">
        {label}
      </Small>
    </Box>
  );
}
