import {
  Text,
  Select,
  Input,
  Box,
  VStack,
  Grid,
  GridItem,
  createListCollection,
  Button,
  FileUpload,
  Field,
} from "@chakra-ui/react";
import React from "react";
import { HiUpload } from "react-icons/hi";
import HorizontalStepper from "../ui/horizontal-stepper";
import { steps } from "@/data/lifePlanSteps";
const LifePlanApplication1 = () => {
  const idCollection = createListCollection({
    items: [
      { label: "Passport", value: "passport" },
      { label: "Driver's License", value: "driver_license" },
      { label: "National ID", value: "national_id" },
    ],
  });

  return (
    <>
      <VStack gap={4} mb={4} align="stretch">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          w="17rem"
        >
          <Text textAlign="start" fontWeight="semibold">
            Lifeplan Application
          </Text>
        </Box>
        <Text textAlign="start">
          Please provide us with the planholder's personal information.
        </Text>
        <Box>
          <Text textAlign="start" fontWeight="semibold">
            Personal Information
          </Text>
        </Box>
      </VStack>
      <VStack gap={8} align="stretch">
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <VStack gap={4} align="stretch">
            <Select.Root collection={idCollection}>
              <Select.HiddenSelect />
              <Select.Label>ID Type</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select ID Type" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  {idCollection.items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      {item.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
          </VStack>
          <VStack>
            <FileUpload.Root gap="1">
              <FileUpload.HiddenInput />
              <FileUpload.Label>Upload file</FileUpload.Label>
              <Input asChild>
                <FileUpload.Trigger>
                  <FileUpload.FileText />
                </FileUpload.Trigger>
              </Input>
            </FileUpload.Root>
          </VStack>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <Field.Label>Last Name</Field.Label>
            <Input id="lastName" type="text" placeholder="Enter Last Name" />
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <Field.Label>First Name</Field.Label>
            <Input id="firstName" type="text" placeholder="Enter First Name" />
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
        </Grid>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <Field.Label>Middle Name</Field.Label>
            <Input
              id="middleName"
              type="text"
              placeholder="Enter Middle Name"
            />
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <Field.Label>Mobile Number</Field.Label>
            <Input
              id="mobileNumber"
              type="text"
              placeholder="Enter Mobile Number"
            />
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
        </Grid>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <Field.Label>Nationality</Field.Label>
            <Input
              id="nationality"
              type="text"
              placeholder="Enter Nationality"
            />
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <Field.Label>Date of Birth</Field.Label>
            <Input id="dateOfBirth" type="date" />
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <Field.Label>Date of Neutralization</Field.Label>
            <Input id="dateOfNeutralization" type="date" />
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <Field.Label>Insurability</Field.Label>
            <Input id="insurability" type="text" value="Insurable" readOnly />
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
        </Grid>
      </VStack>
    </>
  );
};

export default LifePlanApplication1;
