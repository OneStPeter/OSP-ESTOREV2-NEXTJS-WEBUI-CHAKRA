import React from "react";
import {
  VStack,
  HStack,
  SimpleGrid,
  Box,
  Text,
  Input,
  Portal,
  Select,
  Field,
  createListCollection,
} from "@chakra-ui/react";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];
const civilStatusOptions = [
  { value: "single", label: "Single" },
  { value: "in_relationship", label: "In a Relationship" },
];
const genderCollection = createListCollection({
  items: genderOptions,
});
const civilStatusCollection = createListCollection({
  items: civilStatusOptions,
});

const LifePlanApplication3 = () => {
  return (
    <>
      <VStack align="stretch" gap={4} mb={4}>
        <HStack justify="space-between" align="center" w="17rem">
          <Text fontWeight="semibold">Lifeplan Application</Text>
        </HStack>
        <Text textAlign="start">
          Please provide us with the planholder's personal information.
        </Text>
        <Box>
          <Text fontWeight="semibold" textAlign="start">
            Other Information
          </Text>
        </Box>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={4}>
        <Field.Root>
          <Field.Label>Landline Number</Field.Label>
          <Input placeholder="Enter Landline Number" />
        </Field.Root>
        <Field.Root>
          <Field.Label>Mail to Collect</Field.Label>
          <Input placeholder="Enter Mail to Collect" />
        </Field.Root>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={4}>
        <VStack align="stretch" gap={4} mb={4}>
          <Select.Root collection={genderCollection} width="100%">
            <Select.HiddenSelect />
            <Select.Label>Gender</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select Gender" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {genderOptions.map((item) => (
                    <Select.Item item={item} key={item.value}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </VStack>
        <VStack align="stretch" gap={4} mb={4}>
          <Select.Root collection={civilStatusCollection} width="100%">
            <Select.HiddenSelect />
            <Select.Label>Civil Status</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select Civil Status" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {civilStatusOptions.map((item) => (
                    <Select.Item item={item} key={item.value}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </VStack>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={4}>
        <Field.Root>
          <Field.Label>Height (inches)</Field.Label>
          <Input placeholder="Enter Height" />
        </Field.Root>
        <Field.Root>
          <Field.Label>Weight (lbs)</Field.Label>
          <Input placeholder="Enter Weight" />
        </Field.Root>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={4}>
        <Field.Root>
          <Field.Label>Occupation</Field.Label>
          <Input placeholder="Enter Occupation" />
        </Field.Root>
        <Field.Root>
          <Field.Label>Employer Name</Field.Label>
          <Input placeholder="Enter Employer Name" />
        </Field.Root>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={4}>
        <Field.Root>
          <Field.Label>Employment Status</Field.Label>
          <Input placeholder="Enter Employment Status" />
        </Field.Root>
        <Field.Root>
          <Field.Label>Office Address</Field.Label>
          <Input placeholder="Enter Office Address" />
        </Field.Root>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={4}>
        <Field.Root>
          <Field.Label>TIN</Field.Label>
          <Input placeholder="Enter TIN" />
        </Field.Root>
        <Field.Root>
          <Field.Label>SSS/GSIS</Field.Label>
          <Input placeholder="Enter SSS/GSIS" />
        </Field.Root>
      </SimpleGrid>

      <Field.Root>
        <Field.Label>Other Source of Fund</Field.Label>
        <Input placeholder="Enter Other Source of Fund" />
      </Field.Root>
    </>
  );
};

export default LifePlanApplication3;
