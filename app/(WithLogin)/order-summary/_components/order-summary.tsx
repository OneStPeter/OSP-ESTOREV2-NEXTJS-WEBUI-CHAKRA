// OrderSummary component - updated to handle single or multiple items
"use client";
import React from "react";
import { IPlans } from "@/types/product";
import {
  Text,
  Grid,
  GridItem,
  Image,
  Flex,
  Box,
  Heading,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react";
import { Body, Breadcrumb, H3, H4 } from "st-peter-ui";
import { CartItem } from "@/types/cartItem";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

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

const formatPeso = (value: number | string) =>
  Number(value ?? 0).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const OrderSummary: React.FC<{
  cartItems?: CartItem[];
  action?: React.ReactNode;
}> = ({ cartItems, action }) => {
  const router = useRouter();
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Order Summary", href: "#" },
  ];

  if (!cartItems || cartItems.length === 0) return null;

  const bg = "white";
  const muted = "gray.600";

  const grandTotal = cartItems.reduce(
    (sum, item) => sum + Number(item.total),
    0,
  );

  const itemCount = cartItems.length;

  return (
    <Box pb={{ base: "6rem", md: 0 }}>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "minmax(0, 1fr) minmax(320px, 360px)",
        }}
        gap={{ base: 6, lg: 8 }}
        alignItems="start"
      >
        {/* ── Left column: order items ─────────────────────────────── */}
        <GridItem minW={0}>
          <Heading as="h2" size="sm" color="gray.800" mb={4}>
            Order items ({itemCount})
          </Heading>

          <VStack gap={4} align="stretch">
            {cartItems.map((item, idx) => {
              const unitPrice = Number(item.price ?? item.ipInstAmt ?? 0);

              return (
                <Flex
                  key={idx}
                  gap={{ base: 3, md: 4 }}
                  p={{ base: 3, md: 4 }}
                  bg={bg}
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="xl"
                  align="stretch"
                  transition="box-shadow 0.2s ease, border-color 0.2s ease"
                  _hover={{ borderColor: "green.200", shadow: "sm" }}
                >
                  <Image
                    src={`/images/plan-images/${item.planDesc}.jpg`}
                    alt={item.planDesc}
                    borderRadius="lg"
                    objectFit="cover"
                    flexShrink={0}
                    w={{ base: "72px", md: "96px" }}
                    h={{ base: "72px", md: "96px" }}
                  />

                  <Flex direction="column" flex="1" minW={0} gap={2}>
                    {/* Name + subtotal */}
                    <Flex justify="space-between" align="start" gap={3}>
                      <Box minW={0}>
                        <Heading
                          as="h3"
                          size="sm"
                          color="gray.900"
                          lineHeight="1.25"
                          lineClamp={2}
                        >
                          {item.planDesc}
                        </Heading>
                        <HStack gap={2} mt={1} wrap="wrap">
                          <Box
                            as="span"
                            display="inline-flex"
                            alignItems="center"
                            px={2}
                            py={0.5}
                            borderRadius="full"
                            bg="green.50"
                            color="green.800"
                            fontSize="xs"
                            fontWeight="700"
                          >
                            {getModeLabel(item.mode)}
                          </Box>
                          {item.planTerm ? (
                            <Text fontSize="xs" color={muted}>
                              Term: {item.planTerm}
                            </Text>
                          ) : null}
                        </HStack>
                      </Box>

                      <Text
                        fontWeight="bold"
                        color="gray.900"
                        whiteSpace="nowrap"
                        flexShrink={0}
                      >
                        ₱{formatPeso(item.total)}
                      </Text>
                    </Flex>

                    {/* Unit price × quantity */}
                    <Flex
                      justify="space-between"
                      align="center"
                      gap={3}
                      mt="auto"
                    >
                      <Text fontSize="sm" color={muted}>
                        ₱{formatPeso(unitPrice)}
                        <Box as="span" color="gray.400" px={1}>
                          ×
                        </Box>
                        <Box as="span" fontWeight="600" color="gray.700">
                          {item.quantity}
                        </Box>
                      </Text>
                      <Text
                        fontSize="sm"
                        color={muted}
                        whiteSpace="nowrap"
                        aria-label={`Quantity ${item.quantity}`}
                      >
                        Qty: {item.quantity}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              );
            })}
          </VStack>
        </GridItem>

        {/* ── Right column: Order Summary card (tablet + desktop) ──── */}
        <GridItem display={{ base: "none", md: "block" }}>
          <Box
            as="section"
            aria-label="Order summary"
            position={{ base: "static", lg: "sticky" }}
            top={{ lg: "90px" }}
            bg={bg}
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="2xl"
            shadow="sm"
            p={{ base: 5, md: 6 }}
          >
            <Heading as="h2" size="md" color="gray.900" mb={5}>
              Order Summary
            </Heading>

            <VStack gap={3} align="stretch">
              <HStack justify="space-between" align="baseline">
                <Text color={muted}>
                  Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                </Text>
                <Text fontWeight="medium" color="gray.500" whiteSpace="nowrap">
                  ₱{formatPeso(grandTotal)}
                </Text>
              </HStack>
              {/* Fees / discounts render here when the model provides them. */}
            </VStack>

            <Box h="1px" bg="gray.200" my={5} />

            <HStack justify="space-between" align="baseline">
              <Text fontSize="lg" fontWeight="bold" color="gray.800">
                Grand Total
              </Text>
              <Text
                fontSize="md"
                fontWeight="extrabold"
                color="black"
                whiteSpace="nowrap"
                lineHeight="1.1"
              >
                ₱{formatPeso(grandTotal)}
              </Text>
            </HStack>

            {action ? <Box mt={6}>{action}</Box> : null}
          </Box>
        </GridItem>
      </Grid>

      {/* ── Mobile: fixed bottom checkout bar (Grand Total + action) ── */}
      <Flex
        as="section"
        aria-label="Order total and checkout"
        display={{ base: "flex", md: "none" }}
        position="fixed"
        left={4}
        right={4}
        bottom="calc(6rem + env(safe-area-inset-bottom))"
        zIndex={20}
        align="center"
        gap={3}
        bg={bg}
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="2xl"
        boxShadow="0 8px 30px rgba(0,0,0,0.14)"
        px={4}
        py={3}
      >
        <VStack align="start" gap={0} minW={0} flex="1">
          <Text
            fontSize="10px"
            fontWeight="700"
            color={muted}
            textTransform="uppercase"
            letterSpacing="0.06em"
          >
            Grand Total
          </Text>
          <Text
            fontSize="lg"
            fontWeight="extrabold"
            color="#177D54"
            whiteSpace="nowrap"
            lineClamp={1}
          >
            ₱{formatPeso(grandTotal)}
          </Text>
        </VStack>

        {action ? (
          <Box flexShrink={0} minW="150px">
            {action}
          </Box>
        ) : null}
      </Flex>
    </Box>
  );
};

export default OrderSummary;
