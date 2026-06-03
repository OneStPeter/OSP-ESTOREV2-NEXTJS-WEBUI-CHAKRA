"use client";

import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Carousel } from "@/components/ui/carousel";
import { BaseText, Body, PrimaryMdButton } from "st-peter-ui";

const Location = () => {
  const slideData = [
    {
      title: "Chapel 1",
      button: "Explore Component",
      src: "/images/chapels/Guiguinto.jpg",
    },
    {
      title: "Chapel 2",
      button: "Explore Component",
      src: "/images/chapels/Iloilo.jpg",
    },
    {
      title: "Chapel 3",
      button: "Explore Component",
      src: "/images/chapels/Masbate.jpg",
    },
    {
      title: "Chapel 4",
      button: "Explore Component",
      src: "/images/chapels/Surigao.jpg",
    },
  ];

  return (
    <Box
      as="section"
      py={{ base: 8, md: 14, lg: 20 }}
      px={{ base: 4, md: 8 }}
      bg="white"
    >
      <Box maxW="7xl" mx="auto" w="full">
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          gap={{ base: 8, md: 10, lg: 14 }}
          alignItems="center"
        >
          {/* Left Content */}
          <Flex
            order={{ base: 2, lg: 1 }}
            direction="column"
            align={{ base: "stretch", md: "flex-start" }}
            textAlign="left"
            gap={{ base: 5, md: 6 }}
          >
            <Box>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="semibold"
                color="green.700"
                mb={3}
                letterSpacing="wide"
                textTransform="uppercase"
              >
                Our Locations
              </Text>

              <BaseText
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="bold"
                lineHeight="1.1"
              >
                We&apos;re Near{" "}
                <Box as="span" color="green.600">
                  You
                </Box>
              </BaseText>
            </Box>

            <Box maxW={{ base: "full", md: "520px" }}>
              <Body>
                Visit us at our convenient location, easily accessible for all
                your needs. Our chapel is situated in the heart of the city,
                providing a peaceful and welcoming environment for families and
                guests. Whether you’re planning a visit or need assistance, our
                friendly staff is always ready to help.
              </Body>
            </Box>

            <SimpleGrid
              columns={{ base: 2, sm: 3 }}
              gap={4}
              w="full"
              maxW="520px"
              pt={{ base: 2, md: 4 }}
            >
              <Box
                p={4}
                borderWidth="1px"
                borderColor="green.100"
                borderRadius="2xl"
                bg="gray.50"
              >
                <Text fontSize="2xl" fontWeight="bold" color="green.700">
                  280+
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Chapels
                </Text>
              </Box>

              <Box
                p={4}
                borderWidth="1px"
                borderColor="green.100"
                borderRadius="2xl"
                bg="gray.50"
              >
                <Text fontSize="2xl" fontWeight="bold" color="green.700">
                  200+
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Branches
                </Text>
              </Box>

              <Box
                display={{ base: "none", sm: "block" }}
                p={4}
                borderWidth="1px"
                borderColor="green.100"
                borderRadius="2xl"
                bg="gray.50"
              >
                <Text fontSize="2xl" fontWeight="bold" color="green.700">
                  PH
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Nationwide
                </Text>
              </Box>
            </SimpleGrid>

            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={3}
              w={{ base: "full", sm: "auto" }}
              pt={{ base: 2, md: 4 }}
            >
              <PrimaryMdButton
                w={{ base: "full", sm: "auto" }}
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps/search/St+Peter+Chapels/@14.6564517,121.0245058,15z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D",
                    "_blank",
                  )
                }
              >
                GO TO MAP
              </PrimaryMdButton>
            </Flex>
          </Flex>

          {/* Right Carousel */}
          <Box order={{ base: 1, lg: 2 }} w="full" minW={0}>
            <Box position="relative" w="full">
              <Box order={{ base: 1, lg: 2 }} w="full" minW={0}>
                <Box
                  position="relative"
                  w="full"
                  maxW={{ base: "full", lg: "680px" }}
                  mx="auto"
                  overflow="hidden"
                  bg="transparent"
                >
                  <Carousel slides={slideData} />
                </Box>
              </Box>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Location;
