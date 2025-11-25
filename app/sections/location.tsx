import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Carousel } from "@/components/ui/carousel";

const Location = () => {
  const slideData = [
    {
      title: "Chapel 1",
      button: "Explore Component",
      src: "/images/chapels/chapel1.jpg",
    },
    {
      title: "Chapel 2",
      button: "Explore Component",
      src: "/images/chapels/chapel2.jpg",
    },
    {
      title: "Chapel 3",
      button: "Explore Component",
      src: "/images/chapels/chapel3.jpg",
    },
    {
      title: "Chapel 4",
      button: "Explore Component",
      src: "/images/chapels/chapel4.jpg",
    },
  ];
  return (
    <Box as="section" py={{ base: 8, md: 12 }} px={{ base: 4, md: 8 }}>
      <Box maxW="7xl" w="full" m="auto">
        <Flex
          flexDir={{ base: "column", lg: "row" }}
          gap={{ base: 6, md: 8 }}
          align="center"
          w="full"
        >
          <Box position="relative" overflow="hidden" w="full">
            <Carousel slides={slideData} />
          </Box>

          <Box
            p={{ base: 4, md: 6 }}
            display="flex"
            flexDir="column"
            justifyContent="center"
            w={{ base: "full", md: "lg" }}
          >
            <Flex
              flexDirection={{ base: "column", md: "column" }}
              w="full"
              m="auto"
            >
              <Heading
                fontSize={{ base: "2xl" }}
                fontWeight="bold"
                textTransform="uppercase"
                mb={8}
              >
                We&apos;re Near{" "}
                <Box as="span" color="green.600">
                  {" "}
                  You
                </Box>
              </Heading>

              <Text w={{ base: "100%", md: "md" }} textAlign="start">
                Visit us at our convenient location, easily accessible for all
                your needs. Our chapel is situated in the heart of the city,
                providing a peaceful and welcoming environment for families and
                guests. Whether you’re planning a visit or need assistance, our
                friendly staff is always ready to help.
              </Text>
            </Flex>

            <Box mt={8}>
              <Button
                w={{ base: "100%", md: "fit-content" }}
                colorScheme="green"
              >
                Go to Map
              </Button>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Location;
