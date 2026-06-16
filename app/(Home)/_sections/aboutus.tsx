"use client";

import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { BaseText, Body } from "st-peter-ui";

const AboutUs = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <Box as="section" bg="gray.50" overflow="hidden">
      <Box
        maxW="7xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={{ base: 10, md: 16, lg: 20 }}
      >
        <SimpleGrid
          ref={ref}
          columns={{ base: 1, lg: 2 }}
          gap={{ base: 8, md: 10, lg: 14 }}
          alignItems="center"
        >
          {/* Left Content */}
          <Flex direction="column" gap={{ base: 5, md: 6 }}>
            <Box>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="semibold"
                color="green.700"
                mb={3}
                letterSpacing="wide"
                textTransform="uppercase"
              >
                About St. Peter
              </Text>

              <BaseText
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="bold"
                lineHeight="1.1"
              >
                Serving the Filipino{" "}
                <Box as="span" color="#177D54">
                  Since 1980
                </Box>
              </BaseText>
            </Box>

            <Box maxW="560px">
              <Body>
                We are a trusted Pre-Need DeathCare company, serving the
                Filipino public for over 30 years with professional and
                traditional memorial services and affordable life plans for
                every family.
              </Body>
            </Box>

            <SimpleGrid
              columns={{ base: 1, sm: 3 }}
              gap={4}
              pt={{ base: 2, md: 4 }}
              maxW="640px"
            >
              <Box
                p={5}
                bg="white"
                borderRadius="2xl"
                borderWidth="1px"
                borderColor="gray.100"
                boxShadow="0 12px 30px rgba(16, 24, 40, 0.06)"
              >
                <Text fontSize="sm" color="gray.500" mb={2}>
                  Trusted since
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="#177D54">
                  1980
                </Text>
              </Box>

              <Box
                p={5}
                bg="white"
                borderRadius="2xl"
                borderWidth="1px"
                borderColor="gray.100"
                boxShadow="0 12px 30px rgba(16, 24, 40, 0.06)"
              >
                <Text fontSize="sm" color="gray.500" mb={2}>
                  Service focus
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="#177D54">
                  Families
                </Text>
              </Box>

              <Box
                p={5}
                bg="white"
                borderRadius="2xl"
                borderWidth="1px"
                borderColor="gray.100"
                boxShadow="0 12px 30px rgba(16, 24, 40, 0.06)"
              >
                <Text fontSize="sm" color="gray.500" mb={2}>
                  Plans
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="#177D54">
                  Affordable
                </Text>
              </Box>
            </SimpleGrid>
          </Flex>

          {/* Right Stats Card */}
          <Box
            bg="white"
            borderRadius={{ base: "2xl", md: "3xl" }}
            p={{ base: 5, md: 8 }}
            borderWidth="1px"
            borderColor="gray.100"
            boxShadow="0 24px 60px rgba(16, 24, 40, 0.08)"
          >
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="bold"
              mb={6}
              color="gray.800"
            >
              Built on trust, service, and accessibility.
            </Text>

            <SimpleGrid columns={{ base: 2, md: 2 }} gap={4}>
              <Flex
                direction="column"
                justify="center"
                minH="150px"
                p={{ base: 4, md: 6 }}
                borderRadius="2xl"
                bg="green.50"
                borderWidth="1px"
                borderColor="green.100"
              >
                <Text
                  fontSize={{ base: "4xl", md: "5xl" }}
                  color="#177D54"
                  fontWeight="bold"
                  lineHeight="1"
                >
                  {inView && <CountUp start={0} end={280} duration={2.5} />}+
                </Text>
                <Text
                  mt={3}
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight="semibold"
                  color="gray.700"
                >
                  Chapels
                </Text>
              </Flex>

              <Flex
                direction="column"
                justify="center"
                minH="150px"
                p={{ base: 4, md: 6 }}
                borderRadius="2xl"
                bg="green.50"
                borderWidth="1px"
                borderColor="green.100"
              >
                <Text
                  fontSize={{ base: "4xl", md: "5xl" }}
                  color="#177D54"
                  fontWeight="bold"
                  lineHeight="1"
                >
                  {inView && <CountUp start={0} end={200} duration={2.5} />}+
                </Text>
                <Text
                  mt={3}
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight="semibold"
                  color="gray.700"
                >
                  Branches
                </Text>
              </Flex>
            </SimpleGrid>

            <Box
              mt={5}
              p={{ base: 4, md: 5 }}
              borderRadius="2xl"
              bg="gray.50"
              borderWidth="1px"
              borderColor="gray.100"
            >
              <Text fontSize={{ base: "sm", md: "md" }} color="gray.600">
                Professional and traditional memorial services made accessible
                for Filipino families.
              </Text>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default AboutUs;
