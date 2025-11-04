import React from "react";
import { Box, Flex, Grid, GridItem, Text, Heading } from "@chakra-ui/react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="#006838"
      bottom="0"
      color="white"
      py={8}
      textAlign="center"
      display={{ base: "none", lg: "flex" }}
      justifyContent="center"
    >
      <Box p={8}>
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={8}
          width="7xl"
        >
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Flex justify="space-between" align="center">
              <Flex gap={4}>
                <FaFacebook size={32} />
                <FaInstagram size={32} />
                <FaXTwitter size={32} />
              </Flex>
              <Heading as="h4" textAlign="end">
                ST. PETER LIFE PLAN, INC
              </Heading>
            </Flex>
          </GridItem>

          <GridItem>
            <Flex direction="column" align="start" mt={8}>
              <Grid
                templateColumns="repeat(4, 1fr)"
                gap={8}
                w="full"
                textAlign="start"
              >
                <Flex direction="column" gap={4}>
                  <Text fontWeight="semibold" textTransform="uppercase">
                    Products
                  </Text>
                  <Text>Traditional Plans</Text>
                  <Text>Cremation Plans</Text>
                </Flex>
                <Flex direction="column" gap={4}>
                  <Text fontWeight="semibold" textTransform="uppercase">
                    About Us
                  </Text>
                  <Text>Our Company</Text>
                  <Text>Our Officers</Text>
                </Flex>
                <Flex direction="column" gap={4}>
                  <Text fontWeight="semibold" textTransform="uppercase">
                    Legal
                  </Text>
                  <Text>Term of Use</Text>
                  <Text>Privacy Policy</Text>
                </Flex>
                <Flex direction="column" gap={4}>
                  <Flex gap={8}>
                    <Flex direction="column" gap={2}>
                      <Text>Manage Account</Text>
                      <Text>Contact Us</Text>
                      <Text>FAQs</Text>
                    </Flex>
                    <Flex direction="column" gap={2}>
                      <Text>eStore Guide</Text>
                      <Text>Directory</Text>
                      <Text>Gallery</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Grid>
            </Flex>
          </GridItem>

          <GridItem>
            <Flex direction="column" gap={2} justify="center">
              <Flex direction="column" gap={8} justify="center">
                <Text textAlign="end" w="full">
                  St. Peter Corporate Center 999 EDSA, Quezon City 1105
                </Text>
                <Flex direction="column" textAlign="end" w="full" gap={1}>
                  <Text>+63 2 8371-9999</Text>
                  <Text>+63 2 7946-9999</Text>
                  <Text>+63 919-056-9999</Text>
                </Flex>
              </Flex>
            </Flex>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Box borderTop="1px solid white" my={4} />
            <Text textAlign="center">
              Copyright © 2025 St. Peter Group. All rights reserved.
            </Text>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
