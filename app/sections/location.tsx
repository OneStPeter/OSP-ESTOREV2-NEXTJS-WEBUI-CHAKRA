import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Carousel } from "@/components/ui/carousel";
import { PrimaryMdButton } from "st-peter-ui";

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
    <section>
      <Box padding="8">
        <Flex
          flexDir={{ base: "column", md: "row" }}
          gap={8}
          p={8}
          m="auto"
          align="center"
          w="full"
        >
          <Box position="relative" overflow="hidden" w="full" h="full" py={14}>
            <Carousel slides={slideData} />
          </Box>

          <Box
            p={{ base: 4, md: 8 }}
            display="flex"
            flexDir="column"
            justifyContent="center"
            w="full"
          >
            <Flex justify="flex-start" w="full" m="auto">
              <Text fontSize="3xl" fontWeight="bold">
                We're Near{" "}
                <Text as="span" color="#177D54">
                  You
                </Text>
              </Text>
            </Flex>

            <Text w={{ base: "fit-content", md: "lg" }} textAlign="start">
              Visit us at our convenient location, easily accessible for all
              your needs. Our chapel is situated in the heart of the city,
              providing a peaceful and welcoming environment for families and
              guests. Whether you’re planning a visit or need assistance, our
              friendly staff is always ready to help.
            </Text>

            <Box mt={8}>
              <PrimaryMdButton w={{ base: "full", md: "fit-content" }}>
                Go to Map
              </PrimaryMdButton>
            </Box>
          </Box>
        </Flex>
      </Box>
    </section>
  );
};

export default Location;
