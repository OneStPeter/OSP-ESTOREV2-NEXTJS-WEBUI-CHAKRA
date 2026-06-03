"use client";

import {
  Box,
  Grid,
  Text,
  Separator,
  Card,
  VStack,
  Span,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { Map, PinIcon } from "lucide-react";
import { FaRegAddressCard } from "react-icons/fa";
import { Body, H4, Small } from "st-peter-ui";

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
  const renderRow = (label: string, value: string) => (
    <Grid templateColumns="1fr 2fr" py={1} borderBottom="1px solid #E2E8F0">
      <Text fontWeight="medium" color="gray.600">
        {label}
      </Text>
      <Text textAlign="right" color="gray.800">
        {value}
      </Text>
    </Grid>
  );

  return (
    <Card.Root
      mb={8}
      bg="white"
      shadow="sm"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden">
      <Card.Header py={4} px={6} borderBottomWidth="1px">
        <SectionCardHeader
          icon={<FaRegAddressCard />}
          title="Booking Summary"
        />
      </Card.Header>

      <Card.Body px={6} py={5}>
        <Box mb={1} mt={1}>
          <Text fontWeight="semibold" color="green">
            Location Details
          </Text>
        </Box>
        <Separator mb={3} />
        <Grid templateColumns={{ base: "1fr", md: "repeat(1 ,1fr)" }} gap={6}>
          <InfoItem label="Retrieval Address" value={retrievalLocation} />
        </Grid>

        <Box mb={1} mt={1}></Box>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={6}>
          <InfoItem label="Chapel" value={selectedChapel} />
          <InfoItem label="Chapel Address" value={chapelAddress} />
          <InfoItem
            label="Chapel Contacts"
            value={chapelContacts.join(" | ")}
          />
        </Grid>

        <Box mb={1} mt={4}>
          <Text fontWeight="semibold" color="green">
            Deceased Details
          </Text>
        </Box>
        <Separator mb={3} />
        <Grid templateColumns={{ base: "1fr", md: "repeat(4 ,1fr)" }} gap={6}>
          <InfoItem label="First Name" value={formData.deceasedFirstName} />
          <InfoItem label="Middle Name" value={formData.deceasedMiddleName} />
          <InfoItem label="Last Name" value={formData.deceasedLastName} />
          {formData.deceasedSuffix && formData.deceasedSuffix !== "None" && (
            <InfoItem label="Suffix" value={formData.deceasedSuffix} />
          )}
        </Grid>

        <Box mb={1} mt={4}>
          <Text fontWeight="semibold" color="green">
            Contact Person
          </Text>
        </Box>
        <Separator mb={3} />
        <Grid templateColumns={{ base: "1fr", md: "repeat(4 ,1fr)" }} gap={6}>
          <InfoItem label="First Name" value={formData.deceasedFirstName} />
          <InfoItem label="Middle Name" value={formData.deceasedMiddleName} />
          <InfoItem label="Last Name" value={formData.deceasedLastName} />
          {formData.deceasedSuffix && formData.deceasedSuffix !== "None" && (
            <InfoItem label="Suffix" value={formData.deceasedSuffix} />
          )}
          <InfoItem label="Relationship" value={formData.relationship} />
          <InfoItem label="Email" value={formData.email} />
          <InfoItem label="Mobile" value={formData.mobile} />
        </Grid>
      </Card.Body>
    </Card.Root>
    // <Box
    //   bg="white"
    //   borderWidth="1px"
    //   borderRadius="lg"
    //   p={4}
    //   shadow="sm"
    //   maxW="md"
    //   mx="auto"
    //   fontFamily="monospace">
    //   <Text fontWeight="bold" fontSize="lg" mb={2} color="#109448">
    //     Review Summary
    //   </Text>

    //   {/* Selected Chapel */}
    //   {renderRow("Chapel", selectedChapel)}
    //   {renderRow("Address", chapelAddress)}
    //   {renderRow("Contacts", chapelContacts.join(" | "))}
    //   <Separator my={2} />

    //   {/* Retrieval Location */}
    //   {renderRow("Retrieval Location", retrievalLocation)}
    //   <Separator my={2} />

    //   {/* Deceased Details */}
    //   {renderRow("Deceased First Name", formData.deceasedFirstName)}
    //   {renderRow("Deceased Middle Name", formData.deceasedMiddleName)}
    //   {renderRow("Deceased Last Name", formData.deceasedLastName)}
    //   {formData.deceasedSuffix && formData.deceasedSuffix !== "None"
    //     ? renderRow("Deceased Suffix", formData.deceasedSuffix)
    //     : null}
    //   <Separator my={2} />

    //   {/* Contact Person */}
    //   {renderRow("Contact First Name", formData.contactFirstName)}
    //   {renderRow("Contact Middle Name", formData.contactMiddleName)}
    //   {renderRow("Contact Last Name", formData.contactLastName)}
    //   {renderRow("Relationship", formData.relationship)}
    //   {renderRow("Email", formData.email)}
    //   {renderRow("Mobile", formData.mobile)}
    // </Box>
  );
}

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <VStack gap={1} align="start" minW={0}>
    <Small color="gray.500">{label}</Small>
    <Body>
      <Span fontWeight="semibold">{value}</Span>
    </Body>
  </VStack>
);

const SectionCardHeader = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => (
  <Flex align="center" gap={2}>
    <Icon boxSize={5}>{icon}</Icon>
    <H4>{title}</H4>
  </Flex>
);
