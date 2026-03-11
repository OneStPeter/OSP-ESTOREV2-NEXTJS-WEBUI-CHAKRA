"use client";

import {
  Box,
  Card,
  Text,
  Image,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import { Heart, Clock, Calendar } from "lucide-react";

interface NewsCardProps {
  id: string;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  author?: string;
}

export const NewsCard = ({
  image,
  title,
  excerpt,
  date,
  readingTime,
  author,
}: NewsCardProps) => {
  return (
    <Card.Root
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="0 2px 8px rgba(0, 0, 0, 0.1)"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
        transform: "translateY(-2px)",
      }}
    >
      <Box
        position="relative"
        overflow="hidden"
        height={{ base: "200px", md: "240px" }}
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

      <Card.Body gap="4">
        <VStack align="start" gap="3" flex="1">
          <Text
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="600"
            color="green.700"
            textTransform="uppercase"
            letterSpacing="0.5px"
          >
            Trending
          </Text>

          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="700"
            color="gray.900"
            lineHeight="1.4"
            // noOfLines={2}
          >
            {title}
          </Text>

          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="gray.600"
            lineHeight="1.5"
            //noOfLines={2}
          >
            {excerpt}
          </Text>

          <HStack
            gap="4"
            fontSize={{ base: "xs", md: "sm" }}
            color="gray.500"
            pt="2"
          >
            <HStack gap="1">
              <Calendar size={16} />
              <Text>{date}</Text>
            </HStack>
            <HStack gap="1">
              <Clock size={16} />
              <Text>{readingTime}</Text>
            </HStack>
          </HStack>
        </VStack>
      </Card.Body>

      <Card.Footer
        borderTop="1px solid"
        borderColor="gray.200"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="xs" color="gray.500">
          {author || "By Staff"}
        </Text>
        <Button
          size="sm"
          bg="transparent"
          color="gray.600"
          _hover={{ color: "green.700" }}
          aria-label="Like article"
        >
          <Heart size={18} />
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};
