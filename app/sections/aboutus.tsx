"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Box, Flex, Text } from "@chakra-ui/react";
// import { base } from "motion/react-client";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const testimonials = [
  {
    quote:
      "I believe that St. Peter is a good and credible company that delivers their services with excellence and they complied with everything that they had promised to us, as their clients. I will definitely recommend St. Peter to my family and friends.",
    name: "Mrs. Anadina C. Felomino",
    title: "Koronadal Branch · St. Peter Planholder since 1995",
  },
  {
    quote:
      "I decided to buy a policy for me and my husband because ever since I was always interested in insurance for future purposes. The plans are worth the purchase. I have a reliable Sales Agent with good character and relationship towards me and my other colleagues who have also purchased from them. The staff & personnel are very accommodating, responsive and courteous. Thank you St Peter.",
    name: "Mila T. Garcia",
    title:
      "Butuan East and Butuan West Branches · St. Peter Planholder since 1999",
  },
  {
    quote:
      "Ako po si Yolanda Laberon Eclipse, planholder ng St. Peter Life Plan ay nagsasabing naging maganda ang serbisyo ng kumpanya sa akin at sa aking pamilya. Nang matapos kong mahulugan for 5 years ang aking first plan it was assigned to my father back in 2012. The purpose of having or buying a St. Peter Life Plan is to be secured. Being a planholder feels good! Now, I got 3 St. Peter Life Plans and I will really recommend more people to be the future clients of the company.",
    name: "Yolanda L. Eclipse",
    title: "Catbalogan Branch · St. Peter Planholder since 2005",
  },
  {
    quote:
      "I’ve been a member for almost 12 years and I already started to receive my Return of Premium. I also received cash assistance when my daughter passed away last October 2007. I’m very satisfied with the way they provide service to my daughter and even received cash assistance when my daughter passed away last year. Aside from the beautiful service, they assisted me when I it needed the most. Thank you so much and more power to the company.",
    name: "Juanita C. Intong",
    title: "Mandaue Branch · St. Peter Planholder since 2007",
  },
  {
    quote:
      "Back then, I was not a believer in pre-need plans and the thought of investing in one (no less than my own deathcare services!) was a bit morbid to me. But the future of every person is uncertain yet death will certainly come to everyone like a thief in the night. Being a planholder of St. Peter Life Plan gives me the security and assurance that at the end of my life, my family will not be burdened financially and that a good company will be assisting them in their time of grief. I am proud to say that I am a grateful and happy St. Peter planholder.",
    name: "Jocelyn S. Ongdico",
    title: "Meycauayan Branch · St. Peter Planholder since 2010",
  },
  {
    quote:
      "I decided to buy a plan because nowadays, it is very expensive to die. My experience as a planholder is very fulfilling in a sense that we have a very accommodating sales agent and our family received a very commendable service extended by their Bais Chapel during the death of my brother. With my experience with St. Peter, I even bought 2 more life plans so that I have spare plans that I can share in case one of my family or relatives need it.",
    name: "Cristina Jumawan",
    title: "Dumaguete Branch · St. Peter Planholder",
  },
];
const AboutUs = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <section className="overflow-hidden">
      <Box w="full">
        <Flex
          ref={ref}
          direction={{ base: "column", md: "row" }}
          justify="center"
          align="center"
          gap={{ base: 8, md: 32 }}
          mb={8}
          bg="gray.50"
          px={{ base: 4, md: 8 }}
          py={{ base: 8, md: 12 }}
        >
          {/* Left Text */}
          <Box p={4} textAlign={{ base: "center", md: "left" }}>
            <Text fontSize="3xl" fontWeight="bold">
              Serving the Filipino
            </Text>
            <Text fontSize="3xl" fontWeight="bold" color="#177D54">
              Since 1975
            </Text>
            <Text
              fontSize="md"
              maxW={{ base: "90%", md: "400px" }}
              mt={4}
              mx="auto"
            >
              We are a trusted Pre-Need DeathCare company, serving the Filipino
              public for over 30 years with professional and traditional
              memorial services and affordable life plans for every family.
            </Text>
          </Box>

          {/* Right Stats */}
          <Flex
            direction={{ base: "row", md: "column" }}
            gap={{ base: 8, md: 4 }}
            justify="center"
            mt={{ base: 4, md: 0 }}
          >
            <Flex direction="column" align="center">
              <Text fontSize="3xl" color="#177D54" fontWeight="bold">
                {inView && <CountUp start={0} end={280} duration={2.5} />}
              </Text>
              <Text fontSize="3xl" fontWeight="bold">
                Chapels
              </Text>
            </Flex>
            <Flex direction="column" align="center">
              <Text fontSize="3xl" color="#177D54" fontWeight="bold">
                {inView && <CountUp start={0} end={200} duration={2.5} />}
              </Text>
              <Text fontSize="3xl" fontWeight="bold">
                Branches
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {/* Testimonials */}
        <Box p={8}>
          <Flex direction="column" align="center" textAlign="center" mb={8}>
            <Text fontSize="3xl" fontWeight="bold">
              Testimonials
            </Text>
            <Box
              h="3px"
              w="100px"
              bg="green.700"
              borderRadius="full"
              mt={2}
              mb={4}
            />
          </Flex>

          <Flex justify="center" align="center" mb={8}>
            <InfiniteMovingCards
              items={testimonials}
              direction="left"
              speed="slow"
            />
          </Flex>
        </Box>
      </Box>
    </section>
  );
};

export default AboutUs;
