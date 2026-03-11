import {
  VStack,
  Box,
  Grid,
  GridItem,
  CloseButton,
  Dialog,
  HStack,
  Portal,
  createListCollection,
  Select,
  Field,
  Flex,
  Input,
  Stack,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  Body,
  H4,
  Small,
  DeleteSolidButton,
  SecondaryMdButton,
  PrimaryMdButton,
  DynamicOutlineButton,
} from "st-peter-ui";
import { FloatingLabelInput } from "../ui/floating-label-input";

const beneficiaryTypes = createListCollection({
  items: [
    { label: "Principal", value: "principal" },
    { label: "Contingent", value: "contingent" },
  ],
});
const relationshipTypes = createListCollection({
  items: [
    { label: "Spouse", value: "Spouse" },
    { label: "Child", value: "Child" },
    { label: "Parent", value: "Parent" },
    { label: "Sibling", value: "Sibling" },
    { label: "Friend", value: "Friend" },
  ],
});

type BeneficiaryItem = {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  relationship: string;
  address: string;
};

type SelectedBeneficiary = {
  type: "principal" | "contingent";
  index: number;
};

const Beneficiary = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [principalBeneficiaries, setPrincipalBeneficiaries] = useState<
    BeneficiaryItem[]
  >([
    {
      firstName: "Juan",
      middleName: "",
      lastName: "Dela Cruz",
      birthDate: "1990-01-01",
      relationship: "Sibling",
      address: "Quezon City",
    },
    {
      firstName: "Maria",
      middleName: "R.",
      lastName: "Santos",
      birthDate: "1992-03-10",
      relationship: "Sibling",
      address: "Makati City",
    },
  ]);

  const [contingentBeneficiaries, setContingentBeneficiaries] = useState<
    BeneficiaryItem[]
  >([
    {
      firstName: "Alex",
      middleName: "",
      lastName: "Santos",
      birthDate: "1980-02-14",
      relationship: "Parent",
      address: "Pasig City",
    },
  ]);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] =
    useState<SelectedBeneficiary | null>(null);
  const [editedBeneficiary, setEditedBeneficiary] = useState<BeneficiaryItem>({
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    relationship: "",
    address: "",
  });

  const formatFullName = (beneficiary: BeneficiaryItem) => {
    return [beneficiary.firstName, beneficiary.middleName, beneficiary.lastName]
      .filter((namePart) => namePart.trim().length > 0)
      .join(" ");
  };

  const formatDateDisplay = (rawDate: string) => {
    if (!rawDate) return "N/A";
    const date = new Date(rawDate);
    if (Number.isNaN(date.getTime())) return rawDate;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const handleOpenEdit = (
    type: "principal" | "contingent",
    index: number,
    beneficiary: BeneficiaryItem,
  ) => {
    setSelectedBeneficiary({ type, index });
    setEditedBeneficiary({ ...beneficiary });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedBeneficiary) return;

    if (selectedBeneficiary.type === "principal") {
      setPrincipalBeneficiaries((prev) =>
        prev.map((beneficiary, index) =>
          index === selectedBeneficiary.index
            ? { ...editedBeneficiary }
            : beneficiary,
        ),
      );
    } else {
      setContingentBeneficiaries((prev) =>
        prev.map((beneficiary, index) =>
          index === selectedBeneficiary.index
            ? { ...editedBeneficiary }
            : beneficiary,
        ),
      );
    }

    setEditDialogOpen(false);
    setSelectedBeneficiary(null);
  };

  return (
    <>
      <Flex
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        direction={{ base: "column", md: "row" }}
        gap={4}
        mb={5}
      >
        <Box>
          <H4>Add Your Beneficiaries</H4>
          <Body color="gray.600">
            Protect your loved ones by adding beneficiaries to your plan.
          </Body>
        </Box>
        <Dialog.Root
          placement="center"
          motionPreset="slide-in-bottom"
          size={{ mdDown: "full", md: "lg" }}
        >
          <Dialog.Trigger asChild>
            <DynamicOutlineButton label="Add"></DynamicOutlineButton>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content mx={{ base: 3, md: 0 }}>
                <Dialog.Header>
                  <Dialog.Title>Add Beneficiary</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <VStack gap={5} w="full" align="stretch">
                    {/* Row 1: Selects */}
                    <Grid
                      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                      gap={4}
                      w="full"
                    >
                      <Select.Root collection={beneficiaryTypes} size="md">
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Select beneficiary type" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                          <Select.Content>
                            {beneficiaryTypes.items.map((beneficiaryType) => (
                              <Select.Item
                                item={beneficiaryType}
                                key={beneficiaryType.value}
                              >
                                {beneficiaryType.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>

                      <Select.Root collection={relationshipTypes} size="md">
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Select relationship" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                          <Select.Content>
                            {relationshipTypes.items.map((relationshipType) => (
                              <Select.Item
                                item={relationshipType}
                                key={relationshipType.value}
                              >
                                {relationshipType.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Grid>

                    {/* Row 2: Name Fields */}
                    <Grid
                      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                      gap={4}
                      w="full"
                    >
                      <Field.Root>
                        <FloatingLabelInput
                          id="firstName"
                          type="text"
                          label="First Name"
                        />
                        <Field.ErrorText>
                          This field is required
                        </Field.ErrorText>
                      </Field.Root>

                      <Field.Root>
                        <FloatingLabelInput
                          id="lastName"
                          type="text"
                          label="Last Name"
                        />
                        <Field.ErrorText>
                          This field is required
                        </Field.ErrorText>
                      </Field.Root>

                      <Field.Root>
                        <FloatingLabelInput
                          id="middleInitial"
                          type="text"
                          label="Middle Initial"
                        />
                        <Field.ErrorText>
                          This field is required
                        </Field.ErrorText>
                      </Field.Root>
                    </Grid>

                    <Field.Root>
                      <FloatingLabelInput
                        id="address"
                        type="text"
                        label="Address"
                      />
                      <Field.ErrorText>This field is required</Field.ErrorText>
                    </Field.Root>

                    {/* Row 3: DOB  */}
                    <Field.Root w={{ base: "full", md: "300px" }}>
                      <Field.Label>Date of Birth</Field.Label>
                      <Input id="dateOfBirth" type="date" />
                      <Field.ErrorText>This field is required</Field.ErrorText>
                    </Field.Root>
                  </VStack>
                </Dialog.Body>
                <Dialog.Footer>
                  <Stack
                    direction={{ base: "column-reverse", sm: "row" }}
                    w={{ base: "full", sm: "auto" }}
                    gap={3}
                  >
                    <Dialog.ActionTrigger asChild>
                      <SecondaryMdButton>Cancel</SecondaryMdButton>
                    </Dialog.ActionTrigger>
                    <PrimaryMdButton>Save</PrimaryMdButton>
                  </Stack>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </Flex>

      <HStack justify="space-between" align="center" w="full" mb={4}>
        <Body fontWeight="bold">Principal Beneficiaries</Body>
      </HStack>

      <VStack align="stretch" gap={3} mb={4}>
        {principalBeneficiaries.map((beneficiary, idx) => (
          <Box
            key={idx}
            bg="white"
            borderWidth="1px"
            borderColor="gray.200"
            rounded="xl"
            px={{ base: 3, md: 4 }}
            py={{ base: 3, md: 4 }}
          >
            <Flex justify="space-between" align="start" gap={3}>
              <Box
                flex="1"
                cursor="pointer"
                onClick={() => handleOpenEdit("principal", idx, beneficiary)}
              >
                <Grid
                  templateColumns={{
                    base: "1fr",
                    md: "repeat(3, minmax(0, 1fr))",
                  }}
                  gap={{ base: 2, md: 4 }}
                >
                  <GridItem>
                    <VStack align="start" gap={0} minW={0}>
                      <Small color="gray.500">Name</Small>
                      <Body fontWeight="semibold">
                        {formatFullName(beneficiary)}
                      </Body>
                    </VStack>
                  </GridItem>

                  <GridItem>
                    <VStack align="start" gap={0}>
                      <Small color="gray.500">Relationship</Small>
                      <Body fontWeight="semibold">
                        {beneficiary.relationship}
                      </Body>
                    </VStack>
                  </GridItem>

                  <GridItem>
                    <VStack align="start" gap={0}>
                      <Small color="gray.500">Date of Birth</Small>
                      <Body fontWeight="semibold">
                        {formatDateDisplay(beneficiary.birthDate)}
                      </Body>
                    </VStack>
                  </GridItem>
                </Grid>
              </Box>

              {isMobile ? (
                <IconButton
                  aria-label="Delete beneficiary"
                  variant="ghost"
                  color="red.500"
                  mt={1}
                >
                  <FaRegTrashAlt />
                </IconButton>
              ) : (
                <DeleteSolidButton mt={{ base: 1, md: "auto" }} />
              )}
            </Flex>
          </Box>
        ))}
      </VStack>
      <HStack justify="space-between" align="center" w="full" mb={4}>
        <Body fontWeight="bold">Contingent Beneficiaries</Body>
      </HStack>
      <VStack align="stretch" gap={3} mb={4}>
        {contingentBeneficiaries.map((beneficiary, idx) => (
          <Box
            key={idx}
            bg="white"
            borderWidth="1px"
            borderColor="gray.200"
            rounded="xl"
            px={{ base: 3, md: 4 }}
            py={{ base: 3, md: 4 }}
          >
            <Flex justify="space-between" align="start" gap={3}>
              <Box
                flex="1"
                cursor="pointer"
                onClick={() => handleOpenEdit("contingent", idx, beneficiary)}
              >
                <Grid
                  templateColumns={{
                    base: "1fr",
                    md: "repeat(3, minmax(0, 1fr))",
                  }}
                  gap={{ base: 2, md: 4 }}
                >
                  <GridItem>
                    <VStack align="start" gap={0} minW={0}>
                      <Small color="gray.500">Name</Small>
                      <Body fontWeight="semibold">
                        {formatFullName(beneficiary)}
                      </Body>
                    </VStack>
                  </GridItem>

                  <GridItem>
                    <VStack align="start" gap={0}>
                      <Small color="gray.500">Relationship</Small>
                      <Body fontWeight="semibold">
                        {beneficiary.relationship}
                      </Body>
                    </VStack>
                  </GridItem>

                  <GridItem>
                    <VStack align="start" gap={0}>
                      <Small color="gray.500">Date of Birth</Small>
                      <Body fontWeight="semibold">
                        {formatDateDisplay(beneficiary.birthDate)}
                      </Body>
                    </VStack>
                  </GridItem>
                </Grid>
              </Box>

              {isMobile ? (
                <IconButton
                  aria-label="Delete beneficiary"
                  variant="ghost"
                  color="red.500"
                  mt={1}
                >
                  <FaRegTrashAlt />
                </IconButton>
              ) : (
                <DeleteSolidButton mt={{ base: 1, md: "auto" }} />
              )}
            </Flex>
          </Box>
        ))}
      </VStack>

      <Dialog.Root
        placement="center"
        open={editDialogOpen}
        onOpenChange={(details) => setEditDialogOpen(details.open)}
        size={{ mdDown: "full", md: "xl" }}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Edit Beneficiary</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <VStack align="stretch" gap={4}>
                  <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap={4}
                  >
                    <Field.Root>
                      <Field.Label>First Name</Field.Label>
                      <Input
                        value={editedBeneficiary.firstName}
                        onChange={(e) =>
                          setEditedBeneficiary((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                          }))
                        }
                        placeholder="Enter first name"
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Middle Name</Field.Label>
                      <Input
                        value={editedBeneficiary.middleName}
                        onChange={(e) =>
                          setEditedBeneficiary((prev) => ({
                            ...prev,
                            middleName: e.target.value,
                          }))
                        }
                        placeholder="Enter middle name"
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Last Name</Field.Label>
                      <Input
                        value={editedBeneficiary.lastName}
                        onChange={(e) =>
                          setEditedBeneficiary((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                          }))
                        }
                        placeholder="Enter last name"
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Birthdate</Field.Label>
                      <Input
                        type="date"
                        value={editedBeneficiary.birthDate}
                        onChange={(e) =>
                          setEditedBeneficiary((prev) => ({
                            ...prev,
                            birthDate: e.target.value,
                          }))
                        }
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Relationship</Field.Label>
                      <Select.Root
                        collection={relationshipTypes}
                        value={
                          editedBeneficiary.relationship
                            ? [editedBeneficiary.relationship]
                            : []
                        }
                        onValueChange={(details) =>
                          setEditedBeneficiary((prev) => ({
                            ...prev,
                            relationship: details.value?.[0] ?? "",
                          }))
                        }
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Select relationship" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                          <Select.Content>
                            {relationshipTypes.items.map((relationshipType) => (
                              <Select.Item
                                item={relationshipType}
                                key={relationshipType.value}
                              >
                                {relationshipType.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Address</Field.Label>
                      <Input
                        value={editedBeneficiary.address}
                        onChange={(e) =>
                          setEditedBeneficiary((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        placeholder="Enter address"
                      />
                    </Field.Root>
                  </Grid>
                </VStack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <SecondaryMdButton>Cancel</SecondaryMdButton>
                </Dialog.ActionTrigger>
                <PrimaryMdButton onClick={handleSaveEdit}>Save</PrimaryMdButton>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default Beneficiary;
