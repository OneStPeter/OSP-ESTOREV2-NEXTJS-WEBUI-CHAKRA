"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, Text, VStack, useClipboard } from "@chakra-ui/react";
import { Collapsible } from "@chakra-ui/react";

import { Map, User } from "lucide-react";
import { MdExpandMore } from "react-icons/md";

interface ReviewSubmitStepProps {
  selectedChapel: string;
  chapelAddress: string;
  chapelContacts: string[];
  retrievalLocation: string;
  formData: {
    deceasedFirstName: string;
    deceasedMiddleName: string;
    deceasedLastName: string;
    deceasedSuffix?: string;
    contactFirstName: string;
    contactMiddleName: string;
    contactLastName: string;
    contactSuffix: string;
    relationship: string;
    email: string;
    mobile: string;
  };
}

export default function ReviewSubmitStep({
  selectedChapel,
  chapelAddress,
  chapelContacts,
  retrievalLocation,
  formData,
}: ReviewSubmitStepProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const [openMap, setOpenMap] = useState({
    location: true,
    personal: true,
  });

  const toggle = (key: keyof typeof openMap) => {
    setOpenMap((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const fullName = [
    formData.deceasedLastName,
    formData.deceasedFirstName
      ? `${formData.deceasedFirstName}${
          formData.deceasedSuffix && formData.deceasedSuffix !== "None"
            ? ` ${formData.deceasedSuffix}`
            : ""
        }`
      : "",
    formData.deceasedMiddleName,
  ]
    .filter(Boolean)
    .join(", ")
    .replace(/,([^,]*)$/, " $1");

  const contactpersonName = [
    formData.contactLastName,
    formData.contactFirstName
      ? `${formData.contactFirstName}${
          formData.contactSuffix && formData.contactSuffix !== "None"
            ? ` ${formData.contactSuffix}`
            : ""
        }`
      : "",
    formData.contactMiddleName,
  ]
    .filter(Boolean)
    .join(", ")
    .replace(/,([^,]*)$/, " $1");

  return (
    <Box ref={scrollRef}>
      <VStack gap={3} align="stretch">
        <SectionCard
          title="Location Details"
          hint="Retrieval and chapel information"
          icon={<Map size={18} />}
          isOpen={openMap.location}
          onToggle={() => toggle("location")}>
          <SmartRow
            label="Retrieval Address"
            value={retrievalLocation}
            type="address"
          />
          <SmartRow label="Chapel" value={selectedChapel} />
          <SmartRow
            label="Chapel Address"
            value={chapelAddress}
            type="address"
          />
          <SmartRow
            label="Chapel Contacts"
            value={chapelContacts.join(" | ")}
          />
        </SectionCard>

        <SectionCard
          title="Personal Details"
          hint="Deceased and contact information"
          icon={<User size={18} />}
          isOpen={openMap.personal}
          onToggle={() => toggle("personal")}>
          <Row label="Deceased" value={fullName} />
          <Row label="Contact Person" value={contactpersonName} />
          <Row label="Relationship" value={formData.relationship} />
          <Row label="Email" value={formData.email} />
          <Row label="Mobile" value={formData.mobile} />
        </SectionCard>
      </VStack>
    </Box>
  );
}

/* =========================
   SECTION CARD
========================= */
const SectionCard = ({
  title,
  icon,
  hint,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  hint?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Box
      w="100%"
      borderRadius="2xl"
      bg="white"
      shadow="sm"
      border="1px solid"
      borderColor="gray.100"
      overflow="hidden"
      transition="all 0.2s ease"
      _hover={{ transform: "translateY(-2px)", shadow: "md" }}>
      <Collapsible.Root open={isOpen}>
        <Collapsible.Trigger asChild>
          <Flex
            px={4}
            py={3}
            justify="space-between"
            align="center"
            cursor="pointer"
            onClick={onToggle}>
            <Flex align="center" gap={3}>
              <Box p={2} borderRadius="full" bg="gray.100" color="gray.700">
                {icon}
              </Box>

              <Box>
                <Text fontWeight="bold" fontSize="sm">
                  {title}
                </Text>
                {hint && (
                  <Text fontSize="xs" color="gray.500">
                    {hint}
                  </Text>
                )}
              </Box>
            </Flex>

            <Box
              transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
              transition="0.2s"
              color={isOpen ? "green.500" : "gray.400"}>
              <MdExpandMore size={22} />
            </Box>
          </Flex>
        </Collapsible.Trigger>

        <Collapsible.Content>
          <Box px={4} pb={4}>
            {children}
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
};

const Row = ({ label, value }: { label: string; value?: any }) => (
  <Flex align="center" py={1.5} fontSize="sm">
    {/* LABEL */}
    <Text color="gray.500" whiteSpace="nowrap">
      {label}
    </Text>

    {/* LINE */}
    <Box
      flex="1"
      mx={3}
      borderBottom="1px dashed"
      borderColor="gray.300"
      transform="translateY(2px)"
    />

    {/* VALUE */}
    <Text fontWeight="medium" textAlign="right" whiteSpace="nowrap">
      {value ?? "-"}
    </Text>
  </Flex>
);

/* =========================
   SMART ROW (FIXED FINAL)
========================= */
const SmartRow = ({
  label,
  value,
  type,
}: {
  label: string;
  value?: string;
  type?: "text" | "address" | "email" | "phone";
}) => {
  const isEmail = type === "email";

  // ✅ RULE-BASED LAYOUT DECISION (NO LENGTH CHECKS)
  const isLeaderRow = type === "text";

  // -------------------------
  // STACKED (ADDRESS / EMAIL / LONG FORM)
  // -------------------------
  if (!isLeaderRow) {
    return (
      <Box py={2}>
        <Text fontSize="sm" color="gray.500">
          {label}
        </Text>

        <Box my={1.5} borderBottom="1px dashed" borderColor="gray.200" />

        <Text
          fontSize="sm"
          fontWeight="medium"
          color={isEmail ? "blue.600" : "gray.800"}
          whiteSpace="pre-wrap"
          wordBreak="break-word"
          lineHeight="1.5">
          {value || "-"}
        </Text>
      </Box>
    );
  }

  // -------------------------
  // DOT LEADER (ATOMIC FIELDS ONLY)
  // -------------------------
  return (
    <Box py={2}>
      <Box
        display="grid"
        gridTemplateColumns="auto 1fr auto"
        alignItems="center"
        gap={3}>
        {/* LABEL */}
        <Text fontSize="sm" color="gray.500" whiteSpace="nowrap">
          {label}
        </Text>

        {/* DOTS */}
        <Box borderBottom="1px dashed" borderColor="gray.300" />

        {/* VALUE */}
        <Text
          fontSize="sm"
          fontWeight="medium"
          textAlign="right"
          color={isEmail ? "blue.600" : "gray.800"}
          whiteSpace="nowrap">
          {value || "-"}
        </Text>
      </Box>
    </Box>
  );
};
