"use client";

import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import NextImage from "next/image";
import {
  PAGE_PADDING,
  RESPONSIVE_LAYOUT_TOKENS,
  SECTION_GAP,
} from "@/lib/theme/layout-tokens";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SIZES,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";
import { Icon, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FiCreditCard, FiGitBranch, FiShield } from "react-icons/fi";
import {
  Body,
  Box,
  H1,
  PrimaryMdButton,
  SecondaryMdButton,
  Small,
} from "st-peter-ui";

const planHighlights = [
  "Flexible payment terms",
  "Transferable ownership",
  "Family-first protection",
  "Affordable life plan options",
  "Easy plan comparison",
  "Convenient payment access",
  "Online application support",
  "Memorial service assistance",
];

const planReasons = [
  {
    title: "Start with flexible terms",
    text: "Choose the payment setup that fits your family budget.",
  },
  {
    title: "Compare before you decide",
    text: "Review plan options and benefits before moving forward.",
  },
  {
    title: "Manage payments online",
    text: "Pay your plan and continue your journey in one place.",
  },
];

export default function Hero() {
  const router = useRouter();
  const scrollingHighlights = [...planHighlights, ...planHighlights];
  const reasonIcons = [FiGitBranch, FiShield, FiCreditCard];

  return (
    <Box
      as="section"
      position="relative"
      minH="100dvh"
      bg={`linear-gradient(135deg, ${BRAND_COLORS.white} 0%, ${BRAND_COLORS.lightCyan}66 48%, ${BRAND_COLORS.successBg} 100%)`}
      overflowX="hidden"
      overflowY="visible"
    >
      <Box
        position="absolute"
        inset={0}
        bg={`radial-gradient(circle at 84% 16%, ${BRAND_COLORS.seafoamGreen}66 0%, ${BRAND_COLORS.seafoamGreen}00 34%), radial-gradient(circle at 8% 76%, ${BRAND_COLORS.paleGold}80 0%, ${BRAND_COLORS.paleGold}00 30%)`}
        pointerEvents="none"
      />

      <Box
        position="relative"
        zIndex={1}
        w="100%"
        maxW={RESPONSIVE_LAYOUT_TOKENS.grid.desktop.contentMaxWidth}
        minH="100dvh"
        mx="auto"
        px={PAGE_PADDING}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        pt={{
          base: `calc(${STANDARD_SPACING.xl} + ${RESPONSIVE_LAYOUT_TOKENS.navigationOffset.md})`,
          md: `calc(${STANDARD_SPACING.section} + ${RESPONSIVE_LAYOUT_TOKENS.navigationOffset.lg})`,
          lg: `calc(${STANDARD_SPACING.section} + ${STANDARD_SPACING.md})`,
        }}
        pb={{
          base: STANDARD_SPACING.xl,
          md: SECTION_GAP.md,
          lg: SECTION_GAP.lg,
        }}
      >
        <Box
          display="grid"
          gridTemplateColumns={{
            base: "1fr",
            lg: "minmax(0, 0.9fr) minmax(420px, 1fr)",
          }}
          gap={{
            base: STANDARD_SPACING.lg,
            md: SECTION_GAP.md,
            lg: SECTION_GAP.lg,
          }}
          alignItems="center"
        >
          <Box
            display="flex"
            flexDirection="column"
            gap={{
              base: STANDARD_SPACING.sm,
              md: STANDARD_SPACING.lg,
              lg: STANDARD_SPACING.md,
            }}
            minW={0}
          >
            <Box maxW={{ base: "100%", lg: "640px" }}>
              <H1
                mt={0}
                color={BRAND_COLORS.neutralText}
                fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
                lineHeight={{ base: "1.2", md: "1.15", lg: "1.1" }}
                fontWeight="800"
                maxW="640px"
                overflowWrap="break-word"
                wordBreak="normal"
              >
                Para sa Magandang Kinabukasan Bawat Pilipino,
                <br />
                <Box
                  as="span"
                  textDecoration="none"
                  color={BRAND_COLORS.primaryGreen}
                >
                  Dapat may St. Peter Life Plan
                </Box>
                .
              </H1>

              <Box
                mt={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
                overflow="hidden"
                maxW={{ base: "100%", md: "560px" }}
                w="100%"
                aria-label="Plan highlights"
                position="relative"
                _before={{
                  content: '""',
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  w: STANDARD_SPACING.md,
                  zIndex: 1,
                  bg: `linear-gradient(90deg, ${BRAND_COLORS.white}, ${BRAND_COLORS.white}00)`,
                  pointerEvents: "none",
                }}
                _after={{
                  content: '""',
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: 0,
                  w: STANDARD_SPACING.md,
                  zIndex: 1,
                  bg: `linear-gradient(270deg, ${BRAND_COLORS.white}, ${BRAND_COLORS.white}00)`,
                  pointerEvents: "none",
                }}
              >
                <Box
                  display="flex"
                  gap={{ base: STANDARD_SPACING.xs, sm: STANDARD_SPACING.sm }}
                  w="max-content"
                  animation="plan-highlight-marquee 40s linear infinite"
                  _hover={{ animationPlayState: "paused" }}
                >
                  {scrollingHighlights.map((feature, index) => (
                    <Box
                      key={`${feature}-${index}`}
                      flex="0 0 auto"
                      borderWidth="1px"
                      borderColor={BRAND_COLORS.neutralBorder}
                      borderRadius={STANDARD_RADIUS.full}
                      bg={`${BRAND_COLORS.white}CC`}
                      px={STANDARD_SPACING.sm}
                      py={STANDARD_SPACING.xs}
                    >
                      <Small
                        color={BRAND_COLORS.neutralText}
                        fontWeight="700"
                        fontSize="xs"
                      >
                        {feature}
                      </Small>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box
                mt={{ base: STANDARD_SPACING.md, md: STANDARD_SPACING.lg }}
                gridTemplateColumns={{
                  base: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                }}
                display="grid"
                gap={{ base: STANDARD_SPACING.sm, sm: STANDARD_SPACING.sm }}
                alignItems="center"
                maxW={{ base: "100%", sm: "400px" }}
                w="100%"
                minW={0}
              >
                <SecondaryMdButton
                  onClick={() => router.push("/pay-my-plan")}
                  width="100%"
                  h={{
                    base: STANDARD_SIZES.button.md.height,
                    md: STANDARD_SIZES.button.lg.height,
                  }}
                  px={{ base: STANDARD_SPACING.sm, sm: STANDARD_SPACING.md }}
                >
                  PAY MY PLAN
                </SecondaryMdButton>

                <PrimaryMdButton
                  onClick={() => router.push("/plans")}
                  width="100%"
                  h={{
                    base: STANDARD_SIZES.button.md.height,
                    md: STANDARD_SIZES.button.lg.height,
                  }}
                  px={{ base: STANDARD_SPACING.sm, sm: STANDARD_SPACING.md }}
                >
                  BUY NOW
                </PrimaryMdButton>
              </Box>
            </Box>
          </Box>

          <Box minW={0}>
            <Box
              display={{ base: "none", md: "block" }}
              position="relative"
              borderRadius={{
                base: STANDARD_RADIUS.xl,
                md: "28px",
                lg: "36px",
              }}
              overflow="hidden"
              minH={{ base: "260px", sm: "320px", md: "420px", lg: "560px" }}
              boxShadow={STANDARD_SHADOWS.level4}
              borderWidth="1px"
              borderColor={`${BRAND_COLORS.white}CC`}
              bg={BRAND_COLORS.mutedBg}
            >
              <Box
                display={{ base: "none", md: "block" }}
                position="absolute"
                inset={0}
                w="100%"
                h="100%"
              >
                <NextImage
                  src="/images/hero-bg.jpg"
                  alt=""
                  fill
                  priority
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </Box>
              <Box
                position="absolute"
                inset={0}
                bg={`linear-gradient(180deg, ${BRAND_COLORS.black}00 40%, ${BRAND_COLORS.black}26 100%)`}
              />
            </Box>
          </Box>
        </Box>

        <Box
          mt={{
            base: STANDARD_SPACING.md,
            md: STANDARD_SPACING.lg,
            lg: STANDARD_SPACING.lg,
          }}
          bg={BRAND_COLORS.white}
          borderRadius={{
            base: STANDARD_RADIUS.lg,
            md: STANDARD_RADIUS.xl,
          }}
          boxShadow={STANDARD_SHADOWS.level3}
          borderWidth="1px"
          borderColor={BRAND_COLORS.neutralBorder}
          p={{
            base: STANDARD_SPACING.sm,
            md: STANDARD_SPACING.md,
          }}
          display="grid"
          gridTemplateColumns={{
            base: "1fr",
            md: "repeat(3, minmax(0, 1fr))",
          }}
          gap={{ base: STANDARD_SPACING.sm, md: 0 }}
          position="relative"
          zIndex={2}
        >
          {planReasons.map((reason, index) => (
            <Box
              key={reason.title}
              display="grid"
              gridTemplateColumns="40px minmax(0, 1fr)"
              gap={STANDARD_SPACING.sm}
              alignItems="center"
              borderLeftWidth={{
                base: 0,
                md: index === 0 ? 0 : "1px",
              }}
              borderTopWidth={{
                base: index === 0 ? 0 : "1px",
                md: 0,
              }}
              borderColor={BRAND_COLORS.neutralBorder}
              pt={{
                base: index === 0 ? 0 : STANDARD_SPACING.sm,
                md: 0,
              }}
              pl={{
                base: 0,
                md: index === 0 ? 0 : STANDARD_SPACING.md,
              }}
            >
              <Box
                boxSize="40px"
                borderRadius={STANDARD_RADIUS.md}
                bg={BRAND_COLORS.neutralText}
                color={BRAND_COLORS.white}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <Icon as={reasonIcons[index] ?? FiShield} boxSize="20px" />
              </Box>

              <Box minW={0}>
                <Small color={BRAND_COLORS.neutralText} fontWeight="800">
                  {reason.title}
                </Small>

                <Body
                  mt="2px"
                  color={BRAND_COLORS.grey}
                  fontSize="xs"
                  lineHeight="1.45"
                >
                  {reason.text}
                </Body>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <style>{`
        @keyframes plan-highlight-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </Box>
  );
}
