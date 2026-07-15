// OrderSummary component - updated to handle single or multiple items
"use client";
import React from "react";
import {
  Text,
  Image,
  Flex,
  Box,
  Heading,
  HStack,
  VStack,
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

const formatPeso = (value: number | string) =>
  Number(value ?? 0).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const OrderSummary: React.FC<{
  cartItems?: CartItem[];
  action?: React.ReactNode;
}> = ({ cartItems, action }) => {
  if (!cartItems || cartItems.length === 0) return null;

  const bg = "white";
  const muted = "gray.600";

  const grandTotal = cartItems.reduce(
    (sum, item) => sum + Number(item.total),
    0,
  );

  const itemCount = cartItems.length;

  return (
    <Box
      pb={{ base: "6rem", md: 0 }}
      // Fill the viewport on desktop so a short order (few items) still pushes
      // the desktop-only footer to the bottom instead of leaving a white gap.
      // Offset = top chrome (~144px) + page shell bottom padding (120px) +
      // footer (~390px); it's constant per viewport, so vh scales correctly.
      minH={{ base: "auto", lg: "calc(100vh - 640px)" }}
    >
      {/* One unified card on desktop/tablet. On mobile the items render as
          separate cards and the totals live in the fixed bottom bar below. */}
      <Box
        bg={{ base: "transparent", md: bg }}
        borderWidth={{ base: "0", md: "1px" }}
        borderColor="gray.200"
        borderRadius={{ base: "0", md: "2xl" }}
        boxShadow={{ md: "sm" }}
        p={{ base: 0, md: 6 }}
      >
        <Heading as="h2" size="sm" color="gray.800" mb={4}>
          Order items ({itemCount})
        </Heading>

        <VStack gap={{ base: 4, md: 0 }} align="stretch">
          {cartItems.map((item, idx) => {
            const unitPrice = Number(item.price ?? item.ipInstAmt ?? 0);
            const isLast = idx === cartItems.length - 1;

            return (
              <Flex
                key={idx}
                gap={{ base: 3, md: 4 }}
                px={{ base: 3, md: 0 }}
                py={{ base: 3, md: 5 }}
                bg={{ base: bg, md: "transparent" }}
                borderColor={{ base: "gray.200", md: "gray.100" }}
                borderWidth={{ base: "1px", md: "0" }}
                borderBottomWidth={{ base: "1px", md: isLast ? "0" : "1px" }}
                borderRadius={{ base: "xl", md: "0" }}
                align="stretch"
                transition="box-shadow 0.2s ease, border-color 0.2s ease"
                _hover={{
                  borderColor: { base: "green.200", md: "gray.100" },
                  boxShadow: { base: "sm", md: "none" },
                }}
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

                  {/* Content: name/badges anchored top, price math anchored bottom */}
                  <Flex
                    direction="column"
                    flex="1"
                    minW={0}
                    justify="space-between"
                    gap={3}
                  >
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
                      <HStack gap={2} mt={1.5} wrap="wrap">
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

                    {/* Price math: unit × qty = line total, aligned end-to-end */}
                    <Flex
                      justify="space-between"
                      align="baseline"
                      gap={3}
                      borderTopWidth="1px"
                      borderColor="gray.100"
                      pt={2.5}
                    >
                      <Text fontSize="sm" color={muted} minW={0} lineClamp={1}>
                        ₱{formatPeso(unitPrice)}
                        <Box as="span" color="gray.400" px={1}>
                          ×
                        </Box>
                        <Box as="span" fontWeight="600" color="gray.700">
                          {item.quantity}
                        </Box>
                      </Text>
                      <Text
                        fontWeight="bold"
                        color="gray.900"
                        whiteSpace="nowrap"
                        flexShrink={0}
                      >
                        ₱{formatPeso(item.total)}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              );
            })}
        </VStack>

        {/* Totals — same unified card, desktop/tablet only */}
        <Box
          as="section"
          aria-label="Order summary"
          display={{ base: "none", md: "block" }}
          borderTopWidth="1px"
          borderColor="gray.200"
          mt={2}
          pt={6}
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
      </Box>

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
