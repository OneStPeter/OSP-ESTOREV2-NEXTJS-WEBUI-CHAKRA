"use client";

import { Box, Button, Grid, HStack, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { BaseText } from "st-peter-ui";
import {
  ArrowRight,
  FileText,
  RefreshCw,
  Search,
  Calendar,
} from "lucide-react";
import { BiSolidCoinStack } from "react-icons/bi";

const services = [
  {
    title: "Apply for Claim Benefits",
    description:
      "Please check your policy details, contact a Sales Agent, or visit your branch of account for more information.",
    icon: FileText,
    href: "/claims",
    buttonText: "Apply Now",
    featured: true,
    dark: false,
  },
  {
    title: "Return of Premium",
    description:
      "Please check your policy details, contact a Sales Agent, or visit your branch of account for more information.",
    icon: BiSolidCoinStack,
    href: "/login",
    buttonText: "Start Request",
    featured: false,
    dark: true,
  },
  {
    title: "Track Your Request",
    description:
      "To track your request, please have your reference number ready.",
    icon: Search,
    href: "/transaction",
    buttonText: "Track Request",
    featured: false,
    dark: true,
  },
  {
    title: "Memorial Service Booking Assistance",
    description:
      "To proceed, please have your life plan contact details ready.",
    icon: Calendar,
    href: "/booking",
    buttonText: "Book Service",
    featured: true,
    dark: false,
  },
];

const Services = () => {
  const router = useRouter();

  return (
    <Box
      as="section"
      bg="gray.50"
      py={{ base: 8, md: 14 }}
      px={{ base: 4, md: 8 }}
      minH="400px"
    >
      <VStack
        gap={{ base: 2, md: 3 }}
        mb={{ base: 6, md: 10 }}
        textAlign="center"
      >
        <BaseText
          fontSize={{ base: "xl", md: "4xl" }}
          fontWeight="bold"
          lineHeight="shorter"
          maxW="4xl"
        >
          Get instant access to online services{" "}
        </BaseText>

        <BaseText
          color="gray.600"
          fontSize={{ base: "xs", md: "md" }}
          lineHeight={{ base: "short", md: "tall" }}
          maxW="3xl"
        >
          Access claims, requests, memorial services, and policy-related
          assistance with a fast and convenient digital experience.
        </BaseText>
      </VStack>

      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={{ base: 3, md: 5 }}
        maxW="6xl"
        mx="auto"
        alignItems="stretch"
      >
        {services.map((service, index) => {
          const iconBg = service.dark ? "green.50" : "green.50";

          return (
            <Box
              key={index}
              position="relative"
              overflow="hidden"
              cursor="pointer"
              role="group"
              minH={{ base: "132px", md: "230px" }}
              bg="white"
              color="gray.900"
              borderRadius={{ base: "18px", md: "24px" }}
              border="1px solid"
              borderColor="gray.100"
              boxShadow={{
                base: "0 6px 18px rgba(0,0,0,0.04)",
                md:
                  index === 2
                    ? "0 14px 34px rgba(0,0,0,0.10)"
                    : "0 8px 24px rgba(0,0,0,0.05)",
              }}
              transition="all 0.25s ease"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.10)",
              }}
              onClick={() => router.push(service.href)}
            >
              <VStack
                h="full"
                justify="center"
                align="center"
                textAlign="center"
                gap={{ base: 2, md: 3 }}
                px={{ base: 3, md: 5 }}
                py={{ base: 4, md: 6 }}
              >
                <Box
                  w={{ base: "38px", md: "52px" }}
                  h={{ base: "38px", md: "52px" }}
                  rounded="full"
                  bg={iconBg}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  overflow="hidden"
                  flexShrink={0}
                >
                  {service.icon ? (
                    <Box
                      as={service.icon}
                      color={service.dark ? "#177D54" : "#177D54"}
                      width={{ base: "18px", md: "24px" }}
                      height={{ base: "18px", md: "24px" }}
                    />
                  ) : (
                    <Box
                      w={{ base: "18px", md: "24px" }}
                      h={{ base: "18px", md: "24px" }}
                      rounded="sm"
                      bg="#177D54"
                      opacity={0.9}
                    />
                  )}
                </Box>

                <VStack gap={{ base: 1, md: 2 }} flex="1" justify="center">
                  <BaseText
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="bold"
                    lineHeight="short"
                    color="gray.900"
                  >
                    {service.title}
                  </BaseText>

                  <BaseText
                    display={{ base: "none", md: "block" }}
                    fontSize="xs"
                    lineHeight="short"
                    color="gray.600"
                    maxW="220px"
                  >
                    {service.description}
                  </BaseText>

                  <Button
                    size="xs"
                    variant="plain"
                    h="auto"
                    minW="auto"
                    px={0}
                    mt={{ base: 0, md: 1 }}
                    color="#177D54"
                    fontSize={{ base: "10px", md: "xs" }}
                    fontWeight="semibold"
                    _hover={{
                      color: "#116B47",
                    }}
                  >
                    <HStack gap={1}>
                      <Box as="span">{service.buttonText}</Box>
                      <Box
                        as="span"
                        transition="transform 0.2s ease"
                        _groupHover={{
                          transform: "translateX(3px)",
                        }}
                      >
                        <ArrowRight size={12} />
                      </Box>
                    </HStack>
                  </Button>
                </VStack>
              </VStack>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Services;
