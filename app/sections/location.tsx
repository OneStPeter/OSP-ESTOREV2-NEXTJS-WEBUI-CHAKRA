import { Box, Flex } from "@chakra-ui/react";
import { Carousel } from "@/components/ui/carousel";
import { Body, DynamicButton, H2 } from "st-peter-ui";

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
    <Box
      as="section"
      mt={8}
      py={{ base: 8, md: 12 }}
      px={{ base: 4, md: 8 }}
      bg="gray.50"
    >
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
              <Box mb={4}>
                <H2>
                  We&apos;re Near{" "}
                  <Box as="span" color="green.600">
                    {" "}
                    You
                  </Box>
                </H2>
              </Box>

              <Box w={{ base: "100%", md: "md" }}>
                <Body>
                  Visit us at our convenient location, easily accessible for all
                  your needs. Our chapel is situated in the heart of the city,
                  providing a peaceful and welcoming environment for families
                  and guests. Whether you’re planning a visit or need
                  assistance, our friendly staff is always ready to help.
                </Body>
              </Box>
            </Flex>

            <Box mt={8}>
              <DynamicButton label="Go to Map" />
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Location;
