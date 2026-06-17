"use client";

import { Check, MapPin, Phone, Clock, Navigation } from "lucide-react";
import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  Badge,
  Menu,
  Portal,
  Link,
  VStack,
} from "@chakra-ui/react";
import { SiGooglemaps, SiWaze } from "react-icons/si";

function formatPhilippineNumber(contactNo: string): string {
  const digits = contactNo.replace(/[^+\d]/g, "");
  // Normalize to local 10-digit number
  let local = digits;
  if (digits.startsWith("+63")) local = digits.slice(3);
  else if (digits.startsWith("63")) local = digits.slice(2);
  else if (digits.startsWith("0")) local = digits.slice(1);
  // Format: +63 XXX-XXX-XXXX
  if (local.length === 10) {
    return `+63 ${local.slice(0, 3)}-${local.slice(3, 6)}-${local.slice(6)}`;
  }
  return contactNo;
}

export default function ChapelCard({
  name,
  address,
  contacts,
  distance,
  earliestDate,
  selected = false,
  onSelect,
}: any) {
  const openGoogleMaps = (destination: string) => {
    const encoded = encodeURIComponent(destination);
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encoded}&travelmode=driving`,
      "_blank",
    );
  };

  const openWaze = (destination: string) => {
    const encoded = encodeURIComponent(destination);
    window.open(`https://waze.com/ul?q=${encoded}&navigate=yes`, "_blank");
  };

  return (
    <Box
      w="100%"
      position="relative"
      p={4}
      borderRadius="2xl"
      bg={selected ? "#388e3c15" : "white"}
      border="1px solid"
      borderColor={selected ? "green.600" : "gray.200"}
      shadow="sm"
      transition="all 0.25s ease"
      _hover={{
        transform: "translateY(-3px)",
        shadow: "lg",
      }}
      overflow="hidden">
      {/* ================= HEADER ================= */}
      <Flex justify="space-between" align="start" mb={3}>
        <Box>
          <Flex align="center" gap={2}>
            <Navigation size={16} />
            <Text fontWeight="bold" fontSize="md" lineHeight="1.2">
              {name}
            </Text>
          </Flex>

          <Flex align="center" gap={1} mt={1}>
            <MapPin size={12} />
            <Text fontSize="xs" color="gray.500">
              {address.length > 40 ? address.slice(0, 40) + "..." : address}
            </Text>
          </Flex>
        </Box>

        <Badge
          bg="green.100"
          color="green.700"
          px={2}
          py={1}
          rounded="full"
          fontSize="xs">
          {distance}
        </Badge>
      </Flex>

      {/* ================= QUICK INFO ================= */}
      {earliestDate && (
        <Box
          mb={3}
          px={2}
          py={1}
          fontSize="xs"
          borderRadius="full"
          bg="green.50"
          color="green.800"
          fontWeight="semibold"
          display="flex"
          alignItems="center"
          gap={1}>
          <Clock size={12} />
          Earliest: {earliestDate}
        </Box>
      )}

      {/* ================= CONTACTS (UPDATED CHIP STYLE) ================= */}
      <VStack align="start" gap={2} px={1}>
        <Flex gap={2} wrap="wrap">
          {contacts.map((num: string) => {
            const formatted = formatPhilippineNumber(num);

            return (
              <Link
                key={num}
                href={`tel:${num.replace(/[^+\d]/g, "")}`}
                _hover={{ textDecoration: "none" }}>
                <Box
                  px={2}
                  py={1}
                  fontSize="xs"
                  borderRadius="full"
                  bg="blue.50"
                  color="blue.600"
                  _hover={{ bg: "blue.100", transform: "translateY(-1px)" }}
                  display="inline-flex"
                  alignItems="center"
                  gap={1}
                  cursor="pointer"
                  transition="all 0.2s ease">
                  📞 {formatted}
                </Box>
              </Link>
            );
          })}
        </Flex>
      </VStack>

      {/* ================= FOOTER ACTION ================= */}
      <Flex justify="space-between" align="center" mt={4}>
        <Text fontSize="xs" color="gray.400">
          Tap for actions
        </Text>

        <HStack gap={2}>
          <Button
            size="sm"
            colorPalette="red"
            bg="green.600"
            _hover={{ bg: "green.700" }}
            rounded="xl"
            onClick={onSelect}>
            <Check size={16} />
            {selected ? "Selected" : "Select"}
          </Button>

          <Menu.Root>
            <Menu.Trigger asChild>
              <Button
                size="sm"
                bg="gray.300"
                color="gray.700"
                _hover={{ bg: "gray.400" }}
                rounded="xl">
                <Navigation size={16} />
                Route
              </Button>
            </Menu.Trigger>

            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    value="google-maps"
                    onClick={() => openGoogleMaps(address)}>
                    <SiGooglemaps style={{ marginRight: 6 }} />
                    Google Maps
                  </Menu.Item>

                  <Menu.Item value="waze" onClick={() => openWaze(address)}>
                    <SiWaze style={{ marginRight: 6 }} />
                    Waze
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </HStack>
      </Flex>
    </Box>
  );
}
