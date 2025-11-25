"use client";

import React from "react";
import { Box, Text, Grid, Image, Heading } from "@chakra-ui/react";
import { WobbleCard } from "@/components/ui/wobble-card";
import { useRouter } from "next/navigation";

const Services = () => {
  const router = useRouter();
  return (
    <section>
      <Box padding="8">
        <Heading
          size="xl"
          fontWeight="bold"
          textTransform="uppercase"
          mb="8"
          textAlign="center"
        >
          Get instant access to online services
        </Heading>
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
              <Text fontWeight="semibold" fontSize="xl" mb={4}>
                Apply for a Claim Benefits
              </Text>
              <Text w={"70%"}>
                Please check your policy details, or contact a Sales Agent, or
                visit your branch of account for more information.
              </Text>
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
              <Text fontWeight="semibold" fontSize="xl" mb={4}>
                Apply for Return of Premium
              </Text>
              <Text w={"100%"}>
                Please check your policy details, contact a Sales Agent, or
                visit your branch of account for more information.
              </Text>
            </Box>
          </WobbleCard>
          <WobbleCard
            containerClassName="col-span-1 min-h-[300px] bg-gray-200 bg-[#177D54] text-white"
            onClick={() => router.push("/Transaction")}
          >
            <Box p={8}>
              <Text fontWeight="semibold" fontSize="xl" mb={4}>
                Track your request
              </Text>
              <Text className="mt-4">
                To track your request, please have your reference number ready.
              </Text>
            </Box>
          </WobbleCard>
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-gray-200 min-h-[300px] lg:min-h-[300px]"
            onClick={() => router.push("/Booking")}
          >
            <div className="max-w-full">
              <Box p={8}>
                <Text fontWeight="semibold" fontSize="xl" mb={4}>
                  Memorial Service Booking Assistance
                </Text>
                <Text className="mt-4">
                  To proceed, please have your life plan contact details ready.
                </Text>
              </Box>
            </div>
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
