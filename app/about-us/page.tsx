"use client";

import Container from "@/components/ui/container";
import {
  Badge,
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import {
  FaBullseye,
  FaQuoteLeft,
  FaRegEye,
  FaUniversity,
} from "react-icons/fa";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";

const INTRO_PARAGRAPHS = [
  "St. Peter Life Plan, Inc. is a Pre-Need DeathCare company that offers affordable traditional memorial life plans to all segments of society. Since 1970, it has maintained its leadership and excelled in its role as DeathCare experts through the continuous development of its wide range of memorial products and services attuned to the changing needs of Philippine society.",
  "St. Peter Life Plan has several branches in key cities and municipalities nationwide. It is supported by the largest network of memorial chapels in the country. ",
];

const BANKING_PARTNERS = [
  "BPI",
  "BDO",
  "Metrobank (MBTC)",
  "UCPB",
  "RCBC",
  "UnionBank (UBP)",
  "Security Bank (SBTC)",
];

const VISION_MISSION = [
  {
    icon: FaRegEye,
    label: "Our Vision",
    text: "The St. Peter Group of Companies are DeathCare Experts the choice of every Filipino in the delivery of world-class DeathCare services, and a progressive partner in nation building.",
  },
  {
    icon: FaBullseye,
    label: "Our Mission",
    text: "As DeathCare Experts and responsible citizens, we commit to improve the quality of life of St. Peterians, our stakeholders, and the Filipino people. Unlad d' Bayan!",
  },
];

const CORE_VALUES = [
  {
    letter: "G",
    title: "God Centeredness",
    desc: "We anchor our service in faith, compassion, and respect for life.",
  },
  {
    letter: "E",
    title: "Excellence",
    desc: "We pursue the highest standards in every product and service.",
  },
  {
    letter: "T",
    title: "Teamwork",
    desc: "We achieve more by working together as one St. Peter family.",
  },
  {
    letter: "I",
    title: "Integrity",
    desc: "We act with honesty, transparency, and accountability.",
  },
  {
    letter: "C",
    title: "Customer Satisfaction",
    desc: "We put the needs and trust of our planholders first.",
  },
  {
    letter: "E",
    title: "Every St. Peterian's Welfare",
    desc: "We care for the growth and well-being of our people.",
  },
  {
    letter: "P",
    title: "Professionalism",
    desc: "We deliver dependable, world-class DeathCare with heart.",
  },
];

const SectionHeading = ({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) => (
  <VStack align="start" gap="6px" mb={STANDARD_SPACING.md}>
    {eyebrow && (
      <Text
        fontSize="13px"
        fontWeight="700"
        letterSpacing="0.08em"
        textTransform="uppercase"
        color={BRAND_COLORS.primaryGreen}
      >
        {eyebrow}
      </Text>
    )}
    <Heading
      as="h2"
      fontSize={{ base: "24px", md: "30px" }}
      fontWeight="700"
      lineHeight="1.2"
      color={BRAND_COLORS.neutralText}
    >
      {title}
    </Heading>
    <Box
      w="56px"
      h="4px"
      borderRadius={STANDARD_RADIUS.full}
      bg={BRAND_COLORS.primaryGreen}
      mt="2px"
    />
  </VStack>
);

const AboutUsPage = () => {
  return (
    <Container>
      <VStack align="stretch" gap={{ base: "40px", md: "64px" }}>
        {/* Hero */}
        <Box
          position="relative"
          borderRadius={STANDARD_RADIUS.xl}
          overflow="hidden"
          minH={{ base: "300px", md: "440px" }}
          boxShadow={STANDARD_SHADOWS.level3}
        >
          <Image
            src="/images/hero-bg.jpg"
            alt="St. Peter Corporate Center"
            position="absolute"
            inset={0}
            w="full"
            h="full"
            objectFit="cover"
          />
          <Box
            position="absolute"
            inset={0}
            bg={`linear-gradient(180deg, rgba(0,104,56,0.55) 0%, rgba(0,104,56,0.82) 100%)`}
          />
          <Flex
            position="relative"
            direction="column"
            align="center"
            justify="center"
            textAlign="center"
            h="full"
            minH={{ base: "300px", md: "440px" }}
            px={{ base: STANDARD_SPACING.md, md: STANDARD_SPACING.xl }}
            py={STANDARD_SPACING.xl}
            gap={STANDARD_SPACING.sm}
          >
            <Image
              src="/images/osp-chakra-reusable-components/stpeter-logo.png"
              alt="St. Peter Life Plan"
              w={{ base: "180px", md: "220px" }}
              bg={BRAND_COLORS.white}
              borderRadius={STANDARD_RADIUS.md}
              px="18px"
              py="10px"
            />
            <Heading
              as="h1"
              color={BRAND_COLORS.white}
              fontSize={{ base: "28px", md: "44px" }}
              fontWeight="800"
              lineHeight="1.1"
              letterSpacing="-0.01em"
            >
              About St. Peter eStore
            </Heading>
            <Text
              color="rgba(255,255,255,0.92)"
              fontSize={{ base: "15px", md: "18px" }}
              maxW="640px"
              lineHeight="1.6"
            >
              DeathCare Experts since 1970 bringing affordable, world-class
              memorial life plans closer to every Filipino family.
            </Text>
          </Flex>
        </Box>

        {/* Who We Are */}
        <Box as="section">
          <SectionHeading
            eyebrow="Who We Are"
            title="A legacy of care since 1970"
          />
          <Stack gap={STANDARD_SPACING.md}>
            {INTRO_PARAGRAPHS.map((paragraph, index) => (
              <Text
                key={index}
                color={BRAND_COLORS.neutralText}
                fontSize={{ base: "15px", md: "17px" }}
                lineHeight="1.8"
              >
                {paragraph}
              </Text>
            ))}

            {/* Highlighted tagline */}
            <Flex
              align="start"
              gap={STANDARD_SPACING.sm}
              bg={BRAND_COLORS.successBg}
              borderLeft={`4px solid ${BRAND_COLORS.primaryGreen}`}
              borderRadius={STANDARD_RADIUS.md}
              p={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
              mt="4px"
            >
              <Icon
                as={FaQuoteLeft}
                boxSize={{ base: "18px", md: "22px" }}
                color={BRAND_COLORS.primaryGreen}
                mt="4px"
                flexShrink={0}
              />
              <Text
                color={BRAND_COLORS.darkGreen}
                fontSize={{ base: "17px", md: "20px" }}
                fontWeight="700"
                fontStyle="italic"
                lineHeight="1.5"
              >
                Nawa&apos;y Bawat Pamilya May St. Peter Life Plan!
              </Text>
            </Flex>
          </Stack>
        </Box>

        {/* Trusted Banking Partners */}
        <Box as="section">
          <SectionHeading
            eyebrow="Security & Trust"
            title="Backed by the country's leading banks"
          />
          <Text
            color={BRAND_COLORS.grey}
            fontSize={{ base: "15px", md: "16px" }}
            lineHeight="1.7"
            mb={STANDARD_SPACING.md}
          >
            For the protection and security of its planholders, St. Peter Life
            Plan entrusts its trust funds only to the most reputable banks in
            the Philippines.
          </Text>
          <Wrap gap={STANDARD_SPACING.xs}>
            {BANKING_PARTNERS.map((bank) => (
              <Badge
                key={bank}
                display="flex"
                alignItems="center"
                gap="8px"
                px={STANDARD_SPACING.sm}
                py="10px"
                borderRadius={STANDARD_RADIUS.md}
                bg={BRAND_COLORS.white}
                borderWidth="1px"
                borderColor={BRAND_COLORS.neutralBorder}
                color={BRAND_COLORS.neutralText}
                fontSize={{ base: "13px", md: "14px" }}
                fontWeight="600"
                textTransform="none"
                boxShadow={STANDARD_SHADOWS.level1}
              >
                <Icon
                  as={FaUniversity}
                  boxSize="16px"
                  color={BRAND_COLORS.primaryGreen}
                />
                {bank}
              </Badge>
            ))}
          </Wrap>
        </Box>

        {/* Vision & Mission */}
        <Box as="section">
          <SectionHeading eyebrow="What Drives Us" title="Vision & Mission" />
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={STANDARD_SPACING.md}>
            {VISION_MISSION.map((item) => (
              <VStack
                key={item.label}
                align="start"
                gap={STANDARD_SPACING.sm}
                bg={BRAND_COLORS.white}
                borderWidth="1px"
                borderColor={BRAND_COLORS.neutralBorder}
                borderRadius={STANDARD_RADIUS.lg}
                boxShadow={STANDARD_SHADOWS.level1}
                p={{ base: STANDARD_SPACING.md, md: STANDARD_SPACING.lg }}
                h="full"
              >
                <Flex
                  align="center"
                  justify="center"
                  boxSize="48px"
                  borderRadius={STANDARD_RADIUS.md}
                  bg={BRAND_COLORS.successBg}
                  color={BRAND_COLORS.primaryGreen}
                >
                  <Icon as={item.icon} boxSize="22px" />
                </Flex>
                <Heading
                  as="h3"
                  fontSize={{ base: "19px", md: "22px" }}
                  fontWeight="700"
                  color={BRAND_COLORS.neutralText}
                >
                  {item.label}
                </Heading>
                <Text
                  color={BRAND_COLORS.neutralText}
                  fontSize={{ base: "15px", md: "16px" }}
                  lineHeight="1.7"
                >
                  {item.text}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>

        {/* Core Values (GETICEP) */}
        <Box as="section">
          <SectionHeading eyebrow="GETICEP" title="Our Core Values" />
          <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 3 }}
            gap={STANDARD_SPACING.md}
          >
            {CORE_VALUES.map((value) => (
              <Flex
                key={value.title}
                align="start"
                gap={STANDARD_SPACING.sm}
                bg={BRAND_COLORS.white}
                borderWidth="1px"
                borderColor={BRAND_COLORS.neutralBorder}
                borderRadius={STANDARD_RADIUS.lg}
                boxShadow={STANDARD_SHADOWS.level1}
                p={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
                h="full"
                transition="border-color 150ms ease-out, box-shadow 150ms ease-out"
                _hover={{
                  borderColor: BRAND_COLORS.primaryGreen,
                  boxShadow: STANDARD_SHADOWS.level2,
                }}
              >
                <Flex
                  align="center"
                  justify="center"
                  boxSize={{ base: "40px", md: "44px" }}
                  flexShrink={0}
                  borderRadius={STANDARD_RADIUS.md}
                  bg={BRAND_COLORS.primaryGreen}
                  color={BRAND_COLORS.white}
                  fontSize={{ base: "18px", md: "20px" }}
                  fontWeight="800"
                >
                  {value.letter}
                </Flex>
                <Box>
                  <Heading
                    as="h3"
                    fontSize={{ base: "16px", md: "17px" }}
                    fontWeight="700"
                    color={BRAND_COLORS.neutralText}
                    lineHeight="1.3"
                    mb="4px"
                  >
                    {value.title}
                  </Heading>
                  <Text
                    color={BRAND_COLORS.grey}
                    fontSize={{ base: "14px", md: "15px" }}
                    lineHeight="1.6"
                  >
                    {value.desc}
                  </Text>
                </Box>
              </Flex>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  );
};

export default AboutUsPage;
