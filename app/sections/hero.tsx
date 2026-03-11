"use client";

import Search from "@/components/ui/search";
import { Box, Flex, Span, Stack, VStack, chakra } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { H1, H3, Body, DynamicButton, BuyNowButton } from "st-peter-ui";

const Hero = () => {
  const router = useRouter();
  const placeholders = [
    "St. Peter Life Plan",
    "Most affordable plan",
    "St. Anne",
  ];

  return (
    <Box
      position="relative"
      h={{ base: "100%", md: "100vh" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <chakra.video
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="100%"
        h="100%"
        objectFit="cover"
        objectPosition="center"
        autoPlay
        loop
        muted
        playsInline
        pointerEvents="none"
      >
        <source src="/video/hero-bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </chakra.video>

      <Box position="absolute" inset={0} bg="blackAlpha.600" h="100%" />
      <Box zIndex={2} maxW={{ base: "full", md: "7xl" }} w={{ base: "100%" }}>
        <VStack
          alignItems="start"
          gap={8}
          py={{ base: 8, md: 0 }}
          px={{ base: 4, md: 0 }}
          color="white"
        >
          <H1 color="white">
            Para sa Magandang Kinabukasan: Bawat Pilipino, Dapat may{" "}
            <Span className="text-[#177D54]">St. Peter Life Plan</Span>.
          </H1>
          <H3 color="white">Protect your loved ones with a plan that cares.</H3>
          <Box mt={4} w="full" maxW={{ md: "2xl" }}>
            <Search />
          </Box>

          <Stack
            alignItems={{ base: "start", md: "center" }}
            direction={{ base: "column", md: "row" }}
            w={{ base: "full" }}
            gap={4}
          >
            <Body color="white">Frequently searched:</Body>
            {placeholders.map((term, i) => (
              <Box
                key={i}
                as="button"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                px={{ base: 3, md: 4 }}
                py={{ base: 2, md: 3 }}
                maxW={{ base: "full", md: "240px" }}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                layerStyle="outline.solid"
                color="white"
                borderRadius="xl"
                borderColor="white"
                cursor="pointer"
                fontSize={{ base: "sm", md: "md" }}
                _hover={{ bg: "whiteAlpha.200" }}
                aria-label={`Search ${term}`}
              >
                <Body color="white">{term}</Body>
              </Box>
            ))}
          </Stack>

          <Flex
            // direction={{ base: "row", md: "row" }}
            justify={{ base: "space-between", md: "flex-start" }}
            gap={4}
            w={{ base: "full" }}
          >
            <DynamicButton label="PAY MY PLAN" />

            {/* <DynamicButton
              label="BUY NOW"
              onClick={() => router.push("/plans")}
            /> */}
            <BuyNowButton onClick={() => router.push("/plans")} />
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};

export default Hero;
