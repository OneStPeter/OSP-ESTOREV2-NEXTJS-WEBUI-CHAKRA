"use client";

import { useState } from "react";
import {
  Box,
  Grid,
  Heading,
  Field,
  Text,
  Input,
  FileUpload,
  Button,
} from "@chakra-ui/react";
import { FloatingLabelInput } from "./FloatingLabelInput";

import { HiUpload } from "react-icons/hi";
import { toaster } from "@/components/ui/toaster";

export default function DeceasedContactFormStep() {
  const [formData, setFormData] = useState({
    // deceasedFirstName: "Juan",
    // deceasedMiddleName: "Ocampo",
    // deceasedLastName: "Dela Cruz",
    // deceasedSuffix: "None",
    // retrievalRemarks: "",
    // contactFirstName: "Restituto",
    // contactMiddleName: "Ocampo",
    // contactLastName: "Dela Cruz",
    // contactSuffix: "None",
    // relationship: "Father",
    // email: "restituto@gmail.com",
    // mobile: "09123456789",
    deceasedFirstName: "",
    deceasedMiddleName: "",
    deceasedLastName: "",
    deceasedSuffix: "",
    retrievalRemarks: "",
    contactFirstName: "",
    contactMiddleName: "",
    contactLastName: "",
    contactSuffix: "",
    relationship: "",
    email: "",
    mobile: "",
  });

  const [showOtherSuffix, setShowOtherSuffix] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "deceasedSuffix") {
      setShowOtherSuffix(value === "Other");
    }
  };

  const handleUploadID = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    toaster.create({
      title: "ID Uploaded",
      type: "success",
      description:
        "Details from the uploaded ID will populate the deceased and contact person fields.",
    });

    // setFormData((prev) => ({
    //   ...prev,
    //   deceasedFirstName: "Juan",
    //   deceasedMiddleName: "Ocampo",
    //   deceasedLastName: "Dela Cruz",
    //   contactFirstName: "Restituto",
    //   contactMiddleName: "Ocampo",
    //   contactLastName: "Dela Cruz",
    //   relationship: "Father",
    // }));

    setFormData((prev) => ({
      ...prev,
      deceasedFirstName: "",
      deceasedMiddleName: "",
      deceasedLastName: " ",
      contactFirstName: "",
      contactMiddleName: "",
      contactLastName: "",
      relationship: "",
    }));
  };

  return (
    <Box display="flex" flexDirection="column" gap="4">
      {/* Top Instruction Block */}
      <Box p="4" borderWidth="1px" borderRadius="lg" bg="green.50">
        <Text fontSize="sm" color="green.700" fontWeight="medium">
          You may upload an ID. The system can automatically extract and
          populate the details if provided.
        </Text>
      </Box>

      {/* Deceased Details */}
      <Box mb="4">
        <Heading
          as="h3"
          size="md"
          mb="4"
          pb="2"
          fontWeight="semibold"
          borderBottomWidth="1px"
          color="#525453"
          textAlign="left">
          Deceased Details
        </Heading>

        {/* Upload block */}
        <Box display="flex" alignItems="center" flexWrap="wrap" mb="4">
          <FileUpload.Root>
            <FileUpload.HiddenInput />
            <FileUpload.Trigger asChild>
              <Button variant="outline" size="sm">
                <HiUpload />
                Upload ID
              </Button>
            </FileUpload.Trigger>
            <FileUpload.List />
          </FileUpload.Root>
        </Box>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap="4">
          <Field.Root>
            <FloatingLabelInput
              name="deceasedFirstName"
              label="First Name*"
              value={formData.deceasedFirstName}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root>
            <FloatingLabelInput
              name="deceasedMiddleName"
              label="Middle Name*"
              value={formData.deceasedMiddleName}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root>
            <FloatingLabelInput
              name="deceasedLastName"
              label="Last Name*"
              value={formData.deceasedLastName}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root>
            <FloatingLabelInput
              name="deceasedSuffix"
              label="Suffix"
              value={formData.deceasedSuffix}
              onChange={handleChange}
            />
          </Field.Root>
        </Grid>
      </Box>

      {/* Contact Person */}
      <Box>
        <Heading
          as="h3"
          size="md"
          mb="4"
          pb="2"
          fontWeight="semibold"
          borderBottomWidth="1px"
          color="#525453"
          textAlign="left">
          Contact Person
        </Heading>

        {/* Upload block */}
        <Box display="flex" alignItems="center" flexWrap="wrap" mb="4">
          <FileUpload.Root>
            <FileUpload.HiddenInput />
            <FileUpload.Trigger asChild>
              <Button variant="outline" size="sm">
                <HiUpload />
                Upload ID
              </Button>
            </FileUpload.Trigger>
            <FileUpload.List />
          </FileUpload.Root>
        </Box>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap="4">
          <Field.Root>
            <FloatingLabelInput
              name="contactFirstName"
              label="First Name*"
              value={formData.contactFirstName}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root>
            <FloatingLabelInput
              name="contactMiddleName"
              label="Middle Name*"
              value={formData.contactMiddleName}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root>
            <FloatingLabelInput
              name="contactLastName"
              label="Last Name*"
              value={formData.contactLastName}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root>
            <FloatingLabelInput
              name="contactSuffix"
              label="Suffix"
              value={formData.contactSuffix}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root>
            <FloatingLabelInput
              name="email"
              label="Email Address*"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root>
            <FloatingLabelInput
              name="mobile"
              label="Mobile*"
              value={formData.mobile}
              onChange={handleChange}
            />
          </Field.Root>
        </Grid>
      </Box>
    </Box>
  );
}
