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

const STORY_MILESTONES = [
  {
    year: "1970",
    range: "1970-2006",
    color: "#F04455",
    items: [
      "First St. Peter Chapel (1970)",
      "St. Peter Head Office",
      "St. Peter E-Burol (2006)",
    ],
  },
  {
    year: "2007",
    range: "2007-2009",
    color: "#F27C22",
    items: [
      "First St. Peter Advertisement (2007)",
      "St. Peter E-Libing (2009)",
      "Heaven Address (2009)",
      "Photo Contest (2009)",
      "Pink Casket (2009)",
    ],
  },
  {
    year: "2010",
    range: "2010-2015",
    color: "#13AFA8",
    items: [
      "St. Peter Soul Trees - Laoag (Part 1-2010)",
      "St. Peter Forest - Tagum (2015)",
      "SAF 44 - Check Distribution (2015)",
      "St. Peter Soul Trees - Laoag (Part 2- 2015)",
      "Parang Natutulog Lang Ad (2015)",
    ],
  },
  {
    year: "2016",
    range: "2016-2020",
    color: "#0F5B72",
    items: [
      "St. Peter Facebook",
      "Viral USB Pink Casket (2018)",
      "Viral GCQ Post (June 2020)",
      "St. Peter Mobile App",
      "St. Peter Tribute",
      "St. Peter's Gate",
      "St. Peter Chapel virtual tour",
      "Sandigan TVC",
      "Vision & eVision",
      "New St. Peter Head Office (2018)",
      "eCommerce Website",
      "Caspi Mascot Launch (2019)",
      "DeathCare Week Mall Activation",
    ],
  },
];

const RECORDS = [
  { year: "2011", rank: "TOP 381" },
  { year: "2012", rank: "TOP 263" },
  { year: "2013", rank: "TOP 208" },
  { year: "2014", rank: "TOP 177" },
  { year: "2015", rank: "TOP 168" },
  { year: "2017", rank: "TOP 140" },
  { year: "2018", rank: "TOP 134" },
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

const MilestoneCard = ({
  milestone,
}: {
  milestone: (typeof STORY_MILESTONES)[number];
}) => (
  <Box
    bg={BRAND_COLORS.white}
    borderWidth="1px"
    borderColor={BRAND_COLORS.neutralBorder}
    borderRadius={STANDARD_RADIUS.lg}
    boxShadow={STANDARD_SHADOWS.level1}
    p={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
    borderTopWidth="4px"
    borderTopColor={milestone.color}
    h="full"
  >
    <Flex align="center" justify="space-between" gap={STANDARD_SPACING.sm}>
      <Heading
        as="h3"
        fontSize={{ base: "18px", md: "20px" }}
        fontWeight="800"
        color={BRAND_COLORS.neutralText}
      >
        {milestone.range}
      </Heading>
      <Badge
        bg={`${milestone.color}1A`}
        color={milestone.color}
        borderRadius={STANDARD_RADIUS.full}
        px="10px"
        py="5px"
        fontSize="12px"
        fontWeight="800"
      >
        {milestone.year}
      </Badge>
    </Flex>
    <VStack align="start" gap="8px" mt={STANDARD_SPACING.sm}>
      {milestone.items.map((item) => (
        <Flex key={item} align="start" gap="10px">
          <Box
            boxSize="7px"
            borderRadius={STANDARD_RADIUS.full}
            bg={milestone.color}
            mt="9px"
            flexShrink={0}
          />
          <Text
            color={BRAND_COLORS.neutralText}
            fontSize={{ base: "14px", md: "15px" }}
            lineHeight="1.55"
          >
            {item}
          </Text>
        </Flex>
      ))}
    </VStack>
  </Box>
);

const AboutUsPage = () => {
  return (
    <Container>
      <VStack align="stretch" gap={{ base: "40px", md: "64px" }}>
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

        <Box as="section">
          <SectionHeading
            eyebrow="Our Story"
            title="Milestones that shaped One St. Peter"
          />
          <Text
            color={BRAND_COLORS.grey}
            fontSize={{ base: "15px", md: "16px" }}
            lineHeight="1.7"
            maxW="760px"
            mb={STANDARD_SPACING.lg}
          >
            From the first chapel in 1970 to digital services and nationwide
            campaigns, these moments show how St. Peter continued to make
            DeathCare more accessible to Filipino families.
          </Text>

          <Box display={{ base: "none", md: "block" }} position="relative">
            <Box
              position="absolute"
              top="0"
              bottom="0"
              left="50%"
              w="2px"
              bg={BRAND_COLORS.neutralBorder}
              transform="translateX(-50%)"
            />
            <VStack align="stretch" gap={STANDARD_SPACING.lg}>
              {STORY_MILESTONES.map((milestone, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <SimpleGrid
                    key={milestone.year}
                    columns={3}
                    gap={STANDARD_SPACING.md}
                    alignItems="center"
                    templateColumns="minmax(0, 1fr) 96px minmax(0, 1fr)"
                  >
                    <Box>
                      {isLeft && <MilestoneCard milestone={milestone} />}
                    </Box>
                    <Flex align="center" justify="center" position="relative">
                      <Flex
                        align="center"
                        justify="center"
                        boxSize="76px"
                        borderRadius={STANDARD_RADIUS.full}
                        bg={BRAND_COLORS.white}
                        borderWidth="8px"
                        borderColor={milestone.color}
                        boxShadow={STANDARD_SHADOWS.level2}
                        color={milestone.color}
                        fontSize="20px"
                        fontWeight="900"
                        zIndex={1}
                      >
                        {milestone.year}
                      </Flex>
                    </Flex>
                    <Box>
                      {!isLeft && <MilestoneCard milestone={milestone} />}
                    </Box>
                  </SimpleGrid>
                );
              })}
            </VStack>
          </Box>

          <VStack
            display={{ base: "flex", md: "none" }}
            align="stretch"
            gap={4}
          >
            {STORY_MILESTONES.map((milestone) => (
              <Flex
                key={milestone.year}
                align="stretch"
                gap={STANDARD_SPACING.sm}
              >
                <VStack gap="8px" flexShrink={0}>
                  <Flex
                    align="center"
                    justify="center"
                    boxSize="52px"
                    borderRadius={STANDARD_RADIUS.full}
                    bg={BRAND_COLORS.white}
                    borderWidth="5px"
                    borderColor={milestone.color}
                    color={milestone.color}
                    fontSize="14px"
                    fontWeight="900"
                    boxShadow={STANDARD_SHADOWS.level1}
                  >
                    {milestone.year}
                  </Flex>
                  <Box w="2px" flex="1" bg={BRAND_COLORS.neutralBorder} />
                </VStack>
                <Box flex="1" minW={0}>
                  <MilestoneCard milestone={milestone} />
                </Box>
              </Flex>
            ))}
          </VStack>
        </Box>

        <Box
          as="section"
          bg={BRAND_COLORS.subtleBg}
          borderWidth="1px"
          borderColor={BRAND_COLORS.neutralBorder}
          borderRadius={STANDARD_RADIUS.xl}
          p={{ base: STANDARD_SPACING.md, md: STANDARD_SPACING.lg }}
        >
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={STANDARD_SPACING.lg}>
            <Box>
              <SectionHeading eyebrow="Records" title="Recognized growth" />
              <Text
                color={BRAND_COLORS.grey}
                fontSize={{ base: "15px", md: "16px" }}
                lineHeight="1.7"
              >
                St. Peter continued to rise among the Philippines&apos; top
                companies, reflecting years of wider reach, stronger service,
                and growing planholder trust.
              </Text>
            </Box>
            <Box
              bg={BRAND_COLORS.white}
              borderRadius={STANDARD_RADIUS.lg}
              borderWidth="1px"
              borderColor={BRAND_COLORS.neutralBorder}
              boxShadow={STANDARD_SHADOWS.level1}
              p={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
            >
              <Flex
                align="center"
                justify="space-between"
                gap={STANDARD_SPACING.sm}
                mb={STANDARD_SPACING.sm}
                wrap="wrap"
              >
                <Heading
                  as="h3"
                  fontSize={{ base: "18px", md: "22px" }}
                  fontWeight="800"
                  lineHeight="1.25"
                  color={BRAND_COLORS.neutralText}
                >
                  Top 1000 Companies
                </Heading>
                <Badge
                  bg={BRAND_COLORS.successBg}
                  color={BRAND_COLORS.darkGreen}
                  borderRadius={STANDARD_RADIUS.full}
                  px="10px"
                  py="5px"
                  fontWeight="800"
                >
                  2011-2018
                </Badge>
              </Flex>
              <SimpleGrid
                columns={{ base: 1, sm: 2, xl: 3 }}
                gap={STANDARD_SPACING.sm}
              >
                {RECORDS.map((record) => (
                  <Box
                    key={record.year}
                    bg={BRAND_COLORS.subtleBg}
                    borderWidth="1px"
                    borderColor={BRAND_COLORS.neutralBorder}
                    borderRadius={STANDARD_RADIUS.md}
                    px={STANDARD_SPACING.sm}
                    py={STANDARD_SPACING.sm}
                    borderLeftWidth="4px"
                    borderLeftColor={BRAND_COLORS.primaryGreen}
                  >
                    <Text
                      color={BRAND_COLORS.grey}
                      fontSize="12px"
                      fontWeight="800"
                      lineHeight="1"
                      mb="8px"
                    >
                      {record.year}
                    </Text>
                    <Text
                      color={BRAND_COLORS.neutralText}
                      fontSize={{ base: "17px", md: "18px" }}
                      fontWeight="900"
                      lineHeight="1.2"
                    >
                      {record.rank}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </SimpleGrid>
        </Box>

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
