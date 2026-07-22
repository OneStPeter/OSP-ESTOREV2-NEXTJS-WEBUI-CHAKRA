import React from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  VStack,
  Link,
  Text,
  Heading,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";

/* On-green surface colors — derived from the brand palette so the footer
 * reads as part of the same system as the landing CTA band. */
const LINK_REST = "rgba(255,255,255,0.72)";
const TEXT_MUTED = "rgba(255,255,255,0.80)";
const HAIRLINE = "rgba(255,255,255,0.14)";
const GOLD_BAR = `linear-gradient(90deg, ${BRAND_COLORS.gold}, ${BRAND_COLORS.brightGold})`;

type FooterLink = { label: string; href: string };

const linkColumns: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Products",
    links: [
      { label: "Traditional Plans", href: "/plans" },
      { label: "Cremation Plans", href: "/plans" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Our Company", href: "/about-us" },
      { label: "Our Officers", href: "/about-us" },
      { label: "News & Updates", href: "/news-updates" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Manage Account", href: "/account" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "FAQs", href: "#" },
      { label: "eStore Guide", href: "#" },
      { label: "Directory", href: "#" },
      { label: "Gallery", href: "#" },
    ],
  },
];

const socials: { label: string; icon: React.ElementType; href: string }[] = [
  { label: "Facebook", icon: FaFacebook, href: "#" },
  { label: "Instagram", icon: FaInstagram, href: "#" },
  { label: "X (Twitter)", icon: FaXTwitter, href: "#" },
];

const legalLinks: FooterLink[] = [
  { label: "Terms of Use", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

/* A single footer navigation link — real anchor with hover + focus states. */
function FooterNavLink({ label, href }: FooterLink) {
  return (
    <Link
      href={href}
      display="inline-block"
      w="fit-content"
      fontSize="sm"
      color={LINK_REST}
      textDecoration="none"
      transition="color 0.18s ease, transform 0.18s ease"
      _hover={{
        color: BRAND_COLORS.softGreen,
        textDecoration: "none",
        transform: "translateX(2px)",
      }}
      _focusVisible={{
        outline: "2px solid",
        outlineColor: BRAND_COLORS.brightGold,
        outlineOffset: "3px",
        borderRadius: STANDARD_RADIUS.sm,
      }}
    >
      {label}
    </Link>
  );
}

/* Small circular social button. */
function SocialLink({
  label,
  icon: Icon,
  href,
}: {
  label: string;
  icon: React.ElementType;
  href: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxSize="40px"
      borderRadius={STANDARD_RADIUS.full}
      color="white"
      borderWidth="1px"
      borderColor={HAIRLINE}
      bg="rgba(255,255,255,0.04)"
      transition="background 0.18s ease, border-color 0.18s ease, transform 0.18s ease"
      _hover={{
        bg: "rgba(255,255,255,0.12)",
        borderColor: BRAND_COLORS.softGreen,
        transform: "translateY(-2px)",
      }}
      _focusVisible={{
        outline: "2px solid",
        outlineColor: BRAND_COLORS.brightGold,
        outlineOffset: "2px",
      }}
    >
      <Icon size={18} />
    </Link>
  );
}

/* A column heading (eyebrow style, consistent across every group). */
function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <Text
      fontSize="xs"
      fontWeight="800"
      letterSpacing="0.1em"
      textTransform="uppercase"
      color="white"
      mb={STANDARD_SPACING.xs}
    >
      {children}
    </Text>
  );
}

const Footer = () => {
  return (
    <Box
      as="footer"
      // Desktop only — hidden on mobile and tablet (below the `lg` breakpoint,
      // which is the app's desktop cutoff: navbar shows / sidebar hides at lg).
      display={{ base: "none", lg: "block" }}
      color="white"
      bg={`linear-gradient(180deg, ${BRAND_COLORS.darkGreen} 0%, ${BRAND_COLORS.primaryGreen} 160%)`}
    >
      {/* Signature gold top rule — ties into the landing GoldDivider motif and
       * cleanly separates the footer from the green section above it. */}
      {/* <Box h="3px" w="full" bg={GOLD_BAR} /> */}

      <Box
        maxW="7xl"
        mx="auto"
        w="full"
        px={{ lg: "48px", xl: "64px" }}
        pt={STANDARD_SPACING.section}
        pb={STANDARD_SPACING.lg}
      >
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(3, 1fr)",
            lg: "1.7fr 1fr 1fr 1.2fr 1.5fr",
          }}
          gap={{ base: STANDARD_SPACING.lg, lg: STANDARD_SPACING.xl }}
        >
          {/* Brand identity block */}
          <GridItem gridColumn={{ md: "1 / -1", lg: "auto" }}>
            <VStack align="start" gap={STANDARD_SPACING.md}>
              <VStack align="start" gap="12px">
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="800"
                  lineHeight="1.2"
                  letterSpacing="-0.01em"
                  color="white"
                >
                  ST. PETER LIFE PLAN, INC
                </Heading>
                {/* <Box
                    h="3px"
                    w="56px"
                    borderRadius={STANDARD_RADIUS.full}
                    bg={GOLD_BAR}
                  /> */}
              </VStack>

              <Text fontSize="sm" color={TEXT_MUTED} maxW="280px">
                Compassionate, insurance-backed memorial care for Filipino
                families since 1980.
              </Text>

              <HStack gap="12px" pt={STANDARD_SPACING.xs}>
                {socials.map((s) => (
                  <SocialLink key={s.label} {...s} />
                ))}
              </HStack>
            </VStack>
          </GridItem>

          {/* Navigation columns */}
          {linkColumns.map((col) => (
            <GridItem key={col.heading}>
              <ColumnHeading>{col.heading}</ColumnHeading>
              <VStack align="start" gap="10px">
                {col.links.map((link) => (
                  <FooterNavLink key={link.label} {...link} />
                ))}
              </VStack>
            </GridItem>
          ))}

          {/* Contact block */}
          <GridItem>
            <ColumnHeading>Get in Touch</ColumnHeading>
            <VStack as="address" align="start" gap={STANDARD_SPACING.sm}>
              <Text
                fontSize="sm"
                color={TEXT_MUTED}
                fontStyle="normal"
                maxW="240px"
              >
                St. Peter Corporate Center, 999 EDSA, Quezon City 1105
              </Text>
              <VStack align="start" gap="6px">
                {["+63 2 8371-9999", "+63 2 7946-9999", "+63 919-056-9999"].map(
                  (phone) => (
                    <Link
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      fontSize="sm"
                      fontStyle="normal"
                      color={LINK_REST}
                      textDecoration="none"
                      transition="color 0.18s ease"
                      _hover={{ color: BRAND_COLORS.softGreen }}
                      _focusVisible={{
                        outline: "2px solid",
                        outlineColor: BRAND_COLORS.brightGold,
                        outlineOffset: "3px",
                        borderRadius: STANDARD_RADIUS.sm,
                      }}
                    >
                      {phone}
                    </Link>
                  ),
                )}
              </VStack>
            </VStack>
          </GridItem>
        </Grid>

        {/* Bottom bar — copyright + legal */}
        <Flex
          mt={STANDARD_SPACING.section}
          pt={STANDARD_SPACING.md}
          borderTopWidth="1px"
          borderColor={HAIRLINE}
          justify="space-between"
          align="center"
          gap={STANDARD_SPACING.md}
          wrap="wrap"
        >
          <Text fontSize="xs" color={LINK_REST}>
            © {new Date().getFullYear()} St. Peter Group. All rights reserved.
          </Text>
          <HStack gap={STANDARD_SPACING.md}>
            {legalLinks.map((link) => (
              <FooterNavLink key={link.label} {...link} />
            ))}
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;
