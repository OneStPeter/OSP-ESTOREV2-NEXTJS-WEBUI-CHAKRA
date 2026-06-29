"use client";

import {
  Box,
  Flex,
  Stack,
  Input,
  RadioGroup,
  HStack,
  Text,
  Group,
  IconButton,
} from "@chakra-ui/react";
import { PrimarySmButton } from "st-peter-ui";
import OpenLayersMap from "./OpenLayersMap";
import ChapelCard from "./ChapelCard";
import { useEffect, useState, useMemo } from "react";
import { LuX } from "react-icons/lu";
import { MdCheck, MdMyLocation } from "react-icons/md";
import { Tooltip } from "@/components/ui/tooltip";

interface BookingLocationProps {
  onSelectChapel: (chapel: {
    id: number;
    name: string;
    address: string;
    contacts: string[];
  }) => void;
  onLocationChange?: (address: string) => void;
}

const chapelList = [
  {
    id: 1,
    name: "QUEZON AVE",
    address: "296 QUEZON AVENUE, QUEZON CITY",
    contacts: ["+63283717762", "+639178873737", "+639992281375"],
    distance: "5.41 km",
    distanceValue: 5.41,
  },
  {
    id: 2,
    name: "COMMONWEALTH",
    address: "COMMONWEALTH AVE. MATANDANG BALARA, QUEZON CITY",
    contacts: ["+63289520857", "+63289325341", "+639992281451"],
    distance: "5.56 km",
    distanceValue: 5.56,
  },
  {
    id: 3,
    name: "LA LOMA",
    address: "C3 ROAD BRGY. 123 CALOOCAN CITY",
    contacts: ["+63287141130", "+639174728826", "+639086326371"],
    distance: "6.5 km",
    distanceValue: 6.5,
  },
  {
    id: 4,
    name: "CUBAO",
    address: "135 20TH AVENUE, SAN ROQUE, QUEZON CITY",
    contacts: [
      "+63283611023",
      "+63283648716",
      "+639274116147",
      "+639286953834",
    ],
    distance: "7.81 km",
    distanceValue: 7.81,
  },
  {
    id: 5,
    name: "MAYON",
    address: "BRB BLDG. 230 A. BONIFACIO COR. MAYON ST., QUEZON CITY",
    contacts: ["+63287417013", "+639996660401"],
    distance: "9.8 km",
    distanceValue: 9.8,
  },
];

const BookingLocation = ({
  onSelectChapel,
  onLocationChange,
}: BookingLocationProps) => {
  const DEFAULT_ADDRESS =
    "St. Peter Corporate Center, 999, EDSA, Veterans Village, Project 7, 1st District, Quezon City, Eastern Manila District, Metro Manila, 1105, Philippines";

  const [address, setAddress] = useState(DEFAULT_ADDRESS);

  const handleResetToDefault = () => {
    setAddress(DEFAULT_ADDRESS);
    setSearchAddress(DEFAULT_ADDRESS);
    onLocationChange?.(DEFAULT_ADDRESS);
  };

  const [chapelFilter, setChapelFilter] = useState<"nearest" | "all">(
    "nearest",
  );
  const [selectedChapel, setSelectedChapel] = useState<number>(
    chapelList[0].id,
  );

  const [searchAddress, setSearchAddress] = useState<string>("");
  const [searchChapel, setSearchChapel] = useState<string>("");

  useEffect(() => {
    const defaultChapel = chapelList.find((c) => c.id === selectedChapel);
    if (defaultChapel) {
      onSelectChapel({
        id: defaultChapel.id,
        name: defaultChapel.name,
        address: defaultChapel.address,
        contacts: defaultChapel.contacts,
      });
    }
  }, []);

  const handleUpdate = () => {
    if (!address.trim()) return;
    setSearchAddress(address.trim());
    onLocationChange?.(address.trim());
  };

  const handleSelectChapel = (chapel: (typeof chapelList)[0]) => {
    setSelectedChapel(chapel.id);
    onSelectChapel({
      id: chapel.id,
      name: chapel.name,
      address: chapel.address,
      contacts: chapel.contacts,
    });
  };

  const filteredChapels = useMemo(() => {
    let list = [...chapelList];

    // 1. Sort by distance if nearest mode
    if (chapelFilter === "nearest") {
      list.sort((a, b) => a.distanceValue - b.distanceValue);
    }

    // 2. Apply search filter
    if (searchChapel.trim()) {
      const q = searchChapel.toLowerCase();

      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.address.toLowerCase().includes(q),
      );
    }

    // 3. Apply nearest limit ONLY when no search is active
    if (chapelFilter === "nearest" && !searchChapel.trim()) {
      list = list.slice(0, 3);
    }

    return list;
  }, [chapelFilter, searchChapel]);

  return (
    <Flex gap={4} direction={{ base: "column", md: "row" }}>
      {/* Left */}
      <Stack flex="1" gap={3}>
        <Box>
          <Text fontWeight="semibold" fontSize="md">
            Pin location
          </Text>
          <Text fontSize="sm" color="gray.600">
            Move the pin or search for the retrieval location.
          </Text>
        </Box>
        <Stack direction={{ base: "column", sm: "row" }} gap={2}>
          <Group attached flex="1">
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // prevents form submit if inside form
                  handleUpdate();
                }
              }}
              placeholder="Enter exact address"
              size="sm"
              borderColor="gray.300"
              _focus={{ ring: 2, ringColor: "#109448" }}
            />
            {!address && (
              <Tooltip content="Use default location" openDelay={300}>
                <IconButton
                  aria-label="Use default location"
                  size="sm"
                  borderRadius={5}
                  variant="outline"
                  onClick={handleResetToDefault}
                >
                  <MdMyLocation />
                </IconButton>
              </Tooltip>
            )}

            {address && (
              <Flex gap={0}>
                <Tooltip content="Use this location" openDelay={300}>
                  <IconButton
                    aria-label="Use this location"
                    size="sm"
                    variant="outline"
                    color="#109448"
                    borderRadius={5}
                    onClick={handleUpdate}
                  >
                    <MdCheck />
                  </IconButton>
                </Tooltip>
                <Tooltip content="Use default location" openDelay={300}>
                  <IconButton
                    aria-label="Use default location"
                    size="sm"
                    variant="outline"
                    borderRadius={5}
                    onClick={handleResetToDefault}
                  >
                    <MdMyLocation />
                  </IconButton>
                </Tooltip>
                <Tooltip content="Clear address" openDelay={300}>
                  <IconButton
                    aria-label="Clear address"
                    size="sm"
                    variant="ghost"
                    color="red.500"
                    _hover={{
                      bg: "red.50",
                      color: "red.600",
                    }}
                    onClick={() => setAddress("")}
                  >
                    <LuX />
                  </IconButton>
                </Tooltip>
              </Flex>
            )}
          </Group>

          {/* <PrimarySmButton
            w={{ base: "full", sm: "auto" }}
            onClick={handleUpdate}
          >
            Update Location
          </PrimarySmButton> */}
        </Stack>

        <Box
          h={{ base: "300px", md: "400px" }}
          borderWidth="1px"
          rounded="lg"
          overflow="hidden"
        >
          <OpenLayersMap
            initial={{ lat: 14.6559, lng: 121.02644 }}
            onChange={(coords) => {
              const newAddress =
                coords.address || `${coords.lat}, ${coords.lng}`;
              setAddress(newAddress);
              onLocationChange?.(newAddress);
            }}
            search={searchAddress}
          />
        </Box>
      </Stack>

      {/* Right */}
      <Flex
        direction="column"
        borderWidth="1px"
        rounded="lg"
        p={3}
        flex="1"
        h={{ base: "500px", md: "500px" }}
        maxW={{ base: "full", md: "450px" }}
        minH={0}
      >
        {/* Filter */}
        <RadioGroup.Root
          value={chapelFilter}
          onValueChange={(e) => {
            const val = typeof e === "string" ? e : (e as any).value;
            if (val === "nearest" || val === "all") {
              setChapelFilter(val);
            }
          }}
          variant="outline"
          colorPalette="teal"
          mb={2}
        >
          <HStack gap={4} wrap="wrap">
            <RadioGroup.Item value="nearest" minW="120px">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Nearest Chapels</RadioGroup.ItemText>
            </RadioGroup.Item>

            <RadioGroup.Item value="all" minW="120px">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>All Chapels</RadioGroup.ItemText>
            </RadioGroup.Item>
          </HStack>
        </RadioGroup.Root>
        {/* Chapel Search */}

        {/* List */}

        <Flex
          justify="space-between"
          align="center"
          mb={3}
          px={3}
          py={2}
          borderRadius="md"
          bg="gray.50"
          _dark={{ bg: "gray.800" }}
          border="1px solid"
          borderColor="gray.200"
        >
          <Text fontWeight="semibold" fontSize="sm">
            Available Chapels
          </Text>

          <Box
            px={2}
            py={0.5}
            borderRadius="full"
            bg="blue.50"
            _dark={{ bg: "blue.900" }}
            border="1px solid"
            borderColor="blue.200"
          >
            <Text
              fontSize="xs"
              fontWeight="bold"
              color="blue.600"
              _dark={{ color: "blue.200" }}
            >
              {filteredChapels.length}{" "}
              {filteredChapels.length === 1 ? "chapel" : "chapels"}
            </Text>
          </Box>
        </Flex>

        <Input
          size="sm"
          placeholder="Search chapel name or address..."
          value={searchChapel}
          onChange={(e) => setSearchChapel(e.target.value)}
          mb={2}
        />

        <Box
          overflowY="auto"
          pr={1}
          minH={0}
          maxH={{ base: "450px", md: "none" }}
          css={{
            scrollbarWidth: "thin",
          }}
        >
          <Stack gap={2}>
            {filteredChapels.length === 0 ? (
              <Box
                textAlign="center"
                py={10}
                borderRadius="md"
                bg="gray.50"
                _dark={{ bg: "gray.800" }}
              >
                <Text fontSize="sm" color="gray.500">
                  No chapels found
                </Text>
              </Box>
            ) : (
              filteredChapels.map((chapel) => (
                <ChapelCard
                  key={chapel.id}
                  name={chapel.name}
                  address={chapel.address}
                  contacts={chapel.contacts}
                  distance={chapel.distance}
                  selected={selectedChapel === chapel.id}
                  onSelect={() => handleSelectChapel(chapel)}
                />
              ))
            )}
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default BookingLocation;
