"use client";

import { Check, MapPin } from "lucide-react";
import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  Badge,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { SiGooglemaps, SiWaze } from "react-icons/si";

export interface ChapelCardProps {
  name: string;
  address: string;
  contacts: string[];
  distance: string;
  earliestDate?: string; // NEW: earliest available date
  selected?: boolean;
  onSelect: () => void;
}

export default function ChapelCard({
  name,
  address,
  contacts,
  distance,
  earliestDate,
  selected = false,
  onSelect,
}: ChapelCardProps) {
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
      borderWidth="1px"
      rounded="xl"
      p="4"
      shadow="sm"
      transition="colors"
      bg={selected ? "green.50" : "gray.100"}
      borderColor={selected ? "green.600" : "gray.200"}
    >
      {/* Top Row: Name + Distance */}
      <Flex justify="space-between" align="flex-start">
        <Text fontWeight="bold" fontSize="lg" color="gray.800">
          {name}
        </Text>
        <Badge
          bg="green.100"
          color="green.700"
          px="3"
          py="1"
          rounded="full"
          fontSize="xs"
          fontWeight="semibold"
        >
          {distance}
        </Badge>
      </Flex>

      {/* Address */}
      <Text color="gray.600" mt="2" wordBreak="break-word">
        {address}
      </Text>

      {/* Earliest Available Date */}
      {earliestDate && (
        <Text
          mt="2"
          fontSize="sm"
          fontWeight="semibold"
          color="green.800"
          // bg="green.50"

          p="1"
          rounded="md"
        >
          Earliest Available: {earliestDate}
        </Text>
      )}

      {/* Bottom Row: Contacts + Buttons */}
      <Flex
        mt="3"
        direction={{ base: "column", md: "row" }}
        align={{ base: "stretch", md: "flex-end" }}
        gap="3"
      >
        {/* Contacts */}
        <Text fontSize="sm" color="gray.700" wordBreak="break-word">
          {contacts.join(", ")}
        </Text>

        {/* Buttons */}
        <HStack
          gap="2"
          justify={{ base: "flex-start", md: "flex-end" }}
          flexShrink={0}
        >
          <Button
            size="sm"
            w="auto"
            colorScheme="green"
            bg="green.600"
            _hover={{ bg: "green.700" }}
            rounded="xl"
            onClick={onSelect}
          >
            <Check size={16} />
            {selected ? "Selected" : "Select"}
          </Button>

          {/* <Button
            size="sm"
            w="auto"
            bg="gray.300"
            color="gray.700"
            _hover={{ bg: "gray.400" }}
            rounded="xl"
            onClick={() => openGoogleMapsDirections(address)}
          >
            <MapPin size={16} />
            Direction
          </Button> */}

          <Menu.Root>
            <Menu.Trigger asChild>
              <Button
                size="sm"
                w="auto"
                bg="gray.300"
                color="gray.700"
                _hover={{ bg: "gray.400" }}
                rounded="xl"
              >
                <MapPin size={16} />
                Direction
              </Button>
            </Menu.Trigger>

            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    value="google-maps"
                    onClick={() => openGoogleMaps(address)}
                  >
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
