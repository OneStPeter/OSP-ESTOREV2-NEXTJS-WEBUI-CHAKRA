"use client";

import { Box, Grid, Image } from "@chakra-ui/react";
import { WobbleCard } from "@/components/ui/wobble-card";
import { useRouter } from "next/navigation";
import { Body, H2, H3 } from "st-peter-ui";

const Services = () => {
  const router = useRouter();
  return (
    <section>
      <Box padding="8">
        <Box mb={8} textAlign="center">
          <H2>Get instant access to online services</H2>
        </Box>
        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
          gap={4}
          maxW="7xl"
          mx="auto"
          w="full"
        >
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-gray-200 min-h-[300px] lg:min-h-[300px]"
            className=""
            onClick={() => router.push("/claims")}
          >
            <Box p={8}>
              <Box mb={4}>
                <H3>Apply for a Claim Benefits</H3>
              </Box>
              <Box maxW="md">
                <Body>
                  Please check your policy details, or contact a Sales Agent, or
                  visit your branch of account for more information.
                </Body>
              </Box>
            </Box>
            <Image
              src="/images/services/claim-benefits.jpg"
              alt="claim benefits"
              width={250}
              top="0"
              height="auto"
              position="absolute"
              right={{ base: 0, lg: "0%" }}
              bottom="0"
              objectFit="cover"
              borderRadius="2xl"
              display={{ base: "none", lg: "block" }}
            />
          </WobbleCard>
          <WobbleCard
            containerClassName="col-span-1 min-h-[300px] bg-gray-200 bg-[#177D54] text-white"
            onClick={() => router.push("/login")}
          >
            <Box p={8}>
              <Box mb={4}>
                <H3 color="white">Apply for Return of Premium </H3>
              </Box>
              <Body color="white">
                Please check your policy details, contact a Sales Agent, or
                visit your branch of account for more information.
              </Body>
            </Box>
          </WobbleCard>
          <WobbleCard
            containerClassName="col-span-1 min-h-[300px] bg-gray-200 bg-[#177D54] text-white"
            onClick={() => router.push("/Transaction")}
          >
            <Box p={8}>
              <Box mb={4}>
                <H3 color="white">Track your request</H3>
              </Box>
              <Body color="white">
                To track your request, please have your reference number ready.
              </Body>
            </Box>
          </WobbleCard>
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-gray-200 min-h-[300px] lg:min-h-[300px]"
            onClick={() => router.push("/booking")}
          >
            <Box w="full">
              <Box p={8} w="lg">
                <Box mb={4}>
                  <H3>Memorial Service Booking Assistance</H3>
                </Box>
                <Body>
                  To proceed, please have your life plan contact details ready.
                </Body>
              </Box>
            </Box>
            <Image
              src="/images/services/request-service.jpg"
              alt="request service"
              width={250}
              height="auto"
              position="absolute"
              top="0"
              right={{ base: 0, lg: "0%" }}
              bottom="0"
              objectFit="cover"
              borderRadius="2xl"
              display={{ base: "none", lg: "block" }}
            />
          </WobbleCard>
        </Grid>
      </Box>
    </section>
  );
};

export default Services;
