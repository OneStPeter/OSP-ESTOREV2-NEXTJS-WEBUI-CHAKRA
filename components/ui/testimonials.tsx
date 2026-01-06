"use client";

import { Box, Grid, GridItem, Text, Avatar, VStack } from "@chakra-ui/react";

export interface TestimonialItem {
  quote: string;
  name: string;
  branch: string;
  planholderSince: string;
}

interface TestimonialsProps {
  testimonials: TestimonialItem[];
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap={6}
      w="7xl"
    >
      {testimonials.map((item, idx) => (
        <GridItem
          key={idx}
          bg="gray.50"
          color="black"
          p={6}
          rounded="lg"
          // border="1px solid #1A1A1A"
          minH="260px"
        >
          <VStack align="start" gap={4}>
            {/* <Avatar name={item.name} size="md" /> */}

            <Box>
              <Text fontWeight="bold">{item.name}</Text>
              <Text fontSize="sm" opacity={0.8}>
                {item.branch}
              </Text>
              <Text fontSize="xs" opacity={0.6}>
                {item.planholderSince}
              </Text>
            </Box>

            <Text fontSize="sm" lineHeight="1.6" color="gray.600">
              "{item.quote}"
            </Text>
          </VStack>
        </GridItem>
      ))}
    </Grid>
  );
};

export default Testimonials;
