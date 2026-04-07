"use client";
import React, { useState } from "react";
import { Body, Box, H3, PrimaryMdFlexButton } from "st-peter-ui";
import {
  VStack,
  Grid,
  Button,
  Link,
  Separator,
  Input,
  Field,
  Flex,
  RadioGroup,
} from "@chakra-ui/react";
import FloatingLabelInput from "@/components/ui/floating-label-input";
import { FaArrowLeft } from "react-icons/fa";
import { Breadcrumb } from "st-peter-ui";

import { useRouter } from "next/navigation";

const breadcrumbItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Pay My Plan",
    href: "/pay-my-plan",
  },
];
const DetailsPayMyPlan = () => {
  const [formData, setFormData] = useState({
    contractNo: "",
    planType: "",
    firstName: "",
    middleName: "",
    lastName: "",
    lotNo: "",
    street: "",
    province: "",
    city: "",
    district: "",
    zipCode: "",
    barangay: "",
    email: "",
    mobileNo: "",
    installmentNumber: "",
    paymentType: "",
    deceasedLastName: "",
    deceasedFirstName: "",
    totalAmount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearAddress = () => {
    setFormData((prev) => ({
      ...prev,
      lotNo: "",
      street: "",
      province: "",
      city: "",
      district: "",
      zipCode: "",
      barangay: "",
    }));
  };

  const router = useRouter();
  return (
    <Box
      p={8}
      mt={{ base: 0, md: 24 }}
      maxW={"7xl"}
      mx={"auto"}
      px={{ base: 4, md: 0 }}
    >
      {/* <Box display={{ base: "block", md: "none" }}>
        <Button variant="ghost" size="md" onClick={() => router.back()} px={0}>
          <FaArrowLeft color="#177D54" />
          Back
        </Button>
      </Box> */}
      {/* <Box display={{ base: "none", md: "block" }}>
        <Breadcrumb items={breadcrumbItems} />
      </Box> */}
      <Box mt={4}>
        <H3>Pay My Plan</H3>
        <Body>
          Search for your St. Peter Life Plan account to view details and manage
          your plan.
        </Body>
      </Box>

      <VStack gap={6} mt={8} align="stretch" w="full">
        {/* Plan Details Section */}
        <VStack mb={0} align="stretch">
          <Body fontWeight="bold">Plan Details</Body>
        </VStack>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="contractNo"
              name="contractNo"
              type="text"
              label="Contract No."
              value={formData.contractNo}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="planType"
              name="planType"
              type="text"
              label="Plan Type"
              value={formData.planType}
              onChange={handleChange}
            />
          </Field.Root>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
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

        <Grid templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }} gap={8}>
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

        <Separator />

        {/* Address Section */}
        <VStack mb={0} align="stretch">
          <Body fontWeight="bold">Address</Body>
        </VStack>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="lotNo"
              name="lotNo"
              type="text"
              label="Lot #"
              value={formData.lotNo}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="street"
              name="street"
              type="text"
              label="Street"
              value={formData.street}
              onChange={handleChange}
            />
          </Field.Root>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="province"
              name="province"
              type="text"
              label="Province"
              value={formData.province}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="city"
              name="city"
              type="text"
              label="City"
              value={formData.city}
              onChange={handleChange}
            />
          </Field.Root>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="district"
              name="district"
              type="text"
              label="District"
              value={formData.district}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="zipCode"
              name="zipCode"
              type="text"
              label="ZipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </Field.Root>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="barangay"
              name="barangay"
              type="text"
              label="Barangay"
              value={formData.barangay}
              onChange={handleChange}
            />
          </Field.Root>
          {/* <Box display="flex" alignItems="flex-end">
            <Link
              color="red.500"
              fontWeight="600"
              fontSize="sm"
              cursor="pointer"
              onClick={handleClearAddress}
              _hover={{
                textDecoration: "underline",
              }}
            >
              🗑️ Clear Address
            </Link>
          </Box> */}
        </Grid>

        <Separator />

        {/* Contact Details Section */}
        <VStack mb={0} align="stretch">
          <Body fontWeight="bold">Contact Details</Body>
        </VStack>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <Field.Root>
            <FloatingLabelInput
              id="email"
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <FloatingLabelInput
              id="mobileNo"
              name="mobileNo"
              type="text"
              label="Mobile No."
              value={formData.mobileNo}
              onChange={handleChange}
            />
          </Field.Root>
        </Grid>

        <Separator />

        {/* Payment Type Section */}
        <VStack mb={0} align="stretch">
          <Body>Select your desired payment type.</Body>
        </VStack>

        <Field.Root>
          <RadioGroup.Root
            value={formData.paymentType}
            onValueChange={(e: any) =>
              setFormData((prev) => ({
                ...prev,
                paymentType: e.value,
              }))
            }
          >
            <VStack gap={6} w="full">
              {/* Installment Section */}
              <VStack align="stretch" gap={4} w="full">
                <Body fontWeight="bold" color="gray.600">
                  INSTALLMENT
                </Body>
                <RadioGroup.Item value="installment">
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemControl />
                  <RadioGroup.ItemText>
                    Installment Number To Be Paid
                  </RadioGroup.ItemText>
                </RadioGroup.Item>
                <Field.Root>
                  <Input
                    type="number"
                    placeholder="1"
                    value={formData.installmentNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        installmentNumber: e.target.value,
                      }))
                    }
                    w="120px"
                  />
                </Field.Root>
              </VStack>

              {/* Pay The Balance Section */}
              <VStack align="stretch" gap={4} w="full">
                <Body fontWeight="bold" color="gray.600">
                  PAY THE BALANCE
                </Body>
                <RadioGroup.Item value="activePlan">
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemControl />
                  <RadioGroup.ItemText>For Active Plan</RadioGroup.ItemText>
                </RadioGroup.Item>
                <RadioGroup.Item value="memorialService">
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemControl />
                  <RadioGroup.ItemText>
                    For Memorial Service
                  </RadioGroup.ItemText>
                </RadioGroup.Item>
                <Body fontSize="sm" color="gray.500">
                  Enter the name of the deceased
                </Body>
                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                  gap={4}
                >
                  <Field.Root>
                    <FloatingLabelInput
                      id="deceasedLastName"
                      name="deceasedLastName"
                      type="text"
                      label="Last Name"
                      value={formData.deceasedLastName}
                      onChange={handleChange}
                    />
                  </Field.Root>
                  <Field.Root>
                    <FloatingLabelInput
                      id="deceasedFirstName"
                      name="deceasedFirstName"
                      type="text"
                      label="First Name"
                      value={formData.deceasedFirstName}
                      onChange={handleChange}
                    />
                  </Field.Root>
                </Grid>
              </VStack>
            </VStack>
          </RadioGroup.Root>
        </Field.Root>

        <Box textAlign="center" mt={8}>
          <Body fontWeight="bold" fontSize="lg">
            TOTAL AMOUNT: <span>₱0.00</span>
          </Body>
        </Box>

        <Separator />

        {/* Proceed Button */}
        <PrimaryMdFlexButton
          onClick={() => {
            router.push("/pay-my-plan/payment");
          }}
        >
          Proceed
        </PrimaryMdFlexButton>
      </VStack>
    </Box>
  );
};

export default DetailsPayMyPlan;
