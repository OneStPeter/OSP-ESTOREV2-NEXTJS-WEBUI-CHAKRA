"use client";

import React, { useState } from "react";
import { PrimaryMdFlexButton } from "st-peter-ui";
import {
  Box,
  VStack,
  Grid,
  Button,
  Separator,
  Input,
  Field,
} from "@chakra-ui/react";
//import FloatingLabelInput from "@/components/ui/floating-label-input";
import { useSearchPlanholder } from "@/hooks/planholder/useSearchPlanholder";

import { useRouter } from "next/navigation";
import Page from "@/components/layout/page/Page";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";
import { FloatingLabelInput } from "@/components/ui/FloatingLabelInput";
import ValidationMessage from "@/components/ui/validation-message";

const PayMyPlan = () => {
  const router = useRouter();
  const { loading, error, search } = useSearchPlanholder();
  const [validationError, setValidationError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    lpaNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const normalize = (value: string) =>
    value.trim().replace(/\s+/g, " ").toLowerCase();

  const handleSearch = async () => {
    if (!formData.lpaNumber.trim()) {
      setValidationError("LPA Number is required.");
      return;
    } else if (!formData.firstName.trim()) {
      setValidationError("First Name is required.");
      return;
    } else if (!formData.lastName.trim()) {
      setValidationError("Last Name is required.");
      return;
    } else if (!formData.dateOfBirth.trim()) {
      setValidationError("Date of Birth is required.");
      return;
    }

    setValidationError(null);
    // search expects three arguments: lpaNumber, dateOfBirth, lastName
    const result = await search(
      formData.lpaNumber.trim(),
      formData.dateOfBirth.trim(),
      formData.lastName,
    );

    if (!result) {
      return;
    }

    const firstNameMatches =
      !formData.firstName ||
      normalize(result.personalInfo.firstName).includes(
        normalize(formData.firstName),
      );
    const middleNameMatches =
      !formData.middleName ||
      normalize(result.personalInfo.middleName).includes(
        normalize(formData.middleName),
      );
    const lastNameMatches =
      !formData.lastName ||
      normalize(result.personalInfo.lastName).includes(
        normalize(formData.lastName),
      );
    const birthDateMatches =
      !formData.dateOfBirth ||
      result.personalInfo.birthDate === formData.dateOfBirth;

    if (
      !firstNameMatches ||
      !middleNameMatches ||
      !lastNameMatches ||
      !birthDateMatches
    ) {
      setValidationError("Entered details do not match the planholder record.");
      return;
    }

    sessionStorage.setItem("payMyPlanDetails", JSON.stringify(result));
    router.push("/pay-my-plan/details");
  };
  return (
    <Page.Root
      title="Pay My Plan"
      description="Search for your St. Peter Life Plan account to view details and manage your plan."
    >
      <Page.MainContent>
        <Page.Row>
          <Box
            // mt={8}
            w="full"
            // maxW="760px"
            bg={BRAND_COLORS.white}
            // borderWidth="1px"
            // borderColor={BRAND_COLORS.neutralBorder}
            borderRadius={STANDARD_RADIUS.lg}
            // boxShadow={STANDARD_SHADOWS.level1}
            // p={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.lg }}
          >
            <VStack gap={6} align="stretch" w="full">
              <Grid templateColumns="1fr" gap={8}>
                <Field.Root>
                  <FloatingLabelInput
                    id="lpaNumber"
                    name="lpaNumber"
                    type="text"
                    label="LPA Number"
                    value={formData.lpaNumber}
                    onChange={handleChange}
                  />
                </Field.Root>
              </Grid>

              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={8}
              >
                <Field.Root>
                  <FloatingLabelInput
                    id="firstName"
                    name="firstName"
                    type="text"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Field.Root>
                <Field.Root>
                  <FloatingLabelInput
                    id="middleName"
                    name="middleName"
                    type="text"
                    label="Middle Name"
                    value={formData.middleName}
                    onChange={handleChange}
                  />
                </Field.Root>
              </Grid>

              <Grid templateColumns="1fr" gap={8}>
                <Field.Root>
                  <FloatingLabelInput
                    id="lastName"
                    name="lastName"
                    type="text"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Field.Root>
              </Grid>

              <Grid templateColumns="1fr" gap={8}>
                <Field.Root>
                  <Field.Label>Date of Birth</Field.Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </Field.Root>
              </Grid>

              <Separator />

              <ValidationMessage messages={[validationError, error]} />

              <PrimaryMdFlexButton onClick={handleSearch} disabled={loading}>
                SEARCH
              </PrimaryMdFlexButton>

              <Box textAlign="center">
                <Button w="full" variant="outline">
                  Use My Saved Templates
                </Button>
              </Box>
            </VStack>
          </Box>
        </Page.Row>
      </Page.MainContent>
    </Page.Root>
  );
};

export default PayMyPlan;
