// OrderSummary component - updated to handle single or multiple items
"use client";
import React from "react";
import {
  Heading,
  Text,
  Grid,
  GridItem,
  Image,
  Flex,
  Box,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { CartItem } from "@/types/cartItem";

const getModeLabel = (mode: string) => {
  const modeMap: Record<string, string> = {
    M: "Monthly",
    Q: "Quarterly",
    S: "Semi-Annual",
    A: "Annual",
    C: "Cash",
  };
  return modeMap[mode] || mode;
};

const OrderSummary: React.FC<{ cartItems?: CartItem[] }> = ({ cartItems }) => {
  if (!cartItems || cartItems.length === 0) return null;

  const bg = "white";
  const muted = "gray.600";

  const grandTotal = cartItems.reduce(
    (sum, item) => sum + Number(item.total),
    0,
  );

  return (
    <Box>
      <Text fontWeight="semibold" fontSize="2xl" mb={4}>
        Order Summary
      </Text>

      <VStack gap={6} align="stretch">
        {cartItems.map((item, idx) => (
          <Box key={idx} bg={bg} borderRadius="md" p={4}>
            <Grid
              templateColumns={{ base: "1fr", md: "120px 1fr" }}
              gap={4}
              alignItems="center"
            >
              <GridItem>
                <Image
                  src={`/images/plan-images/${item.planDesc}.jpg`}
                  alt={item.planDesc}
                  borderRadius="md"
                  objectFit="cover"
                  w="full"
                  h={{ base: "160px", md: "120px" }}
                />
              </GridItem>

              <GridItem>
                <HStack justify="space-between" align="start">
                  <VStack align="start" gap={1}>
                    <Heading as="h3" size="md">
                      {item.planDesc}
                    </Heading>
                    <Text fontSize="sm" color={muted}>
                      {getModeLabel(item.mode)}
                    </Text>
                  </VStack>

                  <VStack align="end" gap={0}>
                    <Text fontWeight="bold">
                      ₱
                      {Number(item.price).toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                      })}
                    </Text>
                    <Text fontSize="sm" color={muted}>
                      per unit
                    </Text>
                  </VStack>
                </HStack>

                <Box h="1px" bg="gray.200" my={3} />

                <HStack justify="space-between">
                  <Text color={muted}>Quantity</Text>
                  <Text fontWeight="semibold">{item.quantity}</Text>
                </HStack>

                <HStack justify="space-between" pt={3}>
                  <Text fontWeight="bold">Subtotal</Text>
                  <Text fontWeight="bold" color="#109448">
                    ₱
                    {Number(item.total).toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                    })}
                  </Text>
                </HStack>
              </GridItem>
            </Grid>
          </Box>
        ))}

        <Box p={4} bg={bg} borderTop="2px solid black">
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="semibold">
              Grand Total
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="#109448">
              ₱
              {grandTotal.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
            </Text>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default OrderSummary;
