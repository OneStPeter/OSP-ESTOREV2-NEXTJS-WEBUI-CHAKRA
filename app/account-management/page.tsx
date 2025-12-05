"use client";
import { Box, Flex, Grid, Text, VStack, Badge } from "@chakra-ui/react";

import { VscAccount, VscLocation } from "react-icons/vsc";
import { AiOutlineNumber } from "react-icons/ai";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { RiContactsBook3Line } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import SideBar from "@/components/ui/sidebar";
import { Body, H4 } from "st-peter-ui";

const page = () => {
  return (
    <Box mt="32" p="8">
      <Flex w="7xl" mx="auto" justify="center">
        <SideBar />

        <Flex direction="column" flex="1">
          {/* Account Overview Section */}
          <Box flex="1" p="8">
            <H4>Account Overview</H4>
            <Body>Quick information about your account</Body>

            <Grid
              templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
              gap="8"
              mt="4"
            >
              <Flex
                p="8"
                border="1px solid"
                borderColor="gray.300"
                rounded="lg"
                align="center"
                gap="4"
              >
                <VscAccount size={32} color="#166534" />
                <VStack align="start">
                  <Text color="gray.500">Account Holder</Text>
                  <Text fontWeight="bold">Juan Dela Cruz</Text>
                </VStack>
              </Flex>

              <Flex
                p="8"
                border="1px solid"
                borderColor="gray.300"
                rounded="lg"
                align="center"
                gap="4"
              >
                <AiOutlineNumber size={32} color="#166534" />
                <VStack align="start">
                  <Text color="gray.500">Insurability</Text>
                  <Text fontWeight="bold">Insurable</Text>
                </VStack>
              </Flex>

              <Flex
                p="8"
                border="1px solid"
                borderColor="gray.300"
                rounded="lg"
                align="center"
                gap="4"
              >
                <FaHandHoldingHeart size={32} color="#166534" />
                <VStack align="start" gap={0}>
                  <Text color="gray.500">Member Since</Text>
                  <Text fontWeight="bold">January 1, 2020</Text>
                </VStack>
              </Flex>

              <Flex
                p="8"
                border="1px solid"
                borderColor="gray.300"
                rounded="lg"
                align="center"
                gap="4"
              >
                <RiContactsBook3Line size={32} color="#166534" />
                <VStack align="start" gap={0}>
                  <Text color="gray.500">Contact Number</Text>
                  <Text fontWeight="bold">+63 912 345 6789</Text>
                </VStack>
              </Flex>

              <Flex
                p="8"
                border="1px solid"
                borderColor="gray.300"
                rounded="lg"
                align="center"
                gap="4"
              >
                <MdOutlineMailOutline size={32} color="#166534" />
                <VStack align="start">
                  <Text color="gray.500">Email Address</Text>
                  <Text fontWeight="bold">juan.delacruz@gmail.com</Text>
                </VStack>
              </Flex>

              <Flex
                p="8"
                border="1px solid"
                borderColor="gray.300"
                rounded="lg"
                align="center"
                gap="4"
              >
                <VscLocation size={40} color="#166534" />
                <VStack align="start">
                  <Text color="gray.500">Home Address</Text>
                  <Text fontWeight="bold">
                    1234 Elm Street, Barangay 1, Makati City, Philippines
                  </Text>
                </VStack>
              </Flex>
            </Grid>
          </Box>

          {/* Active Plans Section */}
          <Box flex="1" p="8">
            <Flex justify="space-between" align="center">
              <Box>
                <H4>Active Plans</H4>
                <Body>Manage your active plans</Body>
              </Box>
              <Badge bg="green.700" color="white" p="2" rounded="lg">
                1 Active Plan
              </Badge>
            </Flex>

            <Grid templateColumns="1fr" mt="4">
              <Box border="1px solid" borderColor="gray.300" p="8" rounded="lg">
                <VStack align="start" gap={8}>
                  <Box>
                    <H4>ST. ANNE</H4>
                    <Text color="gray.500">
                      Effectivity Date: January 1, 2020
                    </Text>
                  </Box>

                  <Flex gap="16" wrap="wrap">
                    <VStack align="start" gap={0}>
                      <Text color="gray.500">Contract Price</Text>
                      <Text fontWeight="bold">₱141,750.00</Text>
                    </VStack>

                    <VStack align="start" gap={0}>
                      <Text color="gray.500">Plan Term</Text>
                      <Text fontWeight="bold">5 years</Text>
                    </VStack>

                    <VStack align="start" gap={0}>
                      <Text color="gray.500">Installment</Text>
                      <Text fontWeight="bold">₱3,000 / month</Text>
                    </VStack>

                    <VStack align="start" gap={0}>
                      <Text color="gray.500">Maturity Date</Text>
                      <Text fontWeight="bold">January 1, 2025</Text>
                    </VStack>
                  </Flex>
                </VStack>
              </Box>
            </Grid>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default page;
