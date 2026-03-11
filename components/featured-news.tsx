"use client";

import {
  Box,
  Card,
  Text,
  Image,
  VStack,
  HStack,
  Button,
  Badge,
} from "@chakra-ui/react";
import { ArrowRight, Clock, Calendar } from "lucide-react";

interface FeaturedNewsProps {
  image: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category?: string;
}

export const FeaturedNews = ({
  image,
  title,
  excerpt,
  date,
  readingTime,
  category = "Featured",
}: FeaturedNewsProps) => {
  return (
    <Card.Root
      borderRadius="xl"
      overflow="hidden"
      bg="white"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
      mb={{ base: "6", md: "8" }}
    >
      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap="0"
      >
        {/* Image Section */}
        <Box
          position="relative"
          overflow="hidden"
          height={{ base: "300px", md: "400px" }}
        >
          <Image
            src={image}
            alt={title}
            width="100%"
            height="100%"
            objectFit="cover"
            transition="transform 0.3s ease"
            _hover={{ transform: "scale(1.05)" }}
          />
        </Box>

        {/* Content Section */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p={{ base: "6", md: "8" }}
          bg="white"
        >
          <VStack align="start" gap="4" flex="1">
            <Badge
              colorPalette="green"
              variant="solid"
              fontSize="xs"
              fontWeight="600"
              px="3"
              py="1"
            >
              {category}
            </Badge>

            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="700"
              color="gray.900"
              lineHeight="1.3"
            >
              {title}
            </Text>

            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.600"
              lineHeight="1.6"
            >
              {excerpt}
            </Text>
          </VStack>

          <VStack align="start" gap="4" pt="4">
            <HStack
              gap="6"
              fontSize={{ base: "sm", md: "md" }}
              color="gray.500"
              flexWrap={{ base: "wrap", md: "nowrap" }}
            >
              <HStack gap="2">
                <Calendar size={18} />
                <Text>{date}</Text>
              </HStack>
              <HStack gap="2">
                <Clock size={18} />
                <Text>{readingTime}</Text>
              </HStack>
            </HStack>

            <Button
              size={{ base: "md", md: "lg" }}
              bg="green.600"
              color="white"
              fontWeight="600"
              _hover={{
                bg: "green.700",
                transform: "translateX(4px)",
              }}
              transition="all 0.3s ease"
              gap="2"
            >
              Read Full Article
              <ArrowRight size={20} />
            </Button>
          </VStack>
        </Box>
      </Box>
    </Card.Root>
  );
};
