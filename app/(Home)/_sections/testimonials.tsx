"use client";

import Testimonials, { TestimonialItem } from "@/components/ui/testimonials";
import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { BaseText, Body } from "st-peter-ui";

const testimonials: TestimonialItem[] = [
  {
    quote:
      "I believe that St. Peter is a good and credible company that delivers their services with excellence...",
    name: "Mrs. Anadina C. Felomino",
    branch: "Koronadal Branch",
    planholderSince: "St. Peter Planholder since 1995",
  },
  {
    quote:
      "I decided to buy a policy for me and my husband because ever since I was always interested in insurance...",
    name: "Mila T. Garcia",
    branch: "Butuan East and Butuan West Branches",
    planholderSince: "St. Peter Planholder since 1999",
  },
  {
    quote:
      "Ako po si Yolanda Laberon Eclipse... Being a planholder feels good! Now, I got 3 St. Peter Life Plans...",
    name: "Yolanda L. Eclipse",
    branch: "Catbalogan Branch",
    planholderSince: "St. Peter Planholder since 2005",
  },
  {
    quote:
      "I’ve been a member for almost 12 years and I already started to receive my Return of Premium...",
    name: "Juanita C. Intong",
    branch: "Mandaue Branch",
    planholderSince: "St. Peter Planholder since 2007",
  },
  {
    quote:
      "Back then, I was not a believer in pre-need plans... Being a planholder of St. Peter Life Plan gives me security...",
    name: "Jocelyn S. Ongdico",
    branch: "Meycauayan Branch",
    planholderSince: "St. Peter Planholder since 2010",
  },
  {
    quote:
      "I decided to buy a plan because nowadays, it is very expensive to die... I even bought 2 more life plans...",
    name: "Cristina Jumawan",
    branch: "Dumaguete Branch",
    planholderSince: "St. Peter Planholder since 2017",
  },
];

const TestimonialPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleTestimonials = useMemo(() => {
    return isExpanded ? testimonials : testimonials.slice(0, 3);
  }, [isExpanded]);

  return (
    <Box as="section">
      <Box
        maxW="7xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={{ base: 10, md: 16, lg: 20 }}
      >
        {/* Header */}
        <Flex
          direction="column"
          align="center"
          textAlign="center"
          maxW="760px"
          mx="auto"
          mb={{ base: 8, md: 12 }}
        >
          <Text
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="semibold"
            color="green.700"
            mb={3}
            letterSpacing="wide"
            textTransform="uppercase"
          >
            Testimonials
          </Text>

          <BaseText
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            lineHeight="1.1"
          >
            Stories from our{" "}
            <Box as="span" color="#177D54">
              Planholders
            </Box>
          </BaseText>

          <Box maxW="620px" mt={4}>
            <Body>
              Real stories from St. Peter planholders who trusted our life plans
              and services for their families.
            </Body>
          </Box>

          <Box h="5px" w="96px" bg="green.700" borderRadius="full" mt={6} />
        </Flex>
        {/* Testimonials Component */}
        <Box position="relative">
          <Box
            bg="transparent"
            borderRadius={{ base: "2xl", md: "3xl" }}
            borderWidth="0"
            boxShadow="none"
            p={0}
            overflow="hidden"
            transition="all 20s ease"
          >
            <Flex
              key={
                isExpanded ? "expanded-testimonials" : "collapsed-testimonials"
              }
              justify="center"
              align="center"
              opacity={1}
              animation="testimonialFade 9s ease both"
              css={{
                "@keyframes testimonialFade": {
                  "0%": {
                    opacity: 0,
                    transform: "translateY(18px)",
                    filter: "blur(6px)",
                  },
                  "45%": {
                    opacity: 0.45,
                    transform: "translateY(10px)",
                    filter: "blur(3px)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translateY(0)",
                    filter: "blur(0)",
                  },
                },
              }}
            >
              <Testimonials testimonials={visibleTestimonials} />
            </Flex>
          </Box>

          {/* Fade overlay only when collapsed */}
          {!isExpanded && testimonials.length > 3 && (
            <Box
              position="absolute"
              left={0}
              right={0}
              bottom={0}
              h={{ base: "100px", md: "120px" }}
              pointerEvents="none"
              bgGradient="linear(to-b, transparent, gray.50)"
              borderBottomRadius={{ base: "2xl", md: "3xl" }}
            />
          )}

          {/* Expand / Collapse Button */}
          {testimonials.length > 3 && (
            <>
              <Flex
                justify="center"
                mb={{ base: 24, md: 8 }}
                position="relative"
                zIndex={2}
              >
                <IconButton
                  aria-label={
                    isExpanded ? "Collapse testimonials" : "Expand testimonials"
                  }
                  size="lg"
                  rounded="full"
                  bg="green.600"
                  color="white"
                  boxShadow="0 12px 30px rgba(23, 125, 84, 0.35)"
                  _hover={{ bg: "green.700", transform: "translateY(-2px)" }}
                  _active={{ bg: "green.800", transform: "translateY(0)" }}
                  transition="all 0.25s ease"
                  onClick={() => setIsExpanded((prev) => !prev)}
                >
                  <ChevronDown
                    size={24}
                    style={{
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.45s ease",
                    }}
                  />
                </IconButton>
              </Flex>

              <Text
                mt={3}
                textAlign="center"
                fontSize="sm"
                color="gray.600"
                fontWeight="medium"
              >
                {/* {isExpanded
                  ? "Show less testimonials"
                  : "View all testimonials"} */}
              </Text>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TestimonialPage;
