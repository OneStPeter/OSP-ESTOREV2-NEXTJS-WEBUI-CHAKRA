"use client";

import Search from "@/components/ui/search";
import { Box, Button, Stack, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Text } from "@chakra-ui/react";
import { PrimaryMdButton } from "st-peter-ui";

const Hero = () => {
  const router = useRouter();
  const placeholders = [
    "What is St. Peter Life Plan?",
    "How do I pay for my St. Peter plan?",
    "How to buy a St. Peter Life Plan online?",
    "What benefits does St. Peter Life Plan offer?",
    "Is there a most affordable St. Peter plan?",
  ];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video/hero-bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Poster image fallback for small screens */}
      {/* <div className="md:hidden absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div> */}
      <div className="absolute inset-0 bg-black/60 h-screen" />
      <Box
        zIndex={2}
        maxWidth={"7xl"}
        w={{ base: "100%" }}
        mt={{ base: 24, md: 0 }}
      >
        <VStack alignItems={"start"} gap={8} padding={8} className="text-white">
          <Text textStyle={{ base: "2xl", md: "6xl" }} fontWeight="bold">
            Para sa Magandang Kinabukasan: Bawat Pilipino, Dapat may{" "}
            <span className="text-[#177D54]">St. Peter Life Plan</span>.
          </Text>
          <Text textStyle={{ base: "xl", md: "3xl" }}>
            Protect your loved ones with a plan that cares.
          </Text>

          <div className="mt-4 w-full md:max-w-2xl">
            <Search />
          </div>

          <Stack
            // display={{ base: "none", md: "flex" }}
            alignItems={{ base: "start", md: "center" }}
            direction={{ base: "column", md: "row" }}
            w={{ base: "full" }}
            gap={4}
          >
            <Text>Frequently searched:</Text>
            {["St. Peter Life Plan", "Most affordable plan", "St. Anne"].map(
              (term, i) => (
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
                  {term}
                </Box>
              )
            )}
          </Stack>

          <Stack
            direction={{ base: "column", md: "row" }}
            gap={4}
            w={{ base: "full" }}
          >
            <PrimaryMdButton>PAY MY PLAN</PrimaryMdButton>
            <PrimaryMdButton onClick={() => router.push("/plans")}>
              BUY NOW
            </PrimaryMdButton>
          </Stack>
        </VStack>
      </Box>
    </section>
  );
};

export default Hero;
