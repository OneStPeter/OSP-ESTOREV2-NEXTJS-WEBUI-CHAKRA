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
    contacts: ["(632) 8371-7762", "(0917) 887-3737", "(0999) 228-1375"],
    distance: "5.41 km",
    distanceValue: 5.41,
  },
  {
    id: 2,
    name: "COMMONWEALTH",
    address: "COMMONWEALTH AVE. MATANDANG BALARA, QUEZON CITY",
    contacts: ["(632) 8952-0857", "(632) 8932-5341", "(0999) 228-1451"],
    distance: "5.56 km",
    distanceValue: 5.56,
  },
  {
    id: 3,
    name: "LA LOMA",
    address: "C3 ROAD BRGY. 123 CALOOCAN CITY",
    contacts: ["(632) 8714-1130", "(0917) 472-8826", "(0908) 632-6371"],
    distance: "6.5 km",
    distanceValue: 6.5,
  },
  {
    id: 4,
    name: "CUBAO",
    address: "135 20TH AVENUE, SAN ROQUE, QUEZON CITY",
    contacts: [
      "(632) 8361-1023",
      "(632) 8364-8716",
      "(0927) 411-6147",
      "(0928) 695-3834",
    ],
    distance: "7.81 km",
    distanceValue: 7.81,
  },
  {
    id: 5,
    name: "MAYON",
    address: "BRB BLDG. 230 A. BONIFACIO COR. MAYON ST., QUEZON CITY",
    contacts: ["(632) 8741-7013", "(0999) 666-0401"],
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
    let list = chapelList;

    if (chapelFilter === "nearest") {
      list = [...list]
        .sort((a, b) => a.distanceValue - b.distanceValue)
        .slice(0, Math.max(3, Math.min(chapelList.length, 5)));
    }

    if (searchChapel.trim()) {
      const q = searchChapel.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.address.toLowerCase().includes(q),
      );
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
                  variant="outline"
                  onClick={handleResetToDefault}
                >
                  <MdMyLocation />
                </IconButton>
              </Tooltip>
            )}

            {address && (
              <HStack gap={0}>
                {/* Confirm */}
                <Tooltip content="Use this location" openDelay={300}>
                  <IconButton
                    aria-label="Use this location"
                    size="sm"
                    variant="outline"
                    color="#109448"
                    onClick={handleUpdate}
                  >
                    <MdCheck />
                  </IconButton>
                </Tooltip>
                {/* Reset to default */}
                <Tooltip content="Use default location" openDelay={300}>
                  <IconButton
                    aria-label="Use default location"
                    size="sm"
                    variant="outline"
                    onClick={handleResetToDefault}
                  >
                    <MdMyLocation />
                  </IconButton>
                </Tooltip>

                {/* Clear */}
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
              </HStack>
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
        <Input
          size="sm"
          placeholder="Search chapel name or address..."
          value={searchChapel}
          onChange={(e) => setSearchChapel(e.target.value)}
          mb={2}
        />

        {/* List */}
        <Box overflow="auto" pr={1} minH={0}>
          <Stack gap={2}>
            {filteredChapels.map((chapel) => (
              <ChapelCard
                key={chapel.id}
                name={chapel.name}
                address={chapel.address}
                contacts={chapel.contacts}
                distance={chapel.distance}
                selected={selectedChapel === chapel.id}
                onSelect={() => handleSelectChapel(chapel)}
              />
            ))}
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default BookingLocation;
